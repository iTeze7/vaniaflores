// ===== Vania Flores - JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
  
  // ===== Header Scroll Effect =====
  const header = document.querySelector('.header');
  
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial state
  
  // ===== Mobile Menu Toggle =====
  const menuToggle = document.querySelector('.menu-toggle');
  const navMobile = document.querySelector('.nav-mobile');
  
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navMobile.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-mobile a').forEach(link => {
    link.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      navMobile.classList.remove('active');
    });
  });
  
  // ===== Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ===== Scroll Animations (Intersection Observer) =====
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add delay based on data attribute or index
        const delay = entry.target.dataset.delay || index * 100;
        
        setTimeout(() => {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.remove('opacity-0');
        }, delay);
        
        // Unobserve after animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animateElements.forEach(element => {
    observer.observe(element);
  });
  
  // ===== Animate cards in grids =====
  const cardContainers = document.querySelectorAll('.produtos-grid, .datas-grid, .diferenciais-grid');
  
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.produto-card, .data-card, .diferencial-card');
        
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('animate-fade-in-up');
            card.classList.remove('opacity-0');
          }, index * 150);
        });
        
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  cardContainers.forEach(container => {
    cardObserver.observe(container);
  });
  
  // ===== WhatsApp Link Generator =====
  const whatsappNumber = '5511974778870';
  const defaultMessage = 'Olá! Gostaria de fazer um pedido';
  
  // Update all WhatsApp links
  document.querySelectorAll('[data-whatsapp]').forEach(link => {
    const customMessage = link.dataset.whatsapp || defaultMessage;
    const encodedMessage = encodeURIComponent(customMessage);
    link.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  });
  
  // ===== Year in Footer =====
  const yearElement = document.querySelector('.current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  console.log('🌸 Vania Flores - Site carregado com sucesso!');
});
