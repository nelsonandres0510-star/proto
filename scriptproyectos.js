document.addEventListener("DOMContentLoaded", () => {
    const tickerContent = document.querySelector(".ticker-content");

    // Clonamos el contenido para el bucle infinito
    const clone = tickerContent.cloneNode(true);
    document.querySelector(".ticker-wrapper").appendChild(clone);

    // Animación de desplazamiento MUY lenta
    gsap.to(".ticker-wrapper", {
        xPercent: -50, 
        ease: "none",
        duration: 5, // Aumentado a 40 para que sea pausado
        repeat: -1
    });
});

// Animación de entrada para las imágenes
gsap.utils.toArray(".gallery-item").forEach((item) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out"
    });
});