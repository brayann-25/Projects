/**
 * Edwin Stop Barber Shop - Lógica de Navegación
 */
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenu = document.getElementById('mobile-menu')
  const navList = document.getElementById('nav-list')
  const navLinks = document.querySelectorAll('.nav-link, .nav-btn')
  const navbar = document.querySelector('.navbar')

  // 1. Abrir/Cerrar menú móvil
  if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
      navList.classList.toggle('active')

      // Animación del icono (Hamburguesa a X)
      const icon = mobileMenu.querySelector('i')
      if (navList.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times')
      } else {
        icon.classList.replace('fa-times', 'fa-bars')
      }
    })
  }

  // 2. Cerrar menú automáticamente al hacer clic en un enlace (para móviles)
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navList.classList.remove('active')
      const icon = mobileMenu.querySelector('i')
      icon.classList.replace('fa-times', 'fa-bars')
    })
  })

  // 3. Efecto de scroll en la Navbar (opcional: cambia la sombra al bajar)
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)'
      navbar.style.height = '60px' // Se hace un poco más delgada
    } else {
      navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)'
      navbar.style.height = '70px'
    }
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
})

// Efecto de aparición al hacer scroll

/* eslint-env browser */

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

  if (elementsToReveal.length === 0) {
    console.warn('No se encontraron elementos con la clase .reveal')
  }

  elementsToReveal.forEach((el) => observer.observe(el))
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal)
} else {
  initScrollReveal()
}
