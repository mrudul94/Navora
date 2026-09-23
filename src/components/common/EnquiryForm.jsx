import { useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";
import Button from "./Button";
import { consentStatement } from "../../content/contact";

/**
 * The site's single enquiry form, configured by src/content/forms.js.
 *
 * Submits as JSON to /api/enquiry, a Cloudflare Pages Function that validates
 * against these same field definitions and writes the enquiry to D1. Because
 * the endpoint imports the same config, the client and server cannot drift
 * apart — there is no second copy of the field list to keep in step.
 */

const ENDPOINT = "/api/enquiry";

function EnquiryForm({ config }) {
  const {
    formName,
    fields,
    submitLabel,
    successHeading,
    successText,
    requiresConsent,
  } = config;

  const uid = useId();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [serverError, setServerError] = useState(null);
  const errorSummaryRef = useRef(null);

  const fieldId = (name) => `${uid}-${name}`;

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const validate = () => {
    const found = {};

    for (const field of fields) {
      const value = (values[field.name] ?? "").toString().trim();

      if (field.required && !value) {
        found[field.name] = `${field.label} is required.`;
        continue;
      }

      if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        found[field.name] = "Enter a valid email address.";
      }
    }

    if (requiresConsent && !values.consent) {
      found.consent = "Please confirm you agree before submitting.";
    }

    return found;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const found = validate();
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setStatus("idle");
      // Move focus to the summary so screen readers announce the problem.
      window.requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    setStatus("submitting");
    setServerError(null);

    const submitted = {};
    for (const field of fields) {
      submitted[field.name] = values[field.name] ?? "";
    }
    if (requiresConsent) {
      submitted.consent = values.consent ? "yes" : "no";
    }

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form: formName,
          values: submitted,
          botField: values["bot-field"] ?? "",
        }),
      });

      const result = await response.json().catch(() => null);

      // The server validates independently; surface anything it rejects.
      if (response.status === 422 && result?.errors) {
        setErrors(result.errors);
        setStatus("idle");
        window.requestAnimationFrame(() => errorSummaryRef.current?.focus());
        return;
      }

      if (!response.ok || !result?.ok) {
        setServerError(result?.error ?? null);
        throw new Error(`Submission failed (${response.status})`);
      }

      setStatus("success");
      setValues({});
    } catch (error) {
      console.error("Enquiry submission failed", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <span className="form-success__icon">
          <Icon name="checkCircle" />
        </span>
        <h3>{successHeading}</h3>
        <p>{successText}</p>
      </div>
    );
  }

  const errorList = Object.entries(errors);

  return (
    <form name={formName} onSubmit={handleSubmit} className="form" noValidate>
      {/* Hidden from people, visible to naive bots. A non-empty value is
          accepted silently by the endpoint so the bot learns nothing. */}
      <p className="honeypot" aria-hidden="true">
        <label>
          Do not fill this in if you are human
          <input
            name="bot-field"
            tabIndex={-1}
            autoComplete="off"
            value={values["bot-field"] ?? ""}
            onChange={handleChange}
          />
        </label>
      </p>

      {errorList.length > 0 && (
        <div
          className="form__status form__status--error"
          role="alert"
          tabIndex={-1}
          ref={errorSummaryRef}
        >
          <Icon name="alert" />
          <div>
            <strong>Please check the following:</strong>
            <ul style={{ marginTop: "8px", listStyle: "disc", paddingLeft: "20px" }}>
              {errorList.map(([name, message]) => (
                <li key={name}>{message}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="form__status form__status--error" role="alert">
          <Icon name="alert" />
          <div>
            {serverError ??
              "We could not send your enquiry just now. Please try again, or email us directly and we will pick it up."}
          </div>
        </div>
      )}

      <div className="form__grid">
        {fields.map((field) => {
          const id = fieldId(field.name);
          const invalid = Boolean(errors[field.name]);
          const describedBy = invalid ? `${id}-error` : undefined;
          const isWide = field.type === "textarea" || field.name === "product";

          const shared = {
            id,
            name: field.name,
            value: values[field.name] ?? "",
            onChange: handleChange,
            className: "field__control",
            required: field.required,
            "aria-invalid": invalid || undefined,
            "aria-describedby": describedBy,
            autoComplete: field.autoComplete,
          };

          return (
            <div
              className={`field ${isWide ? "field--full" : ""}`.trim()}
              key={field.name}
            >
              <label className="field__label" htmlFor={id}>
                {field.label}
                {field.required && (
                  <>
                    <span className="field__required" aria-hidden="true">
                      *
                    </span>
                    <span className="visually-hidden"> (required)</span>
                  </>
                )}
              </label>

              {field.type === "textarea" ? (
                <textarea {...shared} rows={field.rows || 5} placeholder={field.placeholder} />
              ) : field.type === "select" ? (
                <select {...shared}>
                  <option value="">Please select</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input {...shared} type={field.type} placeholder={field.placeholder} />
              )}

              {invalid && (
                <span className="field__error" id={`${id}-error`}>
                  {errors[field.name]}
                </span>
              )}
            </div>
          );
        })}

        {requiresConsent && (
          <div className="field field--consent">
            <input
              type="checkbox"
              id={fieldId("consent")}
              name="consent"
              checked={Boolean(values.consent)}
              onChange={handleChange}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? `${fieldId("consent")}-error` : undefined}
            />
            <div>
              <label htmlFor={fieldId("consent")}>
                {consentStatement.replace(
                  " Please read our Privacy Notice for further information.",
                  ""
                )}{" "}
                Please read our <Link to="/privacy-notice">Privacy Notice</Link> for
                further information.
              </label>
              {errors.consent && (
                <span
                  className="field__error"
                  id={`${fieldId("consent")}-error`}
                  style={{ display: "block", marginTop: "6px" }}
                >
                  {errors.consent}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}

export default EnquiryForm;
