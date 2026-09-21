# Website images

The site is built and fully laid out without these files. Until a file is
present, `Img.jsx` renders a tinted placeholder at the correct aspect ratio —
nothing breaks, and no broken-image icon is ever shown. **The site should not be
published until this folder is filled in.**

## The rule that matters

From the Navora Global Website Content Pack:

> Do not use generic stock images in a way that implies they show Navora's real
> farmers, facilities, offices or products.

Any photograph that is not a genuine Navora photo must be flagged as
illustrative. The content files already do this — each hero and section image
carries `illustrative: true`, which renders a small "Illustrative image"
caption. **When you replace one of these with a real Navora photograph, set
`illustrative: false`** in the matching file under `src/content/`.

For products, the flag lives in the CMS: each image has an **Illustrative
image** toggle. Real product and packaging photography should have it off.

## What to download

Save each file into this folder using the **exact filename**. Export as WebP
(quality ~80) except `og-default.jpg`, which must be JPEG for social previews.
Aim for 200–400 KB per image; nothing here needs to be larger.

| Filename | Subject | Aspect | Min width |
|---|---|---|---|
| `hero-sourcing.webp` | Indian agricultural produce, sacks or crates in a trade or market context | 4:3 | 1600 |
| `about-partnership.webp` | Two people inspecting or discussing produce together | 4:3 | 1400 |
| `sourcing-farm.webp` | Smallholder farm or field in India | 4:3 | 1400 |
| `sourcing-inspection.webp` | Produce being graded, sorted or inspected by hand | 4:3 | 1400 |
| `business-trade.webp` | Cartons, pallets or warehouse in an export context | 4:3 | 1400 |
| `contact-desk.webp` | Neutral, uncluttered business desk or meeting table | 4:3 | 1400 |
| `category-spices.webp` | Ginger and/or cardamom | 1:1 | 900 |
| `category-honey.webp` | Honey — jar, comb or pouring | 1:1 | 900 |
| `category-millets.webp` | Millets, loose grain | 1:1 | 900 |
| `category-rice.webp` | Rice grains, loose | 1:1 | 900 |
| `category-produce.webp` | Mixed vegetables and fruit | 1:1 | 900 |
| `og-default.jpg` | Social share card — the hero image works well | 1.91:1 | 1200 |

### Commissioning a photographer instead

If real photography is being commissioned rather than sourced from stock, give
the photographer **[PHOTOGRAPHY-BRIEF.md](PHOTOGRAPHY-BRIEF.md)** instead of
this file. It covers the same 12 images with art direction, composition notes,
crop guidance, delivery specs and the permissions Navora needs. Real photography
is preferred for every shot, and required for the three that imply Navora's
own supplier network.

### Where to find them

Both of these allow free commercial use without attribution, though crediting
the photographer is good practice:

- Unsplash — <https://unsplash.com/s/photos/indian-spices>
- Pexels — <https://www.pexels.com/search/indian%20agriculture/>

Useful search terms: *indian spices*, *cardamom*, *ginger root*, *honey jar*,
*millet grain*, *basmati rice*, *indian farmer*, *spice market india*,
*warehouse cartons*, *grain sorting*.

Check the licence on each photo before you use it, and keep a note of the source
in case you are ever asked.

### Prefer real photography

Every one of these is better replaced by a genuine Navora or supplier photograph
as soon as one is available — particularly `sourcing-farm.webp`,
`sourcing-inspection.webp` and `about-partnership.webp`, which a visitor is most
likely to read as depicting Navora's actual operation. Supplier images need
written permission before use.

## Still outstanding

The content pack's image list also calls for these, which are not part of the
table above:

- A Navora logo in vector or high-resolution transparent format. The site
  currently uses a type-set wordmark, which works well and needs no file.
- Navora Honey Shot photography: front, back, single unit, pack and lifestyle.
- A honey candy product or development image, once approved.
- Real ginger, cardamom, honey, millet and rice images from suppliers.
- Farm, producer, processing or packing images, with written permission and
  accurate captions.
- Founder or team photographs, only if a leadership section is wanted.

Product photography is uploaded through the CMS, not into this folder.
