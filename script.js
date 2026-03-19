// ═══════════════════════════════════════════
// Vishwas Sharma — Portfolio Scripts v4
// 3D Tilt + Three.js + Particles + Enhanced UX
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
  if (window.update3DColors) window.update3DColors(theme);
}

function toggleTheme() {
  const current = html.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
}

setTheme(getPreferredTheme());

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

// ═══ Reveal on scroll with stagger ═══
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

// ═══ Counter Animation ═══
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.dataset.target);
      const duration = 1500;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.round(eased * target);
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }

      requestAnimationFrame(updateCounter);
      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));

// ═══════════════════════════════════════════
// 3D TILT CARD EFFECT
// ═══════════════════════════════════════════
(function initTiltCards() {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) return; // Skip on touch devices

  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6; // max 6deg
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
})();

// ═══════════════════════════════════════════
// SCROLL-DRIVEN FLOATING SHAPES PARALLAX
// ═══════════════════════════════════════════
(function initShapesParallax() {
  const shapes = document.querySelectorAll('.float-shape');
  if (!shapes.length) return;

  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const scrollY = window.pageYOffset;
      const vh = window.innerHeight;
      const scrollFactor = scrollY / vh;

      shapes.forEach((shape, i) => {
        const speed = 0.3 + (i * 0.15);
        const yOffset = scrollFactor * speed * -60;
        const xOffset = Math.sin(scrollFactor * (1 + i * 0.3)) * 15;
        const rotate = scrollFactor * (10 + i * 8);

        shape.style.setProperty('--parallax-y', `${yOffset}px`);
        shape.style.setProperty('--parallax-x', `${xOffset}px`);
        shape.style.setProperty('--parallax-r', `${rotate}deg`);
        shape.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${rotate}deg)`;
      });

      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ═══════════════════════════════════════════
// THREE.JS — Animated 3D Wireframe Scene
// ═══════════════════════════════════════════
(function init3D() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const container = canvas.closest('.hero');
  if (!container) return;
  let width = canvas.clientWidth || container.clientWidth;
  let height = canvas.clientHeight || container.clientHeight;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.z = 7;
  camera.position.x = 1.5;

  // ═══ Color Palettes ═══
  const palettes = {
    dark: {
      primary: 0x7c6cf0,
      secondary: 0x5eead4,
      wireframe: 0x7c6cf0,
      particles: 0x5eead4,
    },
    light: {
      primary: 0x5b4dc7,
      secondary: 0x0d9488,
      wireframe: 0x5b4dc7,
      particles: 0x0d9488,
    }
  };

  function getCurrentPalette() {
    return html.getAttribute('data-theme') === 'light' ? palettes.light : palettes.dark;
  }

  // ═══ Main wireframe icosahedron ═══
  const icoGeo = new THREE.IcosahedronGeometry(2.2, 1);
  const icoMat = new THREE.MeshBasicMaterial({
    color: getCurrentPalette().wireframe,
    wireframe: true,
    transparent: true,
    opacity: 0.2,
  });
  const icosahedron = new THREE.Mesh(icoGeo, icoMat);
  scene.add(icosahedron);

  // ═══ Inner solid icosahedron ═══
  const innerGeo = new THREE.IcosahedronGeometry(2.18, 1);
  const innerMat = new THREE.MeshBasicMaterial({
    color: getCurrentPalette().primary,
    transparent: true,
    opacity: 0.02,
  });
  const innerMesh = new THREE.Mesh(innerGeo, innerMat);
  scene.add(innerMesh);

  // ═══ Outer ring (torus) ═══
  const torusGeo = new THREE.TorusGeometry(3.2, 0.012, 16, 120);
  const torusMat = new THREE.MeshBasicMaterial({
    color: getCurrentPalette().secondary,
    transparent: true,
    opacity: 0.18,
  });
  const torus = new THREE.Mesh(torusGeo, torusMat);
  torus.rotation.x = Math.PI / 2.5;
  scene.add(torus);

  // ═══ Second ring ═══
  const torus2Geo = new THREE.TorusGeometry(3.6, 0.008, 16, 100);
  const torus2Mat = new THREE.MeshBasicMaterial({
    color: getCurrentPalette().primary,
    transparent: true,
    opacity: 0.1,
  });
  const torus2 = new THREE.Mesh(torus2Geo, torus2Mat);
  torus2.rotation.x = Math.PI / 1.8;
  torus2.rotation.y = Math.PI / 4;
  scene.add(torus2);

  // ═══ Third ring for depth ═══
  const torus3Geo = new THREE.TorusGeometry(2.8, 0.006, 16, 80);
  const torus3Mat = new THREE.MeshBasicMaterial({
    color: getCurrentPalette().secondary,
    transparent: true,
    opacity: 0.08,
  });
  const torus3 = new THREE.Mesh(torus3Geo, torus3Mat);
  torus3.rotation.x = Math.PI / 3;
  torus3.rotation.z = Math.PI / 5;
  scene.add(torus3);

  // ═══ Small orbiting wireframe dodecahedron ═══
  const dodGeo = new THREE.DodecahedronGeometry(0.5, 0);
  const dodMat = new THREE.MeshBasicMaterial({
    color: getCurrentPalette().secondary,
    wireframe: true,
    transparent: true,
    opacity: 0.25,
  });
  const dodecahedron = new THREE.Mesh(dodGeo, dodMat);
  scene.add(dodecahedron);

  // ═══ Floating particles ═══
  const particleCount = 150;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = [];

  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 2.5 + Math.random() * 2;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    velocities.push({
      x: (Math.random() - 0.5) * 0.004,
      y: (Math.random() - 0.5) * 0.004,
      z: (Math.random() - 0.5) * 0.004,
    });
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMat = new THREE.PointsMaterial({
    color: getCurrentPalette().particles,
    size: 0.025,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // ═══ Mouse interaction ═══
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // ═══ Update colors on theme change ═══
  window.update3DColors = function (theme) {
    const p = theme === 'light' ? palettes.light : palettes.dark;
    icoMat.color.setHex(p.wireframe);
    innerMat.color.setHex(p.primary);
    torusMat.color.setHex(p.secondary);
    torus2Mat.color.setHex(p.primary);
    torus3Mat.color.setHex(p.secondary);
    dodMat.color.setHex(p.secondary);
    particleMat.color.setHex(p.particles);
  };

  // ═══ Animation loop ═══
  let animationId;
  let time = 0;

  function animate() {
    animationId = requestAnimationFrame(animate);
    time += 0.01;

    // Smooth mouse follow
    targetX += (mouseX * 0.3 - targetX) * 0.05;
    targetY += (mouseY * 0.3 - targetY) * 0.05;

    // Rotate icosahedron
    icosahedron.rotation.x += 0.003;
    icosahedron.rotation.y += 0.005;
    icosahedron.rotation.x += targetY * 0.02;
    icosahedron.rotation.y += targetX * 0.02;

    innerMesh.rotation.copy(icosahedron.rotation);

    // Rotate rings
    torus.rotation.z += 0.004;
    torus2.rotation.z -= 0.003;
    torus3.rotation.z += 0.002;
    torus3.rotation.x += 0.001;

    // Orbit dodecahedron
    dodecahedron.position.x = Math.cos(time * 0.5) * 4;
    dodecahedron.position.y = Math.sin(time * 0.7) * 1.5;
    dodecahedron.position.z = Math.sin(time * 0.5) * 2;
    dodecahedron.rotation.x += 0.02;
    dodecahedron.rotation.y += 0.015;

    // Animate particles
    const pos = particleGeo.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] += velocities[i].x;
      pos[i * 3 + 1] += velocities[i].y;
      pos[i * 3 + 2] += velocities[i].z;

      const dist = Math.sqrt(pos[i * 3] ** 2 + pos[i * 3 + 1] ** 2 + pos[i * 3 + 2] ** 2);
      if (dist > 5 || dist < 2) {
        velocities[i].x *= -1;
        velocities[i].y *= -1;
        velocities[i].z *= -1;
      }
    }
    particleGeo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();

  // ═══ Resize ═══
  window.addEventListener('resize', () => {
    width = canvas.clientWidth || container.clientWidth;
    height = canvas.clientHeight || container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });

  // ═══ Pause when not visible ═══
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!animationId) animate();
      } else {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    });
  }, { threshold: 0.1 });

  heroObserver.observe(container);

  requestAnimationFrame(() => {
    width = canvas.clientWidth || container.clientWidth;
    height = canvas.clientHeight || container.clientHeight;
    if (width && height) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
  });
})();

// ═══════════════════════════════════════════
// PARTICLE BACKGROUND CANVAS
// ═══════════════════════════════════════════
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 50;
  let animId;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }
  }

  function getColor() {
    return html.getAttribute('data-theme') === 'light'
      ? '91, 77, 199'
      : '124, 108, 240';
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const color = getColor();

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = p.x - particles[j].x;
        const dy = p.y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${color}, ${0.06 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });

    animId = requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });
})();

// ═══════════════════════════════════════════
// SCROLL-DRIVEN BACKGROUND ANIMATIONS
// ═══════════════════════════════════════════
(function initScrollBg() {
  const scrollBg = document.getElementById('scrollBg');
  if (!scrollBg) return;

  const orb1 = scrollBg.querySelector('.scroll-orb-1');
  const orb2 = scrollBg.querySelector('.scroll-orb-2');
  const orb3 = scrollBg.querySelector('.scroll-orb-3');
  const grid = scrollBg.querySelector('.scroll-grid');

  const maxOpacityDark = 0.07;
  const maxOpacityLight = 0.045;
  const gridMaxOpacity = 0.35;

  function getMaxOpacity() {
    return html.getAttribute('data-theme') === 'light' ? maxOpacityLight : maxOpacityDark;
  }

  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const scrollY = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min(scrollY / docHeight, 1);
      const maxOp = getMaxOpacity();

      const fadeStart = 0.05;
      const fadeFull = 0.2;
      const orbFade = Math.max(0, Math.min((scrollPercent - fadeStart) / (fadeFull - fadeStart), 1));

      const o1 = orbFade * maxOp;
      orb1.style.opacity = o1;
      orb1.style.transform = `translate(${scrollPercent * 120}px, ${Math.sin(scrollPercent * Math.PI * 2) * 40}px)`;

      const o2phase = Math.max(0, Math.min((scrollPercent - 0.1) / 0.15, 1));
      orb2.style.opacity = o2phase * maxOp;
      orb2.style.transform = `translate(${-scrollPercent * 80}px, ${Math.cos(scrollPercent * Math.PI * 1.5) * 60}px)`;

      const o3phase = Math.max(0, Math.min((scrollPercent - 0.25) / 0.2, 1));
      orb3.style.opacity = o3phase * maxOp * 0.7;
      orb3.style.transform = `translate(${Math.sin(scrollPercent * Math.PI * 3) * 50}px, ${-scrollPercent * 60}px)`;

      const gridPhase = Math.max(0, Math.min((scrollPercent - 0.08) / 0.12, 1));
      const gridFadeOut = Math.max(0, 1 - Math.max(0, (scrollPercent - 0.7) / 0.3));
      grid.style.opacity = gridPhase * gridFadeOut * gridMaxOpacity;
      grid.style.transform = `translateY(${-scrollPercent * 30}px)`;

      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
