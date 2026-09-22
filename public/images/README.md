# Website images

Drop files in using **exactly** these paths and filenames. Nothing in the code
needs changing — the site picks them up automatically.

Until a file exists, that slot shows a branded gradient with a leaf motif and
the item's name. **The site looks finished without these**, so they can arrive
one at a time.

After adding images, optionally run:

```bash
npm run images      # generates responsive WebP variants (needs: npm i -D sharp)
npm run deploy
```

---

## Photographs

Supply as **JPEG, sRGB, quality 85**. The variant script produces the WebP
versions the browser actually downloads, so you do not need to convert
anything yourself.

| Path | Pixels | Ratio | Used on |
|---|---|---|---|
| `hero-main.jpg` | **2400 × 1350** | 16:9 | Home hero, full-bleed behind the headline |
| `about-origin.jpg` | **1600 × 1200** | 4:3 | Home "Who we are", About page |
| `honey-shot.jpg` | **1600 × 1200** | 4:3 | Home Honey Shot spotlight — pack shot |
| `texture-band.jpg` | **2400 × 800** | 3:1 | Full-width divider band |
| `sourcing-farm.jpg` | **1600 × 1200** | 4:3 | About story, Responsible Sourcing header |
| `sourcing-inspection.jpg` | **1600 × 1200** | 4:3 | Responsible Sourcing |
| `business-trade.jpg` | **1600 × 1200** | 4:3 | For Business header |
| `contact-desk.jpg` | **1600 × 1200** | 4:3 | Contact header |

### Category tiles — shoot as one matched set

These sit in a row on the home page. Same light, same surface, same distance,
or they will look mismatched.

| Path | Pixels | Subject |
|---|---|---|
| `categories/spices.jpg` | **900 × 900** | Ginger and cardamom |
| `categories/honey.jpg` | **900 × 900** | Honey |
| `categories/millets.jpg` | **900 × 900** | Millets, loose grain |
| `categories/rice.jpg` | **900 × 900** | Rice, loose grain |
| `categories/produce.jpg` | **900 × 900** | Mixed vegetables and fruit |

### Founder portraits

| Path | Pixels | Ratio |
|---|---|---|
| `founders/albert-jose.jpg` | **1000 × 1250** | 4:5 portrait |
| `founders/abhinav-r-kurup.jpg` | **1000 × 1250** | 4:5 portrait |

Head and shoulders, eyes roughly one third from the top, plain or softly
blurred background. Without a photo the site shows an initials avatar on a
green-gold gradient, which looks deliberate rather than broken.

---

## Brand

| Path | Spec | Notes |
|---|---|---|
| `brand/logo-mark.svg` | Vector | A placeholder mark ships with the site — replace when the real one exists |
| `brand/og-default.jpg` | **1200 × 630** JPEG | Link previews on LinkedIn, WhatsApp, email |

`og-default.jpg` is usually a re-crop of the hero. Keep the centre clear, since
some platforms overlay text.

---

## The rule that matters

From Navora's content guidelines:

> Do not use generic stock images in a way that implies they show Navora's real
> farmers, facilities, offices or products.

Any photograph that is not genuinely Navora's is captioned "Illustrative image"
on the site. That is controlled by `illustrative: true` in the matching file
under `src/content/`. **When you replace a stock shot with a real Navora
photograph, set that to `false`** so the caption disappears.

Three images most need to be genuine, because they imply Navora's own network:
`sourcing-farm.jpg`, `sourcing-inspection.jpg` and `about-origin.jpg`.

Product photography is uploaded through the CMS, not into this folder.

---

Commissioning a photographer? Give them
**[../../docs/PHOTOGRAPHY-BRIEF.md](../../docs/PHOTOGRAPHY-BRIEF.md)** — it has
art direction, composition notes and the permissions Navora needs.
