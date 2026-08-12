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
  const glow = document.querySelector(".hero-tint") || document.querySelector(".room-glow");
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
        radial-gradient(ellipse 55% 50% at 68% 40%, ${hexToRgba(color, 0.28)}, transparent 55%)
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

const WORLD_COLORS = {
  kitchen: "#f4a261",
  "control-room": "#2a9d8f",
  arcade: "#e9c46a",
};

const PARTICLE_PALETTES = {
  kitchen: ["#f2e2c4"],
  "control-room": ["#2a9d8f", "#7fdb9a"],
  arcade: ["#e9c46a", "#ff2e88", "#4fc3f7"],
};

const createPainter = (ctx, cols, rows) => {
  const rect = (x, y, w, h, color, alpha = 1) => {
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), Math.max(1, Math.round(w)), Math.max(1, Math.round(h)));
    ctx.globalAlpha = 1;
  };
  // ordered-dither blend of two colors across a rect
  const dither = (x, y, w, h, c1, c2, alpha = 1) => {
    for (let yy = Math.round(y); yy < Math.round(y + h); yy++) {
      for (let xx = Math.round(x); xx < Math.round(x + w); xx++) {
        rect(xx, yy, 1, 1, (xx + yy) % 2 === 0 ? c1 : c2, alpha);
      }
    }
  };
  // vertical color ramp with dithered transitions between bands
  const rampV = (x, y, w, h, colors, alpha = 1) => {
    const bandH = h / colors.length;
    for (let i = 0; i < colors.length; i++) {
      rect(x, y + i * bandH, w, bandH, colors[i], alpha);
      if (i > 0) dither(x, y + i * bandH - 1, w, 2, colors[i - 1], colors[i], alpha);
    }
  };
  return {
    cols,
    rows,
    rect,
    px: (x, y, color, alpha = 1) => rect(x, y, 1, 1, color, alpha),
    dither,
    rampV,
    clear: (x, y, w, h) => ctx.clearRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)),
    fx: (f) => f * cols,
    fy: (f) => f * rows,
  };
};

const paintKitchen = (P) => {
  const { rect, px, dither, rampV, fx, fy, cols, rows } = P;
  // warm checker tile wall
  const tile = Math.max(3, Math.round(cols / 32));
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const grout = x % tile === 0 || y % tile === 0;
      const alt = (Math.floor(x / tile) + Math.floor(y / tile)) % 2 === 0;
      px(x, y, grout ? "#d3ab7c" : alt ? "#eed3a9" : "#e6c79b");
    }
  }
  // ambient ramp: lighter at top, cosier shade low
  dither(0, rows * 0.45, cols, rows * 0.55, "#00000000", "#8a5a30", 0.1);

  // window with night sky, moon, curtains
  const wx = fx(0.58), wy = fy(0.06), ww = fx(0.24), wh = fy(0.24);
  rampV(wx - 2, wy - 2, ww + 4, wh + 4, ["#8a5a3b", "#7a4a2e", "#5f3d27"]);
  rampV(wx, wy, ww, wh, ["#1c2745", "#22304e", "#31425f"]);
  const mxx = wx + ww * 0.66, myy = wy + wh * 0.2;
  dither(mxx - 4, myy - 4, 12, 12, "#f6ecd0", "#22304e", 0.22);
  rect(mxx, myy, 5, 5, "#f6ecd0");
  px(mxx + 1, myy + 1, "#d9cfae");
  px(mxx + 3, myy + 3, "#c4b98f");
  px(wx + ww * 0.2, wy + wh * 0.3, "#ffffff");
  px(wx + ww * 0.4, wy + wh * 0.62, "#ffffff");
  px(wx + ww * 0.85, wy + wh * 0.72, "#ffffff");
  px(wx + ww * 0.52, wy + wh * 0.15, "#ffffff");
  px(wx + ww * 0.1, wy + wh * 0.55, "#aab6e0");
  px(wx + ww * 0.72, wy + wh * 0.45, "#aab6e0");
  rect(wx + ww / 2, wy, 1, wh, "#5f3d27");
  rect(wx, wy + wh / 2, ww, 1, "#5f3d27");
  rampV(wx - 3, wy + wh + 1, ww + 6, 2, ["#a06a44", "#8a5a3b"]);
  for (let y = 0; y < wh + 4; y++) {
    rect(wx - 6, wy - 2 + y, 4, 1, y % 3 === 0 ? "#b75a3e" : "#c96a4a");
    rect(wx + ww + 2, wy - 2 + y, 4, 1, y % 3 === 0 ? "#b75a3e" : "#c96a4a");
  }
  rect(wx - 6, wy - 2, 1, wh + 4, "#8a4530");
  rect(wx + ww + 5, wy - 2, 1, wh + 4, "#8a4530");
  // warm spill below window
  rect(wx, wy + wh + 3, ww, fy(0.16), "#f6ecd0", 0.04);

  // shelf with jars
  const shY = fy(0.28);
  rampV(fx(0.04), shY, fx(0.3), 2, ["#a06a44", "#8a5a3b"]);
  rect(fx(0.04), shY + 2, fx(0.3), 1, "#4a3220");
  ["#d9a05b", "#a3b18a", "#e76f51"].forEach((c, i) => {
    const jx = fx(0.07 + i * 0.09);
    rect(jx, shY - 6, 5, 6, c);
    rect(jx, shY - 6, 5, 1, "#f6ecd0");
    rect(jx + 4, shY - 5, 1, 5, "#00000030");
    rect(jx, shY - 7, 5, 1, "#6b4a2f");
    px(jx + 1, shY - 4, "#ffffff", 0.5);
  });

  // hanging rail with pans and utensils
  const railY = fy(0.4);
  rect(fx(0.04), railY, fx(0.34), 1, "#5f3d27");
  const hang = (hx, w, h, c) => {
    px(hx, railY + 1, "#241e1c");
    rampV(hx - Math.floor(w / 2), railY + 2, w, h, [c, "#241e1c"]);
    px(hx - Math.floor(w / 2), railY + 2, "#5a504b");
  };
  hang(fx(0.08), 6, 4, "#332c2a");
  hang(fx(0.16), 4, 5, "#3d3532");
  hang(fx(0.24), 2, 6, "#4a423e");
  hang(fx(0.3), 5, 3, "#332c2a");

  // counter and cabinets
  const cy = fy(0.62);
  rampV(0, cy, cols, fy(0.03), ["#b8855a", "#b07d54", "#9c6642"]);
  rect(0, cy, cols, 1, "#d0a075");
  rect(0, cy + fy(0.03), cols, fy(0.015), "#8a5a38");
  const cbY = cy + fy(0.045);
  rampV(0, cbY, cols, rows - cbY, ["#7a4e30", "#6b4229", "#553118"]);
  const doorW = Math.round(cols / 9);
  for (let d = 0; d < 9; d++) {
    const dx = d * doorW + 2;
    rect(dx, cbY + 3, doorW - 4, rows - cbY - 6, "#553118");
    rect(dx + 1, cbY + 4, doorW - 6, rows - cbY - 8, "#6b4229");
    rect(dx + 1, cbY + 4, doorW - 6, 1, "#7d5133");
    px(dx + doorW - 5, cbY + Math.floor((rows - cbY) / 2), "#e9c46a");
    px(dx + doorW - 5, cbY + Math.floor((rows - cbY) / 2) + 1, "#b8941f");
  }

  // pot on the stove (steam particles rise from here)
  const potX = fx(0.07), potY = fy(0.54);
  dither(potX - 2, cy - 1, fx(0.07) + 4, 2, "#3a2a1a", "#b07d54", 0.5);
  rampV(potX, potY, fx(0.07), fy(0.07), ["#4a423e", "#2f2a28", "#241f1d"]);
  rect(potX, potY, fx(0.07), 1, "#5a504b");
  rect(potX - 1, potY - 2, fx(0.07) + 2, 2, "#3f3835");
  px(potX + fx(0.035), potY - 3, "#e9c46a");

  // red kettle
  const kX = fx(0.22), kY = fy(0.55);
  rampV(kX, kY, fx(0.045), fy(0.06), ["#d95d43", "#c7513a", "#a8442f"]);
  rect(kX, kY, 1, fy(0.06), "#e87a5e");
  rect(kX + 1, kY - 2, fx(0.045) - 2, 2, "#a8442f");
  rampV(kX + fx(0.045), kY + 2, 3, 2, ["#c7513a", "#a8442f"]);
  rect(kX + 1, kY - 4, 1, 2, "#2f2a28");
  rect(kX + fx(0.045) - 2, kY - 4, 1, 2, "#2f2a28");

  // fruit bowl
  const bX = fx(0.38), bY = fy(0.585);
  rampV(bX, bY, fx(0.06), fy(0.03), ["#7a4e30", "#5f3d27"]);
  px(bX + 2, bY - 1, "#f4a261");
  px(bX + 4, bY - 2, "#e76f51");
  px(bX + 4, bY - 2, "#f49a76", 0.6);
  px(bX + 6, bY - 1, "#e9c46a");

  // fridge with magnets
  const fX = fx(0.88), fY = fy(0.26);
  rampV(fX, fY, cols - fX, rows - fY, ["#e2e8ec", "#d3d9dc", "#b7c0c6"]);
  rect(fX, fY, 2, rows - fY, "#aab4bb");
  rect(fX, fY, cols - fX, 1, "#f2f5f7");
  rect(fX, fy(0.52), cols - fX, 1, "#aab4bb");
  rect(fX + 2, fy(0.34), 1, fy(0.1), "#8b959c");
  px(fX + 2, fy(0.34), "#c6ced4");
  rect(fX + 2, fy(0.56), 1, fy(0.08), "#8b959c");
  px(fX + 5, fy(0.32), "#e76f51");
  px(fX + 8, fy(0.38), "#2a9d8f");
  px(fX + 6, fy(0.44), "#e9c46a");
};

