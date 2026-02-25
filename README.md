# UAP Disclosure Tracker

**The disclosure tracker the UAP community has been waiting for.**

A Progressive Web App (PWA) that tracks congressional hearings, declassified documents, FOIA releases, executive orders, whistleblower developments, and legislation related to UAP/UFO disclosure.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (self-hosted on Digital Ocean)
- **ORM:** Prisma
- **Auth:** NextAuth.js
- **AI Summaries:** Claude API (Anthropic)
- **Push Notifications:** Firebase Cloud Messaging
- **Deployment:** Digital Ocean (Git-based deploy)
- **PWA:** next-pwa

## Project Structure

```
uap-disclosure-tracker/
├── prisma/
│   └── schema.prisma          # Database schema
├── public/
│   ├── manifest.json          # PWA manifest
│   └── icons/                 # App icons
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Dashboard (home)
│   │   ├── hearings/
│   │   │   └── page.tsx       # Hearing tracker
│   │   ├── documents/
│   │   │   └── page.tsx       # Document library
│   │   ├── legislation/
│   │   │   └── page.tsx       # Legislation pipeline
│   │   ├── timeline/
│   │   │   └── page.tsx       # Disclosure timeline
│   │   ├── whistleblowers/
│   │   │   └── page.tsx       # Whistleblower profiles
│   │   └── api/
│   │       ├── hearings/
│   │       │   └── route.ts   # Hearings API
│   │       ├── documents/
│   │       │   └── route.ts   # Documents API
│   │       ├── legislation/
│   │       │   └── route.ts   # Legislation API
│   │       ├── scraper/
│   │       │   └── route.ts   # Web scraper triggers
│   │       └── ai/
│   │           └── summarize/
│   │               └── route.ts # Claude API summarization
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Footer.tsx
│   │   ├── dashboard/
│   │   │   ├── DisclosureDashboard.tsx
│   │   │   ├── BreakingAlert.tsx
│   │   │   └── StatsCards.tsx
│   │   ├── hearings/
│   │   │   ├── HearingCard.tsx
│   │   │   └── HearingTimeline.tsx
│   │   ├── documents/
│   │   │   ├── DocumentCard.tsx
│   │   │   └── DocumentViewer.tsx
│   │   └── common/
│   │       ├── SearchBar.tsx
│   │       ├── FilterPanel.tsx
│   │       └── StatusBadge.tsx
│   ├── lib/
│   │   ├── db.ts              # Prisma client
│   │   ├── claude.ts          # Claude API helper
│   │   └── scraper.ts         # Web scraping utilities
│   └── types/
│       └── index.ts           # TypeScript types
├── scripts/
│   ├── scrape-nara.ts         # NARA document scraper
│   ├── scrape-congress.ts     # Congress.gov scraper
│   ├── scrape-aaro.ts         # AARO report scraper
│   └── seed.ts                # Database seed with historical data
├── .env.example               # Environment variables template
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Git

### 1. Clone & Install
```bash
git clone git@github.com:YOUR_USERNAME/uap-disclosure-tracker.git
cd uap-disclosure-tracker
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
# Edit .env with your values
```

### 3. Database Setup
```bash
npx prisma migrate dev --name init
npx prisma generate
npm run seed  # Load historical disclosure data
```

### 4. Run Development
```bash
npm run dev
# Open http://localhost:3000
```

### 5. Deploy to Digital Ocean
```bash
git add .
git commit -m "initial scaffold"
git push origin main
# Digital Ocean App Platform auto-deploys from Git
```

## Data Sources

| Source | URL | What We Scrape |
|--------|-----|---------------|
| NARA UAP Records | catalog.archives.gov | Declassified documents |
| Congress.gov | congress.gov | UAP-related bills & amendments |
| House Oversight | oversight.house.gov | Hearing schedules & transcripts |
| AARO | aaro.mil | Annual reports, press releases |
| The Black Vault | theblackvault.com | FOIA document archive |
| C-SPAN | c-span.org | Hearing video links |

## License

Proprietary — All rights reserved.
