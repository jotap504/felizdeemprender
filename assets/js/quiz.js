(function () {
  var quizCard = document.getElementById('quizCard');
  if (!quizCard) return;

  var PROGRAMS = {
    escala: {
      name: 'Escala Estratégica',
      blurb:
        'Basta de ser el límite de tu propio negocio. Facturás bien, pero si vos parás, para todo. Esto no se arregla con más horas tuyas — se arregla con un sistema. 8 módulos para construirlo ya.',
      href: 'programas/escala-estrategica.html',
    },
    rediseñarte: {
      name: 'Rediseñarte 10X',
      blurb:
        'No es un ajuste de negocio — es tu momento de replantearte todo. Seguir postergando esto tiene un costo, y lo estás pagando cada día que sigue sin sentido. Es ahora.',
      href: 'programas/rediseñarte-10x.html',
    },
    mentoria: {
      name: 'Mentoría Personalizada',
      blurb:
        'Tenés una situación puntual trabada hace demasiado tiempo, y ningún curso genérico te la va a resolver. Necesitás a alguien mirando exactamente tu caso, ya.',
      href: 'programas/mentoria-personalizada.html',
    },
    kit: {
      name: 'Kit de Herramientas Esenciales',
      blurb:
        'Le seguís teniendo miedo a herramientas que en minutos podrías dominar. Cada día que lo evitás, tu negocio se queda un paso atrás. Es gratis — no hay excusa para seguir postergándolo.',
      href: 'programas/kit-herramientas.html',
    },
    redmaestra: {
      name: 'Red Maestra',
      blurb:
        'No te falta esfuerzo — te falta red. Seguís sola/o resolviendo lo que otros resuelven con un contacto. Esto se corrige, y es gratis: no tenés excusa para no arrancar hoy.',
      href: 'programas/red-maestra.html',
    },
  };

  var STATES = {
    escala: {
      name: 'Sobrecarga del sostén',
      reading:
        'Tu negocio funciona — y funciona bien — pero funciona a través tuyo, no más allá tuyo. Cada aprobación, cada "mejor lo reviso yo", te confirma que sos indispensable, y eso, aunque se sienta como responsabilidad, también es puro agotamiento. No te falta esfuerzo: te falta un sistema que sostenga lo que ya construiste.',
    },
    rediseñarte: {
      name: 'Búsqueda de sentido',
      reading:
        'No es que algo esté saliendo mal — es que algo dejó de sentirse verdadero. Preguntarte si esto es lo que realmente querés no es una señal de fracaso: es una señal de que vos creciste y tu negocio todavía no. Merecés un espacio para repensar el rumbo, no solo para seguir empujando en la misma dirección.',
    },
    mentoria: {
      name: 'Nudo puntual',
      reading:
        'No es tu negocio entero lo que está trabado — es un punto específico que se volvió el centro de gravedad de todo lo demás. Mientras esa situación siga sin resolverse, cada otra decisión pesa el doble. No necesitás un programa entero: necesitás que alguien mire exactamente ese nudo con vos.',
    },
    kit: {
      name: 'Parálisis inicial',
      reading:
        'No es falta de capacidad — es que el miedo a hacerlo mal te está costando más energía de la que realmente costaría aprenderlo. Postergar se siente más seguro que intentar, pero el costo silencioso crece cada día. No necesitás un curso larguísimo: necesitás animarte a dar un primer paso chico y concreto.',
    },
    redmaestra: {
      name: 'Aislamiento estratégico',
      reading:
        'Tenés capacidad y tenés ganas, y aun así sentís que estás empujando sola/o algo que debería tener más manos. No es un problema de esfuerzo: es que te falta la red que multiplique lo que vos ya sabés hacer. Rodearte de las personas correctas no es un lujo — es la pieza que falta.',
    },
  };

  var QUESTIONS = [
    {
      time: '08:00 · Antes de arrancar',
      narration:
        'Todavía no abriste la computadora. Antes de que el día te absorba, te hacés una pregunta rápida.',
      text: '¿Cómo describirías tu energía con tu negocio en este momento?',
      options: [
        { label: 'Agotada/o — hago todo yo y siento que no doy más', scores: { escala: 2 } },
        { label: 'Perdida/o — no sé si esto es lo que quiero seguir haciendo', scores: { rediseñarte: 2 } },
        { label: 'Estancada/o — hay algo puntual que no logro resolver hace tiempo', scores: { mentoria: 2 } },
        { label: 'Insegura/o — evito ciertas cosas porque no sé cómo hacerlas', scores: { kit: 2 } },
        { label: 'Sola/o — tengo ganas, pero me falta con quién', scores: { redmaestra: 2 } },
      ],
    },
    {
      time: '11:00 · En medio del ruido',
      narration:
        'Entre tarea y tarea, una frase se cuela en tu cabeza — la misma de siempre.',
      text: '¿Cuál de estas frases te repetís más seguido?',
      options: [
        { label: '"Si no lo hago yo, no queda bien"', scores: { escala: 2 } },
        { label: '"¿Y si esto no es para lo que nací?"', scores: { rediseñarte: 2 } },
        { label: '"Tengo que resolver ESO antes de seguir con cualquier otra cosa"', scores: { mentoria: 2 } },
        { label: '"Después lo aprendo, ahora no tengo cabeza"', scores: { kit: 2 } },
        { label: '"Nadie más entiende lo que estoy tratando de construir"', scores: { redmaestra: 2 } },
      ],
    },
    {
      time: '14:30 · La lista pendiente',
      narration:
        'Mirás tu lista de tareas. Hay algo ahí que lleva más tiempo del que te gustaría admitir.',
      text: '¿Qué es lo que más postergás?',
      options: [
        { label: 'Delegar tareas — sé que debería, pero no lo hago', scores: { escala: 2 } },
        { label: 'Pensar qué quiero realmente — lo evito porque da miedo la respuesta', scores: { rediseñarte: 2 } },
        { label: 'Esa conversación o decisión puntual que vengo pateando', scores: { mentoria: 2 } },
        { label: 'Aprender esa herramienta que "todo el mundo ya sabe usar"', scores: { kit: 2 } },
        { label: 'Mostrarme en espacios donde podría conectar con otras personas', scores: { redmaestra: 2 } },
      ],
    },
    {
      time: '18:00 · Cuando algo se rompe',
      narration:
        'Justo cuando pensabas cerrar la computadora, algo sale mal.',
      text: '¿Qué es lo primero que hacés?',
      options: [
        { label: 'Lo soluciono yo misma/o, rápido, para que no se note', scores: { escala: 3 } },
        { label: 'Me pregunto si vale la pena seguir insistiendo con esto', scores: { rediseñarte: 3 } },
        { label: 'Pienso en ESE tema puntual que siempre vuelve a aparecer', scores: { mentoria: 3 } },
        { label: 'Me paralizo — no sé ni por dónde empezar a arreglarlo', scores: { kit: 3 } },
        { label: 'Busco a alguien con quien hablarlo, pero no encuentro a quién', scores: { redmaestra: 3 } },
      ],
    },
    {
      time: '23:00 · Antes de dormir',
      narration:
        'Ya en la cama, repasás el día. Si pudieras pedir una sola cosa para mañana...',
      text: '¿Cuál sería?',
      options: [
        { label: 'Que mi negocio funcione sin que dependa de mí en cada paso', scores: { escala: 3 } },
        { label: 'Sentir que lo que hago tiene sentido de nuevo', scores: { rediseñarte: 3 } },
        { label: 'Resolver ya esa situación puntual que me tiene trabada/o', scores: { mentoria: 3 } },
        { label: 'Perder el miedo y animarme con las herramientas que evito', scores: { kit: 3 } },
        { label: 'Rodearme de la gente correcta para no sentirme tan sola/o', scores: { redmaestra: 3 } },
      ],
    },
  ];

  var current = 0;
  var scores = { escala: 0, rediseñarte: 0, mentoria: 0, kit: 0, redmaestra: 0 };

  var screens = {
    intro: quizCard.querySelector('[data-screen="intro"]'),
    question: quizCard.querySelector('[data-screen="question"]'),
    result: quizCard.querySelector('[data-screen="result"]'),
  };

  function showScreen(name) {
    Object.keys(screens).forEach(function (key) {
      screens[key].hidden = key !== name;
    });
  }

  function renderQuestion() {
    var q = QUESTIONS[current];
    document.getElementById('quizProgressFill').style.width =
      (current / QUESTIONS.length) * 100 + '%';
    document.getElementById('quizProgressLabel').textContent =
      'Escena ' + (current + 1) + ' de ' + QUESTIONS.length;
    document.getElementById('quizSceneTime').textContent = q.time;
    document.getElementById('quizNarration').textContent = q.narration;
    document.getElementById('quizQuestionText').textContent = q.text;

    var optionsEl = document.getElementById('quizOptions');
    optionsEl.innerHTML = '';
    q.options.forEach(function (opt) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-option';
      btn.innerHTML = '<span class="dot"></span><span>' + opt.label + '</span>';
      btn.addEventListener('click', function () {
        Object.keys(opt.scores).forEach(function (key) {
          scores[key] = (scores[key] || 0) + opt.scores[key];
        });
        current++;
        if (current < QUESTIONS.length) {
          renderQuestion();
        } else {
          showResult();
        }
      });
      optionsEl.appendChild(btn);
    });
  }

  function showResult() {
    var topKey = Object.keys(scores).reduce(function (a, b) {
      return scores[b] > scores[a] ? b : a;
    });
    var state = STATES[topKey];
    document.getElementById('quizStateName').textContent = state.name;
    document.getElementById('quizStateReading').textContent = state.reading;
    var program = PROGRAMS[topKey];
    document.getElementById('quizResultName').textContent = program.name;
    document.getElementById('quizResultBlurb').textContent = program.blurb;
    var cta = document.getElementById('quizResultCta');
    cta.href = program.href;
    cta.textContent = 'Quiero ' + program.name + ' ya';
    showScreen('result');
  }

  document.getElementById('quizStart').addEventListener('click', function () {
    current = 0;
    scores = { escala: 0, rediseñarte: 0, mentoria: 0, kit: 0, redmaestra: 0 };
    showScreen('question');
    renderQuestion();
  });

  document.getElementById('quizRestart').addEventListener('click', function () {
    current = 0;
    scores = { escala: 0, rediseñarte: 0, mentoria: 0, kit: 0, redmaestra: 0 };
    showScreen('intro');
  });
})();