const paintArcade = (P) => {
  const { rect, px, dither, rampV, fx, fy, cols, rows } = P;
  rampV(0, 0, cols, rows, ["#1b0f30", "#150c26", "#100a1e"]);
  // brickwork
  for (let y = 4; y < rows; y += 6) {
    rect(0, y, cols, 1, "#241538", 0.8);
    const off = (y / 6) % 2 === 0 ? 0 : 5;
    for (let x = off; x < cols; x += 10) px(x, y - 3, "#1e1230", 0.8);
  }
  // ceiling with hanging lamps
  rect(0, 0, cols, fy(0.045), "#0b0616");
  rect(0, fy(0.045), cols, 1, "#241538");
  [0.15, 0.5, 0.85].forEach((f) => {
    const lx = fx(f);
    rect(lx, fy(0.045), 1, fy(0.04), "#05030a");
    px(lx, fy(0.085) + 1, "#ffd76a");
    px(lx, fy(0.085) + 2, "#fff0c0");
    rect(lx - 3, fy(0.09), 7, fy(0.12), "#ffd76a", 0.05);
  });
  // neon signs with dithered halos
  const neon = (nx, ny, nw, nh, tube, core) => {
    dither(nx - 3, ny - 3, nw + 6, nh + 6, tube, "#150c26", 0.2);
    rect(nx, ny, nw, 1, tube);
    rect(nx, ny + nh, nw, 1, tube);
    rect(nx, ny, 1, nh, tube);
    rect(nx + nw, ny, 1, nh, tube);
    rect(nx, ny, nw, 1, core, 0.6);
    for (let x = 2; x < nw - 2; x += 3) {
      px(nx + x, ny + nh / 2 + (x % 2), core);
    }
  };
  neon(fx(0.07), fy(0.1), fx(0.2), fy(0.05), "#ff2e88", "#ffd0e4");
  neon(fx(0.73), fy(0.08), fx(0.2), fy(0.05), "#00e5ff", "#d6f9ff");

  // synthwave floor with perspective grid
  const floorY = fy(0.66);
  rampV(0, floorY, cols, rows - floorY, ["#150a24", "#0c0716", "#080510"]);
  dither(0, floorY - 1, cols, 2, "#ff2e88", "#150c26", 0.4);
  let yy = floorY + 2;
  let gap = 2;
  let fade = 0.8;
  while (yy < rows) {
    rect(0, Math.round(yy), cols, 1, "#4a2272", fade);
    yy += gap;
    gap *= 1.55;
    fade *= 0.85;
  }
  for (let k = -6; k <= 6; k++) {
    for (let y = floorY; y < rows; y++) {
      const t = (y - floorY) / Math.max(1, rows - floorY);
      px(cols / 2 + k * cols * 0.02 + k * t * cols * 0.09, y, "#4a2272", 0.8 - t * 0.35);
    }
  }

  // cabinet row with lit marquees, screens, control panels
  const cabW = Math.round(cols / 8.5);
  const marquees = ["#e9c46a", "#ff2e88", "#00e5ff", "#7fdb9a"];
  [0.05, 0.3, 0.55, 0.8].forEach((f, i) => {
    const cx0 = fx(f);
    const top = fy(0.32);
    const bottom = rows - 2;
    dither(cx0, bottom, cabW, 3, marquees[i], "#0c0716", 0.14);
    rampV(cx0, top, cabW, bottom - top, ["#2a1a42", "#221334", "#180d28"]);
    rect(cx0, top, 1, bottom - top, "#3a2260");
    rect(cx0 + cabW - 1, top, 1, bottom - top, "#120a20");
    // marquee
    dither(cx0 - 2, top - 2, cabW + 4, fy(0.05) + 4, marquees[i], "#150c26", 0.22);
    rect(cx0 + 1, top, cabW - 2, fy(0.045), marquees[i]);
    dither(cx0 + 1, top + fy(0.045) - 1, cabW - 2, 2, marquees[i], "#221334", 0.8);
    rect(cx0 + 2, top + 1, cabW - 4, 1, "#ffffff", 0.55);
    // screen with scanlines
    const sx = cx0 + 2, sy = top + fy(0.07), sw = cabW - 4, sh = fy(0.15);
    rect(sx - 1, sy - 1, sw + 2, sh + 2, "#060310");
    rampV(sx, sy, sw, sh, ["#0a0618", "#05030a"]);
    for (let sY = 1; sY < sh; sY += 2) rect(sx, sy + sY, sw, 1, "#000000", 0.35);
    if (i === 0) {
      for (let r = 0; r < 3; r++) {
        for (let c2 = 0; c2 < 4; c2++) {
          rect(sx + 2 + c2 * 3, sy + 2 + r * 3, 2, 1, "#4fc3f7");
          px(sx + 2 + c2 * 3, sy + 3 + r * 3, "#2a7a9e");
        }
      }
      rect(sx + sw / 2 - 1, sy + sh - 3, 3, 2, "#7fdb9a");
      px(sx + sw / 2, sy + sh - 6, "#e9c46a");
    } else if (i === 1) {
      rect(sx + 1, sy + sh / 2 - 2, 1, 4, "#e9c46a");
      rect(sx + sw - 2, sy + sh / 2 - 1, 1, 4, "#ff2e88");
      px(sx + sw / 2, sy + 2, "#ffffff");
      px(sx + sw / 2, sy + 2, "#ffffff", 0.4);
    } else if (i === 2) {
      for (let s2 = 0; s2 < 5; s2++) px(sx + 2 + s2 * 2, sy + 2 + s2, "#7fdb9a");
      px(sx + sw - 3, sy + sh - 3, "#ff2e88");
    } else {
      const blocks = ["#e9c46a", "#ff2e88", "#4fc3f7", "#7fdb9a"];
      for (let b = 0; b < 6; b++) {
        rect(sx + 1 + b * 2, sy + sh - 2 - (b % 3), 2, 2, blocks[b % 4]);
        px(sx + 1 + b * 2, sy + sh - 2 - (b % 3), "#ffffff", 0.35);
      }
    }
    // control panel with joystick and buttons
    const py2 = sy + sh + 2;
    rampV(cx0 + 1, py2, cabW - 2, fy(0.04), ["#3a2560", "#31204a", "#241538"]);
    rect(cx0 + cabW * 0.25, py2 - 2, 1, 3, "#0a0612");
    px(cx0 + cabW * 0.25, py2 - 3, "#ff4757");
    px(cx0 + cabW * 0.25, py2 - 4, "#ff8095");
    px(cx0 + cabW * 0.55, py2 + 1, "#ff4757");
    px(cx0 + cabW * 0.68, py2 + 1, "#4fc3f7");
    px(cx0 + cabW * 0.81, py2 + 1, "#e9c46a");
    // coin slot
    rect(cx0 + cabW / 2 - 2, bottom - fy(0.05), 4, fy(0.03), "#060310");
    px(cx0 + cabW / 2, bottom - fy(0.04), "#e9c46a", 0.6);
    px(cx0 + cabW / 2 - 1, bottom - fy(0.035), "#4a3a1a");
  });
};

