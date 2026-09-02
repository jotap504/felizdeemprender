(function () {
  var section = document.getElementById('revealHero');
  if (!section || typeof gsap === 'undefined') return;

  var pill = document.getElementById('revealHeroPill');
  var typeGroup = document.getElementById('revealHeroType');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    // Show the settled end-state immediately: full-bleed photo, type hidden.
    pill.style.top = '0';
    pill.style.left = '0';
    pill.style.right = '0';
    pill.style.bottom = '0';
    pill.style.borderRadius = '0';
    typeGroup.style.opacity = '0';
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  var scrollDistance = window.innerWidth < 980 ? '+=100%' : '+=150%';

  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: scrollDistance,
      scrub: true,
      pin: true,
    },
  });

  tl.to(
    pill,
    { top: '0%', left: '0%', right: '0%', bottom: '0%', borderRadius: '0px', ease: 'none' },
    0
  ).to(
    typeGroup,
    { opacity: 0, scale: 1.12, filter: 'blur(10px)', ease: 'none' },
    0
  );
})();
