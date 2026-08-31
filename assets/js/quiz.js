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
      time: '08:00 · La mañana empieza',
      narration:
        'Todavía no terminaste el café cuando suena el teléfono. Un cliente nuevo, entusiasmado, quiere arrancar ya.',
      text: '¿Qué hacés?',
      options: [
        { label: 'Lo atendés vos misma/o, como siempre — nadie más entiende el negocio como vos', scores: { escala: 2 } },
        { label: 'Le decís que sí, aunque por dentro no tenés ni idea de cómo armar bien la propuesta', scores: { kit: 2 } },
        { label: 'Antes de responder, pensás en alguien de tu red que le podría servir más que vos', scores: { redmaestra: 2 } },
        { label: 'Contestás por costumbre, pero hace rato esto no te llena como antes', scores: { rediseñarte: 2 } },
        { label: 'Lo primero que pensás es en esa decisión puntual que tenés pendiente hace semanas', scores: { mentoria: 2 } },
      ],
    },
    {
      time: '11:00 · El cuello de botella',
      narration:
        'Hay tres cosas esperando tu aprobación. Nada avanza si vos no decís que sí primero.',
      text: '¿Cómo lo resolvés?',
      options: [
        { label: 'Las revisás una por una, aunque sepas que mañana va a pasar exactamente lo mismo', scores: { escala: 2 } },
        { label: 'Te das cuenta de que ni siquiera sabés cómo automatizar lo más simple de todo esto', scores: { kit: 2 } },
        { label: 'Pensás en la persona que te podría ayudar a delegar esto — pero no la tenés todavía', scores: { redmaestra: 2 } },
        { label: 'Sentís que el problema real no es este, sino algo bastante más de fondo', scores: { rediseñarte: 2 } },
        { label: 'Hay un tema específico ahí adentro que te viene frenando hace tiempo', scores: { mentoria: 1 } },
      ],
    },
    {
      time: '14:30 · La vidriera ajena',
      narration:
        'Scrolleás un rato entre cliente y cliente. Ves a otra persona compartiendo cómo le está yendo.',
      text: '¿Qué te genera?',
      options: [
        { label: '"Yo podría crecer así, si soltara un poco el control"', scores: { escala: 2 } },
        { label: '"Ojalá supiera usar esa herramienta tan bien como ella"', scores: { kit: 2 } },
        { label: '"Esa persona conoce a todo el mundo — ahí está la diferencia"', scores: { redmaestra: 2 } },
        { label: '"Se nota que hizo un proceso de transformación grupal — me gustaría vivir algo así"', scores: { rediseñarte: 2 } },
        { label: 'Cerrás la app: hoy tenés la cabeza en otra cosa mucho más puntual', scores: { mentoria: 2 } },
      ],
    },
    {
      time: '18:00 · El freno real',
      narration:
        'Se termina la jornada. Antes de cerrar la compu, hay algo que te sigue dando vueltas.',
      text: '¿Qué es?',
      options: [
        { label: 'Que facturás bien, pero seguís siendo vos el límite de todo', scores: { escala: 3 } },
        { label: 'Que te falta gente estratégica alrededor para ir más rápido', scores: { redmaestra: 3 } },
        { label: 'Que te da un poco de vergüenza no saber usar ciertas herramientas clave', scores: { kit: 3 } },
        { label: 'Que estás en una etapa de replantearte todo, no solo el negocio', scores: { rediseñarte: 3 } },
        { label: 'Que hay una sola cosa puntual que, si se resolviera, cambiaría todo lo demás', scores: { mentoria: 3 } },
      ],
    },
    {
      time: '23:00 · El pensamiento antes de dormir',
      narration:
        'Ya en la cama, repasás el día. Una sola frase se queda dando vueltas más que las demás.',
      text: '¿Cuál?',
      options: [
        { label: '"Necesito que esto funcione sin que dependa de mí en cada paso"', scores: { escala: 3 } },
        { label: '"Necesito rodearme de la gente correcta"', scores: { redmaestra: 3 } },
        { label: '"Necesito perder el miedo y animarme de una vez"', scores: { kit: 3 } },
        { label: '"Necesito sentirme plena/o, no solo facturar"', scores: { rediseñarte: 3 } },
        { label: '"Necesito resolver esa situación puntual antes de pensar en cualquier otra cosa"', scores: { mentoria: 3 } },
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