const paintControlRoom = (P) => {
  const { rect, px, dither, rampV, fx, fy, cols, rows } = P;
  rampV(0, 0, cols, rows, ["#131722", "#0f1219", "#0b0d14"]);
  // concrete panel seams and stains
  for (let x = 0; x < cols; x += Math.round(cols / 8)) rect(x, 0, 1, rows, "#080a10");
  rect(0, fy(0.5), cols, 1, "#080a10");
  dither(fx(0.02), fy(0.52), fx(0.1), fy(0.2), "#080a10", "#0f1219", 0.5);
  dither(fx(0.7), fy(0.05), fx(0.08), fy(0.15), "#080a10", "#131722", 0.5);
  // floor
  rampV(0, fy(0.92), cols, rows - fy(0.92), ["#0d1017", "#0a0c12"]);

  // wall of glowing monitors
  const sw = Math.round(cols / 11), sh = Math.max(4, Math.round(rows * 0.085));
  [0.06, 0.17, 0.28].forEach((rf, r) => {
    for (let i2 = 0; i2 < 10; i2++) {
      const sx = fx(0.03) + i2 * (sw + 2);
      if (sx + sw > cols * 0.97) break;
      const sy = fy(rf);
      const kind = (i2 * 5 + r * 3) % 6;
      rect(sx - 1, sy - 1, sw + 2, sh + 2, "#02040a");
      if (kind === 5) {
        rampV(sx, sy, sw, sh, ["#04060a", "#02040a"]);
        rect(sx, sy, sw, 1, "#1a2233", 0.6);
        continue;
      }
      const bg = kind <= 2 ? "#0d2422" : kind === 3 ? "#241d0d" : "#0a1a12";
      const bgLow = kind <= 2 ? "#081a18" : kind === 3 ? "#181205" : "#06120c";
      const ink = kind <= 2 ? "#2a9d8f" : kind === 3 ? "#e9c46a" : "#7fdb9a";
      rampV(sx, sy, sw, sh, [bg, bgLow]);
      for (let y2 = 1; y2 < sh - 1; y2 += 2) {
        for (let x2 = 1; x2 < sw - 1; x2 += 3) {
          if ((x2 * 7 + y2 * 3 + i2) % 4 !== 0) px(sx + x2, sy + y2, ink, 0.9);
        }
      }
      for (let sY = 0; sY < sh; sY += 2) rect(sx, sy + sY, sw, 1, "#000000", 0.25);
      rect(sx, sy, sw, 1, "#ffffff", 0.08);
    }
  });
  // soft light spill toward the desk
  rect(fx(0.1), fy(0.4), fx(0.8), fy(0.26), "#2a9d8f", 0.04);

  // red LED clock
  rect(fx(0.04), fy(0.015), fx(0.07), fy(0.028), "#1a0505");
  rect(fx(0.04), fy(0.015), fx(0.07), 1, "#3a1010");
  for (let d = 0; d < 4; d++) {
    if (d === 2) {
      px(fx(0.04) + 2 + d * 3, fy(0.028), "#ff4757");
    } else {
      rect(fx(0.04) + 2 + d * 3, fy(0.02), 2, fy(0.018), "#ff4757", 0.9);
      px(fx(0.04) + 2 + d * 3, fy(0.02), "#ff8095");
    }
  }
  dither(fx(0.04) - 2, fy(0.015) - 2, fx(0.07) + 4, fy(0.028) + 4, "#ff4757", "#131722", 0.12);

  // desk
  const deskY = fy(0.7);
  rampV(fx(0.14), deskY, fx(0.72), fy(0.025), ["#2f3648", "#232936", "#1a1e29"]);
  rect(fx(0.14), deskY, fx(0.72), 1, "#3a4358");
  rampV(fx(0.17), deskY + fy(0.025), 2, rows - deskY - fy(0.05), ["#161a26", "#0b0d14"]);
  rampV(fx(0.83), deskY + fy(0.025), 2, rows - deskY - fy(0.05), ["#161a26", "#0b0d14"]);

  // desk monitors flanking the figure
  [0.3, 0.62].forEach((f) => {
    const mx = fx(f), mw = fx(0.09), mh = fy(0.07), my = deskY - mh - 1;
    rect(mx - 1, my - 1, mw + 2, mh + 2, "#02040a");
    rampV(mx, my, mw, mh, ["#10302c", "#0d2422"]);
    for (let y2 = 1; y2 < mh - 1; y2 += 2) {
      px(mx + 1 + (y2 * 2) % Math.max(2, mw - 2), my + y2, "#2a9d8f", 0.85);
    }
    dither(mx, my, mw, mh, "#2a9d8f", "#0d2422", 0.1);
    rect(mx + mw / 2 - 1, my + mh + 1, 2, 1, "#02040a");
  });

  // keyboard glow
  rect(fx(0.45), deskY - 1, fx(0.1), 1, "#2a9d8f", 0.85);
  dither(fx(0.44), deskY - 3, fx(0.12), 2, "#2a9d8f", "#0f1219", 0.16);

  // mug
  rampV(fx(0.72), deskY - 3, 2, 3, ["#4a5266", "#3a4152"]);

  // hooded figure, back to the viewer, centered at the desk
  const cxp = Math.round(fx(0.5));
  const hoodTop = deskY - fy(0.17);
  px(cxp, hoodTop - 1, "#05070c");
  rect(cxp - 2, hoodTop, 5, 1, "#05070c");
  rampV(cxp - 3, hoodTop + 1, 7, fy(0.05), ["#090c14", "#05070c"]);
  rect(cxp - 2, hoodTop + 2, 5, fy(0.03), "#020308");
  rect(cxp - 1, hoodTop + 2 + fy(0.012), 3, 1, "#2a9d8f", 0.35);
  const bodyTop = hoodTop + fy(0.06);
  rect(cxp - 5, bodyTop, 11, fy(0.03), "#05070c");
  rampV(cxp - 7, bodyTop + fy(0.03), 15, deskY + fy(0.09) - bodyTop, ["#070a12", "#05070c", "#04050a"]);
  // rim light: teal from the screens, faint purple ambient
  rect(cxp - 8, bodyTop + fy(0.02), 1, fy(0.1), "#2a9d8f", 0.5);
  rect(cxp + 8, bodyTop + fy(0.02), 1, fy(0.1), "#2a9d8f", 0.5);
  rect(cxp + 3, hoodTop + 1, 1, fy(0.05), "#2a9d8f", 0.35);
  rect(cxp - 4, hoodTop + 1, 1, fy(0.04), "#4a3a6a", 0.3);
  rect(cxp - 3, deskY + fy(0.09), 7, fy(0.03), "#080a10");

  // server rack with LEDs
  const rx2 = fx(0.9);
  rampV(rx2, fy(0.3), cols - rx2 - 1, rows - fy(0.3) - 1, ["#131722", "#0d1017", "#080a10"]);
  rect(rx2, fy(0.3), 1, rows - fy(0.3) - 1, "#232b3a");
  for (let y = fy(0.31); y < rows - 2; y += 3) {
    rect(rx2 + 1, y, cols - rx2 - 3, 1, "#161b26");
    const yi = Math.round(y);
    if (yi % 7 === 0) {
      px(rx2 + 2, y - 1, "#7fdb9a");
      px(rx2 + 3, y - 1, "#7fdb9a", 0.3);
    } else if (yi % 5 === 0) {
      px(rx2 + 2, y - 1, "#e9c46a");
    } else if (yi % 11 === 0) {
      px(rx2 + 2, y - 1, "#ff4757");
    }
  }

  // cables snaking across the floor
  for (let x = fx(0.55); x < fx(0.9); x++) {
    const y = rows - 2 - (Math.floor((x - fx(0.55)) / 6) % 2);
    px(x, y, "#05070c");
    px(x, y - 1, "#131722", 0.5);
  }
};

