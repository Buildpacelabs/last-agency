/**
 * Build-time "today" is pinned so every page renders the same standalone-count
 * regardless of when the static build runs. Update at the start of each rebuild
 * cycle (or wire to process.env if/when the build runs daily).
 */
export const BUILD_TODAY = '2026-05-17';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export type MonthsStandaloneResult =
  | { kind: 'just-shipped'; label: 'just shipped' }
  | { kind: 'months'; months: number; label: string };

/**
 * Given an ISO handoff date, returns either "just shipped" (handoff < 90 days
 * old relative to BUILD_TODAY) or `${n} months standalone`.
 *
 * Pure function. Throws if the input is unparseable.
 */
export function monthsStandalone(
  handoffDate: string,
  todayIso: string = BUILD_TODAY,
): MonthsStandaloneResult {
  const handoff = Date.parse(handoffDate);
  const today = Date.parse(todayIso);

  if (Number.isNaN(handoff) || Number.isNaN(today)) {
    throw new Error(`monthsStandalone: invalid date input "${handoffDate}" / "${todayIso}"`);
  }

  const diffDays = Math.max(0, Math.floor((today - handoff) / MS_PER_DAY));

  if (diffDays < 90) {
    return { kind: 'just-shipped', label: 'just shipped' };
  }

  const months = Math.floor(diffDays / 30);
  return { kind: 'months', months, label: `${months} months standalone` };
}
