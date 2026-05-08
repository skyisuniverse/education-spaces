export function getDecisionHref(
    categorySlug: string, 
    decisionSlug: string
): string {
  return `/adrs/${categorySlug}/decisions/${decisionSlug}`;
}