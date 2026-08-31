(function () {
  var quizCard = document.getElementById('quizCard');
  if (!quizCard) return;

  var PROGRAMS = {
    escala: {
      name: 'Escala Estratégica',
      blurb:
        'Tu negocio ya factura y funciona — ahora se trata de que funcione sin que dependa de vos en cada paso. Un sistema de 8 módulos para dejar de ser el cuello de botella.',
      href: 'programas/escala-estrategica.html',
    },
    rediseñarte: {
      name: 'Rediseñarte 10X',
      blurb:
        'No se trata solo de tu negocio — es tu momento de repensar qué querés de tu vida y de tu trabajo. Un proceso grupal transformacional, a tu ritmo.',
      href: 'programas/rediseñarte-10x.html',
    },
    mentoria: {
      name: 'Mentoría Personalizada',
      blurb:
        'Tenés algo puntual dándote vueltas. La solución no es un curso genérico: es un acompañamiento 1 a 1, hecho a tu medida.',
      href: 'programas/mentoria-personalizada.html',
    },
    kit: {
      name: 'Kit de Herramientas Esenciales',
      blurb:
        'Antes de escalar nada, empecemos por sacarte el miedo a las herramientas digitales clave. Gratis y con módulos cortos.',
      href: 'programas/kit-herramientas.html',
    },
    redmaestra: {
      name: 'Red Maestra',
      blurb:
        'Tu negocio no necesita más esfuerzo tuyo — necesita mejores conexiones. Un curso gratuito para construir capital social real.',
      href: 'programas/red-maestra.html',
    },
  };

  var QUESTIONS = [
    {
      text: '¿Cómo está tu negocio hoy?',
      options: [
        { label: 'Todavía no arrancó, o recién estoy dando los primeros pasos', scores: { kit: 1, rediseñarte: 1 } },
        { label: 'Ya genera ingresos, pero siento que sin mí se detiene todo', scores: { escala: 2 } },
        { label: 'Tengo una idea clara, pero me faltan ciertos contactos clave', scores: { redmaestra: 2 } },
        { label: 'Está armado, pero siento que ya no me llena como antes', scores: { rediseñarte: 2 } },
      ],
    },
    {
      text: 'Cuando pensás en tu semana laboral típica, ¿qué es lo primero que se te cruza?',
      options: [
        { label: 'Que no doy abasto con todo lo que tengo que hacer yo misma/o', scores: { escala: 2 } },
        { label: 'Que me cuesta usar ciertas herramientas (redes, diseño, plataformas)', scores: { kit: 2 } },
        { label: 'Que me falta gente estratégica alrededor para crecer más rápido', scores: { redmaestra: 2 } },
        { label: 'Que hago las cosas casi en piloto automático, sin mucho sentido', scores: { rediseñarte: 1 } },
      ],
    },
    {
      text: 'Si mañana tuvieras una hora libre para invertir en tu negocio, ¿en qué la usarías?',
      options: [
        { label: 'En ordenar procesos para depender menos de mi tiempo', scores: { escala: 2 } },
        { label: 'En animarme con una herramienta digital que vengo evitando', scores: { kit: 2 } },
        { label: 'En conectar con alguien que me pueda abrir una puerta', scores: { redmaestra: 2 } },
        { label: 'En pensar qué es lo que realmente quiero de mi vida y mi negocio', scores: { rediseñarte: 2 } },
        { label: 'En resolver algo puntual que tengo trabado hace tiempo', scores: { mentoria: 2 } },
      ],
    },
    {
      text: '¿Cómo preferís avanzar cuando encarás algo nuevo?',
      options: [
        { label: 'Con un sistema claro, paso a paso, para aplicar ya', scores: { escala: 1 } },
        { label: 'En grupo, con otras personas que están en lo mismo', scores: { rediseñarte: 1 } },
        { label: 'Sola/o, a mi propio ritmo, con contenido corto', scores: { kit: 1 } },
        { label: 'Con alguien 1 a 1 que me acompañe en mi caso puntual', scores: { mentoria: 2 } },
      ],
    },
    {
      text: '¿Cuál de estas frases te representa más hoy?',
      options: [
        { label: 'Facturo bien, pero siento que soy el límite de mi propio crecimiento', scores: { escala: 2 } },
        { label: 'Podría lograr mucho más si tuviera mejores contactos', scores: { redmaestra: 2 } },
        { label: 'Me da un poco de vergüenza no saber usar ciertas herramientas clave', scores: { kit: 2 } },
        { label: 'Siento que estoy en una etapa de replantearme todo', scores: { rediseñarte: 2 } },
        { label: 'Tengo un tema puntual que me tiene estancada/o', scores: { mentoria: 2 } },
      ],
    },
    {
      text: 'Si pudieras resolver una sola cosa en los próximos 3 meses, ¿cuál sería?',
      options: [
        { label: 'Vender más sin trabajar más horas', scores: { escala: 3 } },
        { label: 'Tener una red de gente que me abra puertas', scores: { redmaestra: 3 } },
        { label: 'Perder el miedo a las herramientas y sentirme al día', scores: { kit: 3 } },
        { label: 'Sentirme plena/o, no solo ganar plata', scores: { rediseñarte: 3 } },
        { label: 'Resolver esa situación puntual que me tiene trabada/o', scores: { mentoria: 3 } },
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
      'Pregunta ' + (current + 1) + ' de ' + QUESTIONS.length;
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
    var program = PROGRAMS[topKey];
    document.getElementById('quizResultName').textContent = program.name;
    document.getElementById('quizResultBlurb').textContent = program.blurb;
    var cta = document.getElementById('quizResultCta');
    cta.href = program.href;
    cta.textContent = 'Ver ' + program.name;
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
