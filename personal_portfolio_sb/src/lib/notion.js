// ─────────────────────────────────────────────────────────────────────────────
//  NOTION DATABASE SETUP
//  Create one Notion database per section below, share each with your
//  integration, then paste the database IDs into .env.local.
//
//  Required env vars:
//    NOTION_API_KEY
//    NOTION_PAGE_CONFIG_DB_ID   (optional — falls back to DEFAULT_SECTIONS)
//    NOTION_PROFILE_DB_ID
//    NOTION_EDUCATION_DB_ID
//    NOTION_PUBLICATIONS_DB_ID
//    NOTION_PROJECTS_DB_ID
//    NOTION_AWARDS_DB_ID
//    NOTION_CERTIFICATIONS_DB_ID
//    NOTION_SKILLS_DB_ID
//    NOTION_STATS_DB_ID
//
//  DATABASE SCHEMAS (property name → Notion type):
//  ┌─────────────────────────┬──────────────────────────────────────────────────┐
//  │ PAGE CONFIG DB          │                                                  │
//  │  sectionKey  Title      │ e.g. "hero", "about", "education"                │
//  │  navLabel    Text       │ e.g. "About", "Education"                        │
//  │  enabled     Checkbox   │ toggle section on/off                            │
//  │  sortOrder   Number     │ controls display order                           │
//  ├─────────────────────────┼──────────────────────────────────────────────────┤
//  │ PROFILE DB              │                                                  │
//  │  name              Title│                                                  │
//  │  tagline           Text │                                                  │
//  │  about             Text │                                                  │
//  │  location          Text │                                                  │
//  │  email             Email│                                                  │
//  │  linkedIn          URL  │                                                  │
//  │  cvUrl             URL  │                                                  │
//  │  yearsExperience   Number                                                  │
//  │  totalPublications Number                                                  │
//  │  phdGpa            Number                                                  │
//  │  statusBadge       Text │                                                  │
//  │  profileImage      Files│ upload or paste external URL                     │
//  ├─────────────────────────┼──────────────────────────────────────────────────┤
//  │ EDUCATION DB            │                                                  │
//  │  degree     Title       │                                                  │
//  │  school     Text        │                                                  │
//  │  field      Text        │                                                  │
//  │  startYear  Number      │                                                  │
//  │  endYear    Number      │                                                  │
//  │  gpa        Number      │                                                  │
//  │  gpaScale   Text        │ e.g. "4.00"                                      │
//  │  sortOrder  Number      │                                                  │
//  ├─────────────────────────┼──────────────────────────────────────────────────┤
//  │ PUBLICATIONS DB         │                                                  │
//  │  title      Title       │                                                  │
//  │  index      Number      │                                                  │
//  │  venue      Text        │                                                  │
//  │  abstract   Text        │                                                  │
//  │  year       Number      │                                                  │
//  │  url        URL         │                                                  │
//  ├─────────────────────────┼──────────────────────────────────────────────────┤
//  │ PROJECTS DB             │                                                  │
//  │  title       Title      │                                                  │
//  │  period      Text       │ e.g. "Jan 2023 – Mar 2023"                       │
//  │  description Text       │                                                  │
//  │  tags        Multi-select                                                  │
//  │  url         URL        │                                                  │
//  │  sortOrder   Number     │                                                  │
//  ├─────────────────────────┼──────────────────────────────────────────────────┤
//  │ AWARDS DB               │                                                  │
//  │  name    Title          │                                                  │
//  │  icon    Text           │ emoji e.g. "🏆"                                  │
//  │  issuer  Text           │                                                  │
//  │  date    Date           │                                                  │
//  ├─────────────────────────┼──────────────────────────────────────────────────┤
//  │ CERTIFICATIONS DB       │                                                  │
//  │  name    Title          │                                                  │
//  │  issuer  Text           │                                                  │
//  │  date    Date           │                                                  │
//  ├─────────────────────────┼──────────────────────────────────────────────────┤
//  │ SKILLS DB               │                                                  │
//  │  category   Title       │                                                  │
//  │  tags       Multi-select│                                                  │
//  │  sortOrder  Number      │                                                  │
//  └─────────────────────────┴──────────────────────────────────────────────────┘
// ─────────────────────────────────────────────────────────────────────────────

import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// ── Property helpers ──────────────────────────────────────────────────────────