const drawPixelBackground = (ctx, slug, cols, rows) => {
  const P = createPainter(ctx, cols, rows);
  if (slug === "kitchen") paintKitchen(P);
  else if (slug === "control-room") paintControlRoom(P);
  else if (slug === "arcade") paintArcade(P);
};

class ParticleSystem {
  constructor(canvas, slug) {
    this.canvas = canvas;
    this.slug = slug;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.running = false;
    this.visible = false;
  }

  resize(cols, rows) {
    this.canvas.width = cols;
    this.canvas.height = rows;
    this.cols = cols;
    this.rows = rows;
    this.particles = [];
    const count = this.slug === "arcade" ? 28 : 22;
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle());
    }
  }

  createParticle() {
    const x = Math.floor(Math.random() * this.cols);
    const y = Math.floor(Math.random() * this.rows);
    const palette = PARTICLE_PALETTES[this.slug] || ["#ffffff"];
    const c = palette[Math.floor(Math.random() * palette.length)];
    if (this.slug === "kitchen") {
      return { c, x: this.cols * (0.07 + Math.random() * 0.06), y: this.rows * 0.54 - Math.random() * 3, vx: (Math.random() - 0.5) * 0.12, vy: -0.06 - Math.random() * 0.12, life: Math.random(), size: 1 + Math.floor(Math.random() * 2) };
    }
    if (this.slug === "control-room") {
      return { c, x: Math.random() < 0.5 ? 0 : this.cols - 1, y, vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.15, life: Math.random(), size: 1 };
    }
    return { c, x, y: this.rows * (0.28 + Math.random() * 0.08), vx: (Math.random() - 0.5) * 0.25, vy: -0.05 - Math.random() * 0.15, life: Math.random(), size: 1 + Math.floor(Math.random() * 2) };
  }

  setVisible(visible) {
    this.visible = visible;
    if (visible && !this.running) {
      this.running = true;
      this.tick();
    }
  }

  tick() {
    if (!this.running) return;
    if (this.visible) {
      this.draw();
    }
    requestAnimationFrame(() => this.tick());
  }

  draw() {
    this.ctx.clearRect(0, 0, this.cols, this.rows);
    const maxAlpha = this.slug === "kitchen" ? 0.3 : 0.5;
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.003;
      if (p.life <= 0 || p.x < -1 || p.x > this.cols || p.y < -1 || p.y > this.rows) {
        Object.assign(p, this.createParticle());
      }
      this.ctx.fillStyle = p.c;
      this.ctx.globalAlpha = Math.max(0, p.life * maxAlpha);
      this.ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
    }
    this.ctx.globalAlpha = 1;
  }

  stop() {
    this.running = false;
  }
}

