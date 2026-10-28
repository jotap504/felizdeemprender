(function () {
  var preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !('IntersectionObserver' in window)) return;
  var targets = document.querySelectorAll('.center-head, .section-head, .stage-card, .path-card, .personal, .program-card, .dimension, .t-card, .about-photo, .about-grid > div:last-child, .closing .wrap');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  targets.forEach(function (el) {
    var siblings = Array.from(el.parentElement.children);
    el.style.setProperty('--enter-delay', Math.min(siblings.indexOf(el), 3) * 70 + 'ms');
    el.classList.add('scroll-enter');
    observer.observe(el);
  });
  var progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);
  var pending = false;
  function update() {
    var range = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = 'scaleX(' + (range > 0 ? Math.max(0, Math.min(1, window.scrollY / range)) : 0) + ')';
    pending = false;
  }
  window.addEventListener('scroll', function () {
    if (!pending) { pending = true; window.requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  preference.addEventListener('change', function (event) {
    if (event.matches) {
      observer.disconnect();
      targets.forEach(function (el) { el.classList.add('is-visible'); });
      progress.remove();
    }
  });
  update();
})();
