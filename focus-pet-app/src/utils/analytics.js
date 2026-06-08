import Hotjar from '@hotjar/browser';
import ReactGA from 'react-ga4';

const HOTJAR_VERSION = 6;

export function initializeHotjar() {
  const siteId = Number(process.env.REACT_APP_HOTJAR_SITE_ID);

  if (!siteId) {
    return;
  }

  Hotjar.init(siteId, HOTJAR_VERSION);
}

export function initializeGoogleAnalytics() {
  const measurementId = process.env.REACT_APP_GA_MEASUREMENT_ID;

  if (!measurementId) {
    return;
  }

  ReactGA.initialize(measurementId);
}

export function trackPageView(page) {
  const measurementId = process.env.REACT_APP_GA_MEASUREMENT_ID;

  if (!measurementId) {
    return;
  }

  ReactGA.send({
    hitType: 'pageview',
    page
  });
}
