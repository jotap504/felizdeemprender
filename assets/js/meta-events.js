/* Eventos agregados de interacción: categorías fijas, sin respuestas de texto libre. */
(function (window, document) {
  'use strict';
  if (window.__fdeMetaEventsInstalled) return;
  window.__fdeMetaEventsInstalled = true;
  var path = window.location.pathname.split('/').filter(Boolean);
  var version = path.indexOf('v3') !== -1 ? 'v3' : path.indexOf('v2') !== -1 ? 'v2' : '';
  var programs = ['kit_herramientas', 'red_maestra', 'escala_estrategica', 'recalculando'];
  var choices = { stage: ['start', 'order', 'scale'], challenge: ['offer', 'focus', 'systems'], support: ['self', 'together'] };
  function send(name, params) {
    if (version && window.__fdeMetaPixelInitialized && typeof window.fbq === 'function') {
      params.version_sitio = version;
      window.fbq('trackCustom', name, params);
    }
  }
  document.addEventListener('click', function (event) {
    var target = event.target && event.target.closest ? event.target.closest('a') : null;
    if (!target) return;
    var card = target.closest('.program-card[data-program]');
    if (!card) return;
    var program = card.getAttribute('data-program');
    if (programs.indexOf(program) !== -1) send('ProgramaClic', { programa: program });
  });
  document.addEventListener('change', function (event) {
    var input = event.target;
    if (!input || input.type !== 'radio' || !input.checked || !input.form || input.form.id !== 'compassForm') return;
    if (Object.prototype.hasOwnProperty.call(choices, input.name) && choices[input.name].indexOf(input.value) !== -1) {
      send('AutodiagnosticoOpcion', { pregunta: input.name, opcion: input.value });
    }
  });
  document.addEventListener('submit', function (event) {
    if (event.target && event.target.id === 'compassForm') send('AutodiagnosticoCompletado', {});
  });
})(window, document);
