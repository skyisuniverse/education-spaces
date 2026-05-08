'use client';

import { createContext, useContext, useReducer, useMemo, useState, useEffect, type ReactNode } from 'react';
import { usePathname, useRouter, useParams } from 'next/navigation';
import {
  adrsListMap,
  type AdrSlug,
  getCategoryBySlug,
  type Category,
  getLocalizedCategories,
} from '@/app/[lang]/config/adrs-lists';
import { itemData as productItems } from '@/app/[lang]/products/products-list';
import { itemData as companyItems } from '@/app/[lang]/companies/companies-list';
import { itemData as serviceItems } from '@/app/[lang]/services/services-list';
import { itemData as appItems } from '@/app/[lang]/apps/applications-list';
import { ADRItem } from '@/app/[lang]/types/adr';
import React from 'react';

type Dictionary = Record<string, string>;

export type ListItem = { title: string; slug: string };

type NavigationState = {
  selectedCategoryId: string;
  expandedAdrSlug: string | null;
};

type NavigationAction =
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_EXPANDED'; payload: string | null }
  | { type: 'SYNC_FROM_URL'; payload: { categoryId: string; slug: string | null } };

const navigationReducer = (
  state: NavigationState,
  action: NavigationAction
): NavigationState => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return { ...state, selectedCategoryId: action.payload };
    case 'SET_EXPANDED':
      return { ...state, expandedAdrSlug: action.payload };
    case 'SYNC_FROM_URL':
      return {
        selectedCategoryId: action.payload.categoryId,
        expandedAdrSlug: action.payload.slug || null,
      };
    default:
      return state;
  }
};

