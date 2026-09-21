-- Enquiries submitted through the website.
--
-- `payload` holds the full submission as JSON so the table never loses a field
-- when the forms change; the named columns exist so enquiries can be read,
-- searched and exported without parsing JSON.
--
-- No IP address is stored. `submitter_hash` is a salted SHA-256 digest used
-- only to throttle repeat submissions, and `ip_country` is the two-letter
-- country Cloudflare reports, which is not personal data on its own.

CREATE TABLE IF NOT EXISTS enquiries (
  id             TEXT PRIMARY KEY,
  form           TEXT NOT NULL,
  submitted_at   TEXT NOT NULL,

  name           TEXT,
  company        TEXT,
  email          TEXT,
  telephone      TEXT,
  country        TEXT,
  enquiry_type   TEXT,
  product        TEXT,
  message        TEXT,

  payload        TEXT NOT NULL,

  submitter_hash TEXT,
  ip_country     TEXT,
  notified       INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_enquiries_submitted_at ON enquiries (submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_form ON enquiries (form);
CREATE INDEX IF NOT EXISTS idx_enquiries_notified ON enquiries (notified);
CREATE INDEX IF NOT EXISTS idx_enquiries_throttle ON enquiries (submitter_hash, submitted_at);
