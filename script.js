/* ============================================================
   SCRIPT COMPARTIDO — Portafolio Daniel Gómez
   ============================================================
   Este archivo se incluye en TODAS las páginas. Contiene:
   1) Apertura/cierre del menú hamburguesa en móvil
   2) Animación de "aparecer al hacer scroll" (.reveal)
   3) Una pequeña utilidad para animar contadores numéricos
   4) Fondo de partículas conectadas (canvas)
   5) Transición de "cortina" al navegar entre páginas
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

  /* ── 4. FONDO DE PARTÍCULAS CONECTADAS (canvas) ────────────
     Dibuja puntos finos que flotan lentamente y se conectan con
     líneas cuando están cerca entre sí. Reaccionan muy sutilmente
     al mouse (se alejan un poco), dando sensación de profundidad
     sin distraer del contenido.

     Parámetros que puedes ajustar:
     - NUM_PARTICLES: cuántos puntos hay (más = más denso)
     - MAX_DIST: distancia máxima para dibujar una línea entre dos puntos
     - color del punto/línea: busca "rgba(47,127,240" más abajo */
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, particles = [];
    const NUM_PARTICLES = 55;
    const MAX_DIST = 130;
    const mouse = { x: -9999, y: -9999 };

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function makeParticle() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.4 + 0.6,
      };
    }

    function initParticles() {
      resizeCanvas();
      particles = Array.from({ length: NUM_PARTICLES }, makeParticle);
    }

    function tick() {
      ctx.clearRect(0, 0, width, height);

      // Mover y dibujar cada partícula
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        // Rebote suave en los bordes de la pantalla
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Pequeño efecto de repulsión cerca del cursor
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) { p.x -= dx * 0.012; p.y -= dy * 0.012; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(47,127,240,0.35)'; // azul de marca, semitransparente
        ctx.fill();
      });

      // Conectar partículas cercanas con líneas finas
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < MAX_DIST) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(216,173,77,${(1 - dist / MAX_DIST) * 0.18})`; // dorado, se desvanece con la distancia
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(tick);
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

    initParticles();
    tick();
  }

  /* ── 5. TRANSICIÓN DE CORTINA ENTRE PÁGINAS ────────────────
     Da la sensación de que las 5 páginas están "conectadas" en
     vez de sentirse como recargas secas del navegador.

     a) Al cargar la página: la cortina (#page-transition) ya
        está pintada en el HTML y cubre toda la pantalla. Apenas
        carga el JS, le añadimos la clase "leaving" para que se
        deslice hacia arriba y revele el contenido (ver @keyframes
        curtainLeave en style.css).

     b) Al hacer clic en un link interno (misma carpeta, .html):
        en vez de navegar inmediatamente, mostramos la cortina
        (clase "entering"), esperamos a que termine su animación
        (~450ms) y RECIÉN AHÍ cambiamos de página con
        window.location.href. Así el usuario nunca ve un salto
        brusco a blanco.

     Si una página no tiene el div #page-transition en su HTML,
     este bloque no hace nada (no rompe el sitio). */
  const curtain = document.getElementById('page-transition');
  if (curtain) {
    // BUG CORREGIDO: un solo requestAnimationFrame a veces se funde con el
    // primer "paint" del navegador y la animación CSS nunca se dispara
    // (la cortina se queda pegada cubriendo la pantalla). La solución es
    // un DOBLE requestAnimationFrame: el primero espera a que el navegador
    // pinte el estado inicial (cortina cubriendo todo), el segundo recién
    // agrega la clase que dispara la animación de salida.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => curtain.classList.add('leaving'));
    });

    // Red de seguridad: si por lo que sea la animación no corre (navegador
    // raro, error de CSS, etc.), forzamos que la cortina se oculte sola
    // pasado un segundo para que el sitio nunca se quede tapado.
    setTimeout(() => {
      curtain.style.transform = 'translateY(-100%)';
      curtain.style.transition = 'transform 0.4s ease';
    }, 1000);

    // Intercepta clics en links internos del sitio para animar la salida
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        // Solo interceptamos links que abren en la misma pestaña
        if (link.target === '_blank') return;

        e.preventDefault();
        curtain.classList.remove('leaving');
        curtain.classList.add('entering');
        setTimeout(() => { window.location.href = href; }, 450);
      });
    });
  }

});

