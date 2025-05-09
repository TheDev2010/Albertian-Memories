document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav_links");
    
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("open");
    });

    hamburger.addEventListener("click", () => {
        hamburger.querySelectorAll("span").forEach((span, index) => {
            if (index === 0) span.classList.toggle("rotate-down");
            if (index === 1) span.classList.toggle("fade");
            if (index === 2) span.classList.toggle("rotate-up");
        });
    });
});

function toggleContent() {
    const moreContent = document.getElementById('more-content');
    const button = document.querySelector('.see-more-btn');

    if (moreContent.style.display === 'none' || moreContent.style.display === '') {
        moreContent.style.display = 'inline';
        button.textContent = 'See Less';
    } else {
        moreContent.style.display = 'none';
        button.textContent = 'See More';
    }
}

function toggleCardContent(button, contentId) {
    const content = document.getElementById(contentId);
    const isVisible = content.style.display === "inline";

    content.style.display = isVisible ? "none" : "inline";
    button.textContent = isVisible ? "See More" : "See Less";

    const card = button.closest(".card");
    if (!isVisible) {
        card.style.height = "auto";
    } else {
        card.style.height = "380px";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelector('.slides');
    const slideCount = document.querySelectorAll('.slide').length;
    let currentIndex = 0;

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    setInterval(showNextSlide, 2000);
});

document.addEventListener('DOMContentLoaded', () => {
    const footer = document.getElementById('dynamic-footer');

    // Create a hover-sensitive area at the bottom of the page
    const hoverArea = document.createElement('div');
    hoverArea.id = 'hover-area';
    hoverArea.style.position = 'fixed';
    hoverArea.style.bottom = '0';
    hoverArea.style.width = '100%';
    hoverArea.style.height = '50px'; // Adjust height for better interaction
    hoverArea.style.zIndex = '998'; // Ensure it is below the footer
    hoverArea.style.pointerEvents = 'none'; // Initially non-interactive
    hoverArea.style.background = 'transparent'; // Ensure it's invisible
    document.body.appendChild(hoverArea);

    console.log('Hover area created:', hoverArea);

    let isAtBottom = false;
    let isFooterVisible = false; // Add a flag to track footer visibility
    const tolerance = 5;

    // Debounced scroll event to avoid rapid toggling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollPosition = Math.ceil(window.scrollY + window.innerHeight);
            const documentHeight = Math.ceil(document.documentElement.scrollHeight);

            const atBottom = scrollPosition >= documentHeight - tolerance;

            if (isAtBottom !== atBottom) {
                isAtBottom = atBottom;
                console.log('Is at bottom:', isAtBottom);

                hoverArea.style.pointerEvents = isAtBottom ? 'auto' : 'none';
                console.log('Hover area pointer-events:', hoverArea.style.pointerEvents);
            }

            if (!isAtBottom && isFooterVisible) {
                footer.classList.remove('visible');
                isFooterVisible = false; // Update the flag
                console.log('Footer hidden due to scrolling up');
            }
        }, 100); // Debounce delay
    });

    // Show footer when hovering over the hover area and at the bottom of the page
    hoverArea.addEventListener('mouseenter', () => {
        if (isAtBottom && !isFooterVisible) {
            footer.classList.add('visible');
            isFooterVisible = true; // Update the flag
            console.log('Footer made visible');
        }
    });

    // Hide footer when leaving the hover area
    hoverArea.addEventListener('mouseleave', () => {
        if (isFooterVisible) {
            footer.classList.remove('visible');
            isFooterVisible = false; // Update the flag
            console.log('Footer hidden');
        }
    });

    // Prevent rapid toggling by ensuring footer visibility is only updated when necessary
    let hoverTimeout;
    hoverArea.addEventListener('mousemove', () => {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => {
            if (isAtBottom && !isFooterVisible) {
                footer.classList.add('visible');
                isFooterVisible = true;
                console.log('Footer made visible (mousemove)');
            }
        }, 50); // Small delay to prevent rapid toggling
    });

    console.log('Footer exists:', footer);
});