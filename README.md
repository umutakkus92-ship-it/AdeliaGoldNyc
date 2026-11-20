# Adelia Gold & Jewellery

Production storefront for **Adelia Gold & Jewellery**, operated by **Winners Investment LLC** (West New York, New Jersey).

Next.js (App Router) · TypeScript · Tailwind CSS · PostgreSQL (Neon) · Prisma · Vercel

> The original single-file prototype is kept in `legacy/prototype-index.html` as a design and workflow reference only.
> It stores accounts, orders and admin data in the browser and must never be deployed.

---

## Status: Phase 1 of 5

| Phase | Scope | State |
|---|---|---|
| 1 | Project setup, database schema, storefront pages matching the current design | **Done — awaiting review** |
| 2 | Customer accounts, cart, checkout with sandbox payments | Not started |
| 3 | Admin dashboard with server-side authentication and roles | Not started |
| 4 | Shipping, tax, finance reports, legal pages, SEO | Not started |
| 5 | Testing, security review, deployment to Vercel | Not started |

### What Phase 1 includes
- The prototype's design system ported exactly (`src/app/globals.css`): ivory / champagne gold / black, Cormorant Garamond + Inter, the same layout, hero slider, images, slogans and About text.
- Server-rendered pages with SEO-friendly URLs:
  `/`, `/shop`, `/women`, `/men`, `/engagement`, `/pre-owned`, `/watches`, `/collections`, `/{group}/{category}` (e.g. `/women/necklaces`, `/collections/14k-gold`), `/products/{slug}`, `/search?q=`, `/our-story`, `/contact`, `/investment` (disabled notice), `/policies/{slug}`.
- Metal / karat filters and sorting via URL query (`/women?metal=yellow&karat=14k&sort=price-asc`) — shareable and crawlable.
- Product pages with full specs. **Pre-owned items** carry a visible disclosure box, condition grade, hallmark, inspection status, condition-photo section and authentication documents.
- Pricing engine (`src/lib/pricing.ts`) with purity rules, labour, stones, margin and rounding, plus 10 unit tests.
- A complete database schema covering all five phases (`prisma/schema.prisma`).
- Newsletter sign-up stored in the database (server action, validated, honeypot).
- Product structured data (JSON-LD), per-page metadata, `sitemap.xml`, `robots.txt` (blocks indexing until launch).
- Security headers (HSTS, nosniff, frame-deny, referrer policy).
- Navigation includes My Account, Wishlist, Shopping Bag and Track My Order; those pages say they open in later phases.

### Deliberately not enabled
- **Checkout**: "Add to bag" is disabled, with a link to contact you. It is enabled in Phase 2 (store setting `checkout.enabled`).
- **Investment gold & silver**: the nav item shows "Soon"; no bullion is listed and the catalogue query excludes `BULLION`.
- **Buyback / buying gold from customers**: not built.
- **Sample data**: the seed loads the prototype's sample products and a **SAMPLE gold rate** (not a market price). While it's active the site shows a "Preview — samples, not for sale" bar, prices are labelled as samples, and JSON-LD omits offers.

---

## Run it locally (Windows, macOS or Linux)

**Prerequisites:** Node.js 20.9 or newer and a PostgreSQL database — either:
- **Neon** (easiest): create a free project at neon.tech and copy both connection strings, or
- **Local Postgres 16**: create a database called `adelia`.

```bash
git checkout platform
npm install
cp .env.example .env.local     # Windows PowerShell: copy .env.example .env.local
# edit .env.local → set DATABASE_URL and DIRECT_URL
# Prisma CLI reads .env, so also:  cp .env.local .env
npx prisma migrate dev --name init   # creates all tables
npm run db:seed                      # loads the sample catalogue
npm run dev                          # http://localhost:3000
npm test                             # pricing engine tests
```

---

## Project structure

```
prisma/
  schema.prisma        all tables and enums (phases 1–5)
  seed.ts, seed-data.ts  sample catalogue ported from the prototype
public/images/         the current hero / slider images, unchanged
src/app/               routes (App Router)
  layout.tsx           fonts, header, footer, preview bar
  page.tsx             homepage
  [group]/             /women, /men, /pre-owned …
  [group]/[category]/  /women/necklaces …
  products/[slug]/     product page + JSON-LD
  actions/             server actions (newsletter)
src/components/        Header, Footer, HeroSlider, ProductCard, views/*
src/lib/
  pricing.ts           pricing engine (pure, unit-tested)
  catalog.ts           server-only database queries
  mappers.ts           DB row → public product (never exposes purchase price)
  filter.ts, listing.ts  category rules, filters, sorting
  site.ts              company info, navigation, placeholders
  art.ts               the prototype's SVG jewelry renders (placeholder imagery)
legacy/                original prototype — reference only, never deployed
```

## Database overview

| Area | Tables |
|---|---|
| People | `User` (role: CUSTOMER, SUPPORT, ORDER_MANAGER, PRODUCT_MANAGER, FINANCE, SUPER_ADMIN), `Session`, `PasswordResetToken`, `Address` |
| Catalogue | `Category` (rule-based: new arrivals, best sellers, karat, new vs pre-owned), `Product`, `ProductCategory`, `ProductMedia` (gallery / condition / document), `InventoryMovement` |
| Pricing | `GoldRate` (source MANUAL / API / SAMPLE, verified flag, history), `PurityRule` (factor, labour per gram, margin per karat) |
| Shopping | `Cart`, `CartItem`, `WishlistItem` |
| Orders | `Order` (price snapshot, payment and fulfillment status), `OrderItem`, `Payment` (provider reference only), `PaymentEvent` (webhook idempotency and signature result), `Refund`, `Shipment` |
| Marketing / ops | `Discount`, `NewsletterSubscriber`, `TaxRate`, `Policy` (draft → attorney review → published), `StoreSetting`, `AuditLog` |

Money is stored in integer cents. Card numbers and CVV are never stored, only provider references and card brand / last four digits.

## Pricing formula

```
price = (weight g × 24K $/g × purity factor  +  labour  +  per-gram labour  +  stones) × (1 + margin %)
        rounded to the nearest $5 (configurable)
```
Margin priority: product override → purity rule → store default (35%). Watches and anything set to MANUAL use a fixed price. With no rate, an AUTO product shows "Price on request". SAMPLE or unverified rates are flagged as provisional, and Phase 2 checkout will refuse them.

## Environment variables

See `.env.example`. Phase 1 needs only `DATABASE_URL`, `DIRECT_URL` and `NEXT_PUBLIC_SITE_URL`. Never commit `.env*` files and never prefix a secret with `NEXT_PUBLIC_`.

## Placeholders to replace before launch
`src/lib/site.ts` → registered street address, phone, email, business hours. They render highlighted on the Contact page until replaced.
