import { ADRCategoryPage } from '@/app/[lang]/components/ADRCategoryPage';
import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n-config';
import { ReleasingLessonsList } from './releasing-lessons-list';

export default async function Page({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;

  const globalDict = await getDictionary(lang);

  // Load colocated dictionary
  let decisionDict: Record<string, string> = {};
  try {
    const module = await import(`./decisions-dictionaries/${lang}.json`);
    decisionDict = module.default || module;
  } catch (err) {
    console.warn('Could not load colocated decision dictionary');
  }

  // Merge both into ONE dict (this eliminates all the double-passing)
  const dict = { ...globalDict, ...decisionDict };

  return (
    <ADRCategoryPage
      title={globalDict['subcategory.releasing'] ?? 'Releasing'}
      publishedDate={globalDict['3d-printer-adr.published'] ?? 'Published April 2026'}
      description={<></>}
      adrsList={ReleasingLessonsList}
      dict={dict}                    // ← single dict now
    />
  );
}