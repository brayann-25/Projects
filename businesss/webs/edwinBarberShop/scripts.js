/* eslint-env browser */

const throttle = (fn, limit) => {
  let waiting = false;

  return (...args) => {
    if (waiting) return;
    fn(...args);
    waiting = true;
    window.setTimeout(() => {
      waiting = false;
    }, limit);
  };
};

document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = document.getElementById("mobile-menu");
  const navList = document.getElementById("nav-list");
  const navbar = document.querySelector(".navbar");
  const scrollToTopBtn = document.getElementById("scroll-to-top");
  const navLinks = document.querySelectorAll("a[href^='#']");
  const locationButtons = document.querySelectorAll("[data-location-trigger]");
  const locationPanels = document.querySelectorAll("[data-location-panel]");
  const selectedLocationName = document.getElementById("selected-loc-name");
  const bookingLink = document.getElementById("selected-booking-link");
  const changeLocationBtn = document.getElementById("change-location-btn");
  const locationTabs = document.querySelector(".location-tabs");
  const selectionBar = document.querySelector(".selection-bar");

  const locationConfig = {
    eixample: {
      label: "Eixample",
      bookingLabel: "Reservar",
      bookingUrl:
        "https://booksy.com/es-es/dl/show-business/120085?utm_medium=c2c_referral",
    },
    noubarris: {
      label: "Nou Barris",
      bookingLabel: "Reservar",
      bookingUrl:
        "https://booksy.com/es-es/dl/show-business/152150?utm_medium=c2c_referral",
    },
  };

  const closeMenu = () => {
    if (!navList || !mobileMenu) return;
    navList.classList.remove("active");
    mobileMenu.setAttribute("aria-expanded", "false");

    const icon = mobileMenu.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  };

  if (mobileMenu && navList) {
    mobileMenu.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("active");
      mobileMenu.setAttribute("aria-expanded", String(isOpen));

      const icon = mobileMenu.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars", !isOpen);
        icon.classList.toggle("fa-times", isOpen);
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      const navHeight = navbar ? navbar.offsetHeight : 0;
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - navHeight + 2;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      closeMenu();
    });
  });

  const updateLocation = (location) => {
    const config = locationConfig[location];
    if (!config) return;

    locationButtons.forEach((button) => {
      const isActive = button.dataset.locationTrigger === location;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    locationPanels.forEach((panel) => {
      panel.classList.toggle(
        "is-active",
        panel.dataset.locationPanel === location
      );
    });

    if (selectedLocationName) {
      selectedLocationName.textContent = config.label;
    }

    if (bookingLink) {
      bookingLink.textContent = config.bookingLabel;
      bookingLink.href = config.bookingUrl;
    }
  };

  locationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      updateLocation(button.dataset.locationTrigger);
    });
  });

  if (changeLocationBtn && locationTabs) {
    changeLocationBtn.addEventListener("click", () => {
      const navHeight = navbar ? navbar.offsetHeight : 0;
      const tabsPosition =
        locationTabs.getBoundingClientRect().top + window.scrollY - navHeight - 16;

      window.scrollTo({
        top: tabsPosition,
        behavior: "smooth",
      });

      window.setTimeout(() => {
        const activeButton = document.querySelector(
          "[data-location-trigger].is-active"
        );
        activeButton?.focus();
      }, 250);
    });
  }

  updateLocation("eixample");

  const carousels = document.querySelectorAll("[data-carousel]");

  carousels.forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
    const prevButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");
    const dotsContainer = carousel.querySelector("[data-carousel-dots]");

    if (!track || slides.length === 0) return;

    carousel.tabIndex = 0;

    let currentIndex = 0;
    let autoplayId = 0;
    let startX = 0;
    let currentX = 0;
    let isPointerDown = false;
    let activePointerId = null;
    let wasDragging = false;

    const stopAutoplay = () => {
      if (!autoplayId) return;
      window.clearInterval(autoplayId);
      autoplayId = 0;
    };

    const startAutoplay = () => {
      stopAutoplay();
      autoplayId = window.setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 4800);
    };

    const updateDots = () => {
      const dots = dotsContainer?.querySelectorAll(".work-carousel__dot") || [];
      dots.forEach((dot, index) => {
        const isActive = index === currentIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-pressed", String(isActive));
      });
    };

    const goToSlide = (index) => {
      currentIndex = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === currentIndex;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
      });

      updateDots();
    };

    slides.forEach((slide, index) => {
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-roledescription", "slide");
      slide.setAttribute("aria-label", `${index + 1} de ${slides.length}`);
      slide.setAttribute("aria-hidden", String(index !== 0));
    });

    if (dotsContainer) {
      slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = `work-carousel__dot${index === 0 ? " is-active" : ""}`;
        dot.setAttribute("aria-label", `Ir al trabajo ${index + 1}`);
        dot.setAttribute("aria-pressed", String(index === 0));
        dot.addEventListener("click", () => {
          goToSlide(index);
          startAutoplay();
        });
        dotsContainer.appendChild(dot);
      });
    }

    prevButton?.addEventListener("click", () => {
      goToSlide(currentIndex - 1);
      startAutoplay();
    });

    nextButton?.addEventListener("click", () => {
      goToSlide(currentIndex + 1);
      startAutoplay();
    });

    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);
    carousel.addEventListener("focusin", stopAutoplay);
    carousel.addEventListener("focusout", (event) => {
      if (carousel.contains(event.relatedTarget)) return;
      startAutoplay();
    });

    carousel.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToSlide(currentIndex - 1);
        startAutoplay();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToSlide(currentIndex + 1);
        startAutoplay();
      }
    });

    const onPointerUp = (event) => {
      if (!isPointerDown) return;

      const delta = currentX - startX;
      isPointerDown = false;
      if (
        activePointerId !== null &&
        event?.pointerId === activePointerId &&
        typeof track.releasePointerCapture === "function"
      ) {
        track.releasePointerCapture(activePointerId);
      }
      activePointerId = null;
      track.style.transition = "";
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      if (Math.abs(delta) > 50) {
        goToSlide(currentIndex + (delta < 0 ? 1 : -1));
      }

      window.setTimeout(() => {
        wasDragging = false;
      }, 0);
      startAutoplay();
    };

    track.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;

      isPointerDown = true;
      wasDragging = false;
      activePointerId = event.pointerId;
      startX = event.clientX;
      currentX = event.clientX;
      stopAutoplay();
      track.style.transition = "none";
      if (typeof track.setPointerCapture === "function") {
        track.setPointerCapture(event.pointerId);
      }
    });

    track.addEventListener("pointermove", (event) => {
      if (!isPointerDown) return;
      currentX = event.clientX;
      const delta = currentX - startX;
      if (Math.abs(delta) > 8) {
        wasDragging = true;
      }
      track.style.transform = `translateX(calc(-${currentIndex * 100}% + ${delta}px))`;
    });

    track.addEventListener(
      "click",
      (event) => {
        if (!wasDragging) return;
        event.preventDefault();
        event.stopPropagation();
      },
      true
    );

    track.addEventListener("pointerup", onPointerUp);
    track.addEventListener("pointercancel", onPointerUp);
    track.addEventListener("pointerleave", onPointerUp);

    goToSlide(0);
    startAutoplay();
  });

  const handleScroll = throttle(() => {
    const currentY = window.scrollY;

    if (navbar) {
      navbar.classList.toggle("scrolled", currentY > 24);
    }

    if (scrollToTopBtn) {
      scrollToTopBtn.classList.toggle("active", currentY > 500);
    }

    if (selectionBar) {
      selectionBar.classList.toggle("is-compact", currentY > 220);
    }
  }, 120);

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    revealObserver.observe(element);
  });
});
