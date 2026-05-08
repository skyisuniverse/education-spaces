// app/[lang]/adrs/adrs-pages.test.tsx
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { Locale } from '@/i18n-config';
import React from 'react';

// =============================================================================
// TOP-LEVEL IMPORTS FOR STABLE MOCKING
// =============================================================================
import * as NextNavigation from 'next/navigation';

// =============================================================================
// TOP-LEVEL MOCKS (hoisted automatically by Vitest)
// =============================================================================

// Mock Next.js navigation hooks
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
  useParams: vi.fn(),
  useRouter: vi.fn(() => ({ push: vi.fn() })),
}));

// Mock the navigation context provider (required by ADRCategoryPage and most ADR pages)
vi.mock('@/app/contexts/navigation-context', () => ({
  NavigationProvider: ({ children, dict }: any) => (
    <div data-testid="mock-navigation-provider">{children}</div>
  ),
  useNavigation: vi.fn(() => ({
    currentSlug: '',
    currentAdrsList: [],
    currentAdr: undefined,
    currentAdrCategoryName: 'Mock Category',
    localizedCategories: [],
    decisionDict: {},
  })),
}));

// Minimal dictionary (for NavigationProvider + any i18n components)
const mockDict = {
  common: { hello: 'Hello' },
  navigation: { title: 'Navigation' },
  'adrs.title': 'Architecture Decision Records',
};

// Mock getDictionary in case any page imports it
vi.mock('@/get-dictionary', () => ({
  getDictionary: vi.fn(() => Promise.resolve(mockDict)),
}));

// =============================================================================
// TEST DATA
// =============================================================================
const testSlugs = [
  'nano-assembly-adr',
  'terraforming-mars-adr',
  'faster-factories-with-optimus-semi-cybercab-adr',
  'starship-instant-reusability-adr',
  'nano-assembled-optimus-adr',
  'quantum-computing-adr',
] as const;

// =============================================================================
// TEST SUITE
// =============================================================================
describe('ADR Content Pages', () => {
  let mockUseParams: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();

    // Get the properly mocked useParams from the hoisted mock
    mockUseParams = vi.mocked(NextNavigation.useParams);
  });

  testSlugs.forEach((slug) => {
    it(`renders ${slug} page correctly with all standard elements`, async () => {
      // 1. Make useParams return the exact shape the page + ADRCategoryPage expect
      mockUseParams.mockReturnValue({
        lang: 'en' as Locale,
        slug,
      });

      // 2. Dynamic import of the real Next.js page component
      const { default: Page } = await import(`./${slug}/page`);

      // 3. Call the page with the params it expects (Next.js App Router contract)
      const params = Promise.resolve({ lang: 'en' as Locale, slug });
      const pageElement = await Page({ params });

      // 4. Render inside mocked NavigationProvider + Suspense (required by client components)
      render(
        <React.Suspense fallback={<div data-testid="loading">Loading...</div>}>
          {pageElement}
        </React.Suspense>
      );

      // 5. Core assertions (same as before)
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByText(/Published/i)).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { level: 2, name: /Architecture Decision Records/i })
      ).toBeInTheDocument();

      const cards = screen.getAllByRole('link');
      expect(cards.length).toBeGreaterThan(0);

      expect(screen.getAllByText(/Draft|Accepted|Rejected/i).length).toBeGreaterThan(0);
    });
  });
});

// =============================================================================
// WHAT THIS TEST FILE COVERS
// =============================================================================
// • All listed ADR pages render without crashing
// • Core UI elements are present (h1, published date, ADR section, cards, status chips)
// • Reliable mocking of useParams (fixes the "mockReturnValue is not a function" error)
// • NavigationProvider wrapper (required by ADRCategoryPage)
// • Realistic Next.js App Router params contract
//
// Fast, isolated, and future-proof.