const p = {
  title:       (prop) => prop?.title?.map((t) => t.plain_text).join('') ?? '',
  text:        (prop) => prop?.rich_text?.map((t) => t.plain_text).join('') ?? '',
  number:      (prop) => prop?.number ?? null,
  dateYear:    (prop) => prop?.date?.start ? new Date(prop.date.start).getFullYear() : null,
  checkbox:    (prop) => prop?.checkbox ?? false,
  date:        (prop) => prop?.date?.start ?? '',
  url:         (prop) => prop?.url ?? null,
  email:       (prop) => prop?.email ?? '',
  select:      (prop) => prop?.select?.name ?? '',
  multiSelect: (prop) => prop?.multi_select?.map((s) => s.name) ?? [],
  files:       (prop) => {
    const file = prop?.files?.[0];
    if (!file) return '';
    return file.type === 'external' ? file.external.url : file.file.url;
  },
};

async function queryAll(databaseId, sorts = []) {
  const results = [];
  let cursor;

  do {
    const res = await notion.databases.query({
      database_id: databaseId,
      sorts,
      start_cursor: cursor,
      page_size: 100,
    });
    results.push(...res.results);
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);

  return results;
}

// ── Exported fetchers ─────────────────────────────────────────────────────────

export async function getPageConfig() {
  const dbId = process.env.NOTION_PAGE_CONFIG_DB_ID;
  if (!dbId) return DEFAULT_SECTIONS;

  const pages = await queryAll(dbId, [{ property: 'sortOrder', direction: 'ascending' }]);

  const sections = pages
    .map((page) => ({
      sectionKey: (p.text(page.properties.sectionKey) || '').replace(/^#/, '').trim(),
      navLabel:   p.text(page.properties.navLabel),
      enabled:    p.checkbox(page.properties.enabled),
    }))
    .filter((s) => s.enabled && s.sectionKey);

  return sections.length ? sections : DEFAULT_SECTIONS;
}

export async function getProfile() {
  console.log('[notion] NOTION_PROFILE_DB_ID:', process.env.NOTION_PROFILE_DB_ID);
  const pages = await queryAll(process.env.NOTION_PROFILE_DB_ID);
  console.log('[notion] profile pages count:', pages.length);
  if (pages[0]) console.log('[notion] prop keys:', Object.keys(pages[0].properties));
  const props = pages[0]?.properties ?? {};

  return {
    name:              p.title(props.Name)               || '',
    tagline:           p.text(props.tagline)            || '',
    about:             p.text(props.about)              || '',
    location:          p.text(props.location)           || '',
    email:             p.email(props.email)             || '',
    linkedInUrl:       p.url(props.linkedIn)            || '',
    scholarUrl:        p.url(props.GoogleScholorURL)    || '',
    researchGateUrl:   p.url(props.ResearchGateURL)     || '',
    cvUrl:             p.files(props.cvUrl) || p.files(props['cvUrl ']) || p.files(props.CV) || '#',
    yearsExperience:   p.number(props.yearsExperience)  ?? 8,
    totalPublications: p.number(props.totalPublications) ?? 20,
    phdGpa:            p.number(props.phdGpa)           ?? 4.30,
    civilStatus:       p.text(props.civilstatus)        || '',
    statusBadge:       p.text(props.statusBadge)        || '',
    lastEdited:        pages[0]?.last_edited_time       ?? null,
    profileImage: {
      url:    p.files(props.profileImage),
      title:  'Profile photo',
      width:  600,
      height: 600,
    },
  };
}

export async function getEducation() {
  const pages = await queryAll(
    process.env.NOTION_EDUCATION_DB_ID,
    [{ property: 'startYear', direction: 'descending' }], // Date type sorts correctly in Notion
  );

  return pages.map((page) => ({
    id:        page.id,
    degree:    p.title(page.properties.degree),
    school:    p.text(page.properties.school),
    field:     p.text(page.properties.field),
    startYear: p.dateYear(page.properties.startYear),
    endYear:   p.dateYear(page.properties.endYear),
    gpa:       p.number(page.properties.gpa),
    gpaScale:  p.text(page.properties.gpaScale) || '4.00',
  }));
}

export async function getPublications() {
  const pages = await queryAll(
    process.env.NOTION_PUBLICATIONS_DB_ID,
    [
      { property: 'year',  direction: 'descending' }, // Date type sorts correctly in Notion
      { property: 'index', direction: 'ascending'  },
    ],
  );

  return pages.map((page) => ({
    id:       page.id,
    index:    p.number(page.properties.index),
    venue:    p.text(page.properties.venue),
    title:    p.title(page.properties.title),
    abstract: p.text(page.properties.abstract),
    year:     p.dateYear(page.properties.year),
    url:      p.url(page.properties.url),
  }));
}

export async function getProjects() {
  const pages = await queryAll(
    process.env.NOTION_PROJECTS_DB_ID,
    [{ property: 'sortOrder', direction: 'descending' }],
  );

  return pages.map((page) => ({
    id:          page.id,
    period:      p.text(page.properties.period),
    title:       p.title(page.properties.title),
    description: p.text(page.properties.description),
    tags:        p.multiSelect(page.properties.tags),
    url:         p.url(page.properties.url),
  }));
}

export async function getAwards() {
  const pages = await queryAll(
    process.env.NOTION_AWARDS_DB_ID,
    [{ property: 'date', direction: 'descending' }],
  );

  return pages.map((page) => ({
    id:     page.id,
    icon:   p.text(page.properties.icon) || '🏆',
    name:   p.title(page.properties.name),
    issuer: p.text(page.properties.issuer),
    date:   p.date(page.properties.date),
  }));
}

export async function getCertifications() {
  const pages = await queryAll(
    process.env.NOTION_CERTIFICATIONS_DB_ID,
    [{ property: 'date', direction: 'descending' }],
  );

  return pages.map((page) => ({
    id:     page.id,
    name:   p.title(page.properties.name),
    issuer: p.text(page.properties.issuer),
    date:   p.date(page.properties.date),
  }));
}

export async function getSkills() {
  const pages = await queryAll(
    process.env.NOTION_SKILLS_DB_ID,
    [{ property: 'sortOrder', direction: 'ascending' }],
  );

  return pages.map((page) => ({
    id:       page.id,
    category: p.title(page.properties.Category) || p.title(page.properties.category),
    tags:     p.multiSelect(page.properties.tags),
  }));
}

export async function getStats() {
  const dbId = process.env.NOTION_STATS_DB_ID;
  if (!dbId) return [];

  try {
    const pages = await queryAll(dbId);
    const parsed = pages
      .map((page) => ({
        id:        page.id,
        label:     p.title(page.properties.Label) || p.title(page.properties.label),
        value:     p.text(page.properties.value) || p.text(page.properties.Value),
        enabled:   p.checkbox(page.properties.enabled),
        sortOrder: p.number(page.properties.sortorder) || p.number(page.properties.sortOrder) || p.number(page.properties.SortOrder) || 99,
      }))
      .filter((stat) => stat.enabled && stat.label)
      .sort((a, b) => a.sortOrder - b.sortOrder);
      
    return parsed;
  } catch (err) {
    console.error('[notion] Error fetching stats:', err.message);
    return [];
  }
}

export async function getExperience() {
  const pages = await queryAll(
    process.env.NOTION_EXPERIENCE_DB_ID,
  );

  return pages.map((page) => ({
    id:      page.id,
    role:    p.title(page.properties.role),
    company: p.text(page.properties.company),
    period:  p.text(page.properties.period),
    desc:    p.text(page.properties.Desc),
  }));
}

export async function getAllPageData() {
  const [
    pageConfig,
    profile,
    education,
    publications,
    projects,
    awards,
    certifications,
    skills,
    experience,
    stats,
  ] = await Promise.all([
    getPageConfig(),
    getProfile(),
    getEducation(),
    getPublications(),
    getProjects(),
    getAwards(),
    getCertifications(),
    getSkills(),
    getExperience(),
    getStats(),
  ]);

  return { pageConfig, profile, education, publications, projects, awards, certifications, skills, experience, stats };
}

// ── Fallback page config ──────────────────────────────────────────────────────

const DEFAULT_SECTIONS = [
  { sectionKey: 'hero',         navLabel: '',            enabled: true },
  { sectionKey: 'about',        navLabel: 'About',       enabled: true },
  { sectionKey: 'education',    navLabel: 'Education',   enabled: true },
  { sectionKey: 'publications', navLabel: 'Research',    enabled: true },
  { sectionKey: 'projects',     navLabel: 'Projects',    enabled: true },
  { sectionKey: 'awards',       navLabel: 'Awards',      enabled: true },
  { sectionKey: 'contact',      navLabel: 'Contact',     enabled: true },
];
