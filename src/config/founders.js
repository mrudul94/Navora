/**
 * The founding team.
 *
 * Same rule as src/config/site.js: any field still starting with `REPLACE_` is
 * hidden from the UI. A founder with no photo gets an initials avatar rather
 * than a broken image, so the section looks finished either way.
 *
 * DO NOT invent roles, locations, biographies or credentials. Those belong to
 * real people and must come from them.
 */

export const foundersIntro =
  "A UK–India partnership built on trust, product knowledge and long-term relationships.";

export const founders = [
  {
    name: "Albert Jose",
    role: "REPLACE_ROLE", // e.g. Co-Founder & Director
    location: "REPLACE_LOCATION", // e.g. United Kingdom
    bio: "REPLACE_BIO", // 2–3 sentences
    photo: "/images/founders/albert-jose.jpg",
    linkedin: "REPLACE_LINKEDIN",
    email: "REPLACE_EMAIL",
  },
  {
    name: "Abhinav R Kurup",
    role: "REPLACE_ROLE",
    location: "REPLACE_LOCATION", // e.g. Kerala, India
    bio: "REPLACE_BIO",
    photo: "/images/founders/abhinav-r-kurup.jpg",
    linkedin: "REPLACE_LINKEDIN",
    email: "REPLACE_EMAIL",
  },
];

/** "Albert Jose" -> "AJ". Used for the fallback avatar. */
export function initialsOf(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .filter((char) => /[A-Za-z]/.test(char))
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
