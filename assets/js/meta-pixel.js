/* Meta Pixel: una inicialización y una vista por documento; sin ID no carga Meta. */
(function (window, document) {
  'use strict';
  var id = window.FDE_META_PIXEL_ID;
  if (typeof id !== 'string' || !/^\d{5,25}$/.test(id) || window.__fdeMetaPixelInitialized) return;
  window.__fdeMetaPixelInitialized = true;
  if (!window.fbq) {
    var fbq = window.fbq = function () {
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
    };
    if (!window._fbq) window._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    var firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) firstScript.parentNode.insertBefore(script, firstScript);
    else (document.head || document.documentElement).appendChild(script);
  }
  window.fbq('init', id);
  window.fbq('track', 'PageView');
})(window, document);
