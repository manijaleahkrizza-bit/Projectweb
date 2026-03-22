// Destinations Data
const destinations = [
    {
        id: 1,
        name: "Chocolate Hills",
        description: "Over 1,200 symmetrical hills that turn chocolate-brown in summer",
        price: 1500,
        location: "Carmen, Bohol",
        image: "TAL-chocolate-hills-CHOCLATEHILLS0325-691d3af041ec43499e1f7b7b1ba2abf3.jpg"
    },
    {
        id: 2,
        name: "Philippine Tarsier Sanctuary",
        description: "Meet the world's smallest primates in their natural habitat",
        price: 800,
        location: "Corella, Bohol",
        image: "https://images.pexels.com/photos/1271710/pexels-photo-1271710.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 3,
        name: "Loboc River Cruise",
        description: "Floating restaurant with lush jungle backdrop and cultural shows",
        price: 1200,
        location: "Loboc, Bohol",
        image: "https://images.pexels.com/photos/1430675/pexels-photo-1430675.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 4,
        name: "Alona Beach",
        description: "Powdery white sand with crystal-clear turquoise waters",
        price: 1000,
        location: "Panglao Island",
        image: "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 5,
        name: "Hinagdanan Cave",
        description: "Underground cavern with natural lagoon and stunning stalactites",
        price: 500,
        location: "Dauis, Panglao",
        image: "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
];

// Resorts Data
const resorts = [
    {
        id: 1,
        name: "Amorita Resort",
        description: "Luxury cliffside resort with infinity pool and ocean views",
        price: 8500,
        location: "Panglao Island",
        image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 2,
        name: "South Palms Resort",
        description: "Beachfront paradise with 350-meter white sand beach",
        price: 7200,
        location: "Panglao Island",
        image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 3,
        name: "Bohol Beach Club",
        description: "Family-friendly resort with extensive beach facilities",
        price: 6500,
        location: "Panglao Island",
        image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 4,
        name: "Eskaya Beach Resort",
        description: "Boutique resort with traditional Filipino architecture",
        price: 9800,
        location: "Panglao Island",
        image: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 5,
        name: "Mithi Resort & Spa",
        description: "Tropical haven with man-made lagoon and mountain views",
        price: 5800,
        location: "Bohol",
        image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
];

let selectedDestinations = [];
let selectedResort = null;

// Render Destinations
function renderDestinations() {
    const grid = document.getElementById('destinationsGrid');
    if (!grid) return;
    
    grid.innerHTML = destinations.map(dest => `
        <div class="destination-card" data-id="${dest.id}" data-type="destination">
            <div class="card-image" style="background-image: url('${dest.image}')">
                ${selectedDestinations.some(d => d.id === dest.id) ? '<div class="selected-badge"><i class="fas fa-check"></i></div>' : ''}
            </div>
            <div class="card-content">
                <h3>${dest.name}</h3>
                <p>${dest.description}</p>
                <div class="price">₱${dest.price.toLocaleString()} <small>per person</small></div>
                <div class="location"><i class="fas fa-map-pin"></i> ${dest.location}</div>
            </div>
        </div>
    `).join('');
    
    // Add click event listeners
    document.querySelectorAll('.destination-card').forEach(card => {
        card.addEventListener('click', () => toggleDestination(parseInt(card.dataset.id)));
    });
}

// Render Resorts
function renderResorts() {
    const grid = document.getElementById('resortsGrid');
    if (!grid) return;
    
    grid.innerHTML = resorts.map(resort => `
        <div class="resort-card" data-id="${resort.id}" data-type="resort">
            <div class="card-image" style="background-image: url('${resort.image}')">
                ${selectedResort && selectedResort.id === resort.id ? '<div class="selected-badge"><i class="fas fa-check"></i></div>' : ''}
            </div>
            <div class="card-content">
                <h3>${resort.name}</h3>
                <p>${resort.description}</p>
                <div class="price">₱${resort.price.toLocaleString()} <small>per night</small></div>
                <div class="location"><i class="fas fa-map-pin"></i> ${resort.location}</div>
            </div>
        </div>
    `).join('');
    
    // Add click event listeners
    document.querySelectorAll('.resort-card').forEach(card => {
        card.addEventListener('click', () => selectResort(parseInt(card.dataset.id)));
    });
}

// Toggle Destination Selection
function toggleDestination(destinationId) {
    const destination = destinations.find(d => d.id === destinationId);
    const index = selectedDestinations.findIndex(d => d.id === destinationId);
    
    if (index === -1) {
        selectedDestinations.push(destination);
    } else {
        selectedDestinations.splice(index, 1);
    }
    
    updateSelectedDestinationsList();
    updatePriceBreakdown();
    renderDestinations();
}

// Select Resort
function selectResort(resortId) {
    const resort = resorts.find(r => r.id === resortId);
    
    if (selectedResort && selectedResort.id === resortId) {
        selectedResort = null;
    } else {
        selectedResort = resort;
    }
    
    updateSelectedResortList();
    updatePriceBreakdown();
    renderResorts();
}

// Update Selected Destinations List
function updateSelectedDestinationsList() {
    const container = document.getElementById('selectedDestinationsList');
    if (!container) return;
    
    if (selectedDestinations.length === 0) {
        container.innerHTML = '<p class="empty-message">No destinations selected yet</p>';
        return;
    }
    
    container.innerHTML = selectedDestinations.map(dest => `
        <div class="selected-item">
            <span><strong>${dest.name}</strong> - ₱${dest.price.toLocaleString()}</span>
            <button class="remove-btn" data-id="${dest.id}" data-type="destination">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
    
    // Add remove event listeners
    document.querySelectorAll('.remove-btn[data-type="destination"]').forEach(btn => {
        btn.addEventListener('click', () => toggleDestination(parseInt(btn.dataset.id)));
    });
}

// Update Selected Resort List
function updateSelectedResortList() {
    const container = document.getElementById('selectedResortList');
    if (!container) return;
    
    if (!selectedResort) {
        container.innerHTML = '<p class="empty-message">No resort selected yet</p>';
        return;
    }
    
    container.innerHTML = `
        <div class="selected-item">
            <span><strong>${selectedResort.name}</strong> - ₱${selectedResort.price.toLocaleString()}/night</span>
            <button class="remove-btn" data-id="${selectedResort.id}" data-type="resort">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add remove event listener
    const removeBtn = document.querySelector('.remove-btn[data-type="resort"]');
    if (removeBtn) {
        removeBtn.addEventListener('click', () => selectResort(selectedResort.id));
    }
}

// Update Price Breakdown
function updatePriceBreakdown() {
    const destinationsTotal = selectedDestinations.reduce((sum, dest) => sum + dest.price, 0);
    const resortTotal = selectedResort ? selectedResort.price : 0;
    const total = destinationsTotal + resortTotal;
    
    const destinationsPriceElem = document.getElementById('destinationsPrice');
    const resortPriceElem = document.getElementById('resortPrice');
    const totalPriceElem = document.getElementById('totalPrice');
    
    if (destinationsPriceElem) destinationsPriceElem.textContent = `₱${destinationsTotal.toLocaleString()}`;
    if (resortPriceElem) resortPriceElem.textContent = `₱${resortTotal.toLocaleString()}`;
    if (totalPriceElem) totalPriceElem.textContent = `₱${total.toLocaleString()}`;
}

// Handle Form Submission
function handleBookingSubmit(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('fullName')?.value;
    const email = document.getElementById('email')?.value;
    const phone = document.getElementById('phone')?.value;
    const travelers = document.getElementById('travelers')?.value;
    const checkIn = document.getElementById('checkIn')?.value;
    const checkOut = document.getElementById('checkOut')?.value;
    const specialRequests = document.getElementById('specialRequests')?.value;
    
    if (!fullName || !email || !phone || !travelers || !checkIn || !checkOut) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (selectedDestinations.length === 0 && !selectedResort) {
        alert('Please select at least one destination or a resort to continue');
        return;
    }
    
    const totalPrice = selectedDestinations.reduce((sum, dest) => sum + dest.price, 0) + (selectedResort ? selectedResort.price : 0);
    
    const bookingData = {
        fullName,
        email,
        phone,
        travelers: parseInt(travelers),
        checkIn,
        checkOut,
        specialRequests,
        selectedDestinations: selectedDestinations.map(d => ({ name: d.name, price: d.price })),
        selectedResort: selectedResort ? { name: selectedResort.name, price: selectedResort.price } : null,
        totalPrice
    };
    
    console.log('Booking Data:', bookingData);
    
    showModal();
    
    // Reset form and selections
    document.getElementById('bookingForm')?.reset();
    selectedDestinations = [];
    selectedResort = null;
    updateSelectedDestinationsList();
    updateSelectedResortList();
    updatePriceBreakdown();
    renderDestinations();
    renderResorts();
}

// Show Modal
function showModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const toggleBtn = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (toggleBtn && navLinks) {
        toggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Set minimum dates for check-in and check-out
function setMinDates() {
    const today = new Date().toISOString().split('T')[0];
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    
    if (checkInInput) {
        checkInInput.min = today;
        checkInInput.addEventListener('change', () => {
            if (checkOutInput) {
                checkOutInput.min = checkInInput.value;
                if (checkOutInput.value && checkOutInput.value < checkInInput.value) {
                    checkOutInput.value = '';
                }
            }
        });
    }
    
    if (checkOutInput) {
        checkOutInput.min = today;
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    renderDestinations();
    renderResorts();
    setMinDates();
    initMobileMenu();
    
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }
    
    const modal = document.getElementById('successModal');
    const closeBtn = document.querySelector('.close-modal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
});