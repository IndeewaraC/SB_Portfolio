import { Lora, Inter, IBM_Plex_Mono } from 'next/font/google';
import { getPageConfig, getProfile } from '@/lib/notion';
import { NAV_EXCLUDED_KEYS }         from '@/lib/sectionRegistry.jsx';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';
import './globals.css';

// ── Lora — elegant serif for headings and name ───────────────────────────────
const lora = Lora({
  weight:   ['400', '600'],
  style:    ['normal', 'italic'],
  subsets:  ['latin'],
  variable: '--font-lora',
  display:  'swap',
});

// ── Inter — clean humanist sans for body text ────────────────────────────────
const inter = Inter({
  weight:   ['300', '400', '500'],
  subsets:  ['latin'],
  variable: '--font-inter',
  display:  'swap',
});

// ── IBM Plex Mono — for code/labels where needed ─────────────────────────────
const ibmPlexMono = IBM_Plex_Mono({
  weight:   ['400', '500'],
  subsets:  ['latin'],
  variable: '--font-ibm-mono',
  display:  'swap',
});

export const metadata = {
  title:       'Sulalitha Bowala — Statistician & Data Scientist',
  description: 'PhD in Statistics (University of Manitoba). Specializing in volatility ' +
               'forecasting, neural network time series models, financial risk analysis, ' +
               'and electricity demand prediction.',
  keywords: [
    'statistics', 'data science', 'machine learning', 'time series forecasting',
    'financial risk', 'volatility modeling', 'Winnipeg', 'University of Manitoba',
  ],
  openGraph: {
    title:       'Sulalitha Bowala — Statistician & Data Scientist',
    description: 'PhD in Statistics · 20+ publications · Winnipeg, Canada',
    type:        'website',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [pageConfig, profile] = await Promise.all([getPageConfig(), getProfile()]);

  const navLinks = pageConfig
    .filter((conf) => !NAV_EXCLUDED_KEYS.has(conf.sectionKey) && conf.enabled)
    .map((conf) => ({
      href: `#${conf.sectionKey}`,
      label: conf.navLabel || conf.sectionKey.toUpperCase(),
    }));

  // "Updated Apr 2025" shown in the nav
  const lastUpdated = profile.lastEdited
    ? new Date(profile.lastEdited).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    : null;

  return (
    <html
      lang="en"
      className={`scroll-smooth ${lora.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body className="bg-white text-ink font-body antialiased">
        <Navbar navLinks={navLinks} lastUpdated={lastUpdated} cvUrl={profile.cvUrl} />
        <main>{children}</main>
        <Footer profile={profile} />
        <ScrollToTop />
      </body>
    </html>
  );
}
