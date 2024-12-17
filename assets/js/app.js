document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length === 0) {
        console.error('Aucun élément .faq-item trouvé');
        return;
    }

    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const arrow = questionButton.querySelector('.arrow'); // Récupère le chevron

        if (!questionButton || !answer || !arrow) {
            console.error('Élément mal structuré', item);
            return;
        }

        questionButton.addEventListener('click', () => {
            // Ajoute ou retire la classe 'open' pour faire pivoter l'arrow
            item.classList.toggle('open');
            // Affiche ou cache la réponse en fonction de la classe 'active'
            answer.classList.toggle('active');
        });
    });
});

//carousel

document.addEventListener('DOMContentLoaded', function() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    let currentIndex = 0;

    function updateCarousel() {
        carouselItems.forEach((item, index) => {
            item.classList.remove('active'); // Retire la classe active
            item.style.transform = 'translateX(100%)'; // Position par défaut à droite
        });

        // Ajoute la classe active à l'image courante
        carouselItems[currentIndex].classList.add('active');
        carouselItems[currentIndex].style.transform = 'translateX(0)';


    }

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateCarousel();
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        updateCarousel();
    });

    updateCarousel(); // Initialisation
});