const initWorldAtmospheres = () => {
  const sections = document.querySelectorAll(".world-section");
  if (!sections.length) return;

  const systems = new Map();
  const visibleSections = new Set();
  let ticking = false;

  const resizeSection = (section) => {
    const bg = section.querySelector(".world-bg-canvas");
    const particles = section.querySelector(".world-particles");
    if (!bg || !particles) return;

    const slug = section.getAttribute("data-world");
    const width = section.clientWidth || 1;
    const height = section.clientHeight || 1;
    const cols = 192;
    const rows = Math.max(32, Math.ceil(cols * (height / width)));

    bg.width = cols;
    bg.height = rows;
    const bgCtx = bg.getContext("2d");
    drawPixelBackground(bgCtx, slug, cols, rows);

    const sys = systems.get(section) || new ParticleSystem(particles, slug);
    sys.resize(cols, rows);
    systems.set(section, sys);
  };

  sections.forEach(resizeSection);

  const updateParallax = () => {
    if (reduceMotionQuery.matches) return;
    visibleSections.forEach((section) => {
      const bgLayer = section.querySelector(".world-bg-layer");
      const particlesCanvas = section.querySelector(".world-particles");
      if (!bgLayer || !particlesCanvas) return;
      const rect = section.getBoundingClientRect();
      const centerOffset = rect.top / window.innerHeight;
      const range = rect.height * 0.12;
      bgLayer.style.transform = `translate3d(0, ${centerOffset * range}px, 0)`;
      particlesCanvas.style.transform = `translate3d(0, ${centerOffset * range * 0.4}px, 0)`;
    });
    ticking = false;
  };

  const scheduleParallax = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateParallax);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections.add(entry.target);
          const sys = systems.get(entry.target);
          if (sys) sys.setVisible(true);
        } else {
          visibleSections.delete(entry.target);
          const sys = systems.get(entry.target);
          if (sys) sys.setVisible(false);
        }
      });
      scheduleParallax();
    },
    { threshold: 0.05, rootMargin: "10%" }
  );

  sections.forEach((section) => observer.observe(section));

  window.addEventListener("scroll", scheduleParallax, { passive: true });
  window.addEventListener("resize", () => {
    sections.forEach(resizeSection);
    scheduleParallax();
  });

  if (reduceMotionQuery.matches) {
    systems.forEach((sys) => sys.stop());
  }
};

/* Hero: layered pixel-art coder den (sky / room / animated fx) */

const HERO_WIN = { x: 0.07, y: 0.09, w: 0.22, h: 0.33 };
const HERO_MON = { x: 0.35, y: 0.385, w: 0.3, h: 0.21 };
const HERO_LAMP_X = 0.16;
const HERO_MUG_X = 0.8;

