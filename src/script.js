/* =========================================================
   script.js
   1. Menú móvil (hamburguesa)
   2. Resaltado de sección activa al hacer scroll
   3. Año dinámico en el footer
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. MENÚ MÓVIL
     --------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Cierra el menú al hacer clic en un enlace (útil en móvil)
    primaryNav.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        primaryNav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------------------------------------------------
     2. RESALTAR SECCIÓN ACTIVA AL HACER SCROLL
     --------------------------------------------------------- */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = Array.from(navLinks)
    .map((link) => document.getElementById(link.dataset.section))
    .filter(Boolean);

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.dataset.section === id);
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    const visibleSections = new Map();

    const updateActiveLink = () => {
      const visible = sections
        .filter((section) => visibleSections.has(section.id))
        .sort((a, b) => {
          const ratioDifference =
            visibleSections.get(b.id) - visibleSections.get(a.id);

          return ratioDifference || sections.indexOf(a) - sections.indexOf(b);
        })[0];

      if (visible) {
        setActiveLink(visible.id);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        updateActiveLink();
      },
      {
        root: null,
        rootMargin: '-40% 0px -50% 0px', // activa la sección cuando cruza el centro de la pantalla
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* ---------------------------------------------------------
     3. AÑO DINÁMICO EN EL FOOTER
     --------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
