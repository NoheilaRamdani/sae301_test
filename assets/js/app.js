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


document.addEventListener('DOMContentLoaded', function() {
    const scrollInviteLink = document.querySelector('.scroll-invite-link');

    scrollInviteLink.addEventListener('click', function(e) {
        e.preventDefault(); // Empêche le comportement de lien par défaut

        const targetSection = document.querySelector(this.getAttribute('href'));

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth' // Défilement en douceur
            });
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date-input');
    const dateInput2 = document.getElementById('date-input-2');
    const reserveBtn = document.getElementById('reserve-btn');
    const reserveBtn2 = document.getElementById('reserve-btn-2');
    const reservationDetails = document.getElementById('reservation-details');
    const reservationDetails2 = document.getElementById('reservation-details-2');
    const availabilitySlots = document.querySelectorAll('.availability-slots');

    // Désactiver les dates passées
    const today = new Date();
    const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    dateInput.min = minDate;
    dateInput2.min = minDate;

    // Initialiser les dates d'aujourd'hui
    dateInput.value = minDate;
    dateInput2.value = minDate;

    // Simuler la disponibilité des créneaux
    updateAvailability(dateInput);
    updateAvailability(dateInput2);

    dateInput.addEventListener('change', () => updateAvailability(dateInput));
    dateInput2.addEventListener('change', () => updateAvailability(dateInput2));

    reserveBtn.addEventListener('click', () => {
        const selectedSlot = Array.from(availabilitySlots[0].querySelectorAll('.slot')).find(slot => slot.classList.contains('selected'));
        if (selectedSlot) {
            reservationDetails.textContent = `Réservé: ${dateInput.value} à ${selectedSlot.textContent}`;
        } else {
            reservationDetails.textContent = '';
        }
    });

    reserveBtn2.addEventListener('click', () => {
        const selectedSlot = Array.from(availabilitySlots[1].querySelectorAll('.slot')).find(slot => slot.classList.contains('selected'));
        if (selectedSlot) {
            reservationDetails2.textContent = `Réservé: ${dateInput2.value} à ${selectedSlot.textContent}`;
        } else {
            reservationDetails2.textContent = '';
        }
    });

    function updateAvailability(dateInput) {
        const availabilitySlots = dateInput.parentNode.querySelectorAll('.availability-slots');
        availabilitySlots.forEach((slots, index) => {
            slots.innerHTML = '';
            for (let i = 12; i <= 17; i++) {
                const slot = document.createElement('div');
                slot.classList.add('slot');
                slot.textContent = `${i}h`;
                slot.addEventListener('click', () => {
                    slots.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
                    slot.classList.add('selected');
                });
                slots.appendChild(slot);
            }
        });
    }
});