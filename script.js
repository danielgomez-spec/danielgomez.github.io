/* ============================================================
   SCRIPT COMPARTIDO — Portafolio Daniel Gómez
   ============================================================
   Este archivo se incluye en TODAS las páginas. Contiene:
   1) Apertura/cierre del menú hamburguesa en móvil
   2) Animación de "aparecer al hacer scroll" (.reveal)
   3) Una pequeña utilidad para animar contadores numéricos
   Cada página puede tener, además, su propio <script> con
   lógica específica de esa página (ej: filtros de proyectos).
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. MENÚ HAMBURGUESA (solo visible en móvil) ──────────
     Busca el botón ".nav-toggle" y la lista ".nav-links" y
     alterna la clase "open" para mostrar/ocultar en pantallas
     pequeñas. Si tu página no tiene estos elementos, esto no
     hace nada (no rompe nada). */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    // Cierra el menú al hacer clic en un link (mejor experiencia móvil)
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }

  /* ── 2. SCROLL REVEAL ──────────────────────────────────────
     IntersectionObserver "observa" cada elemento con clase
     .reveal. Cuando el elemento entra en el viewport (threshold
     0.15 = 15% visible), le añade la clase "visible", que en
     style.css dispara la transición de opacidad y posición. */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // Solo se anima una vez
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── 3. CONTADORES ANIMADOS ───────────────────────────────
     Cualquier elemento con [data-count="N"] cuenta desde 0
     hasta N cuando aparece en pantalla. Útil para estadísticas
     tipo "6+ Proyectos". Se usa en index.html. */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 40)); // ~40 frames de animación
        const interval = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(interval); }
          el.textContent = current + '+';
        }, 35);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(el => counterObserver.observe(el));
  }

});
