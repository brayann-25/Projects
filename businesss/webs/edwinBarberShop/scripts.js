/**
 * Edwin Stop Barber Shop - Lógica de Navegación e Interacciones
 */

/* eslint-env browser */

// Utilidad: Throttle para limitar la frecuencia de ejecución y mejorar el rendimiento
const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = document.getElementById("mobile-menu");
  const navList = document.getElementById("nav-list");
  const navLinks = document.querySelectorAll(".nav-link, .nav-btn");
  const navbar = document.querySelector(".navbar");
  const scrollToTopBtn = document.getElementById("scroll-to-top");

  // 1. Abrir/Cerrar menú móvil
  if (mobileMenu) {
    mobileMenu.addEventListener("click", () => {
      navList.classList.toggle("active");

      // Animación del icono (Hamburguesa a X)
      const icon = mobileMenu.querySelector("i");
      if (icon) {
        if (navList.classList.contains("active")) {
          icon.classList.replace("fa-bars", "fa-times");
        } else {
          icon.classList.replace("fa-times", "fa-bars");
        }
      }
    });
  }

  // 2. Cerrar menú automáticamente al hacer clic en un enlace (para móviles)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("active");
      const icon = mobileMenu?.querySelector("i");
      if (icon) {
        icon.classList.replace("fa-times", "fa-bars");
      }
    });
  });

  // 3. Scroll suave (Smooth Scroll) con ajuste para el Navbar Fijo
  navLinks.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Solo si es un enlace interno (comienza con # y no está vacío)
      if (href.startsWith("#") && href !== "#") {
        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          // Altura exacta de tu navbar para que no tape el título de la sección
          const navbarHeight = 70;

          // Calculamos la posición real restando el navbar
          const targetPosition =
            target.getBoundingClientRect().top + window.scrollY - navbarHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // 4. Consolidar listeners de scroll con throttle (Sombra del Nav y Botón Arriba)
  const handleScroll = throttle(() => {
    const scrollY = window.scrollY;

    // Efecto de scroll en la Navbar
    if (navbar) {
      if (scrollY > 50) {
        navbar.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
        navbar.style.height = "60px"; // Se hace un poco más fino al hacer scroll
      } else {
        navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
        navbar.style.height = "70px"; // Vuelve a su tamaño original
      }
    }

    // Mostrar/ocultar botón Scroll to Top
    if (scrollToTopBtn) {
      if (scrollY > 300) {
        scrollToTopBtn.classList.add("active");
      } else {
        scrollToTopBtn.classList.remove("active");
      }
    }
  }, 150);

  window.addEventListener("scroll", handleScroll);

  // 5. Al hacer clic en el botón scroll-to-top, volver arriba del todo
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});

// 6. Efecto de aparición al hacer scroll (Intersection Observer)
const initScrollReveal = () => {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15, // Se activa cuando el 15% del elemento es visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // Una vez que aparece, dejamos de observarlo para ahorrar recursos de memoria
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToReveal = document.querySelectorAll(".reveal");
  elementsToReveal.forEach((el) => observer.observe(el));
};

// Ejecutar cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initScrollReveal);
} else {
  initScrollReveal();
}
