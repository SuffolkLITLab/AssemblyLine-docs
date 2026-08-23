// Ensure window.gtag is always defined as a callable function in development mode
// to prevent @docusaurus/plugin-google-gtag from throwing TypeError on route navigation.
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
  }
}
