'use strict';

/**
 * Portfolio JavaScript - Anshu Jamare
 * Enhanced functionality for personal portfolio
 */

// DOM Elements
const elements = {
  sidebar: document.querySelector("[data-sidebar]"),
  sidebarBtn: document.querySelector("[data-sidebar-btn]"),
  testimonialsItems: document.querySelectorAll("[data-testimonials-item]"),
  modalContainer: document.querySelector("[data-modal-container]"),
  modalCloseBtn: document.querySelector("[data-modal-close-btn]"),
  overlay: document.querySelector("[data-overlay]"),
  modalImg: document.querySelector("[data-modal-img]"),
  modalTitle: document.querySelector("[data-modal-title]"),
  modalText: document.querySelector("[data-modal-text]"),
  select: document.querySelector("[data-select]"),
  selectItems: document.querySelectorAll("[data-select-item]"),
  selectValue: document.querySelector("[data-selecct-value]"),
  filterBtns: document.querySelectorAll("[data-filter-btn]"),
  filterItems: document.querySelectorAll("[data-filter-item]"),
  form: document.querySelector("[data-form]"),
  formInputs: document.querySelectorAll("[data-form-input]"),
  formBtn: document.querySelector("[data-form-btn]"),
  navigationLinks: document.querySelectorAll("[data-nav-link]"),
  pages: document.querySelectorAll("[data-page]")
};

// Utility Functions
const utils = {
  toggleElement: (elem) => elem.classList.toggle("active"),
  scrollToTop: () => window.scrollTo({ top: 0, behavior: 'smooth' })
};

// Sidebar Functionality
const initSidebar = () => {
  elements.sidebarBtn.addEventListener("click", () => {
    utils.toggleElement(elements.sidebar);
  });
};

// Testimonials Modal Functionality
const initTestimonialsModal = () => {
  const toggleModal = () => {
    utils.toggleElement(elements.modalContainer);
    utils.toggleElement(elements.overlay);
  };

  elements.testimonialsItems.forEach(item => {
    item.addEventListener("click", () => {
      const avatar = item.querySelector("[data-testimonials-avatar]");
      const title = item.querySelector("[data-testimonials-title]");
      const text = item.querySelector("[data-testimonials-text]");

      elements.modalImg.src = avatar.src;
      elements.modalImg.alt = avatar.alt;
      elements.modalTitle.textContent = title.textContent;
      elements.modalText.textContent = text.textContent;

      toggleModal();
    });
  });

  elements.modalCloseBtn.addEventListener("click", toggleModal);
  elements.overlay.addEventListener("click", toggleModal);
};

// Filter Functionality
const initFilter = () => {
  const filterItems = (selectedValue) => {
    elements.filterItems.forEach(item => {
      if (selectedValue === "all" || selectedValue === item.dataset.category) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  };

  // Custom select functionality
  elements.select.addEventListener("click", () => utils.toggleElement(elements.select));

  elements.selectItems.forEach(item => {
    item.addEventListener("click", () => {
      const selectedValue = item.textContent.toLowerCase();
      elements.selectValue.textContent = item.textContent;
      utils.toggleElement(elements.select);
      filterItems(selectedValue);
    });
  });

  // Filter buttons for large screens
  let lastClickedBtn = elements.filterBtns[0];

  elements.filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedValue = btn.textContent.toLowerCase();
      elements.selectValue.textContent = btn.textContent;
      filterItems(selectedValue);

      lastClickedBtn.classList.remove("active");
      btn.classList.add("active");
      lastClickedBtn = btn;
    });
  });
};

// Form Validation
const initFormValidation = () => {
  const validateForm = () => {
    elements.formBtn.disabled = !elements.form.checkValidity();
  };

  elements.formInputs.forEach(input => {
    input.addEventListener("input", validateForm);
  });
};

// Page Navigation
const initPageNavigation = () => {
  elements.navigationLinks.forEach(link => {
    link.addEventListener("click", () => {
      const targetPage = link.textContent.toLowerCase();

      elements.pages.forEach(page => {
        page.classList.toggle("active", page.dataset.page === targetPage);
      });

      elements.navigationLinks.forEach(navLink => {
        navLink.classList.toggle("active", navLink === link);
      });

      utils.scrollToTop();
    });
  });
};

// Smooth scrolling for anchor links
const initSmoothScrolling = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
};

// Initialize all functionality
const init = () => {
  initSidebar();
  initTestimonialsModal();
  initFilter();
  initFormValidation();
  initPageNavigation();
  initSmoothScrolling();

  // Set first page as active by default
  if (elements.pages.length > 0 && elements.navigationLinks.length > 0) {
    elements.pages[0].classList.add("active");
    elements.navigationLinks[0].classList.add("active");
  }
};

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", init);

// Page Navigation Functionality
document.addEventListener("DOMContentLoaded", function() {
    const navigationLinks = document.querySelectorAll("[data-nav-link]");
    const pages = document.querySelectorAll("[data-page]");

    // Set first page as active by default
    if (pages.length > 0 && navigationLinks.length > 0) {
        pages[0].classList.add("active");
        navigationLinks[0].classList.add("active");
    }

    // Add click event to all nav links
    navigationLinks.forEach(link => {
        link.addEventListener("click", function() {
            // Get the page name from link text (lowercase and trimmed)
            const targetPage = this.textContent.trim().toLowerCase();
            
            // Update active states
            pages.forEach(page => {
                page.classList.toggle("active", page.dataset.page === targetPage);
            });
            
            // Update active nav link
            navigationLinks.forEach(navLink => {
                navLink.classList.toggle("active", navLink === this);
            });
            
            // Scroll to top
            window.scrollTo(0, 0);
        });
    });
});


// Avatar flip functionality
const flipAvatar = document.getElementById('flip-avatar');
if (flipAvatar) {
  flipAvatar.addEventListener('click', function() {
    this.classList.toggle('flipped');
    
    // Auto-flip back after 3 seconds
    setTimeout(() => {
      if(this.classList.contains('flipped')) {
        this.classList.remove('flipped');
      }
    }, 3000);
  });
}


// Add click tracking for analytics
document.querySelectorAll('[data-project-link]').forEach(link => {
  link.addEventListener('click', function() {
    // Replace with your analytics code
    console.log('Project visited:', this.href);
    
    // Or using Google Analytics:
    // gtag('event', 'project_click', {
    //   'project_name': this.querySelector('.project-title').textContent
    // });
  });
});