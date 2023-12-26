/**
 * Global site tag (gtag.js) - Google Analytics
 *
 * https://developers.google.com/analytics/devguides/collection/gtagjs
 */
export const gtag = window.gtag;

const googleAnalyticsId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;

gtag('config', googleAnalyticsId);

(window as unknown as Record<string, boolean>)[
  `ga-disable-${googleAnalyticsId}`
] = import.meta.env.DEV;

const script = document.createElement('script');
script.async = true;
script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
document.head.appendChild(script);
