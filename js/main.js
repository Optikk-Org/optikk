(function() {
  // ── Sticky nav ──────────────────────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // ── Fade-in on scroll ───────────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ── Product tour tabs ───────────────────────────
  document.querySelectorAll('.tour-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      document.querySelectorAll('.tour-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tour-screen').forEach(s => s.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector(`[data-screen="${target}"]`).classList.add('active');
    });
  });

  // ── SDK code tabs ───────────────────────────────
  const filenames = { go: 'main.go', python: 'main.py', java: 'Main.java' };
  document.querySelectorAll('.sdk-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const lang = tab.dataset.lang;
      document.querySelectorAll('.sdk-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.code-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector(`[data-panel="${lang}"]`).classList.add('active');
      document.getElementById('sdk-filename').textContent = filenames[lang];
    });
  });

  // ── Smooth anchor scroll ────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
