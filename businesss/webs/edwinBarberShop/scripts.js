/**
 * Edwin Stop Barber Shop - Lógica de Navegación
 */

/* eslint-env browser */

// Utilidad: Throttle para limitar la frecuencia de ejecución
const throttle = (func, limit) => {
  let inThrottle
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const mobileMenu = document.getElementById('mobile-menu')
  const navList = document.getElementById('nav-list')
  const navLinks = document.querySelectorAll('.nav-link, .nav-btn')
  const navbar = document.querySelector('.navbar')
  const scrollToTopBtn = document.getElementById('scroll-to-top')

  // 1. Abrir/Cerrar menú móvil
  if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
      navList.classList.toggle('active')

      // Animación del icono (Hamburguesa a X)
      const icon = mobileMenu.querySelector('i')
      if (icon) {
        if (navList.classList.contains('active')) {
          icon.classList.replace('fa-bars', 'fa-times')
        } else {
          icon.classList.replace('fa-times', 'fa-bars')
        }
      }
    })
  }

  // 2. Cerrar menú automáticamente al hacer clic en un enlace (para móviles)
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navList.classList.remove('active')
      const icon = mobileMenu?.querySelector('i')
      if (icon) {
        icon.classList.replace('fa-times', 'fa-bars')
      }
    })
  })

  // 4. Scroll suave (Smooth Scroll) para navegadores antiguos
  navLinks.forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href')

      // Solo si es un enlace interno (comienza con #)
      if (href.startsWith('#')) {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }
    })
  })

  // 3 & 5. Consolidar listeners de scroll con throttle para mejor rendimiento
  const handleScroll = throttle(() => {
    const scrollY = window.scrollY

    // Efecto de scroll en la Navbar
    if (navbar) {
      if (scrollY > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)'
        navbar.style.height = '60px'
      } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)'
        navbar.style.height = '70px'
      }
    }

    // Mostrar/ocultar botón Scroll to Top
    if (scrollToTopBtn) {
      if (scrollY > 300) {
        scrollToTopBtn.classList.add('active')
      } else {
        scrollToTopBtn.classList.remove('active')
      }
    }
  }, 150)

  window.addEventListener('scroll', handleScroll)

  // Al hacer clic en el botón scroll-to-top, volver al top
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    })
  }
})

// Efecto de aparición al hacer scroll con Intersection Observer
const initScrollReveal = () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Se activa cuando el 15% es visible
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active')
        // Una vez que aparece, dejamos de observarlo para ahorrar recursos
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  const elementsToReveal = document.querySelectorAll('.reveal')

  elementsToReveal.forEach((el) => observer.observe(el))
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal)
} else {
  initScrollReveal()
}