const heroStarField = () => {
  let seed = 42;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const stars = [];
  for (let i = 0; i < 110; i++) {
    stars.push({ x: rnd(), y: rnd(), big: rnd() > 0.88, tw: rnd() > 0.85, phase: rnd() * 6.283 });
  }
  // extra density where the window frames the sky
  for (let i = 0; i < 30; i++) {
    stars.push({
      x: HERO_WIN.x + rnd() * HERO_WIN.w,
      y: HERO_WIN.y + rnd() * HERO_WIN.h,
      big: rnd() > 0.85,
      tw: rnd() > 0.6,
      phase: rnd() * 6.283,
    });
  }
  return stars;
};

const paintHeroSky = (P, stars) => {
  const { rect, px, dither, rampV, cols, rows } = P;
  rampV(0, 0, cols, rows, ["#0a0f22", "#0e142c", "#141b38", "#1c2547"]);
  stars.forEach((s) => {
    const x = s.x * cols;
    const y = s.y * rows;
    if (s.big) {
      rect(x, y, 2, 2, "#e8eeff", 0.95);
      px(x - 1, y, "#aab6e0", 0.5);
      px(x + 2, y + 1, "#aab6e0", 0.5);
      px(x, y - 1, "#aab6e0", 0.35);
      px(x + 1, y + 2, "#aab6e0", 0.35);
    } else {
      px(x, y, s.tw ? "#ffffff" : "#aab6e0", 0.8);
    }
  });
  // moon framed by the window, with crater shading and a dithered halo
  const mx = cols * (HERO_WIN.x + HERO_WIN.w * 0.68);
  const my = rows * (HERO_WIN.y + HERO_WIN.h * 0.34);
  rect(mx - 4, my - 4, 12, 12, "#f6ecd0", 0.06);
  rect(mx - 2, my - 2, 8, 8, "#f6ecd0", 0.12);
  rect(mx, my, 5, 5, "#f8efd8");
  px(mx + 1, my + 1, "#d9cfae");
  px(mx + 3, my + 3, "#d9cfae");
  px(mx + 2, my + 4, "#c4b98f");
};

