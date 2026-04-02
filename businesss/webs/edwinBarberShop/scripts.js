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

  const handleScroll = throttle(() => {
    const currentY = window.scrollY;

    if (navbar) {
      navbar.classList.toggle("is-scrolled", currentY > 24);
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
