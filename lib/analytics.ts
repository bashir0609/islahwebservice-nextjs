/**
 * Shared GTM dataLayer helper for conversion tracking (Volume 3, Chapter 70).
 *
 * Google Tag Manager is loaded in the root layout, so `window.dataLayer`
 * exists once the GTM snippet runs. Push sitewide conversion events through
 * this helper instead of touching `window.dataLayer` directly.
 */
export function pushEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  // Do not queue events before consent: GTM would replay queued events if
  // someone accepts cookies later in the same visit.
  try {
    if (window.localStorage.getItem("islah_cookie_consent") !== "granted") return;
  } catch {
    return;
  }
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}
