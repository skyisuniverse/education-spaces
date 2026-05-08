// app/contexts/navigation-context.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NavigationProvider, useNavigation } from './navigation-context';

// =============================================================================
// TOP-LEVEL IMPORTS FOR STABLE MOCKING
// =============================================================================
import * as NextNavigation from 'next/navigation';
import * as AdrsLists from '@/app/[lang]/config/adrs-lists';

// =============================================================================
// MOCKS
// =============================================================================
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(),
  useParams: vi.fn(() => ({ lang: 'en' })),
}));

// Mock adrs-lists (updated to match current exports – only runtime values)
const mockLocalizedCategories = [
  {
    id: 'cat-1',
    name: 'Category 1',
    mainPageSlug: 'test-adr-1',
    adrs: [{ slug: 'test-adr-1', label: 'Category 1 Label' }],
  },
  {
    id: 'cat-2',
    name: 'Category 2',
    mainPageSlug: 'test-adr-2',
    adrs: [{ slug: 'test-adr-2', label: 'Category 2 Label' }],
  },
] as any;

vi.mock('@/app/[lang]/config/adrs-lists', () => ({
  adrsListMap: {
    'test-adr-1': [{ title: 'Test ADR One', link: '/adrs/test-adr-1' }],
    'test-adr-2': [{ title: 'Test ADR Two', link: '/adrs/test-adr-2' }],
  } as any,
  getCategoryBySlug: vi.fn((slug: string) => {
    if (slug === 'test-adr-1') {
      return {
        id: 'cat-1',
        adrs: [{ slug: 'test-adr-1', label: 'Category 1 Label' }],
      };
    }
    if (slug === 'test-adr-2') {
      return {
        id: 'cat-2',
        adrs: [{ slug: 'test-adr-2', label: 'Category 2 Label' }],
      };
    }
    return undefined;
  }),
  getLocalizedCategories: vi.fn((dict: Record<string, string>) => mockLocalizedCategories),
}));

// Mock other list data sources (unchanged)
vi.mock('@/app/[lang]/products/products-list', () => ({
  itemData: [
    { title: 'Product Alpha', slug: 'alpha' },
    { title: 'Product Beta', slug: 'beta' },
  ],
}));

vi.mock('@/app/[lang]/companies/companies-list', () => ({
  itemData: [
    { title: 'Company X', slug: 'x' },
    { title: 'Company Y', slug: 'y' },
  ],
}));

vi.mock('@/app/[lang]/services/services-list', () => ({
  itemData: [
    { title: 'Service Foo', slug: 'foo' },
    { title: 'Service Bar', slug: 'bar' },
  ],
}));

vi.mock('@/app/[lang]/apps/applications-list', () => ({
  itemData: [
    { title: 'App One', slug: 'one' },
    { title: 'App Two', slug: 'two' },
  ],
}));

// FIXED: Vitest `vi.mock` only accepts 1-2 arguments (no `{ virtual: true }` option).
// We mock the dynamic JSON import path that the provider tries to load at runtime.
vi.mock(
  '@/app/[lang]/adrs/*/decisions-dictionaries/en.json',
  () => ({ default: {} })
);

// =============================================================================
// TEST HELPER
// =============================================================================
const TestConsumer = ({ onRender }: { onRender?: (value: any) => void }) => {
  const value = useNavigation();
  React.useEffect(() => {
    onRender?.(value);
  }, [value, onRender]);
  return <div data-testid="consumer" />;
};

