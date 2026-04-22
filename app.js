/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const ARSENAL = [
  { icon:'🪟', name:'Windows 10/11', tier:'ÉPIQUE', cat:'sys', desc:'Maîtrise avancée — déploiement, masterisation, dépannage avancé.' },
  { icon:'🏰', name:'Active Directory', tier:'RARE', cat:'sys', desc:'Gestion des comptes utilisateurs, OU, groupes de sécurité et droits d\'accès LDAP.' },
  { icon:'📦', name:'Office 365', tier:'ÉPIQUE', cat:'sys', desc:'Suite complète — Outlook, Teams, SharePoint, OneDrive, Support utilisateurs.' },
  { icon:'🎫', name:'EasyVista', tier:'ÉPIQUE', cat:'sys', desc:'ITSM — création, suivi, résolution et reporting d\'incidents. Ticketing avancé.' },
  { icon:'📊', name:'Systrack', tier:'COMMUN', cat:'sys', desc:'Monitoring et analyse de performance du parc informatique en temps réel.' },
  { icon:'🖨️', name:'UniFLOW', tier:'COMMUN', cat:'sys', desc:'Gestion du parc d\'impression, comptabilité des impressions et droits utilisateurs.' },
  { icon:'🌐', name:'VPN', tier:'COMMUN', cat:'net', desc:'Configuration, déploiement et support des accès VPN pour utilisateurs distants.' },
  { icon:'💻', name:'Citrix', tier:'COMMUN', cat:'net', desc:'Virtualisation \'applications, accès distant sécurisé, sessions publiées.' },
  { icon:'☎️', name:'Téléphonie IP', tier:'COMMUN', cat:'net', desc:'Installation et configuration de téléphones IP et boîtiers QoE en environnement bancaire.' },
  { icon:'🔊', name:'Softophonie', tier:'COMMUN', cat:'net', desc:'Logiciel de gestion de la téléphonie IP en environnement bancaire Crédit Agricole.' },
  { icon:'🚀', name:'SCCM', tier:'RARE', cat:'dep', desc:'Déploiement applicatif centralisé, mises à jour, gestion du parc à grande échelle.' },
  { icon:'📱', name:'Intune', tier:'RARE', cat:'dep', desc:'MDM — politiques de conformité, gestion mobile Android / Windows.' },
  /*{ icon:'⚙', name:'PowerShell', tier:'COMMUN', cat:'dep', desc:'Scripts d\'administration système, automatisation, gestion Active Directory.' },*/
  { icon:'✨', name:'JavaScript', tier:'COMMUN', cat:'code', desc:'1 ans et demi de pratique en développement front-end.' },
  { icon:'💚', name:'Vue.js / Nuxt', tier:'COMMUN', cat:'code', desc:'Framework JS principal — composants, routing, rendu côté serveur avec Nuxt.js.' },
  { icon:'⚛️', name:'React', tier:'COMMUN', cat:'code', desc:'Développement de composants UI réactifs et applications single-page.' },
];

const TIER_COLOR = {
  'LÉGENDAIRE': '#ffd700',
  'ÉPIQUE':     '#c084fc',
  'RARE':       '#60a5fa',
  'COMMUN':     '#6b7280',
};

const BOOT_LINES = [
  { text: '> INITIALISATION DU NOYAU SYSTÈME…', cls: '' },
  { text: '> CHARGEMENT DES MODULES DE SÉCURITÉ… OK', cls: 'ok' },
  { text: '> VÉRIFICATION DES ACCRÉDITATIONS N2… VALIDÉ', cls: 'ok' },
  { text: '> SYNCHRONISATION DES DONNÉES OPÉRATEUR…', cls: '' },
  { text: '> CALIBRAGE DE L\'INTERFACE NEURALE… OK', cls: 'ok' },
  { text: '> MONTAGE DU DOSSIER DELAHAYE-JEREMY-001… OK', cls: 'ok' },
  { text: '> SYSTÈME PRÊT — CLEARANCE LEVEL: N2', cls: 'ok' },
];

