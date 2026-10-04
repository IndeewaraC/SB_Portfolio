# Personal Portfolio & Academic Website 🎓

A dynamic, elegant, and fully responsive personal portfolio and academic website built for **Sulalitha Bowala**. 

This website features a **real-time integration with Notion as a Headless CMS**. This means that all content (Profile, Education, Projects, Publications, Skills, and even the Navigation Menu) can be updated instantaneously directly from a private Notion dashboard without ever needing to touch the code or redeploy the website.

### 🌐 [View Live Demonstration](https://personal-portfolio-sb.vercel.app/)

---

## ✨ Features

- **Notion Headless CMS:** Update your entire website from a Notion Dashboard. No coding required.
- **Dynamic Routing:** Add, remove, or reorder entire sections of the website instantly via the Notion Page Config database.
- **Glassmorphism Aesthetic:** Premium UI with subtle micro-animations, clean row structures, and dynamic scroll-to-top behaviors.
- **Zero-Cache Real-Time Fetching:** Connects to the Notion API on every request to ensure your public portfolio is always 100% up to date with your Notion workspace.
- **Fully Responsive:** Beautifully adapts to mobile phones, tablets, and massive desktop screens.

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com/)
- **CMS:** [Notion API](https://developers.notion.com/) (`@notionhq/client`)
- **Deployment:** [Vercel](https://vercel.com/) (Native GitHub Integration)
- **Icons:** Custom SVG & Tailwind

---

## 🚀 Getting Started Locally

To run this project on your local machine:

### 1. Clone the repository
```bash
git clone https://github.com/IndeewaraC/SB_Portfolio.git
cd SB_Portfolio/personal_portfolio_sb
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the `personal_portfolio_sb` directory and add your Notion API credentials:
```env
NOTION_API_KEY=ntn_your_secret_key_here

NOTION_PAGE_CONFIG_DB_ID=your_db_id
NOTION_PROFILE_DB_ID=your_db_id
NOTION_EDUCATION_DB_ID=your_db_id
NOTION_PUBLICATIONS_DB_ID=your_db_id
NOTION_PROJECTS_DB_ID=your_db_id
NOTION_AWARDS_DB_ID=your_db_id
NOTION_CERTIFICATIONS_DB_ID=your_db_id
NOTION_SKILLS_DB_ID=your_db_id
NOTION_EXPERIENCE_DB_ID=your_db_id
NOTION_STATS_DB_ID=your_db_id
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 📁 Repository Structure

Note: The Next.js application is located inside the `personal_portfolio_sb` subdirectory.

```text
SB_Portfolio/
├── README.md
└── personal_portfolio_sb/
    ├── src/
    │   ├── app/                # Next.js App Router (page.tsx, layout.tsx)
    │   ├── components/         # React Components (Hero, About, Stats, etc.)
    │   └── lib/                # Utilities (notion.js API fetcher, sectionRegistry)
    ├── public/                 # Static assets
    ├── tailwind.config.js      # Tailwind theme & colors
    └── package.json            # Dependencies
```

## ☁️ Deployment

This project is configured for seamless deployment on **Vercel**. 
When importing to Vercel:
1. Set the **Root Directory** to `personal_portfolio_sb`
2. Add all `NOTION_` variables to the Vercel **Environment Variables** settings.
3. Deploy! Vercel will automatically redeploy whenever you push to the `preview` or `main` branches.
