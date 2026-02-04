gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    
    // Función para crear la animación por sección
    const createScrollText = (containerSelector, triggerSelector, text) => {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        // Limpiar y crear palabras
        container.innerHTML = "";
        const wordsArray = text.split(" ");
        
        wordsArray.forEach((word) => {
            const span = document.createElement("span");
            span.textContent = word;
            span.classList.add("sentence-word");
            container.appendChild(span);
            container.appendChild(document.createTextNode(" "));
        });

        const spans = container.querySelectorAll(".sentence-word");

        // Animación de Scroll
        gsap.from(spans, {
            scrollTrigger: {
                trigger: triggerSelector,
                start: "top top",
                end: "+=1500",
                scrub: 1,
                pin: true,
                markers: false
            },
            opacity: 0,
            x: (i) => (i % 2 === 0 ? -150 : 150),
            rotate: (i) => (i % 2 === 0 ? -15 : 15),
            stagger: 0.1,
            ease: "power2.out"
        });
    };

    // LLAMADA PARA LA FRASE 1
    createScrollText(
        ".container-1", 
        ".section-1", 
        "Tu marca forma parte de una cultura compleja y en constante evolución. Su papel depende de una sola cosa: la influencia."
    );

    // LLAMADA PARA LA FRASE 2 (La nueva frase)
    createScrollText(
        ".container-2", 
        ".section-2", 
        "Es por eso que desafiamos a los líderes a cristalizar la historia de lo que representan sus marcas y por qué eso importa."
    );
});

// Selecciona elementos
const images = document.querySelectorAll(".image-roulette img");
const trigger = document.querySelector(".trigger");
const mask = trigger.querySelector(".masked-text");

let index = 0;
let loop;

function nextImage() {
  gsap.to(images[index], { opacity: 0, duration: 0.6 });

  index = (index + 1) % images.length;

  gsap.to(images[index], {
    opacity: 1,
    scale: 1.05,
    duration: 0.8,
    ease: "power2.out"
  });
}

trigger.addEventListener("mouseenter", () => {
  gsap.to(mask, { opacity: 1, duration: 0.3 });
  nextImage();
  loop = setInterval(nextImage, 900);
});

trigger.addEventListener("mouseleave", () => {
  clearInterval(loop);
  gsap.to(images, { opacity: 0, duration: 0.5 });
  // gsap.to(mask, { opacity: 0, duration: 0.3 });
});
const maskedText = document.querySelector(".masked-text");
const headlines = document.querySelectorAll(".headline");

maskedText.addEventListener("mouseenter", () => {
  gsap.to(headlines, {
    opacity: 0,
    filter: "blur(10px)",
    duration: 0.4,
    stagger: 0.05,
    ease: "power2.out"
  });
});

maskedText.addEventListener("mouseleave", () => {
  gsap.to(headlines, {
    opacity: 1,
    filter: "blur(0px)",
    duration: 0.4,
    stagger: 0.05,
    ease: "power2.out"
  });
});