/* ══════════════════════════════════════════
   GRID CANVAS
══════════════════════════════════════════ */
(function initGrid() {
  const canvas = document.getElementById('grid-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(0,255,136,0.07)';
    ctx.lineWidth   = 0.5;
    const STEP = 48;
    for (let x = 0; x < W; x += STEP) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += STEP) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    // Horizon glow
    const grad = ctx.createRadialGradient(W/2, H*0.15, 0, W/2, H*0.15, W*0.6);
    grad.addColorStop(0,   'rgba(0,255,136,0.04)');
    grad.addColorStop(1,   'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  }
  draw();
  window.addEventListener('resize', draw);
})();

/* ══════════════════════════════════════════
   BOOT SEQUENCE
══════════════════════════════════════════ */
(function boot() {
  const fill   = document.getElementById('boot-fill');
  const pct    = document.getElementById('boot-pct');
  const log    = document.getElementById('boot-log');
  const bootEl = document.getElementById('boot');
  const nav    = document.getElementById('nav');
  let progress = 0;
  let lineIdx  = 0;

  const steps = [
    { target: 15,  line: 0 },
    { target: 30,  line: 1 },
    { target: 50,  line: 2 },
    { target: 65,  line: 3 },
    { target: 80,  line: 4 },
    { target: 92,  line: 5 },
    { target: 100, line: 6 },
  ];
  let stepIdx = 0;

  function addLine(idx) {
    const { text, cls } = BOOT_LINES[idx];
    const span = document.createElement('span');
    span.className = 'boot-log-line' + (cls ? ' ' + cls : '');
    span.textContent = text;
    log.appendChild(span);
  }

  function tick() {
    if (stepIdx >= steps.length) {
      setTimeout(() => {
        bootEl.classList.add('out');
        nav.classList.add('show');
        // Trigger xp bar
        setTimeout(() => {
          document.getElementById('xp-fill').classList.add('go');
        }, 400);
        // Set dynamic guilds count
        const guildsLabel = Array.from(document.querySelectorAll('.cube-l')).find(el => el.textContent.trim() === 'GUILDES');
        if (guildsLabel) {
          const numGroups = document.querySelectorAll('.skill-group').length;
          guildsLabel.previousElementSibling.dataset.target = numGroups;
        }
        // Animate counters
        setTimeout(animateCounters, 600);
        // Animate skill bars
        setTimeout(animateBars, 800);
      }, 400);
      return;
    }
    const step = steps[stepIdx++];
    const inc = (step.target - progress) / 12;
    let cur = progress;
    const interval = setInterval(() => {
      cur = Math.min(cur + inc, step.target);
      fill.style.width = cur + '%';
      pct.textContent  = Math.round(cur) + '%';
      if (cur >= step.target) {
        clearInterval(interval);
        progress = step.target;
        if (step.line < BOOT_LINES.length) addLine(step.line);
        setTimeout(tick, 180 + Math.random() * 120);
      }
    }, 18);
  }
  setTimeout(tick, 400);
})();

/* ══════════════════════════════════════════
   CLOCK
══════════════════════════════════════════ */
function updateClock() {
  const now = new Date();
  const t   = [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map(n => String(n).padStart(2, '0')).join(':');
  const el = document.getElementById('nav-time');
  if (el) el.textContent = t;
}
setInterval(updateClock, 1000);
updateClock();

/* ══════════════════════════════════════════
   COUNTER ANIMATION
══════════════════════════════════════════ */
function animateCounters() {
  document.querySelectorAll('.cube-n').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1200;
    const start = performance.now();
    function step(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
      el.textContent = Math.round(eased * target);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

/* ══════════════════════════════════════════
   SKILL BARS
══════════════════════════════════════════ */
function animateBars() {
  document.querySelectorAll('.sbar-fill').forEach(el => {
    el.style.width = el.style.getPropertyValue('--w') || '0%';
  });
}

/* ══════════════════════════════════════════
   ARSENAL BUILD
══════════════════════════════════════════ */
(function buildArsenal() {
  const grid   = document.getElementById('arsenal-grid');
  const detail = document.getElementById('arsenal-detail');
  let active = -1;

  ARSENAL.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'arsenal-item';
    el.dataset.cat = item.cat;
    el.innerHTML = `
      <span class="ai-icon">${item.icon}</span>
      <span class="ai-name">${item.name}</span>
      <span class="ai-tier" style="color:${TIER_COLOR[item.tier]}">${item.tier}</span>`;
    el.onclick = () => {
      if (active === i) {
        el.classList.remove('active');
        detail.classList.remove('show');
        active = -1; return;
      }
      document.querySelectorAll('.arsenal-item').forEach(x => x.classList.remove('active'));
      el.classList.add('active');
      active = i;
      document.getElementById('ad-icon').textContent = item.icon;
      document.getElementById('ad-name').textContent = item.name;
      document.getElementById('ad-tier').textContent = item.tier;
      document.getElementById('ad-tier').style.color = TIER_COLOR[item.tier];
      document.getElementById('ad-desc').textContent = item.desc;
      detail.classList.add('show');
    };
    grid.appendChild(el);
  });

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.arsenal-item').forEach(el => {
        el.classList.toggle('hidden', filter !== 'all' && el.dataset.cat !== filter);
      });
      // Close detail on filter change
      detail.classList.remove('show');
      document.querySelectorAll('.arsenal-item').forEach(x => x.classList.remove('active'));
      active = -1;
    };
  });
})();

/* ══════════════════════════════════════════
   MISSION TOGGLE
══════════════════════════════════════════ */
function toggleMission(item) {
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.mission-item').forEach(m => m.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

/* ══════════════════════════════════════════
   SCROLL OBSERVER
══════════════════════════════════════════ */
const navLinks = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      const id = '#' + e.target.id;
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
    }
  });
}, { threshold: 0.1, rootMargin: '-52px 0px 0px 0px' });

document.querySelectorAll('.panel').forEach(p => observer.observe(p));

navLinks.forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ══════════════════════════════════════════
   TOAST
══════════════════════════════════════════ */
function toast(msg, duration = 2800) {
  const zone = document.getElementById('toast-zone');
  const el   = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  zone.appendChild(el);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('show')));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 300);
  }, duration);
}

/* ══════════════════════════════════════════
   RANDOM GLITCH
══════════════════════════════════════════ */
(function glitchEffect() {
  function triggerGlitch() {
    const el = document.getElementById('glitch-overlay');
    el.style.cssText = `
      position:fixed;inset:0;z-index:998;pointer-events:none;
      background: repeating-linear-gradient(0deg,
        transparent, transparent 2px,
        rgba(0,255,136,0.03) 2px, rgba(0,255,136,0.03) 4px);
      animation: none;
      opacity:1;
    `;
    setTimeout(() => { el.style.opacity = '0'; }, 80);
    setTimeout(scheduleGlitch, 4000 + Math.random() * 8000);
  }
  function scheduleGlitch() {
    setTimeout(triggerGlitch, Math.random() * 6000);
  }
  setTimeout(scheduleGlitch, 3000);
})();
