// ── TYPEWRITER ──
const phrases = [
  'AI & Data Science Enthusiast',
  'ML Engineer in the Making',
  'NLP & LLM Developer',
  'Open Source Contributor',
  'Full-Stack AI Builder',
];
let pi = 0, ci = 0, deleting = false;
const el = document.getElementById('typewriter');

function type() {
  const phrase = phrases[pi];
  el.textContent = deleting ? phrase.slice(0, --ci) : phrase.slice(0, ++ci);
  let delay = deleting ? 40 : 80;
  if (!deleting && ci === phrase.length) { delay = 1800; deleting = true; }
  else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 300; }
  setTimeout(type, delay);
}
// Start when DOM is ready
if (el) { type(); }

// ── SCROLL REVEAL ──
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ── NAV SHADOW ON SCROLL ──
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  nav.style.boxShadow = window.scrollY > 20 ? '0 4px 30px rgba(0,0,0,0.4)' : 'none';
});
