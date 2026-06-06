import Hotjar from '@hotjar/browser';

const HOTJAR_VERSION = 6;

export function initializeHotjar() {
  const siteId = Number(process.env.REACT_APP_HOTJAR_SITE_ID);

  if (!siteId) {
    return;
  }

  Hotjar.init(siteId, HOTJAR_VERSION);
}
