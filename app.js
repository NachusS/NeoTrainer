(() => {
  'use strict';
  const APP_VERSION = '3.0.1';
  const BUILD = '28/07/2026 12:32';
  const root = document.getElementById('app');

  const safeStore = {
    get(key, fallback){ try{ const v=localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }catch(_){ return fallback; } },
    set(key, value){ try{ localStorage.setItem(key, JSON.stringify(value)); }catch(_){} }
  };

  const defaults = {route:'home', name:'Nacho', xp:8420, streak:12, workouts:24, sex:'male', completed:38};
  const stored = safeStore.get('neoTrainerV3', defaults);
  const state = { ...defaults, ...(stored && typeof stored === 'object' && !Array.isArray(stored) ? stored : {}) };
  state.name = typeof state.name === 'string' && state.name.trim() ? state.name.trim().slice(0,40) : defaults.name;
  state.xp = Number.isFinite(Number(state.xp)) ? Math.max(0, Number(state.xp)) : defaults.xp;
  state.streak = Number.isFinite(Number(state.streak)) ? Math.max(0, Number(state.streak)) : defaults.streak;
  state.workouts = Number.isFinite(Number(state.workouts)) ? Math.max(0, Number(state.workouts)) : defaults.workouts;
  state.completed = Number.isFinite(Number(state.completed)) ? Math.max(0, Number(state.completed)) : defaults.completed;
  if(!['male','female'].includes(state.sex)) state.sex = defaults.sex;

  const exercises = [
    {id:'pushup',name:'Flexiones de pecho',area:'Pecho · Tríceps',img:'assets/exercises/pushup-start.jpg',level:'Básico',type:'Fuerza'},
    {id:'diamond',name:'Flexiones diamante',area:'Tríceps · Pecho',img:'assets/exercises/diamond.jpg',level:'Intermedio',type:'Fuerza'},
    {id:'decline',name:'Flexiones declinadas',area:'Pecho superior',img:'assets/exercises/decline.jpg',level:'Intermedio',type:'Fuerza'},
    {id:'knees',name:'Flexiones con rodillas',area:'Pecho · Técnica',img:'assets/exercises/knees.jpg',level:'Inicial',type:'Técnica'},
    {id:'explosive',name:'Flexiones explosivas',area:'Pecho · Potencia',img:'assets/exercises/explosive.jpg',level:'Avanzado',type:'Potencia'},
    {id:'incline',name:'Flexiones inclinadas',area:'Pecho · Adaptación',img:'assets/exercises/incline.jpg',level:'Inicial',type:'Fuerza'}
  ];

  const navItems = [
    ['home','⌂','Inicio'],['calendar','▣','Calendario'],['workouts','✦','Entrenamientos'],['exercises','⚕','Ejercicios'],['progress','▥','Progreso'],['seven','◴','7 Min Workout'],['profile','●','Perfil']
  ];

  function save(){ safeStore.set('neoTrainerV3', state); }
  function go(route){ state.route=route; save(); render(); window.scrollTo({top:0,behavior:'smooth'}); }
  function navMarkup(){ return navItems.map(([id,icon,label])=>`<button data-route="${id}" class="${state.route===id?'active':''}"><span>${icon}</span> &nbsp; ${label}</button>`).join(''); }
  function shell(content){
    return `<aside class="sidebar">
      <div><div class="logo">NEO</div><div class="logo-sub">TRAINER</div></div>
      <section class="profile-card"><img class="avatar" src="assets/exercises/avatar.jpg" alt="Avatar del usuario"><h3>¡Hola, ${escapeHtml(state.name)}!</h3><div class="muted">Nivel Elite III</div><div class="xp">★ ${Number(state.xp).toLocaleString('es-ES')} XP</div><div class="mini-stats"><div>RACHA<b>🔥 ${state.streak} días</b></div><div>ENTRENOS<b>${state.workouts}</b></div></div></section>
      <nav class="nav">${navMarkup()}</nav>
      <footer class="credit"><div class="version">v${APP_VERSION} · ${BUILD}</div><div>Creada por <a href="https://nachuss.github.io/" target="_blank" rel="noopener">@NachusS ↗</a></div></footer>
    </aside>
    <main class="main">${content}</main>
    <nav class="bottom-nav">${navItems.slice(0,5).map(([id,icon,label])=>`<button data-route="${id}" class="${state.route===id?'active':''}">${icon}<br>${label}</button>`).join('')}</nav>`;
  }
  function topbar(title,extra=''){return `<header class="topbar"><div><h1 class="title">${title}</h1>${extra}</div><div class="top-actions"><button class="icon-btn" id="notifyBtn">🔔</button><img class="avatar" src="assets/exercises/avatar.jpg" alt="Perfil"></div></header>`}

  function home(){return shell(`<div class="dashboard">${topbar('Inicio')}<section class="panel hero-banner"><div><span class="tag blue">ENTRENAMIENTO INTELIGENTE</span><h1>Entrena mejor.<br>Progresa cada semana.</h1><p>Rutinas en casa adaptadas a tu nivel, tu material y tu tiempo disponible.</p><button class="btn primary" data-route="workouts">Comenzar entrenamiento</button></div><img src="assets/exercises/pushup-start.jpg" alt="Atleta realizando una flexión"></section><section class="cards"><div class="panel metric"><span class="muted">Entrenos completados</span><b>${state.workouts}</b><div class="progress"><span style="width:72%"></span></div></div><div class="panel metric"><span class="muted">Racha actual</span><b>${state.streak} días</b><div class="progress"><span style="width:58%"></span></div></div><div class="panel metric"><span class="muted">XP acumulada</span><b>${Number(state.xp).toLocaleString('es-ES')}</b><div class="progress"><span style="width:84%"></span></div></div></section><section><div class="section-title"><h2>Ejercicios recomendados</h2><button class="btn" data-route="exercises">Ver todos</button></div>${exerciseCards(exercises.slice(0,3))}</section></div>`)}

  function exerciseCards(list){return `<div class="exercise-grid">${list.map(x=>`<article class="panel exercise-card" data-exercise="${x.id}"><img src="${x.img}" alt="${x.name}"><div class="body"><div class="tags"><span class="tag">${x.level}</span><span class="tag blue">${x.type}</span></div><h3>${x.name}</h3><p>${x.area}</p></div></article>`).join('')}</div>`}

  function exercisesPage(){return shell(`${topbar('Ejercicios','<div class="tags"><span class="tag red">Pecho</span><span class="tag amber">Fuerza</span><span class="tag blue">Técnica realista</span></div>')}<section class="panel" style="margin-bottom:14px"><div class="section-title"><div><h2>Biblioteca visual</h2><p class="muted">El mismo atleta aparece en todas las imágenes para mantener coherencia visual.</p></div><button class="btn primary" data-exercise="pushup">Abrir ejercicio destacado</button></div></section>${exerciseCards(exercises)}`)}

  function exerciseDetail(){return shell(`${topbar('Flexiones de pecho ⭐','<div class="tags"><span class="tag red">☆ Pecho</span><span class="tag amber">☆ Tríceps</span><span class="tag blue">◉ Hombros</span><span class="tag">◈ Básico</span></div>')}<div class="detail-grid"><div class="content"><section class="panel exercise-hero"><div class="hero-grid"><div class="pose"><h3>POSICIÓN INICIAL</h3><img src="assets/exercises/pushup-start.jpg" alt="Posición inicial de la flexión"></div><div class="pose"><h3>POSICIÓN FINAL</h3><img src="assets/exercises/pushup-end.jpg" alt="Posición final de la flexión"></div><div class="arrow">→</div></div><div class="hero-note">Haz clic en las imágenes para alternar la secuencia técnica</div></section><div class="info-grid"><section class="panel"><h3>DESCRIPCIÓN</h3><ol class="steps"><li><span class="num">1</span><span>Colócate en posición de plancha con las manos un poco más anchas que los hombros.</span></li><li><span class="num">2</span><span>Mantén el cuerpo recto y activa el core.</span></li><li><span class="num">3</span><span>Flexiona los codos y baja el pecho hacia el suelo.</span></li><li><span class="num">4</span><span>Empuja con fuerza hasta volver a la posición inicial.</span></li><li><span class="num">5</span><span>Repite de manera controlada.</span></li></ol></section><section class="panel"><h3>MÚSCULOS PRINCIPALES</h3><img class="anatomy" src="assets/exercises/anatomy.jpg" alt="Músculos principales trabajados"><p class="muted" style="text-align:center">Pecho · Tríceps · Hombros anteriores</p></section><section class="panel"><div class="stats-grid"><div class="stat"><small>Nivel</small><b>Básico</b></div><div class="stat"><small>Tipo</small><b>Fuerza</b></div><div class="stat wide"><small>Equipo</small><b>Peso corporal</b></div><div class="stat"><small>Series</small><b>3 - 4</b></div><div class="stat"><small>Repeticiones</small><b>8 - 15</b></div><div class="stat wide"><small>Descanso</small><b>60 - 90 seg</b></div></div></section></div><section class="panel variations"><h3>VARIACIONES</h3><div class="variation-grid">${exercises.slice(1,5).map(x=>`<div class="variation-card" data-exercise="${x.id}"><img src="${x.img}" alt="${x.name}"><span>${x.name}</span></div>`).join('')}</div></section></div><aside class="side-stack"><section class="panel side-card"><h3>ALTERNATIVA SIN MATERIAL</h3><img src="assets/exercises/incline.jpg" alt="Flexiones inclinadas"><h4>Flexiones inclinadas</h4><p>Apoya las manos en una superficie elevada para reducir la intensidad.</p></section><section class="panel"><h3 style="color:var(--red)">ERRORES COMUNES</h3><ul class="list-clean"><li><span class="bad">⊗</span>No bajar lo suficiente</li><li><span class="bad">⊗</span>Elevar la cadera o arquear la espalda</li><li><span class="bad">⊗</span>Separar demasiado los codos</li><li><span class="bad">⊗</span>No controlar el movimiento</li></ul></section><section class="panel"><h3 style="color:var(--green)">CONSEJOS</h3><ul class="list-clean"><li><span class="good">✓</span>Mantén el core fuerte y el cuerpo en línea recta.</li><li><span class="good">✓</span>Inhala al bajar y exhala al subir.</li><li><span class="good">✓</span>Usa una variante más fácil si pierdes técnica.</li></ul></section><section class="panel"><h3>EQUIPO ALTERNATIVO</h3><div class="equipment-row"><div class="equip"><strong>🎒</strong>Mochila</div><div class="equip"><strong>🧴</strong>Botellas</div><div class="equip"><strong>🪑</strong>Mesa</div></div></section></aside></div>`)}

  function calendar(){const days=Array.from({length:28},(_,i)=>i+1);return shell(`${topbar('Calendario')}<section class="panel"><div class="section-title"><h2>Julio 2026</h2><button class="btn">+ Añadir rutina</button></div><div class="calendar-grid">${days.map(d=>`<div class="day ${[2,5,9,12,16,19,23,26].includes(d)?'active':''}"><b>${d}</b>${[2,9,16,23].includes(d)?'<p>Full body</p>':''}${[5,12,19,26].includes(d)?'<p>Torso</p>':''}</div>`).join('')}</div></section>`)}

  function workouts(){return shell(`${topbar('Entrenamientos')}<section class="cards"><article class="panel metric"><span class="tag green">HOY</span><h2>Fuerza en casa</h2><p class="muted">35 min · Nivel intermedio</p><button class="btn primary" id="completeBtn">Comenzar</button></article><article class="panel metric"><span class="tag">PRÓXIMO</span><h2>Pecho y tríceps</h2><p class="muted">28 min · Sin material</p><button class="btn">Ver rutina</button></article><article class="panel metric"><span class="tag amber">RÁPIDO</span><h2>7 Minute Workout</h2><p class="muted">12 ejercicios · HIIT</p><button class="btn" data-route="seven">Abrir</button></article></section>`)}

  function progress(){return shell(`${topbar('Progreso')}<section class="cards"><div class="panel metric"><span class="muted">Constancia mensual</span><b>82%</b><div class="progress"><span style="width:82%"></span></div></div><div class="panel metric"><span class="muted">Entrenos acumulados</span><b>${state.workouts}</b></div><div class="panel metric"><span class="muted">Mejor racha</span><b>15 días</b></div></section><section class="panel" style="margin-top:14px"><h2>Evolución</h2><p class="muted">Tu volumen de entrenamiento ha aumentado un 18% durante las últimas cuatro semanas.</p><div class="progress" style="height:18px"><span style="width:68%"></span></div></section>`)}

  function seven(){return shell(`${topbar('7 Minute Workout')}<section class="panel hero-banner"><div><span class="tag amber">HIIT · 7 MINUTOS</span><h1>Entrena todo el cuerpo</h1><p>12 ejercicios, 30 segundos de trabajo y 10 segundos de transición.</p><button class="btn primary" id="timerBtn">Iniciar temporizador</button><h2 id="timerDisplay">07:00</h2></div><img src="assets/exercises/explosive.jpg" alt="Entrenamiento rápido"></section>`)}

  function profile(){return shell(`${topbar('Perfil')}<section class="panel" style="max-width:720px"><h2>Datos personales</h2><label>Nombre<input id="nameInput" value="${escapeAttr(state.name)}" style="width:100%;margin:8px 0 16px;padding:12px;border-radius:10px;border:1px solid var(--line);background:#07111f;color:#fff"></label><label>Modelo visual<select id="sexInput" style="width:100%;margin:8px 0 16px;padding:12px;border-radius:10px;border:1px solid var(--line);background:#07111f;color:#fff"><option value="male" ${state.sex==='male'?'selected':''}>Atleta masculino</option><option value="female" ${state.sex==='female'?'selected':''}>Atleta femenino</option></select></label><button class="btn primary" id="saveProfile">Guardar perfil</button><p class="muted">La biblioteca visual está preparada para mantener el mismo atleta de forma consistente en todas las imágenes.</p></section>`)}

  function escapeHtml(v){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
  function escapeAttr(v){return escapeHtml(v);}
  function toast(msg){const el=document.createElement('div');el.className='toast';el.textContent=msg;document.body.appendChild(el);setTimeout(()=>el.remove(),2200)}

  function bind(){
    document.querySelectorAll('[data-route]').forEach(el=>el.addEventListener('click',()=>go(el.dataset.route)));
    document.querySelectorAll('[data-exercise]').forEach(el=>el.addEventListener('click',()=>{state.route='exercise-detail';state.exercise=el.dataset.exercise;save();render();window.scrollTo(0,0)}));
    const notify=document.getElementById('notifyBtn'); if(notify) notify.addEventListener('click',()=>toast('No tienes notificaciones nuevas'));
    const complete=document.getElementById('completeBtn'); if(complete) complete.addEventListener('click',()=>{state.workouts++;state.xp+=120;save();toast('+120 XP · Entrenamiento iniciado');render()});
    const saveProfile=document.getElementById('saveProfile'); if(saveProfile) saveProfile.addEventListener('click',()=>{const name=document.getElementById('nameInput').value.trim();state.name=name||'Nacho';state.sex=document.getElementById('sexInput').value;save();toast('Perfil guardado');render()});
    const timerBtn=document.getElementById('timerBtn'); if(timerBtn) timerBtn.addEventListener('click',startTimer);
    document.querySelectorAll('.pose img').forEach(img=>img.addEventListener('click',()=>{document.querySelectorAll('.pose img').forEach(i=>i.classList.toggle('dim'));}));
  }

  let timerId=null;
  function startTimer(){let remaining=420;const display=document.getElementById('timerDisplay');const btn=document.getElementById('timerBtn');if(timerId){clearInterval(timerId);timerId=null;btn.textContent='Reanudar';return}btn.textContent='Pausar';timerId=setInterval(()=>{remaining--;const m=String(Math.floor(remaining/60)).padStart(2,'0');const s=String(remaining%60).padStart(2,'0');if(display)display.textContent=`${m}:${s}`;if(remaining<=0){clearInterval(timerId);timerId=null;toast('¡Entrenamiento completado!');}},1000)}

  function render(){
    try{
      const route=state.route||'home';
      const views={home,calendar,workouts,exercises:exercisesPage,'exercise-detail':exerciseDetail,progress,seven,profile};
      root.innerHTML=(views[route]||home)();
      bind();
    }catch(error){
      console.error(error);
      root.innerHTML=`<div class="loading"><div><h1>No se pudo cargar NEO Trainer</h1><p>${escapeHtml(error.message||'Error desconocido')}</p><button class="btn primary" id="resetApp">Restablecer aplicación</button></div></div>`;
      document.getElementById('resetApp')?.addEventListener('click',()=>{try{localStorage.removeItem('neoTrainerV3')}catch(_){}location.reload()});
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',render); else render();
})();
