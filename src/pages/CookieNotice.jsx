import { Link } from "react-router-dom";
import Seo from "../components/common/Seo";
import Button from "../components/common/Button";
import LegalLayout from "../components/common/LegalLayout";
import { pageSeo } from "../content/seo";
import { categories, noOptionalCookiesInUse } from "../config/cookies";
import { openPreferences } from "../lib/consent";

const sections = [
  { id: "what-are-cookies", title: "What cookies are" },
  { id: "what-we-use", title: "What this website uses" },
  { id: "categories", title: "Categories in detail" },
  { id: "managing", title: "Managing your preferences" },
  { id: "browser", title: "Browser controls" },
  { id: "changes", title: "Changes to this notice" },
];

function CookieNotice() {
  return (
    <>
      <Seo {...pageSeo.cookieNotice} />

      <LegalLayout
        title="Cookie Notice"
        intro="This notice explains the cookies and similar technologies used on this website, and how you can control them."
        sections={sections}
      >
        <section id="what-are-cookies">
          <h2>What cookies are</h2>
          <p>
            Cookies are small text files placed on your device by a website.
            Similar technologies, such as local storage, work in comparable ways.
            They are commonly used to make a website function, to remember your
            preferences, and to gather information about how a site is used.
          </p>
          <p>
            We only place non-essential cookies or similar technologies where you
            have given your consent. Strictly necessary items are used without
            consent because the website cannot work properly without them.
          </p>
        </section>

        <section id="what-we-use">
          <h2>What this website uses</h2>
          {noOptionalCookiesInUse ? (
            <>
              <p>
                <strong>
                  This website does not currently use any analytics or marketing
                  cookies.
                </strong>{" "}
                We store a record of your cookie choice, and our hosting
                provider may set a security cookie to protect the site from
                automated abuse. Both are strictly necessary.
              </p>
              <p>
                If we introduce analytics in future, it will be added to the
                table below, it will be switched off by default, and it will load
                only if you turn it on.
              </p>
            </>
          ) : (
            <p>
              The table below lists every cookie and similar technology used on
              this website, grouped by category.
            </p>
          )}
          <p>
            Our website is hosted on Cloudflare, which also provides its
            security protection and stores enquiries submitted through our
            forms. Product images are delivered from the Sanity content
            platform. Fonts are served from this website rather than a third
            party, so no font provider receives your IP address. See our{" "}
            <Link to="/privacy-notice">Privacy Notice</Link> for how we handle
            personal information.
          </p>
        </section>

        <section id="categories">
          <h2>Categories in detail</h2>

          {categories.map((category) => (
            <div key={category.id}>
              <h3>
                {category.name}
                {category.required ? " (always on)" : ""}
              </h3>
              <p>{category.description}</p>

              {category.items.length === 0 ? (
                <p>
                  <strong>None in use at present.</strong>
                </p>
              ) : (
                <div className="table-wrap">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Provider</th>
                        <th scope="col">Purpose</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.items.map((item) => (
                        <tr key={item.name}>
                          <td>{item.name}</td>
                          <td>{item.provider}</td>
                          <td>{item.purpose}</td>
                          <td>{item.duration}</td>
                          <td>{item.type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </section>

        <section id="managing">
          <h2>Managing your preferences</h2>
          <p>
            You can change your choice at any time. Your preferences are stored
            for up to 12 months, after which we will ask you again.
          </p>
          <div className="btn-row">
            <Button variant="primary" onClick={openPreferences}>
              Manage cookie preferences
            </Button>
          </div>
        </section>

        <section id="browser">
          <h2>Browser controls</h2>
          <p>
            Most browsers let you block or delete cookies and clear site data
            through their settings or privacy menu. Doing so will also remove the
            record of your choice on this website, so you will be asked again on
            your next visit. Blocking all cookies may affect how some websites
            work.
          </p>
        </section>

        <section id="changes">
          <h2>Changes to this notice</h2>
          <p>
            We will update this notice if the technologies used on this website
            change. Where we add a new category, we will ask for your consent
            again rather than relying on a choice you made previously.
          </p>
          <p>
            If you have any questions about this notice, please{" "}
            <Link to="/contact">contact us</Link>.
          </p>
        </section>
      </LegalLayout>
    </>
  );
}

export default CookieNotice;
