gsap.registerPlugin(ScrollTrigger);
const heroTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".hero-container",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true, // Mantiene la escena fija mientras ocurre la magia
        pinSpacing: true
    }
});

/* --------------------------------------------------
   3. GENERACIÓN DINÁMICA DE PALABRAS
-------------------------------------------------- */
const phrase = "Construimos marcas que conecten con su público desde la  humanizamos la comunicación mostrando las marcas arriesgadas y disruptivas";
const textContainer = document.getElementById('text-container');

if (textContainer) {
    const wordsArray = phrase.split(" ");
    const middleIndex = Math.floor(wordsArray.length / 2);

    wordsArray.forEach((word, index) => {
        // Insertar "NUESTROS PROYECTOS" en medio
        if (index === middleIndex) {
            const projectTrigger = document.createElement('span');
            projectTrigger.className = 'word-unit project-trigger';
            projectTrigger.textContent = 'Honestidad';
            textContainer.appendChild(projectTrigger);
            textContainer.appendChild(document.createTextNode(" "));
        }

        const span = document.createElement('span');
        span.textContent = word;
        span.className = 'word-unit';
        textContainer.appendChild(span);
        textContainer.appendChild(document.createTextNode(" "));
    });
}

/* --------------------------------------------------
    4. ANIMACIÓN DE REVELADO (DESDE ABAJO)
-------------------------------------------------- */
// Estado inicial: las palabras están un poco más abajo y son transparentes
gsap.set(".word-unit", { 
    y: 50, 
    opacity: 0 
});

// Animación única para todas las palabras con stagger (cascada)
gsap.to(".word-unit", {
    scrollTrigger: {
        trigger: ".scroll-area-explosion",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8, // Hace que la animación siga el scroll suavemente
    },
    y: 0,
    opacity: 1,
    stagger: 0.05, // Crea el efecto de que salen una tras otra
    ease: "power2.out"
});

/* --------------------------------------------------
   5. LÓGICA DE RULETA Y HOVER (INTERACCIÓN)
-------------------------------------------------- */
const rouletteImages = document.querySelectorAll('.project-roulette img');
const trigger = document.querySelector('.project-trigger');
let rouletteInterval;
let currentIndex = 0;

// Función para mostrar siguiente imagen
function showNextImage() {
    gsap.to(rouletteImages[currentIndex], {
        opacity: 0,
        scale: 1.1,
        duration: 0.8,
        ease: "power2.inOut",
        overwrite: true
    });

    currentIndex = (currentIndex + 1) % rouletteImages.length;

    gsap.to(rouletteImages[currentIndex], {
        opacity: 0.7,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        overwrite: true
    });
}
// Hover sobre “Honestidad”
if (trigger) {
    trigger.addEventListener('mouseenter', () => {
        trigger.classList.add('active'); 

        gsap.to('.project-roulette', { opacity: 1, duration: 0.5 });
        showNextImage();
        rouletteInterval = setInterval(showNextImage, 800);

        const words = document.querySelectorAll('.word-unit');
        words.forEach(word => {
            if (!word.classList.contains('project-trigger')) {
                // Desvanecemos el resto
                gsap.to(word, { opacity: 0.05, filter: "blur(8px)", y: -10, duration: 0.3 });
            } else {
                // Mantenemos Honestidad brillante y al frente
                gsap.set(word, { clearProps: "color", zIndex: 100 }); 
                gsap.to(word, { 
                    opacity: 1, 
                    scale: 1.3, 
                    filter: "blur(0px)", 
                    y: 0, 
                    duration: 0.3 
                });
            }
        });
    });

    trigger.addEventListener('mouseleave', () => {
        trigger.classList.remove('active');
        gsap.to('.project-roulette', { opacity: 0, duration: 0.5 });
        clearInterval(rouletteInterval);

        const words = document.querySelectorAll('.word-unit');
        words.forEach(word => {
            gsap.to(word, {
                opacity: 1,
                color: "#000000",
                filter: "blur(0px)",
                y: 0,
                scale: 1,
                zIndex: 1, // Resetear el z-index
                duration: 0.4,
            });
        });
    });
}

gsap.utils.toArray(".project-card").forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top bottom", // Empieza cuando el tope de la carta entra por abajo
            end: "top center",
            scrub: 1,
        },
        y: 100, // Viene desde abajo
        opacity: 0,
        scale: 0.8,
        ease: "power2.out"
    });

    // Opcional: El texto de fondo se vuelve más borroso cuando hay una imagen encima
    gsap.to(".base-phrase", {
        scrollTrigger: {
            trigger: card,
            start: "top center",
            end: "bottom center",
            scrub: true
        },
        filter: "blur(15px)",
        opacity: 0.1
    });
});

gsap.utils.toArray(".section-wrapper").forEach(section => {
    const img = section.querySelector(".image-container");
    const content = section.querySelectorAll(".content-pro");

    gsap.to(img, {
        scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top center",
            scrub: 1.2,
            invalidateOnRefresh: true // Importante para recalcular posiciones
        },
        opacity: 1,
        scale: 1,
        ease: "power2.out"
    });

    gsap.to(content, {
        scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "top 20%",
            scrub: 1
        },
        opacity: 1,
        y: -20,
        stagger: 0.2
    });
});
ScrollTrigger.refresh();

// Creamos la línea de tiempo
const expansionTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".expansion-section",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // Un poco más suave
    }
});

// 1. La frase central aparece con un pequeño zoom
expansionTl.from(".center-phrase", {
    scale: 0.8,
    opacity: 0,
    duration: 1.5,
    ease: "back.out(1.7)"
});

// 2. Las palabras de las esquinas viajan desde el centro
// Seleccionamos todas las opciones y las movemos
expansionTl.from(".corner-option", {
    top: "50%",
    left: "50%",
    xPercent: -50, // Centrado exacto
    yPercent: -50,
    opacity: 0,
    scale: 0,
    duration: 2.5,
    stagger: 0.1, // Salen una tras otra
    ease: "power3.out"
}, "-=1"); // Empiezan un poco antes de que termine la frase central

// 3. Efecto final: la frase central se atenúa para dejar protagonismo a las esquinas
expansionTl.to(".center-phrase", {
    opacity: 0.3,
    scale: 0.9,
    duration: 1
});
/* APARICIÓN SIN SCROLL */
gsap.to(".sticky-main-image", {
    opacity: 1,
    duration: 1,
    delay: 1,
    ease: "power2.out"
});

/* SCROLL TIMELINE */
const stickyTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".sticky-hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: ".sticky-hero-pin"
    }
});

/* ZOOM IMAGEN */
stickyTimeline.to(".sticky-main-image", {
    scale: 2.2,
    ease: "power2.inOut"
}, 0);

/* TEXTO SALE */
stickyTimeline.to(".sticky-word-a", {
    x: -200,
    opacity: 0
}, 0);

stickyTimeline.to(".sticky-word-c", {
    x: 200,
    opacity: 0
}, 0);

stickyTimeline.to(".sticky-word-b", {
    y: 80,
    opacity: 0
}, 0);
