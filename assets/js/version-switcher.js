(function(){
 var link=document.createElement('a');link.href='../';link.textContent='← Elegir versión';link.setAttribute('aria-label','Volver al selector de versiones');
 Object.assign(link.style,{position:'fixed',bottom:'14px',left:'14px',zIndex:'200',padding:'10px 16px',borderRadius:'30px',background:'#153f49',color:'#fff',border:'1px solid #adcac0',boxShadow:'0 3px 18px #0003',font:'600 12px Arial,sans-serif',textDecoration:'none'});
 link.addEventListener('focus',function(){link.style.outline='3px solid #f4c65d';});link.addEventListener('blur',function(){link.style.outline='';});
 document.body.appendChild(link);
})();
