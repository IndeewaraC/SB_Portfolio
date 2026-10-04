import HeroSection           from '@/components/sections/HeroSection';
import StatsSection          from '@/components/sections/StatsSection';
import AboutSection          from '@/components/sections/AboutSection';
import EducationSection      from '@/components/sections/EducationSection';
import SkillsSection         from '@/components/sections/SkillsSection';
import PublicationsSection   from '@/components/sections/PublicationsSection';
import ProjectsSection       from '@/components/sections/ProjectsSection';
import AwardsSection         from '@/components/sections/AwardsSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import ExperienceSection     from '@/components/sections/ExperienceSection';
import PlaceholderSection    from '@/components/sections/PlaceholderSection';

export const SECTION_REGISTRY = {
  hero:           HeroSection,
  stats:          StatsSection,
  about:          AboutSection,
  education:      EducationSection,
  skills:         SkillsSection,   
  publications:   PublicationsSection,
  projects:       ProjectsSection,
  awards:         AwardsSection,
  certifications: CertificationsSection,
  experience:     ExperienceSection,
  leadership:     (props) => <PlaceholderSection id="leadership" title="Leadership" eyebrow={`${props.sectionNumber || '09'} — Leadership`} {...props} />,
  affiliations:   (props) => <PlaceholderSection id="affiliations" title="Affiliations" eyebrow={`${props.sectionNumber || '10'} — Affiliations`} {...props} />,
};

export const NAV_EXCLUDED_KEYS = new Set(['hero', 'stats']);