const paintHeroRoom = (P, stars) => {
  const { rect, px, dither, rampV, fx, fy, cols, rows } = P;
  // night sky base (shows through the window opening)
  paintHeroSky(P, stars);
  // den wall with ambient ramp, leaving the window region open
  const wx = fx(HERO_WIN.x), wy = fy(HERO_WIN.y), ww = fx(HERO_WIN.w), wh = fy(HERO_WIN.h);
  const wallBands = ["#292542", "#242038", "#201c31", "#1b1728"];
  for (let y = 0; y < rows; y++) {
    const band = Math.min(wallBands.length - 1, Math.floor((y / rows) * wallBands.length));
    const c = wallBands[band];
    if (y >= wy && y < wy + wh) {
      rect(0, y, wx, 1, c);
      rect(wx + ww, y, cols - wx - ww, 1, c);
    } else {
      rect(0, y, cols, 1, c);
    }
  }
  // panel seams + dithered band transitions
  for (let x = Math.round(cols / 6); x < cols; x += Math.round(cols / 6)) rect(x, 0, 1, rows, "#1a1626", 0.6);
  wallBands.forEach((_, i) => {
    if (i > 0) dither(0, (rows / wallBands.length) * i - 1, cols, 2, wallBands[i - 1], wallBands[i], 0.9);
  });

  // window frame with wood ramp, mullions, half-open blinds, sill
  rampV(wx - 2, wy - 2, ww + 4, 2, ["#54402f", "#3a2c22"]);
  rampV(wx - 2, wy + wh, ww + 4, 2, ["#3a2c22", "#2e231b"]);
  rect(wx - 2, wy, 2, wh, "#3a2c22");
  rect(wx + ww, wy, 2, wh, "#2e231b");
  px(wx - 2, wy, "#54402f");
  rect(wx + ww / 2, wy, 1, wh, "#2e231b");
  rect(wx + ww / 2 + 1, wy, 1, wh, "#54402f", 0.5);
  rect(wx, wy + wh / 2, ww, 1, "#2e231b");
  rect(wx, wy + wh / 2 + 1, ww, 1, "#54402f", 0.4);
  for (let y = 0; y < wh * 0.22; y += 3) {
    rect(wx, wy + y, ww, 1, "#2a2133", 0.92);
    rect(wx, wy + y + 1, ww, 1, "#1b1526", 0.5);
  }
  rampV(wx - 3, wy + wh + 2, ww + 6, 2, ["#5a4632", "#4a382a"]);
  // cool moonlight spill under the window
  rect(wx, wy + wh + 4, ww, fy(0.14), "#7a86b8", 0.05);

  // poster with a shaded pixel invader
  const px0 = fx(0.37), py0 = fy(0.1), pw = fx(0.09), ph = fy(0.18);
  rect(px0 + 1, py0 + 1, pw, ph, "#0a0812", 0.5);
  rampV(px0, py0, pw, ph, ["#e8e0d0", "#d8cfc0", "#c8bfa8"]);
  const invader = ["00100100", "00011000", "00111100", "01101110", "11111111", "10111101", "10100101", "00100100"];
  const isz = Math.max(1, Math.floor(pw / 10));
  invader.forEach((rowBits, r) => {
    for (let c = 0; c < 8; c++) {
      if (rowBits[c] === "1") {
        rect(px0 + pw / 2 - 4 * isz + c * isz, py0 + ph / 2 - 4 * isz + r * isz, isz, isz, r > 4 ? "#c14e35" : "#e76f51");
      }
    }
  });
  rect(px0 - 1, py0 - 1, 3, 2, "#e9c46a", 0.9);
  rect(px0 + pw - 2, py0 - 1, 3, 2, "#e9c46a", 0.9);
  px(px0, py0 - 1, "#b8941f");

  // shelf with shaded book spines and a tiny succulent
  const bsy = fy(0.24);
  rampV(fx(0.56), bsy, fx(0.18), 1, ["#5a4632", "#4a382a"]);
  rect(fx(0.56), bsy + 1, fx(0.18), 1, "#241a12");
  ["#7fdb9a", "#e9c46a", "#c7513a", "#4a423e", "#2a9d8f", "#b75a3e"].forEach((c, i) => {
    const bh = 5 + ((i * 3) % 4);
    const bx = fx(0.565) + i * 3;
    rect(bx, bsy - bh, 2, bh, c);
    px(bx, bsy - bh, "#ffffff", 0.35);
    px(bx + 1, bsy - 1, "#000000", 0.3);
  });
  const plantX = fx(0.565) + 19;
  rampV(plantX, bsy - 3, 3, 3, ["#d95d43", "#a8442f"]);
  px(plantX, bsy - 4, "#7fdb9a");
  px(plantX + 1, bsy - 5, "#5cb87f");
  px(plantX + 2, bsy - 4, "#7fdb9a");

  // sticky notes pinned right of the monitors
  rampV(fx(0.69), fy(0.5), 4, 4, ["#f2d488", "#e9c46a"]);
  px(fx(0.69) + 3, fy(0.5) + 3, "#b8941f");
  px(fx(0.69) + 1, fy(0.5), "#8a6a1f");
  rampV(fx(0.725), fy(0.53), 4, 4, ["#f6b880", "#f4a261"]);
  px(fx(0.725) + 3, fy(0.53) + 3, "#c97b3d");
  px(fx(0.725) + 1, fy(0.53), "#8a4b1f");

  // desk: full-width surface with grain, front face with dithered vignette
  const deskY = fy(0.7);
  rampV(0, deskY, cols, fy(0.035), ["#96683f", "#7a5636", "#6b4a2f"]);
  rect(0, deskY, cols, 1, "#a5784a");
  for (let x = 0; x < cols; x += 9) rect(x + (x % 4), deskY + 2, 5, 1, "#553a24", 0.7);
  for (let x = 4; x < cols; x += 11) px(x, deskY + 1, "#c09055", 0.5);
  rampV(0, deskY + fy(0.035), cols, rows - deskY - fy(0.035), ["#553a24", "#4e3520", "#402a1a", "#33200f"]);
  for (let y = deskY + fy(0.06); y < rows; y += 4) {
    for (let x = (y * 7) % 11; x < cols; x += 13) rect(x, y, 7, 1, "#442e1c", 0.8);
  }
  rect(0, rows - fy(0.06), cols, fy(0.06), "#2a1a0c", 0.4);

  // dual modern monitors
  const mx0 = fx(HERO_MON.x), my0 = fy(HERO_MON.y), mw = fx(HERO_MON.w), mh = fy(HERO_MON.h);
  const gap = fx(0.012);
  const sw2 = (mw - gap) / 2;
  [0, 1].forEach((i) => {
    const sx = mx0 + i * (sw2 + gap);
    rect(sx - 2, my0 + mh + 2, sw2 + 4, 3, "#0a0605", 0.3);
    rampV(sx - 1, my0 - 1, sw2 + 2, mh + 2, ["#161c26", "#0b0d12", "#060810"]);
    rect(sx - 1, my0 - 1, sw2 + 2, 1, "#2a3446");
    rampV(sx, my0, sw2, mh, ["#12203a", "#0d1622", "#0a111c"]);
    // taskbar with tiny icons
    rect(sx, my0 + mh - 2, sw2, 2, "#141e2e");
    px(sx + 2, my0 + mh - 1, "#2a9d8f", 0.8);
    px(sx + 4, my0 + mh - 1, "#e9c46a", 0.8);
    // stand with highlight, reaching the desk
    rampV(sx + sw2 / 2 - 1, my0 + mh + 1, 2, deskY - my0 - mh - 1, ["#161c26", "#0b0d12"]);
    rect(sx + sw2 / 2 - 5, deskY - 1, 11, 1, "#0b0d12");
    rect(sx + sw2 / 2 - 5, deskY - 2, 11, 1, "#1c2433", 0.6);
  });
  // left screen: dim code so the selector buttons stay the focus
  for (let y = 2; y < mh - 3; y += 2) {
    for (let x = 2; x < sw2 - 2; x += 3) {
      const kind = (x * 5 + y * 7) % 5;
      if (kind !== 0) px(mx0 + x, my0 + y, kind === 1 ? "#e9c46a" : kind === 2 ? "#7fdb9a" : "#2a9d8f", 0.6);
    }
  }
  for (let sY = 0; sY < mh - 2; sY += 2) rect(mx0, my0 + sY, sw2, 1, "#000000", 0.25);
  // right screen: quiet desktop icons, selector buttons overlay this screen
  const rx0 = mx0 + sw2 + gap;
  px(rx0 + 3, my0 + 3, "#2a9d8f", 0.5);
  px(rx0 + 3, my0 + 6, "#e9c46a", 0.5);
  px(rx0 + 6, my0 + 3, "#f4a261", 0.5);
  rect(mx0, my0 + mh, mw, fy(0.05), "#2a9d8f", 0.05);

  // keyboard and mouse with contact shadows
  rect(fx(0.425), deskY - 1, fx(0.15), 2, "#2a1a0c", 0.35);
  rampV(fx(0.43), deskY - 3, fx(0.14), 3, ["#1c2230", "#141720"]);
  for (let x = fx(0.435); x < fx(0.565); x += 2) px(x, deskY - 2, "#2a9d8f", 0.65);
  rect(fx(0.49), deskY - 1, fx(0.05), 1, "#3a4358");
  rect(fx(0.6), deskY - 3, 3, 3, "#141720");
  px(fx(0.6), deskY - 3, "#3a4358");

  // table lamp with shaded cone (animated glow drawn by the fx layer)
  const lx = fx(HERO_LAMP_X);
  rect(lx - 5, deskY - 1, 12, 2, "#2a1a0c", 0.35);
  rampV(lx - 4, deskY - 2, 10, 2, ["#4a4238", "#2c2620"]);
  rampV(lx, deskY - fy(0.16), 2, fy(0.16) - 2, ["#4a4238", "#3a332a"]);
  px(lx, deskY - fy(0.16), "#5a5048");
  rampV(lx + 1, deskY - fy(0.17), 4, 2, ["#4a4238", "#3a332a"]);
  const shx = lx + 4, shy = deskY - fy(0.21);
  rampV(shx, shy, 6, 2, ["#f4b26a", "#d98f4d"]);
  rampV(shx - 1, shy + 2, 9, 2, ["#d98f4d", "#c97b3d"]);
  rampV(shx - 2, shy + 4, 11, 2, ["#c97b3d", "#b96a32"]);
  rect(shx + 2, shy + 6, 3, 1, "#ffd9a0");
  px(shx - 2, shy + 5, "#8a4f26");

  // coffee mug with highlight and contact shadow (steam from the fx layer)
  const mgx = fx(HERO_MUG_X);
  rect(mgx - 1, deskY - 1, 7, 2, "#2a1a0c", 0.35);
  rampV(mgx, deskY - fy(0.045), 5, fy(0.045), ["#d95d43", "#c7513a", "#a8442f"]);
  rect(mgx + 1, deskY - fy(0.045), 3, 1, "#3a2118");
  px(mgx, deskY - fy(0.045) + 1, "#e87a5e");
  rect(mgx + 5, deskY - fy(0.045) + 1, 1, 2, "#a8442f");
};

