// ═══════════════════════════════════════════
// Vishwas Sharma — Portfolio Scripts
// ═══════════════════════════════════════════

// ═══ Theme Toggle ═══
const html = document.documentElement;
const toggleDesktop = document.getElementById('themeToggle');
const toggleMobile = document.getElementById('themeToggleMobile');

function getPreferredTheme() {
  const stored = (() => {
    try { return localStorage.getItem('vs-theme'); } catch (e) { return null; }
  })();
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  try { localStorage.setItem('vs-theme', theme); } catch (e) { }
}

function toggleTheme() {
  const current = html.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
}

// Init theme
setTheme(getPreferredTheme());

// Bind both toggles
[toggleDesktop, toggleMobile].forEach(el => {
  if (el) {
    el.addEventListener('click', toggleTheme);
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
      }
    });
  }
});

// Listen for system preference changes
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
  const stored = (() => {
    try { return localStorage.getItem('vs-theme'); } catch (e) { return null; }
  })();
  if (!stored) setTheme(e.matches ? 'light' : 'dark');
});

// ═══ Navbar scroll effect ═══
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ═══ Hamburger menu ═══
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ═══ Reveal on scroll ═══
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// ═══ Smooth scroll ═══
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(targetId);
    if (target) {
      const navHeight = nav.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

// ═══ Active nav link highlighting ═══
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

function highlightNav() {
  const scrollY = window.pageYOffset;
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + sectionId) {
          a.style.color = 'var(--text-primary)';
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNav);
