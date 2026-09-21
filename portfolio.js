document.addEventListener('DOMContentLoaded', () => {

    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Event listener for the burger menu click
    burger.addEventListener('click', () => {
        // Toggle Nav active class to show/hide the menu
        nav.classList.toggle('active');

        // Animate individual navigation links
        navLinks.forEach((link, index) => {
            // If animation is already applied, clear it; otherwise, apply it
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                // Apply a fade-in animation with a staggered delay
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Close navigation when a link is clicked (for mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Remove active class to hide the navigation menu
            nav.classList.remove('active');
            // Remove toggle class to reset the burger icon
            burger.classList.remove('toggle');
            // Reset animation for all links
            navLinks.forEach(l => l.style.animation = '');
        });
    });

    // Text Animation in Hero Section
    const words = ["a Full Stack Developer.", "a Competitive Programmer.", "a Problem Solver.", "passionate about tech."];
    let wordIndex = 0; // Current word index in the array
    let charIndex = 0; // Current character index within the word
    const typingElement = document.getElementById('text-animation'); // Element to display typing text
    let isDeleting = false; // Flag to determine if text is being deleted or typed

    // Function to handle the typing and deleting animation
    function type() {
        const currentWord = words[wordIndex]; // Get the current word
        const currentText = currentWord.substring(0, charIndex); // Get the substring to display

        typingElement.textContent = currentText; // Update the text content

        if (!isDeleting && charIndex < currentWord.length) {
            // Typing forward
            charIndex++;
            setTimeout(type, 100); // Speed of typing
        } else if (isDeleting && charIndex > 0) {
            // Deleting backward
            charIndex--;
            setTimeout(type, 50); // Speed of deleting
        } else {
            // Word is fully typed or deleted
            isDeleting = !isDeleting; // Toggle between typing and deleting
            wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex; // Move to next word if typing, stay on current if deleting
            setTimeout(type, 1000); // Pause before next action (typing or deleting)
        }
    }

    // Start the typing animation when the DOM is loaded
    type();

    // Intersection Observer for Scroll Animations
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Observe each element that should animate on scroll
    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });

    // Optional: Add form submission handling (e.g., to a backend or email service)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // In a real application, you would send this data to a server
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            console.log('Form Submitted:', { name, email, message });

            // Display a message to the user instead of alert()
            const formInfo = document.querySelector('.form-info');
            formInfo.textContent = 'Thank you for your message! I will get back to you soon.';
            formInfo.style.color = '#008000'; // Highlight success message

            // Clear the form
            contactForm.reset();

            // Optionally revert the message after some time
            setTimeout(() => {
                formInfo.textContent = 'Contact details, the smallest print that holds the biggest connections';
                formInfo.style.color = '#999';
            }, 5000);
        });
    }
});
