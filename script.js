document.addEventListener('DOMContentLoaded', function() {
    // Pre-order button notification
    const preOrderButton = document.querySelector('.primary-button');
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');

    // Cart count
    let cartCount = 0;

    preOrderButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Update cart count
        cartCount++;
        
        // Get the selected color
        const selectedColor = document.querySelector('.color-option.active').getAttribute('data-color');
        
        // Update notification message
        notificationMessage.textContent = `Added to cart: Venn Keyboard (${selectedColor})`;
        
        // Show notification
        notification.classList.add('show');
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
        
        // Optional: Add a small animation to the button
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 300);
        
        console.log(`Product added to cart. Color: ${selectedColor}, Cart items: ${cartCount}`);
    });

    // Image slider functionality
    const mainImage = document.getElementById('mainImage');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const thumbnailContainer = document.getElementById('thumbnailContainer');
    
    let currentImageIndex = 0;
    const images = Array.from(thumbnails).map(thumb => thumb.querySelector('img').getAttribute('data-src'));
    
    // Initialize with the first image
    mainImage.src = images[0];
    
    // Function to update active thumbnail
    function updateActiveThumbnail(index) {
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnails[index].classList.add('active');
    }
    
    // Change image function
    function changeImage(index) {
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        
        mainImage.style.opacity = '0';
        
        setTimeout(() => {
            mainImage.src = images[index];
            mainImage.style.opacity = '1';
            currentImageIndex = index;
            updateActiveThumbnail(index);
        }, 300);
    }
    
    // Event listeners for arrow buttons
    prevButton.addEventListener('click', () => {
        changeImage(currentImageIndex - 1);
    });
    
    nextButton.addEventListener('click', () => {
        changeImage(currentImageIndex + 1);
    });
    
    // Thumbnail click events
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            changeImage(index);
        });
    });
    
    // Auto-slideshow
    let slideInterval = setInterval(() => {
        changeImage(currentImageIndex + 1);
    }, 5000);
    
    // Pause slideshow on hover
    mainImage.parentElement.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    mainImage.parentElement.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            changeImage(currentImageIndex + 1);
        }, 5000);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            changeImage(currentImageIndex - 1);
        } else if (e.key === 'ArrowRight') {
            changeImage(currentImageIndex + 1);
        }
    });
    
    // Color selector functionality
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            colorOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Get selected color
            const color = this.getAttribute('data-color');
            
            // You could change the main image here based on color
            // For now, just show an alert
            console.log(`Selected color: ${color}`);
            
            // Update primary color variable
            document.documentElement.style.setProperty('--primary-color', getComputedStyle(this).backgroundColor);
        });
    });
    
    // Smooth scroll for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the target section and scroll to it (would work if you had sections with IDs)
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Back button functionality
    const backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', () => {
        window.history.back();
    });
    
    // Animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.content > div');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.content > div').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Trigger animation on initial load
    setTimeout(animateOnScroll, 300);
});