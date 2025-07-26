
        document.addEventListener('DOMContentLoaded', function() {
            const menuItemsContainer = document.getElementById('menuItems');
            const addButtons = document.querySelectorAll('.add-to-menu');
            let menuItems = [];
            
            // Fonction pour afficher les éléments du menu
            function displayMenuItems() {
                if (menuItems.length === 0) {
                    menuItemsContainer.innerHTML = '<div class="empty-message">Aucun plat ajouté au menu du jour</div>';
                    return;
                }
                
                menuItemsContainer.innerHTML = '';
                
                menuItems.forEach(item => {
                    const menuItemElement = document.createElement('div');
                    menuItemElement.className = 'menu-item';
                    menuItemElement.dataset.id = item.id;
                    
                    menuItemElement.innerHTML = `
                        <div class="menu-item-info">
                            <div class="menu-item-name">${item.name}</div>
                            <div class="menu-item-price">${item.price} €</div>
                        </div>
                        <button class="btn btn-danger remove-from-menu">Supprimer</button>
                    `;
                    
                    menuItemsContainer.appendChild(menuItemElement);
                });
            }
            
            // Ajouter un plat au menu
            addButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const id = this.dataset.id;
                    const name = this.dataset.name;
                    const price = this.dataset.price;
                    
                    // Vérifier si le plat est déjà dans le menu
                    if (!menuItems.some(item => item.id === id)) {
                        menuItems.push({
                            id,
                            name,
                            price
                        });
                        
                        displayMenuItems();
                        
                        // Désactiver le bouton
                        this.textContent = 'Ajouté';
                        this.disabled = true;
                        this.classList.remove('btn-primary');
                        this.classList.add('btn-outline');
                    }
                });
            });
            
            // Supprimer un plat du menu
            menuItemsContainer.addEventListener('click', function(e) {
                if (e.target.classList.contains('remove-from-menu')) {
                    const menuItem = e.target.closest('.menu-item');
                    const id = menuItem.dataset.id;
                    
                    // Retirer le plat du tableau
                    menuItems = menuItems.filter(item => item.id !== id);
                    
                    // Réactiver le bouton correspondant
                    const addButton = document.querySelector(`.add-to-menu[data-id="${id}"]`);
                    if (addButton) {
                        addButton.textContent = 'Ajouter';
                        addButton.disabled = false;
                        addButton.classList.remove('btn-outline');
                        addButton.classList.add('btn-primary');
                    }
                    
                    displayMenuItems();
                }
            });
        });
 