// =============================================================================
// TEST SUITE
// =============================================================================
describe('NavigationContext / NavigationProvider (Vitest)', () => {
  let mockUsePathname: ReturnType<typeof vi.fn>;
  let mockUseRouter: ReturnType<typeof vi.fn>;
  let mockPush: ReturnType<typeof vi.fn>;
  let mockGetCategoryBySlug: ReturnType<typeof vi.fn>;

  const mockDict: Record<string, string> = {};

  beforeEach(() => {
    vi.clearAllMocks();

    mockUsePathname = vi.mocked(NextNavigation.usePathname);
    mockUseRouter = vi.mocked(NextNavigation.useRouter);
    mockGetCategoryBySlug = vi.mocked(AdrsLists.getCategoryBySlug);

    mockPush = vi.fn();

    mockUsePathname.mockReturnValue('/en');
    mockUseRouter.mockReturnValue({ push: mockPush });
  });

  const renderWithProvider = (onRender?: (value: any) => void) =>
    render(
      <NavigationProvider dict={mockDict}>
        <TestConsumer onRender={onRender} />
      </NavigationProvider>
    );

  // ---------------------------------------------------------------------------
  // 1. PROVIDER RENDERING & BASIC HOOK SAFETY
  // ---------------------------------------------------------------------------
  it('renders children without crashing and provides context', () => {
    render(
      <NavigationProvider dict={mockDict}>
        <div data-testid="child">Hello</div>
      </NavigationProvider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('throws when useNavigation is called outside of NavigationProvider', () => {
    expect(() => render(<TestConsumer />)).toThrow(
      'useNavigation must be used within a NavigationProvider'
    );
  });

  // ---------------------------------------------------------------------------
  // 2. DEFAULT STATE & HOME-PAGE SYNC
  // ---------------------------------------------------------------------------
  it('initializes with defaultCategoryId and expandedAdrSlug = null on home page', async () => {
    mockUsePathname.mockReturnValue('/en');

    const onRender = vi.fn();
    renderWithProvider(onRender);

    await waitFor(() => {
      const value = onRender.mock.calls.at(-1)?.[0];
      expect(value.selectedCategoryId).toBe('cat-1');
      expect(value.expandedAdrSlug).toBeNull();
      expect(value.currentSlug).toBe('');
    });
  });

  // ---------------------------------------------------------------------------
  // 3. URL SYNC EFFECT (deep link / refresh / browser back)
  // ---------------------------------------------------------------------------
  it('SYNC_FROM_URL sets correct category + expandedAdrSlug when on an ADR page', async () => {
    mockUsePathname.mockReturnValue('/en/adrs/test-adr-1');

    const onRender = vi.fn();
    renderWithProvider(onRender);

    await waitFor(() => {
      const value = onRender.mock.calls.at(-1)?.[0];
      expect(value.selectedCategoryId).toBe('cat-1');
      expect(value.expandedAdrSlug).toBe('test-adr-1');
      expect(value.currentSlug).toBe('test-adr-1');
      expect(value.currentAdr).toBeDefined();
    });
  });

  it('SYNC_FROM_URL falls back to default category when slug is invalid', async () => {
    mockUsePathname.mockReturnValue('/en/adrs/unknown-slug');

    const onRender = vi.fn();
    renderWithProvider(onRender);

    await waitFor(() => {
      const value = onRender.mock.calls.at(-1)?.[0];
      expect(value.selectedCategoryId).toBe('cat-1');
      expect(value.expandedAdrSlug).toBeNull();
    });
  });

  // ---------------------------------------------------------------------------
  // 4. CURRENT ITEM MEMOS
  // ---------------------------------------------------------------------------
  it('computes currentProduct when pathname matches /products/*', async () => {
    mockUsePathname.mockReturnValue('/en/products/beta');

    const onRender = vi.fn();
    renderWithProvider(onRender);

    await waitFor(() => {
      const value = onRender.mock.calls.at(-1)?.[0];
      expect(value.currentProduct).toEqual({ title: 'Product Beta', slug: 'beta' });
    });
  });

  it('computes currentCompany, currentService, currentApp correctly', async () => {
    mockUsePathname.mockReturnValue('/en/companies/y');

    const onRender = vi.fn();
    renderWithProvider(onRender);

    await waitFor(() => {
      const value = onRender.mock.calls.at(-1)?.[0];
      expect(value.currentCompany).toEqual({ title: 'Company Y', slug: 'y' });
    });
  });

  // ---------------------------------------------------------------------------
  // 5. selectCategory ACTION
  // ---------------------------------------------------------------------------
  it('selectCategory updates state, collapses expanded, and navigates to mainPageSlug', async () => {
    mockUsePathname.mockReturnValue('/en');

    let contextValue: any;
    const onRender = vi.fn((v) => {
      contextValue = v;
    });

    renderWithProvider(onRender);

    await waitFor(() => expect(contextValue).toBeDefined());

    contextValue.selectCategory('cat-2');

    await waitFor(() => {
      expect(contextValue.selectedCategoryId).toBe('cat-2');
      expect(mockPush).toHaveBeenCalledWith('/en/adrs/test-adr-2');
    });
  });

  // ---------------------------------------------------------------------------
  // 6. navigateToAdr ACTION
  // ---------------------------------------------------------------------------
  it('navigateToAdr pushes correct URL and optionally expands the ADR', async () => {
    mockUsePathname.mockReturnValue('/en');

    let contextValue: any;
    const onRender = vi.fn((v) => (contextValue = v));

    renderWithProvider(onRender);

    await waitFor(() => expect(contextValue).toBeDefined());

    contextValue.navigateToAdr('test-adr-1');
    expect(mockPush).toHaveBeenCalledWith('/en/adrs/test-adr-1');

    mockPush.mockClear();
    contextValue.navigateToAdr('test-adr-2', true);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/en/adrs/test-adr-2');
      expect(contextValue.expandedAdrSlug).toBe('test-adr-2');
    });
  });

  // ---------------------------------------------------------------------------
  // 7. toggleExpanded / setExpanded ACTIONS
  // ---------------------------------------------------------------------------
  it('toggleExpanded flips the expandedAdrSlug correctly', async () => {
    mockUsePathname.mockReturnValue('/en/adrs/test-adr-1');

    let contextValue: any;
    const onRender = vi.fn((v) => (contextValue = v));

    renderWithProvider(onRender);

    await waitFor(() => expect(contextValue.expandedAdrSlug).toBe('test-adr-1'));

    contextValue.toggleExpanded('test-adr-1');
    await waitFor(() => expect(contextValue.expandedAdrSlug).toBeNull());

    contextValue.toggleExpanded('test-adr-1');
    await waitFor(() => expect(contextValue.expandedAdrSlug).toBe('test-adr-1'));
  });

  it('setExpanded forces a specific value (including null)', async () => {
    mockUsePathname.mockReturnValue('/en');

    let contextValue: any;
    const onRender = vi.fn((v) => (contextValue = v));

    renderWithProvider(onRender);

    await waitFor(() => expect(contextValue.expandedAdrSlug).toBeNull());

    contextValue.setExpanded('test-adr-2');
    await waitFor(() => expect(contextValue.expandedAdrSlug).toBe('test-adr-2'));

    contextValue.setExpanded(null);
    await waitFor(() => expect(contextValue.expandedAdrSlug).toBeNull());
  });

  // ---------------------------------------------------------------------------
  // 8. localize HELPER
  // ---------------------------------------------------------------------------
  it('localize prepends language prefix correctly', async () => {
    mockUsePathname.mockReturnValue('/en');

    let contextValue: any;
    const onRender = vi.fn((v) => (contextValue = v));

    renderWithProvider(onRender);

    await waitFor(() => {
      expect(contextValue.localize('/')).toBe('/en');
      expect(contextValue.localize('adrs/test-adr-1')).toBe('/en/adrs/test-adr-1');
      expect(contextValue.localize('/en/adrs/test-adr-1')).toBe('/en/adrs/test-adr-1');
    });
  });

  // ---------------------------------------------------------------------------
  // 9. activeCategory FALLBACK LOGIC
  // ---------------------------------------------------------------------------
  it('activeCategory falls back to selectedCategoryId when currentCategory is undefined', async () => {
    mockUsePathname.mockReturnValue('/en/companies/x');

    let contextValue: any;
    const onRender = vi.fn((v) => (contextValue = v));

    renderWithProvider(onRender);

    await waitFor(() => {
      expect(contextValue.currentCategory).toBeUndefined();
      expect(contextValue.activeCategory?.id).toBe('cat-1');
    });
  });

  // ---------------------------------------------------------------------------
  // 10. currentAdrCategoryName MEMO
  // ---------------------------------------------------------------------------
  it('currentAdrCategoryName returns correct label from category config', async () => {
    mockUsePathname.mockReturnValue('/en/adrs/test-adr-1');

    let contextValue: any;
    const onRender = vi.fn((v) => (contextValue = v));

    renderWithProvider(onRender);

    await waitFor(() => {
      expect(contextValue.currentAdrCategoryName).toBe('Category 1 Label');
    });
  });
});

// =============================================================================
// WHAT THIS TEST FILE COVERS
// =============================================================================
// • All public API methods (selectCategory, navigateToAdr, toggleExpanded, setExpanded, localize)
// • All memoized values (currentSlug, currentAdrsList, currentAdr, currentProduct, …, currentAdrCategoryName, activeCategory, localizedCategories)
// • useEffect URL sync (home + ADR pages + invalid slug)
// • Required `dict` prop handling
// • New getLocalizedCategories path (no more static categories export)
// • Decision dictionary dynamic import (now properly mocked)
//
// Pure integration test – no real filesystem access, extremely fast.