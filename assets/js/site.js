(function(){
  var navEl = document.getElementById('siteNav');
  if(navEl){
    window.addEventListener('scroll', function(){
      if(window.scrollY > 30){ navEl.classList.add('scrolled'); }
      else{ navEl.classList.remove('scrolled'); }
    });
  }

  var menuBtn = document.getElementById('menuBtn');
  var navLinks = document.getElementById('navLinks');
  if(menuBtn && navLinks){
    menuBtn.addEventListener('click', function(){
      var open = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ navLinks.classList.remove('open'); });
    });
  }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion){
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
  } else if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
  }

  // Accordion (curriculum / FAQ)
  document.querySelectorAll('.acc-trigger').forEach(function(btn){
    btn.addEventListener('click', function(){
      var item = btn.closest('.acc-item');
      var wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.acc-item.open').forEach(function(openItem){
        if(openItem !== item) openItem.classList.remove('open');
      });
      item.classList.toggle('open', !wasOpen);
    });
  });

  // Countdown timer — either data-deadline="YYYY-MM-DDTHH:mm:ss" (fixed)
  // or data-duration-hours="72" (rolling: starts counting down from page load, per visit)
  document.querySelectorAll('.countdown[data-deadline], .countdown[data-duration-hours]').forEach(function(el){
    var deadline;
    if(el.hasAttribute('data-duration-hours')){
      var hours = parseFloat(el.getAttribute('data-duration-hours')) || 0;
      deadline = Date.now() + hours * 3600000;
    } else {
      deadline = new Date(el.getAttribute('data-deadline')).getTime();
    }
    var dEl = el.querySelector('[data-unit="d"]');
    var hEl = el.querySelector('[data-unit="h"]');
    var mEl = el.querySelector('[data-unit="m"]');
    var sEl = el.querySelector('[data-unit="s"]');
    function pad(n){ return String(n).padStart(2,'0'); }
    function tick(){
      var now = Date.now();
      var diff = Math.max(0, deadline - now);
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      if(dEl) dEl.textContent = pad(d);
      if(hEl) hEl.textContent = pad(h);
      if(mEl) mEl.textContent = pad(m);
      if(sEl) sEl.textContent = pad(s);
    }
    tick();
    setInterval(tick, 1000);
  });
})();
