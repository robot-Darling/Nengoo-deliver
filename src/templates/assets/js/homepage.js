
        // Fonctionnalité de base
        document.addEventListener('DOMContentLoaded', function() {
            const openBtn = document.getElementById('openRatingBtn');
            const closeBtn = document.getElementById('closeRatingBtn');
            const overlay = document.getElementById('ratingOverlay');
            const stars = document.querySelectorAll('.star');
            const submitBtn = document.getElementById('submitRating');
            const confirmationMessage = document.getElementById('confirmationMessage');
            
            let currentRating = 0;

            // Ouvrir le popup
            openBtn.addEventListener('click', function() {
                overlay.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Empêche le scroll
            });

            // Fermer le popup
            closeBtn.addEventListener('click', function() {
                overlay.style.display = 'none';
                document.body.style.overflow = 'auto'; // Rétablit le scroll
                resetRating();
            });

            // Fermer en cliquant en dehors du popup
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    overlay.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    resetRating();
                }
            });

            // Système d'étoiles
            stars.forEach(star => {
                star.addEventListener('click', function() {
                    const rating = parseInt(this.getAttribute('data-rating'));
                    currentRating = rating;
                    
                    // Mettre à jour l'affichage des étoiles
                    stars.forEach((s, index) => {
                        if (index < rating) {
                            s.classList.add('active');
                        } else {
                            s.classList.remove('active');
                        }
                    });
                });
                
                // Effet hover
                star.addEventListener('mouseover', function() {
                    const rating = parseInt(this.getAttribute('data-rating'));
                    
                    stars.forEach((s, index) => {
                        if (index < rating) {
                            s.style.color = 'var(--secondary)';
                        }
                    });
                });
                
                star.addEventListener('mouseout', function() {
                    stars.forEach((s, index) => {
                        if (index >= currentRating) {
                            s.style.color = '#ddd';
                        }
                    });
                });
            });

            // Soumission de l'évaluation
            submitBtn.addEventListener('click', function() {
                if (currentRating === 0) {
                    alert('Veuillez sélectionner une note');
                    return;
                }
                
                // Ici vous pourriez envoyer la note au serveur
                console.log('Note attribuée:', currentRating);
                
                // Afficher le message de confirmation
                confirmationMessage.style.display = 'block';
                submitBtn.style.display = 'none';
                
                // Fermer le popup après 2 secondes
                setTimeout(() => {
                    overlay.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    resetRating();
                }, 2000);
            });

            // Réinitialiser l'évaluation
            function resetRating() {
                currentRating = 0;
                stars.forEach(star => {
                    star.classList.remove('active');
                    star.style.color = '#ddd';
                });
                confirmationMessage.style.display = 'none';
                submitBtn.style.display = 'block';
            }

            
            // Gestion des boutons "Commander"
            const orderButtons = document.querySelectorAll('.btn-primary');
            orderButtons.forEach(button => {
                if (button.textContent === 'Commander') {
                    button.addEventListener('click', function() {
                        const mealName = this.closest('.meal-card').querySelector('h4').textContent;
                        const mealPrice = this.closest('.meal-card').querySelector('.price').textContent;
                        alert(`Vous avez commandé : ${mealName}\nPrix : ${mealPrice}`);
                    });
                }
            });
            
            // Gestion de la recherche
            const searchButton = document.querySelector('.search-input button');
            const searchInput = document.querySelector('.search-input input');
            
            searchButton.addEventListener('click', performSearch);
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') performSearch();
            });
            
            function performSearch() {
                if (searchInput.value.trim() !== '') {
                    alert(`Recherche pour : ${searchInput.value}`);
                    // Ici vous pourriez ajouter la logique de filtrage des restaurants/plats
                }
            }
        });
