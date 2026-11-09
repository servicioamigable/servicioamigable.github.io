// Interacciones mínimas de la landing: menú del celular, borde del encabezado, aparición al hacer scroll y cronómetros de las maquetas
document.documentElement.classList.add("js");

const header = document.querySelector(".site-header");
const toggle = document.getElementById("nav-toggle");
const nav = document.getElementById("main-nav");

toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  nav.classList.toggle("open", open);
});

// Al elegir una sección en el celular, el menú se cierra
nav.addEventListener("click", (e) => {
  if (e.target.closest("a") && nav.classList.contains("open")) toggle.click();
});

const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const reveals = document.querySelectorAll(".section-head, .mode, .steps li, .feature, .grid-features article, .sec-grid article, .chile-list li, .cta-inner");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("visible");
      io.unobserve(entry.target);
    }
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  reveals.forEach((el) => { el.classList.add("reveal"); io.observe(el); });
}

// Los cronómetros de las maquetas avanzan como en la app
const pad = (n) => String(n).padStart(2, "0");
const timers = [...document.querySelectorAll("#hero-timer, #feature-timer")].map((el) => {
  const [h, m, s] = el.textContent.split(":").map(Number);
  return { el, seconds: h * 3600 + m * 60 + s };
});
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setInterval(() => {
    for (const t of timers) {
      t.seconds++;
      t.el.textContent = `${pad(Math.floor(t.seconds / 3600))}:${pad(Math.floor(t.seconds / 60) % 60)}:${pad(t.seconds % 60)}`;
    }
  }, 1000);
}

document.getElementById("year").textContent = new Date().getFullYear();