type NavigationContextValue = {
  selectedCategoryId: string;
  expandedAdrSlug: string | null;
  currentSlug: string;
  currentCategory: Category | undefined;
  activeCategory: Category | undefined;
  currentAdrsList: ADRItem[];
  currentAdr: ADRItem | undefined;
  currentProduct: ListItem | undefined;
  currentCompany: ListItem | undefined;
  currentService: ListItem | undefined;
  currentApp: ListItem | undefined;
  currentAdrCategoryName: string;
  localizedCategories: Category[];
  selectCategory: (id: string) => void;
  navigateToAdr: (slug: string, shouldExpand?: boolean) => void;
  toggleExpanded: (slug: string) => void;
  setExpanded: (slug: string | null) => void;
  localize: (href: string) => string;
  decisionDict: Dictionary;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({
  children,
  dict,          // ← this is the global/root dictionary
}: {
  children: ReactNode;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { lang } = useParams() as { lang: string };

  const [decisionDict, setDecisionDict] = useState<Dictionary>({});

  const getLocalizedHref = (href: string): string => {
    if (href === '/') return `/${lang}`;
    if (!href.startsWith('/')) href = '/' + href;
    if (href.startsWith(`/${lang}/`)) return href;
    return `/${lang}${href}`;
  };

  const slug = useMemo(() => {
    const match = pathname.match(/\/adrs\/([^/]+)/);
    const potentialSlug = match?.[1];
    if (potentialSlug && potentialSlug in adrsListMap) {
      return potentialSlug as AdrSlug;
    }
    return undefined;
  }, [pathname]);

  const localizedCategories = useMemo(() => getLocalizedCategories(dict), [dict]);

  const [state, dispatch] = useReducer(navigationReducer, {
    selectedCategoryId: localizedCategories[0]?.id || 'software-engineering',
    expandedAdrSlug: null,
  });

  const currentCategory = useMemo(() => (slug ? getCategoryBySlug(slug) : undefined), [slug]);

  const activeCategory = useMemo(() => {
    return currentCategory ?? localizedCategories.find((c) => c.id === state.selectedCategoryId);
  }, [currentCategory, localizedCategories, state.selectedCategoryId]);

  // Load colocated decision translations AND merge with global dict (status keys)
  useEffect(() => {
    const categorySlug = slug || state.expandedAdrSlug || activeCategory?.mainPageSlug;

    if (!categorySlug) {
      setDecisionDict(dict); // fallback to global dict only
      return;
    }

    const loadDecisions = async () => {
      try {
        const module = await import(
          `@/app/[lang]/adrs/${categorySlug}/decisions-dictionaries/${lang}.json`
        );
        const colocated = module.default || module;
        // Merge global + colocated (status.* keys + decision titles)
        setDecisionDict({ ...dict, ...colocated });
      } catch (e) {
        console.warn(`No decision translations found for ${categorySlug}/${lang}`);
        setDecisionDict(dict); // fallback to global dict
      }
    };

    loadDecisions();
  }, [slug, state.expandedAdrSlug, activeCategory, lang, dict]);

  // Translated decision titles
  const currentAdrsList: ADRItem[] = useMemo(() => {
    if (!slug) return [];
    const rawList = adrsListMap[slug];
    if (!Array.isArray(rawList)) return [];
    return rawList.map((item: ADRItem) => ({
      ...item,
      title: decisionDict[item.translationKey] ?? item.translationKey,
    }));
  }, [slug, decisionDict]);

  const currentAdr: ADRItem | undefined = useMemo(() => {
    return currentAdrsList.find((adr) => getLocalizedHref(adr.link) === pathname);
  }, [currentAdrsList, pathname, lang]);

  const currentAdrCategoryName = useMemo(() => {
    if (!slug) return '';
    const cat = localizedCategories.find((c) => c.adrs.some((item) => item.slug === slug));
    const item = cat?.adrs.find((item) => item.slug === slug);
    return item?.label ?? slug;
  }, [slug, localizedCategories]);

  const currentProduct = useMemo(() => {
    if (!pathname.includes('/products/')) return undefined;
    const itemSlug = pathname.split('/products/')[1];
    return productItems.find((item) => item.slug === itemSlug);
  }, [pathname]);

  const currentCompany = useMemo(() => {
    if (!pathname.includes('/companies/')) return undefined;
    const itemSlug = pathname.split('/companies/')[1];
    return companyItems.find((item) => item.slug === itemSlug);
  }, [pathname]);

  const currentService = useMemo(() => {
    if (!pathname.includes('/services/')) return undefined;
    const itemSlug = pathname.split('/services/')[1];
    return serviceItems.find((item) => item.slug === itemSlug);
  }, [pathname]);

  const currentApp = useMemo(() => {
    if (!pathname.includes('/apps/')) return undefined;
    const itemSlug = pathname.split('/apps/')[1];
    return appItems.find((item) => item.slug === itemSlug);
  }, [pathname]);

  React.useEffect(() => {
    if (currentCategory) {
      dispatch({
        type: 'SYNC_FROM_URL',
        payload: { categoryId: currentCategory.id, slug: slug || null },
      });
    } else if (pathname === `/${lang}` || pathname === '/') {
      dispatch({
        type: 'SYNC_FROM_URL',
        payload: { categoryId: localizedCategories[0]?.id || 'software-engineering', slug: null },
      });
    }
  }, [currentCategory, slug, pathname, localizedCategories, lang]);

  const selectCategory = (id: string) => {
    dispatch({ type: 'SET_CATEGORY', payload: id });
    const cat = localizedCategories.find((c) => c.id === id);
    if (cat?.mainPageSlug) {
      dispatch({ type: 'SET_EXPANDED', payload: cat.mainPageSlug });
      router.push(`/${lang}/adrs/${cat.mainPageSlug}`);
    } else {
      dispatch({ type: 'SET_EXPANDED', payload: null });
    }
  };

  const navigateToAdr = (slug: string, shouldExpand = false) => {
    router.push(`/${lang}/adrs/${slug}`);
    if (shouldExpand) {
      dispatch({ type: 'SET_EXPANDED', payload: slug });
    }
  };

  const toggleExpanded = (slug: string) => {
    dispatch({
      type: 'SET_EXPANDED',
      payload: state.expandedAdrSlug === slug ? null : slug,
    });
  };

  const setExpanded = (slug: string | null) => {
    dispatch({ type: 'SET_EXPANDED', payload: slug });
  };

  const value: NavigationContextValue = {
    selectedCategoryId: state.selectedCategoryId,
    expandedAdrSlug: state.expandedAdrSlug,
    currentSlug: slug || '',
    currentCategory,
    activeCategory,
    currentAdrsList,
    currentAdr,
    currentProduct,
    currentCompany,
    currentService,
    currentApp,
    currentAdrCategoryName,
    localizedCategories,
    selectCategory,
    navigateToAdr,
    toggleExpanded,
    setExpanded,
    localize: getLocalizedHref,
    decisionDict,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};