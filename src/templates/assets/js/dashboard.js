document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Here you would typically load data for the selected tab
            console.log(`Switched to ${this.dataset.tab} tab`);
        });
    });

    // Modal functionality
    const modal = document.getElementById('courierModal');
    const addBtn = document.getElementById('addCourierBtn');
    const closeBtn = document.querySelector('.close-btn');
    const courierForm = document.getElementById('courierForm');

    addBtn.addEventListener('click', function() {
        modal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    courierForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('courierName').value;
        const email = document.getElementById('courierEmail').value;
        const phone = document.getElementById('courierPhone').value;
        const vehicle = document.getElementById('courierVehicle').value;
        
        // Here you would typically send this data to your backend
        console.log('Creating courier account:', { name, email, phone, vehicle });
        
        // Show success message
        alert('Compte livreur créé avec succès!');
        
        // Reset form and close modal
        courierForm.reset();
        modal.style.display = 'none';
    });

    // Order cancellation
    const cancelButtons = document.querySelectorAll('.btn-cancel');
    cancelButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.closest('tr').querySelector('td:first-child').textContent;
            if (confirm(`Voulez-vous vraiment annuler la commande ${orderId} ?`)) {
                // Here you would typically send a request to cancel the order
                console.log(`Cancelling order ${orderId}`);
                this.closest('tr').querySelector('.status-badge').textContent = 'Annulée';
                this.closest('tr').querySelector('.status-badge').className = 'status-badge delivered';
                this.remove();
            }
        });
    });

    // Restaurant approval/rejection
    const approveButtons = document.querySelectorAll('.btn-approve');
    const rejectButtons = document.querySelectorAll('.btn-reject');

    approveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const restaurantName = this.closest('tr').querySelector('td:first-child').textContent;
            if (confirm(`Approuver le restaurant "${restaurantName}" ?`)) {
                // Here you would typically send an approval request
                console.log(`Approving restaurant ${restaurantName}`);
                const statusBadge = this.closest('tr').querySelector('.status-badge');
                statusBadge.textContent = 'Actif';
                statusBadge.className = 'status-badge active';
                this.closest('td').innerHTML = '<button class="btn btn-view"><i class="fas fa-eye"></i></button>';
            }
        });
    });

    rejectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const restaurantName = this.closest('tr').querySelector('td:first-child').textContent;
            if (confirm(`Rejeter la demande du restaurant "${restaurantName}" ?`)) {
                // Here you would typically send a rejection request
                console.log(`Rejecting restaurant ${restaurantName}`);
                this.closest('tr').remove();
            }
        });
    });


    // Sample order data (in a real app, this would come from your backend)
const sampleOrders = {
    "12345": {
        time: "26/07/2023 14:30",
        client: "Jean Dupont",
        phone: "677889900",
        restaurant: "Chez Wou",
        items: [
            "Poulet DG x2",
            "Eru x1",
            "Jus d'ananas x1"
        ],
        amount: "12 500 FCFA",
        status: "En attente"
    },
    "12346": {
        time: "26/07/2023 15:15",
        client: "Marie Ngo",
        phone: "699112233",
        restaurant: "La Paillote",
        items: [
            "Pizza Royale x1",
            "Salade César x1",
            "Eau minérale x2"
        ],
        amount: "8 000 FCFA",
        status: "En cours"
    }
};

// View order details
const viewButtons = document.querySelectorAll('.btn-view');
const orderModal = document.getElementById('orderDetailsModal');

viewButtons.forEach(button => {
    button.addEventListener('click', function() {
        const orderId = this.closest('tr').querySelector('td:first-child').textContent.trim().substring(1);
        showOrderDetails(orderId);
    });
});

function showOrderDetails(orderId) {
    const order = sampleOrders[orderId] || {
        time: "Non disponible",
        client: "Non disponible",
        phone: "Non disponible",
        restaurant: "Non disponible",
        items: ["Information non disponible"],
        amount: "--",
        status: "--"
    };

    document.getElementById('detail-id').textContent = `#${orderId}`;
    document.getElementById('detail-time').textContent = order.time;
    document.getElementById('detail-client').textContent = order.client;
    document.getElementById('detail-phone').textContent = order.phone;
    document.getElementById('detail-restaurant').textContent = order.restaurant;
    document.getElementById('detail-amount').textContent = order.amount;
    document.getElementById('detail-status').textContent = order.status;
    
    const itemsList = document.getElementById('detail-items');
    itemsList.innerHTML = '';
    order.items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        itemsList.appendChild(li);
    });

    orderModal.style.display = 'flex';
}

// Close modal when clicking the X button
document.querySelector('#orderDetailsModal .close-btn').addEventListener('click', function() {
    orderModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === orderModal) {
        orderModal.style.display = 'none';
    }
});

// Gestion de l'upload de photo
const photoInput = document.getElementById('courierPhoto');
const photoPreview = document.getElementById('photoPreview');

photoInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Supprime l'icône par défaut si elle existe
            const defaultIcon = photoPreview.querySelector('.default-avatar');
            if (defaultIcon) {
                defaultIcon.remove();
            }
            
            // Crée ou met à jour l'image
            let img = photoPreview.querySelector('img');
            if (!img) {
                img = document.createElement('img');
                photoPreview.appendChild(img);
            }
            
            img.src = e.target.result;
        }
        
        reader.readAsDataURL(file);
    }
});

// Modification de la fonction de soumission
courierForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', document.getElementById('courierName').value);
    formData.append('email', document.getElementById('courierEmail').value);
    formData.append('phone', document.getElementById('courierPhone').value);
    formData.append('vehicle', document.getElementById('courierVehicle').value);
    
    // Ajoute la photo si elle existe
    if (photoInput.files[0]) {
        formData.append('photo', photoInput.files[0]);
    }
    
    // Ici vous enverriez formData à votre API
    console.log('Données du livreur:', {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        vehicle: formData.get('vehicle'),
        hasPhoto: formData.has('photo')
    });
    
    alert('Compte livreur créé avec succès!');
    courierForm.reset();
    
    // Réinitialise l'aperçu de la photo
    photoPreview.innerHTML = '<i class="fas fa-user-circle default-avatar"></i>';
    modal.style.display = 'none';
});
});