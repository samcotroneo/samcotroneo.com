// Room interactions for the Cozy Bedroom Coder Den homepage.

const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const initExperienceYears = () => {
  const yearNodes = document.querySelectorAll(".js-experience-years");
  if (!yearNodes.length) {
    return;
  }

  yearNodes.forEach((node) => {
    const startDateValue = node.getAttribute("data-start");
    if (!startDateValue) {
      return;
    }

    const startDate = new Date(startDateValue);
    if (Number.isNaN(startDate.getTime())) {
      return;
    }

    const now = new Date();
    let years = now.getFullYear() - startDate.getFullYear();
    const hasNotHitAnniversary =
      now.getMonth() < startDate.getMonth() ||
      (now.getMonth() === startDate.getMonth() &&
        now.getDate() < startDate.getDate());

    if (hasNotHitAnniversary) {
      years -= 1;
    }

    node.textContent = Math.max(years, 0).toString();
  });
};

const initRoomGlow = () => {
  const glow = document.querySelector(".room-glow");
  const windows = document.querySelectorAll(".world-window");
  if (!glow || !windows.length) {
    return;
  }

  const baseBackground = glow.style.getPropertyValue("background") || getComputedStyle(glow).background;

  const hexToRgba = (hex, alpha) => {
    const sanitized = hex.replace("#", "");
    const bigint = Number.parseInt(sanitized, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  windows.forEach((win) => {
    const color = win.getAttribute("data-color");
    if (!color) {
      return;
    }

    const applyTint = () => {
      if (reduceMotionQuery.matches) {
        return;
      }
      glow.style.background = `
        radial-gradient(ellipse 60% 55% at 30% 35%, rgba(244, 162, 97, 0.22), transparent 55%),
        radial-gradient(ellipse 55% 50% at 68% 40%, ${hexToRgba(color, 0.28)}, transparent 55%),
        linear-gradient(180deg, #1f1c2c 0%, #15131f 100%)
      `;
    };

    const resetTint = () => {
      if (reduceMotionQuery.matches) {
        return;
      }
      glow.style.background = baseBackground;
    };

    win.addEventListener("mouseenter", applyTint);
    win.addEventListener("mouseleave", resetTint);
    win.addEventListener("focus", applyTint);
    win.addEventListener("blur", resetTint);
  });
};

const initKeyboardWorldNav = () => {
  const windows = Array.from(document.querySelectorAll(".world-window"));
  if (!windows.length) {
    return;
  }

  windows.forEach((win) => {
    win.addEventListener("keydown", (event) => {
      const currentIndex = windows.indexOf(win);
      let nextIndex = -1;

      if (event.key === "ArrowDown") {
        nextIndex = (currentIndex + 1) % windows.length;
      } else if (event.key === "ArrowUp") {
        nextIndex = (currentIndex - 1 + windows.length) % windows.length;
      }

      if (nextIndex !== -1) {
        event.preventDefault();
        windows[nextIndex].focus();
      }
    });
  });
};

const initMobileNav = () => {
  const toggle = document.getElementById("nav-menu-toggle");
  const menu = document.getElementById("nav-mobile-menu");
  if (!toggle || !menu) {
    return;
  }

  const updateAria = (isOpen) => {
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("hidden");
    updateAria(!isOpen);
  });

  menu.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.add("hidden");
      updateAria(false);
    });
  });
};

const initNavShelf = () => {
  const hero = document.getElementById("top");
  const nav = document.getElementById("nav-shelf");
  if (!hero || !nav || !("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const isHeroVisible = entries.some((entry) => entry.isIntersecting);
      nav.classList.toggle("translate-y-[140%]", isHeroVisible);
    },
    { threshold: 0.15 }
  );

  observer.observe(hero);
};

document.addEventListener("DOMContentLoaded", () => {
  initExperienceYears();
  initRoomGlow();
  initKeyboardWorldNav();
  initMobileNav();
  initNavShelf();
});
