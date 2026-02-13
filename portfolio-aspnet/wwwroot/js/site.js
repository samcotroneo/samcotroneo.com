// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

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

const initFloatingNav = () => {
  const navLinks = document.querySelectorAll('.floating-nav-link');
  if (!navLinks.length) {
    return;
  }

  const sections = ['about', 'technologies', 'experience', 'projects', 'contact'];
  const activeClass = 'bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 text-neutral-900';
  const inactiveClass = 'text-neutral-300 hover:text-white hover:bg-neutral-800';

  const updateActiveSection = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section && section.offsetTop <= scrollPosition) {
        // Remove active class from all links
        navLinks.forEach(link => {
          link.classList.remove(...activeClass.split(' '));
          link.classList.add(...inactiveClass.split(' '));
        });

        // Add active class to current section link
        const activeLink = document.querySelector(`[data-section="${sections[i]}"]`);
        if (activeLink) {
          activeLink.classList.remove(...inactiveClass.split(' '));
          activeLink.classList.add(...activeClass.split(' '));
        }
        break;
      }
    }
  };

  // Handle smooth scrolling
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-section');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  window.addEventListener('scroll', updateActiveSection);
  updateActiveSection(); // Call once to set initial state
};

const initHeroAttributes = () => {
  const heroAttributes = document.querySelectorAll(".hero-attribute");
  if (!heroAttributes.length || reduceMotionQuery.matches) {
    return;
  }

  heroAttributes.forEach((element) => {
    if (element.dataset.initialized === "true") {
      return;
    }
    element.dataset.initialized = "true";

    const attributesData = element.getAttribute("data-attributes");
    if (!attributesData) {
      return;
    }

    let attributes = [];
    try {
      attributes = JSON.parse(attributesData);
    } catch (error) {
      return;
    }

    if (!Array.isArray(attributes) || attributes.length < 2) {
      return;
    }

    const card = element.querySelector(".hero-attribute__card");
    const front = element.querySelector(".hero-attribute__face--front");
    const back = element.querySelector(".hero-attribute__face--back");

    if (!card || !front || !back) {
      return;
    }

    const measureSpan = document.createElement("span");
    measureSpan.className = "hero-attribute__measure";
    element.appendChild(measureSpan);

    let maxWidth = 0;
    let maxHeight = 0;
    attributes.forEach((value) => {
      measureSpan.textContent = value;
      const rect = measureSpan.getBoundingClientRect();
      maxWidth = Math.max(maxWidth, rect.width);
      maxHeight = Math.max(maxHeight, rect.height);
    });

    element.removeChild(measureSpan);

    if (maxWidth > 0) {
      const widthPx = `${Math.ceil(maxWidth)}px`;
      element.style.width = widthPx;
      card.style.width = widthPx;
    }

    if (maxHeight > 0) {
      const heightPx = `${Math.ceil(maxHeight)}px`;
      element.style.height = heightPx;
      card.style.height = heightPx;
    }

    let index = 0;
    front.textContent = attributes[index];
    back.textContent = attributes[(index + 1) % attributes.length];
    let isSliding = false;
    const palettes = [
      ["from-pink-300", "via-pink", "to-purple-500"],
      ["from-sky-300", "via-emerald-300", "to-cyan-400"],
      ["from-amber-300", "via-orange-400", "to-red-500"],
      ["from-red-500", "via-slate", "to-rose-400"],
    ];
    const paletteClasses = palettes.flat();

    const applyPalette = (target, paletteIndex) => {
      const palette = palettes[paletteIndex % palettes.length];
      target.classList.remove(...paletteClasses);
      target.classList.add(...palette);
    };

    applyPalette(front, index);
    applyPalette(back, index + 1);

    const intervalMs = Number.parseInt(
      element.getAttribute("data-interval") || "3200",
      10,
    );

    const slide = () => {
      if (isSliding) {
        return;
      }
      isSliding = true;
      index = (index + 1) % attributes.length;
      back.textContent = attributes[index];
      applyPalette(back, index);
      element.classList.add("hero-attribute--slide");

      const onAnimationEnd = (event) => {
        if (event.animationName !== "hero-slide-in") {
          return;
        }
        front.textContent = attributes[index];
        applyPalette(front, index);
        element.classList.remove("hero-attribute--slide");
        isSliding = false;
      };

      back.addEventListener("animationend", onAnimationEnd, { once: true });
    };

    setInterval(slide, Number.isNaN(intervalMs) ? 3200 : intervalMs);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initExperienceYears();
  initHeroAttributes();
  initFloatingNav();
});
