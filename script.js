// ============================
// TYPING EFFECT
// ============================
const frases = [
    "Desarrollador de IA",
    "Ingeniero en Desarrollo de Software",
    "Profesor de Robótica e Informática",
    "Desarrollador Web"
];

let fraseIndex = 0;
let charIndex = 0;
let borrando = false;
const typingElement = document.getElementById("typing-text");

function typingEffect() {
    const fraseActual = frases[fraseIndex];

    if (!borrando) {
        typingElement.textContent = fraseActual.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === fraseActual.length) {
            borrando = true;
            setTimeout(typingEffect, 2000);
            return;
        }
        setTimeout(typingEffect, 80);
    } else {
        typingElement.textContent = fraseActual.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            borrando = false;
            fraseIndex = (fraseIndex + 1) % frases.length;
        }
        setTimeout(typingEffect, 40);
    }
}

typingEffect();

// ============================
// DARK / LIGHT MODE TOGGLE
// ============================
const temaToggle = document.getElementById("tema-toggle");
const html = document.documentElement;

const temaGuardado = localStorage.getItem("tema");
if (temaGuardado) {
    html.setAttribute("data-theme", temaGuardado);
    actualizarIconoTema(temaGuardado);
}

temaToggle.addEventListener("click", function () {
    const temaActual = html.getAttribute("data-theme");
    const nuevoTema = temaActual === "light" ? "dark" : "light";
    html.setAttribute("data-theme", nuevoTema);
    localStorage.setItem("tema", nuevoTema);
    actualizarIconoTema(nuevoTema);
});

function actualizarIconoTema(tema) {
    const icono = temaToggle.querySelector("i");
    if (tema === "dark") {
        icono.className = "fa-solid fa-sun";
    } else {
        icono.className = "fa-solid fa-moon";
    }
}

// ============================
// MENU RESPONSIVE
// ============================
function responsiveMenu() {
    var x = document.getElementById("nav");
    if (x.className === "" || x.className === undefined) {
        x.className = "responsive";
    } else {
        x.className = "";
    }
}

// ============================
// NAVEGACION ACTIVA POR SCROLL
// ============================
const secciones = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("#links a");

function actualizarNavActiva() {
    let scrollPos = window.scrollY + 100;

    secciones.forEach(function (seccion) {
        if (
            scrollPos >= seccion.offsetTop &&
            scrollPos < seccion.offsetTop + seccion.offsetHeight
        ) {
            const id = seccion.getAttribute("id");
            navLinks.forEach(function (link) {
                link.classList.remove("seleccionado");
                if (link.getAttribute("href") === "#" + id) {
                    link.classList.add("seleccionado");
                }
            });
        }
    });
}

// ============================
// BOTON VOLVER ARRIBA
// ============================
const btnArriba = document.getElementById("btn-arriba");

function toggleBtnArriba() {
    if (window.scrollY > 400) {
        btnArriba.classList.add("visible");
    } else {
        btnArriba.classList.remove("visible");
    }
}

btnArriba.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ============================
// SCROLL EVENT LISTENER
// ============================
window.addEventListener("scroll", function () {
    actualizarNavActiva();
    toggleBtnArriba();
});

// ============================
// SCROLL ANIMATIONS (IntersectionObserver)
// ============================
const fadeElements = document.querySelectorAll(".fade-in");

const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(function (el) {
    observer.observe(el);
});

// ============================
// CONTADORES ANIMADOS
// ============================
const contadores = document.querySelectorAll(".contador-numero");
let contadoresAnimados = false;

const contadorObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting && !contadoresAnimados) {
            contadoresAnimados = true;
            contadores.forEach(function (contador) {
                const target = parseInt(contador.getAttribute("data-target"));
                const duracion = 2000;
                const incremento = target / (duracion / 16);
                let actual = 0;

                function actualizar() {
                    actual += incremento;
                    if (actual < target) {
                        contador.textContent = Math.ceil(actual);
                        requestAnimationFrame(actualizar);
                    } else {
                        contador.textContent = target + "+";
                    }
                }
                actualizar();
            });
        }
    });
}, { threshold: 0.5 });

const seccionContadores = document.getElementById("contadores");
if (seccionContadores) {
    contadorObserver.observe(seccionContadores);
}

// ============================
// CERRAR MENU AL HACER CLICK EN LINK (MOBILE)
// ============================
navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        var nav = document.getElementById("nav");
        nav.className = "";
    });
});
