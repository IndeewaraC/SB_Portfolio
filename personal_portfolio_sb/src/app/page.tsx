import { getAllPageData } from '@/lib/notion';
import { SECTION_REGISTRY } from '@/lib/sectionRegistry';

export const revalidate = 0;

export default async function HomePage() {
  const data = await getAllPageData();

  return (
    <>
      {/* Hero is always rendered at the top */}
      <SECTION_REGISTRY.hero profile={data.profile} />
      
      {/* Dynamic Sections driven by Notion Page Config */}
      {data.pageConfig
        .filter((conf) => conf.enabled && conf.sectionKey !== 'hero')
        .map((conf, index) => {
          const Component = SECTION_REGISTRY[conf.sectionKey];
          if (!Component) return null;
          const sectionNumber = String(index + 1).padStart(2, '0');
          return <Component key={conf.sectionKey} {...data} sectionNumber={sectionNumber} />;
        })}
    </>
  );
}