const initHeroScene = () => {
  const hero = document.getElementById("top");
  if (!hero) return;
  const room = hero.querySelector(".hero-room");
  const fxCanvas = hero.querySelector(".hero-fx");
  const art = hero.querySelector(".hero-art");
  if (!room || !fxCanvas) return;

  const stars = heroStarField();
  const cols = 192;
  let rows = 64;

  const paint = () => {
    const w = hero.clientWidth || 1;
    const h = hero.clientHeight || 1;
    rows = Math.max(48, Math.ceil(cols * (h / w)));
    [room, fxCanvas].forEach((c) => {
      c.width = cols;
      c.height = rows;
    });
    paintHeroRoom(createPainter(room.getContext("2d"), cols, rows), stars);
  };
  paint();
  window.addEventListener("resize", paint);

  // parallax: scroll depth + gentle mouse drift
  let mouseX = 0;
  let mouseY = 0;
  let raf = 0;
  const apply = () => {
    raf = 0;
    const off = Math.min(0, hero.getBoundingClientRect().top);
    const sceneTransform = `translate3d(${mouseX * -10}px, ${mouseY * -5 + off * 0.18}px, 0)`;
    room.style.transform = sceneTransform;
    fxCanvas.style.transform = sceneTransform;
    if (art) art.style.transform = sceneTransform;
  };
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(apply);
  };
  if (!reduceMotionQuery.matches) {
    window.addEventListener("scroll", schedule, { passive: true });
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      mouseX = (e.clientX - r.left) / r.width - 0.5;
      mouseY = (e.clientY - r.top) / r.height - 0.5;
      schedule();
    });
  }

  // fx loop: lamp flicker, coffee steam, star twinkle, monitor breathing
  const fxCtx = fxCanvas.getContext("2d");
  const steam = Array.from({ length: 6 }, () => ({ x: 0, y: 0, life: 0 }));
  const resetSteam = (p) => {
    p.x = HERO_MUG_X + Math.random() * 0.03;
    p.y = 0.645;
    p.life = 0.6 + Math.random() * 0.4;
  };
  steam.forEach(resetSteam);
  let flicker = 0.6;
  let t = 0;
  let visible = true;

  const drawFx = () => {
    t += 0.016;
    fxCtx.clearRect(0, 0, cols, rows);
    const { rect, px, fx, fy } = createPainter(fxCtx, cols, rows);

    flicker += (Math.random() - 0.5) * 0.07;
    if (Math.random() < 0.015) flicker *= 0.55;
    flicker = Math.min(0.9, Math.max(0.3, flicker));
    const lampX = fx(HERO_LAMP_X) + 4;
    const lampY = fy(0.7) - fy(0.21) + 6;
    for (let i = 0; i < 8; i++) {
      rect(lampX - 3 - i * 1.5, lampY + 4 + i * 2, 12 + i * 3, 2, "#f4a261", 0.045 * flicker);
    }
    rect(lampX - 8, fy(0.695), 26, 3, "#f4a261", 0.1 * flicker);
    rect(lampX - 10, lampY - 8, 30, 10, "#f4a261", 0.05 * flicker);

    rect(fx(HERO_MON.x), fy(HERO_MON.y) + fy(HERO_MON.h), fx(HERO_MON.w), fy(0.05), "#2a9d8f", 0.05 + 0.02 * Math.sin(t * 1.4));

    steam.forEach((p) => {
      p.y -= 0.0009;
      p.x += Math.sin(t * 2 + p.life * 9) * 0.0004;
      p.life -= 0.004;
      if (p.life <= 0) resetSteam(p);
      px(fx(p.x), fy(p.y), "#f2e2c4", 0.35 * p.life);
      px(fx(p.x) + 1, fy(p.y), "#f2e2c4", 0.18 * p.life);
    });
  };

  const loop = () => {
    if (visible) drawFx();
    requestAnimationFrame(loop);
  };
  if (reduceMotionQuery.matches) {
    drawFx();
  } else {
    const io = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
    });
    io.observe(hero);
    loop();
  }
};

const TROPHY_FRAMES = ["copper", "laurel", "circuit", "wood", "neon", "ember"];

// Deal trophy frames to the achievement cards, cycling evenly through the
// set. The pick list is mirrored across every marquee track so the loop
// still wraps seamlessly.
const initTrophyFrames = () => {
  const tracks = document.querySelectorAll(".tech-marquee__track");
  if (!tracks.length) {
    return;
  }
  const count = tracks[0].querySelectorAll(".trophy-card__bg").length;
  if (!count) {
    return;
  }
  const picks = Array.from(
    { length: count },
    (_, i) => TROPHY_FRAMES[i % TROPHY_FRAMES.length]
  );
  tracks.forEach((track) => {
    track.querySelectorAll(".trophy-card__bg").forEach((bg, i) => {
      bg.src = `/img/ui/trophy-${picks[i % count]}.png`;
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initExperienceYears();
  initRoomGlow();
  initKeyboardWorldNav();
  initMobileNav();
  initNavShelf();
  initHeroScene();
  initWorldAtmospheres();
  initTrophyFrames();
});
