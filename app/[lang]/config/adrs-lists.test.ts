// app/[lang]/config/adrs-lists.test.ts
import { describe, it, expect, beforeEach } from 'vitest';

// =============================================================================
// TOP-LEVEL IMPORTS
// =============================================================================
import {
  adrsListMap,
  getCategoryBySlug,
  getAdrSelectOptions,
  type AdrSlug,
  type Category,
} from './adrs-lists';

// =============================================================================
// TEST SUITE
// =============================================================================
describe('adrs-lists config (app/[lang]/config/adrs-lists.ts)', () => {
  let categories: Category[];

  beforeEach(() => {
    // getAdrSelectOptions() (no dict) returns the raw categories array
    // (this is the single source of truth used by the rest of the app)
    categories = getAdrSelectOptions();
  });

  // ---------------------------------------------------------------------------
  // 1. ADRSLISTMAP STRUCTURE
  // ---------------------------------------------------------------------------
  it('adrsListMap contains all expected keys and non-empty values', () => {
    // WHAT: Verify the map has every slug referenced by categories.
    // WHY:  This is the single source of truth for all ADR data. Missing entries break navigation and sidebar.
    expect(Object.keys(adrsListMap)).toHaveLength(52); // Updated: now includes 'optimus-adr'

    expect(adrsListMap['nano-assembly-adr']).toBeDefined();
    expect(adrsListMap['terraforming-mars-adr']).toBeDefined();
    expect(adrsListMap['warp-drive-without-negative-energy-adr']).toBeDefined();
    expect(adrsListMap['superluminal-effective-warp-drive-adr']).toBeDefined();
    // Clean key (no % characters) after folder rename
    expect(adrsListMap['faster-factories-with-optimus-semi-cybercab-adr']).toBeDefined();
    expect(adrsListMap['optimus-adr']).toBeDefined();
    expect(adrsListMap['open-source-cnc-machine-adr']).toBeDefined();
  });

  // ---------------------------------------------------------------------------
  // 2. CATEGORIES ARRAY SHAPE
  // ---------------------------------------------------------------------------
  it('getAdrSelectOptions() returns a non-empty array with the correct Category interface shape', () => {
    // WHAT: Assert the categories (via public helper) have the expected structure.
    // WHY:  The entire sidebar, navigation, and category selector depend on this exact shape.
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(5);

    const first = categories[0];
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('name');
    expect(first).toHaveProperty('adrs');
    expect(Array.isArray(first.adrs)).toBe(true);
  });

  // ---------------------------------------------------------------------------
  // 3. GETCATEGORYBYSLUG – KNOWN SLUGS
  // ---------------------------------------------------------------------------
  it('getCategoryBySlug returns correct category for known ADR slugs', () => {
    // WHAT: Call getCategoryBySlug with real slugs from the config.
    // WHY:  This is the core lookup used by ResponsiveDrawer and NavigationContext.
    expect(getCategoryBySlug('nano-assembly-adr')?.id).toBe('rd-center');
    expect(getCategoryBySlug('terraforming-mars-adr')?.id).toBe('spacex-planet');
    expect(getCategoryBySlug('faster-factories-with-optimus-semi-cybercab-adr')?.id).toBe('tesla');
    expect(getCategoryBySlug('optimus-adr')?.id).toBe('tesla'); // ← new
  });

  // ---------------------------------------------------------------------------
  // 4. GETCATEGORYBYSLUG – DEFENSIVE CASES
  // ---------------------------------------------------------------------------
  it('getCategoryBySlug returns undefined for unknown or empty slugs', () => {
    // WHAT: Test defensive behavior for invalid input.
    // WHY:  Prevents crashes on bad URLs or direct navigation to non-existent ADRs.
    expect(getCategoryBySlug('non-existent-slug' as AdrSlug)).toBeUndefined();
    expect(getCategoryBySlug('')).toBeUndefined();
  });

  // ---------------------------------------------------------------------------
  // 5. CONSISTENCY BETWEEN CATEGORIES AND ADRSLISTMAP
  // ---------------------------------------------------------------------------
  it('every slug referenced in categories exists in adrsListMap', () => {
    // WHAT: Cross-check that all UI slugs have corresponding data.
    // WHY:  Guarantees no broken links or missing ADR data in the sidebar.
    const allSlugsInCategories = new Set(
      categories.flatMap((cat) => cat.adrs.map((adr) => adr.slug))
    );

    allSlugsInCategories.forEach((slug) => {
      expect(adrsListMap[slug], `Missing slug in adrsListMap: ${slug}`).toBeDefined();
    });
  });

  // ---------------------------------------------------------------------------
  // 6. MAINPAGESLUG VALIDATION
  // ---------------------------------------------------------------------------
  it('every category with mainPageSlug has a valid slug in adrsListMap', () => {
    // WHAT: Verify optional mainPageSlug fields point to real entries.
    // WHY:  Used by selectCategory action and category dropdown navigation.
    categories.forEach((cat) => {
      if (cat.mainPageSlug) {
        expect(adrsListMap[cat.mainPageSlug]).toBeDefined();
      }
    });
  });

  // ---------------------------------------------------------------------------
  // 7. GETADRSELECTOPTIONS HELPER
  // ---------------------------------------------------------------------------
  it('getAdrSelectOptions returns the raw categories array when no dictionary is provided', () => {
    // WHAT: Verify the helper used by ADRSelect returns the raw categories.
    // WHY:  Single source of truth – prevents duplication between config and UI.
    expect(getAdrSelectOptions()).toBe(categories); // same reference (raw data)
    expect(getAdrSelectOptions()).toEqual(categories);
  });

  // ---------------------------------------------------------------------------
  // 8. CATEGORY NAMES ARE UNIQUE AND NON-EMPTY
  // ---------------------------------------------------------------------------
  it('all categories have unique non-empty names', () => {
    // WHAT: Check that no two categories share the same display name.
    // WHY:  Duplicate names would confuse users in the category selector.
    const names = categories.map((c) => c.name);
    expect(names.length).toBe(new Set(names).size);
    names.forEach((name) => expect(name).toBeTruthy());
  });

  // ---------------------------------------------------------------------------
  // 9. ADR LABELS ARE UNIQUE WITHIN EACH CATEGORY
  // ---------------------------------------------------------------------------
  it('ADR labels are unique within each category', () => {
    // WHAT: Ensure no duplicate labels inside the same category.
    // WHY:  Duplicate labels would break sidebar rendering and user experience.
    categories.forEach((cat) => {
      const labels = cat.adrs.map((adr) => adr.label);
      expect(labels.length).toBe(new Set(labels).size);
    });
  });

  // ---------------------------------------------------------------------------
  // 10. TYPE SAFETY & RUNTIME SHAPE
  // ---------------------------------------------------------------------------
  it('exports correct TypeScript types and runtime shapes', () => {
    // WHAT: Verify AdrSlug and Category types are respected at runtime.
    // WHY:  Guarantees the config stays compatible with the rest of the app.
    expect(typeof adrsListMap).toBe('object');
    expect(Object.keys(adrsListMap).every((k) => typeof k === 'string')).toBe(true);

    const sampleCategory: Category = categories[0];
    expect(sampleCategory.id).toBeTypeOf('string');
    expect(sampleCategory.name).toBeTypeOf('string');
    expect(Array.isArray(sampleCategory.adrs)).toBe(true);
  });
});

// =============================================================================
// WHAT THIS TEST FILE COVERS
// =============================================================================
// • All public exports of adrs-lists.ts:
//   - adrsListMap structure and completeness (51 entries)
//   - categories shape via getAdrSelectOptions() (raw data)
//   - getCategoryBySlug (happy path + defensive cases)
//   - getAdrSelectOptions helper
// • Cross-validation between map and categories (no broken references)
// • Uniqueness and data integrity guarantees
// • Runtime type/shape safety
//
// Pure config test – no React, no side effects, extremely fast.