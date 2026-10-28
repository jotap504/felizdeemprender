(function(){
 'use strict';
 var form=document.getElementById('compassForm'),result=document.getElementById('compassResult');
 var actions={offer:'Escribí una frase con tres partes: a quién ayudás, qué problema resolvés y qué cambio buscás lograr. Contrastala con una persona de ese público.',focus:'Elegí un objetivo para los próximos 30 días. Definí una acción de esta semana y una señal concreta para saber si avanzaste.',systems:'Registrá durante una semana qué tareas necesitan tu intervención. Elegí una repetida y escribí cómo se hace, quién podría asumirla y cómo revisar el resultado.'};
 form.addEventListener('submit',function(e){
  e.preventDefault();var d=new FormData(form),stage=d.get('stage'),challenge=d.get('challenge'),support=d.get('support');
  result.replaceChildren();
  function text(tag,value){var el=document.createElement(tag);el.textContent=value;result.appendChild(el);return el;}
  text('span','TU PRÓXIMO PASO');text('h3',stage==='start'?'Dale forma a lo que sabés.':stage==='order'?'Dale una dirección a tu negocio.':'Prepará tu negocio para crecer.');text('p',actions[challenge]);
  text('h4','Una forma de seguir');
  var link=document.createElement('a');link.className='btn btn-primary';
  if(support==='self'){text('p','Preferís avanzar por tu cuenta. Explorá los recursos y elegí uno que acompañe la acción que acabás de definir.');link.href='#cursos';link.textContent='Explorar recursos →';}
  else if(stage==='scale' || challenge==='systems'){text('p','Buscás orientación para ordenar el crecimiento. Conocé Escala Estratégica y consultá si se adapta a tu situación.');link.href='../programas/escala-estrategica.html';link.textContent='Conocer Escala Estratégica →';}
  else{text('p','Buscás transformar tu experiencia en decisiones con orientación. Consultá la propuesta de Recalculando y sus próximas fechas.');link.href='https://wa.me/541157324441?text=Quiero%20conocer%20Recalculando';link.textContent='Consultar por Recalculando →';}
  result.appendChild(link);var exercise=document.createElement('a');exercise.href='#primer-paso';exercise.className='contact-link';exercise.textContent='Llevar esta idea a mi hoja de trabajo →';result.appendChild(exercise);
  text('p','Esta orientación es un punto de partida, no una evaluación de tu negocio. También podés explorar todo el catálogo.').className='local-note';
  var reset=document.createElement('button');reset.type='button';reset.className='text-button';reset.textContent='Volver a responder';reset.onclick=function(){result.hidden=true;form.hidden=false;form.querySelector('input').focus();};result.appendChild(reset);
  form.hidden=true;result.hidden=false;result.focus();
 });
 var scenarios={depend:[['Meta','Definir qué significa crecer: más capacidad, mejor rentabilidad o más tiempo disponible.'],['Propósito','Reconocer qué lugar querés que el negocio ocupe en tu vida.'],['Plan','Identificar tareas repetidas y diseñar responsabilidades y procesos.'],['Mindset','Trabajar la confianza para delegar y revisar sin hacerlo todo.']],idea:[['Meta','Elegir una primera propuesta que puedas validar con personas reales.'],['Propósito','Conectar tu experiencia con el problema que te interesa resolver.'],['Plan','Conversar con posibles clientes y probar una propuesta pequeña.'],['Mindset','Separar la validación de una idea del valor que tenés como persona.']],focus:[['Meta','Elegir un resultado concreto y una señal de avance.'],['Propósito','Reconocer por qué ese objetivo merece tu tiempo ahora.'],['Plan','Reducir las iniciativas y reservar tiempo para la próxima acción.'],['Mindset','Aceptar los límites y sostener el foco sin esperar perfección.']]};
 var select=document.getElementById('scenario'),example=document.getElementById('methodExample');
 function render(){example.replaceChildren();scenarios[select.value].forEach(function(pair){var card=document.createElement('article'),h=document.createElement('h4'),p=document.createElement('p');h.textContent=pair[0];p.textContent=pair[1];card.append(h,p);example.appendChild(card);});}
 select.addEventListener('change',render);render();
 var sheet=document.getElementById('worksheet'),download=document.getElementById('downloadSheet'),url;
 sheet.addEventListener('submit',function(e){e.preventDefault();var d=new FormData(sheet);var proposal='Ayudo a '+d.get('audience').trim()+' a resolver '+d.get('outcome').trim()+', a partir de mi experiencia en '+d.get('skill').trim()+'.';document.getElementById('proposal').textContent=proposal;
 var text='MI PRIMER PASO · FELIZ DE EMPRENDER\n\nBorrador para revisar y validar\n\nMi experiencia: '+d.get('skill').trim()+'\nA quién ayudo: '+d.get('audience').trim()+'\nProblema que quiero resolver: '+d.get('outcome').trim()+'\n\nMi propuesta inicial:\n'+proposal+'\n\nEsta semana voy a: '+d.get('action').trim()+'\n\nPara seguir: contrastá esta propuesta con alguien de tu público.\nhttps://jotap504.github.io/felizdeemprender/v3/';
 if(url)URL.revokeObjectURL(url);url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));download.href=url;var box=document.getElementById('worksheetResult');box.hidden=false;box.focus();});
 window.addEventListener('pagehide',function(){if(url)URL.revokeObjectURL(url);});
 // A drawn path connects the new experiences without scroll hijacking.
 var path=document.querySelector('.journey-line path');
 if(path && !matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver'in window){var io=new IntersectionObserver(function(entries){if(entries[0].isIntersecting){path.classList.add('drawn');io.disconnect();}},{threshold:.3});io.observe(path);}
})();
