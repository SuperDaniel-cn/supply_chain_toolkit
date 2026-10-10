'use client';

export const HERO_SKIP_EVENT = 'sct:skip-hero';

export function skipPlayingHero(href?: string) {
  if (!document.querySelector('[data-hero-stage="playing"]')) return false;
  if (href) {
    history.pushState(null, '', href);
  } else if (window.location.hash) {
    history.pushState(null, '', window.location.pathname + window.location.search);
  }
  document.dispatchEvent(new Event(HERO_SKIP_EVENT));
  return true;
}
