document.addEventListener('DOMContentLoaded', () => {
    // FAQ Section
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const questionButton = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const arrow = questionButton.querySelector('.arrow');

            if (questionButton && answer && arrow) {
                questionButton.addEventListener('click', () => {
                    item.classList.toggle('open');
                    answer.classList.toggle('active');
                });
            }
        });
    }

    // Carousel
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        const carouselItems = carouselContainer.querySelectorAll('.carousel-item');
        const prevButton = carouselContainer.querySelector('.carousel-prev');
        const nextButton = carouselContainer.querySelector('.carousel-next');

        if (carouselItems.length > 0 && prevButton && nextButton) {
            let currentIndex = 0;

            function updateCarousel() {
                carouselItems.forEach((item, index) => {
                    item.classList.remove('active');
                    item.style.transform = 'translateX(100%)';
                });

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

            updateCarousel();
        }
    }

    // Scroll Invite Link
    const scrollInviteLink = document.querySelector('.scroll-invite-link');
    if (scrollInviteLink) {
        scrollInviteLink.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // Reservation Date Picker
    const horaireOuverture = {
        0: { debut: 10, fin: 18 },   // DIMANCHE
        1: { debut: null, fin: null },   // LUNDI (fermé)
        2: { debut: 14, fin: 20 },   // MARDI
        3: { debut: 14, fin: 20 },   // MERCREDI
        4: { debut: 14, fin: 20 },   // JEUDI
        5: { debut: 14, fin: 20 },   // VENDREDI
        6: { debut: 10, fin: 21 }    // SAMEDI
    };

    const dateInput = document.getElementById('date-input');
    const dateInput2 = document.getElementById('date-input-2');
    const reserveBtn = document.getElementById('reserve-btn');
    const reserveBtn2 = document.getElementById('reserve-btn-2');
    const reservationDetails = document.getElementById('reservation-details');
    const reservationDetails2 = document.getElementById('reservation-details-2');

    if (dateInput && dateInput2 && reserveBtn && reserveBtn2) {
        const datePickerOptions = {
            dateFormat: "d/m/Y",
            minDate: "today",
            locale: "fr",
            disableMobile: "true",
            onDayCreate: function(dObj, dStr, fp, dayElem) {
                const date = dayElem.dateObj;
                const jour = date.getDay();
                const horaires = horaireOuverture[jour];

                if (!horaires || horaires.debut === null) {
                    dayElem.classList.add('flatpickr-disabled');
                }
            }
        };

        const datepicker1 = flatpickr(dateInput, {
            ...datePickerOptions,
            onChange: function() {
                updateAvailability(dateInput);
            }
        });

        const datepicker2 = flatpickr(dateInput2, {
            ...datePickerOptions,
            onChange: function() {
                updateAvailability(dateInput2);
            }
        });

        function updateAvailability(inputElement) {
            const availabilitySlots = inputElement.closest('.reservation-form').querySelector('.availability-slots');
            availabilitySlots.innerHTML = '';

            const selectedDate = new Date(inputElement.value.split('/').reverse().join('-'));
            const jour = selectedDate.getDay();
            const horaires = horaireOuverture[jour];

            if (!horaires || horaires.debut === null) {
                availabilitySlots.innerHTML = '<p>Fermé ce jour</p>';
                return;
            }

            const maxCreneauxParLigne = 2;
            let creneauxCourants = 0;
            let ligneActuelle = document.createElement('div');
            ligneActuelle.classList.add('slot-ligne');
            availabilitySlots.appendChild(ligneActuelle);

            for (let i = horaires.debut; i < horaires.fin; i++) {
                const slot = document.createElement('div');
                slot.classList.add('slot');
                slot.textContent = `${i}h`;

                slot.addEventListener('click', () => {
                    availabilitySlots.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
                    slot.classList.add('selected');
                });

                ligneActuelle.appendChild(slot);
                creneauxCourants++;

                if (creneauxCourants >= maxCreneauxParLigne) {
                    creneauxCourants = 0;
                    ligneActuelle = document.createElement('div');
                    ligneActuelle.classList.add('slot-ligne');
                    availabilitySlots.appendChild(ligneActuelle);
                }
            }
        }

        reserveBtn.addEventListener('click', () => handleReservation(dateInput, reservationDetails));
        reserveBtn2.addEventListener('click', () => handleReservation(dateInput2, reservationDetails2));

        function handleReservation(dateInputElement, detailsElement) {
            const availabilitySlots = dateInputElement.closest('.reservation-form').querySelector('.availability-slots');
            const selectedSlot = availabilitySlots.querySelector('.slot.selected');

            if (dateInputElement.value && selectedSlot) {
                detailsElement.textContent = `Réservé: ${dateInputElement.value} à ${selectedSlot.textContent}`;
            } else {
                detailsElement.textContent = 'Veuillez sélectionner une date et un créneau';
            }
        }

        updateAvailability(dateInput);
        updateAvailability(dateInput2);
    }
});
// Back to Top Button
    function createBackToTopButton() {
        // Créer l'élément du bouton
        const backToTopButton = document.createElement('button');
        backToTopButton.classList.add('back-to-top');
        backToTopButton.innerHTML = '↑';
        backToTopButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            background-color: #000;
            color: #fff;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 24px;
            cursor: pointer;
            display: none;
            opacity: 0.7;
            transition: opacity 0.3s;
        `;

        // Ajouter le bouton au body
        document.body.appendChild(backToTopButton);

        // Gestion de la visibilité
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        // Action de scroll
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Hover effect
        backToTopButton.addEventListener('mouseenter', () => {
            backToTopButton.style.opacity = '1';
        });

        backToTopButton.addEventListener('mouseleave', () => {
            backToTopButton.style.opacity = '0.7';
        });
    }

    // Appeler la fonction pour créer le bouton Back to Top
    createBackToTopButton();

