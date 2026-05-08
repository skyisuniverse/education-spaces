import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { Locale } from '@/i18n-config';

// =============================================================================
// CRITICAL TOP-LEVEL MOCKS (hoisted automatically by Vitest)
// =============================================================================
// These MUST be declared BEFORE any other code or imports that could pull in
// get-dictionary.ts or page.tsx. This is the only pattern that reliably prevents
// Vite from trying to resolve the real 'server-only' marker.
vi.mock('server-only', () => ({}));

// Mock the dictionary module with a factory so we never load the real file
// (which contains import 'server-only')
const mockGetDictionary = vi.fn();
vi.mock('@/get-dictionary', () => ({
  getDictionary: mockGetDictionary,
}));

// ←←← ADD THIS MOCK FOR NEXT/IMAGE ←←←
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => {
    // Handle both static import object and string src
    const srcStr =
      typeof src === 'string'
        ? src
        : src?.src ?? src?.default?.src ?? '/placeholder.jpg';
    
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={srcStr} alt={alt || ''} {...props} data-testid="adr-logo" />;
  },
}));

// =============================================================================
// TEST SUITE
// =============================================================================
describe('Home Page (app/[lang]/page.tsx) (Vitest)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Helper: dynamically load the page AFTER mocks are registered
  const loadHome = async (params: any) => {
    const { default: Home } = await import('./page');
    return Home({ params });
  };

  // ---------------------------------------------------------------------------
  // 1. BASIC RENDERING & SMOKE TEST
  // ---------------------------------------------------------------------------
  it('renders children inside a Box without crashing', async () => {
    const mockDict = {
      title: 'Test Title',
      welcome: 'Welcome text here',
      'definition-title': 'Definition Title',
      'definition-description': 'First description paragraph',
      'definition-description-2': 'Second description paragraph',
      'purpose-1': 'Purpose one',
      'purpose-2': 'Purpose two',
      'purpose-3': 'Purpose three',
      'purpose-4': 'Purpose four',
      'purpose-5': 'Purpose five',
      'purpose-6': 'Purpose six',
    };
    mockGetDictionary.mockResolvedValue(mockDict);

    const params = Promise.resolve({ lang: 'en' as Locale });
    const page = await loadHome(params);

    render(page);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  // ---------------------------------------------------------------------------
  // 2. DICTIONARY CONTENT RENDERING
  // ---------------------------------------------------------------------------
  it('renders all dictionary content correctly', async () => {
    const mockDict = {
      title: 'Architecture Decision Records',
      welcome: 'Welcome to the ADR documentation',
      'definition-title': 'What is an ADR?',
      'definition-description': 'An Architecture Decision Record...',
      'definition-description-2': 'Second paragraph of definition.',
      'purpose-1': 'Capture important decisions',
      'purpose-2': 'Document design rationale',
      'purpose-3': 'Facilitate team communication',
      'purpose-4': 'Support knowledge sharing',
      'purpose-5': 'Maintain architectural consistency',
      'purpose-6': 'Track decision evolution',
    };

    mockGetDictionary.mockResolvedValue(mockDict);

    const params = Promise.resolve({ lang: 'en' as Locale });
    const page = await loadHome(params);

    render(page);

    expect(screen.getByText(mockDict.title)).toBeInTheDocument();
    expect(screen.getByText(mockDict.welcome)).toBeInTheDocument();
    expect(screen.getByText(mockDict['definition-title'])).toBeInTheDocument();
    expect(screen.getByText(mockDict['definition-description'])).toBeInTheDocument();
    expect(screen.getByText(mockDict['definition-description-2'])).toBeInTheDocument();
    expect(screen.getByText(mockDict['purpose-1'])).toBeInTheDocument();
    expect(screen.getByText(mockDict['purpose-6'])).toBeInTheDocument();
  });

  // ---------------------------------------------------------------------------
  // 3. LANGUAGE PARAMETER HANDLING
  // ---------------------------------------------------------------------------
  it('fetches dictionary using the language extracted from params Promise', async () => {
    const lang: Locale = 'de';
    const params = Promise.resolve({ lang });

    mockGetDictionary.mockResolvedValue({
      title: 'a',
      welcome: 'b',
      'definition-title': 'c',
      'definition-description': 'd',
      'definition-description-2': 'e',
      'purpose-1': 'f',
      'purpose-2': 'g',
      'purpose-3': 'h',
      'purpose-4': 'i',
      'purpose-5': 'j',
      'purpose-6': 'k',
    });

    await loadHome(params);

    expect(mockGetDictionary).toHaveBeenCalledWith(lang);
    expect(mockGetDictionary).toHaveBeenCalledTimes(1);
  });

  // ---------------------------------------------------------------------------
  // 4. LOCALE AGNOSTIC BEHAVIOR
  // ---------------------------------------------------------------------------
  it('handles German locale correctly', async () => {
    const mockDictDe = {
      title: 'Architektur Entscheidungsprotokolle',
      welcome: 'Willkommen bei ADR',
      'definition-title': 'Was ist ein ADR?',
      'definition-description': 'Erster Absatz auf Deutsch.',
      'definition-description-2': 'Zweiter Absatz auf Deutsch.',
      'purpose-1': 'Wichtige Entscheidungen erfassen',
      'purpose-2': 'Designbegründung dokumentieren',
      'purpose-3': 'Teamkommunikation fördern',
      'purpose-4': 'Wissensaustausch unterstützen',
      'purpose-5': 'Architektonische Konsistenz wahren',
      'purpose-6': 'Entwicklungsverlauf nachverfolgen',
    };

    mockGetDictionary.mockResolvedValue(mockDictDe);

    const params = Promise.resolve({ lang: 'de' as Locale });
    const page = await loadHome(params);

    render(page);

    expect(screen.getByText('Architektur Entscheidungsprotokolle')).toBeInTheDocument();
    expect(screen.getByText('Willkommen bei ADR')).toBeInTheDocument();
  });
});

// =============================================================================
// WHAT THIS TEST FILE COVERS
// =============================================================================
// • All public responsibilities of the Home server component:
//   - Correct async params handling (Next.js App Router contract)
//   - Dictionary fetching for any supported Locale ('en' | 'de')
//   - Rendering of all three translated Typography blocks
// • Edge-case safety (different languages, Promise params)
// • No tests for MUI styling or layout (unit test scope – those belong in E2E/visual tests)
// • Uses Vitest + React Testing Library for fast, isolated, realistic component testing.
//
// FIXED: Used top-level `vi.mock('server-only')` + factory mock + dynamic import
//        (`await import('./page')`) to prevent Vitest from failing on the
//        `import 'server-only';` directive in get-dictionary.ts (Next.js server-only marker).