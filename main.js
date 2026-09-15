/* ==========================================================================
   GREEN EARTH REALTY DEVELOPERS - MAIN JAVASCRIPT & ANIMATION ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Scroll Shrink & Glassmorphism
  const header = document.querySelector('.header');
  
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // 2. Mobile Nav Drawer Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const drawerClose = document.querySelector('.drawer-close');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.drawer-overlay');

  const openDrawer = () => {
    mobileDrawer?.classList.add('open');
    drawerOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer?.classList.remove('open');
    drawerOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  };

  mobileToggle?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  drawerOverlay?.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('open')) {
      closeDrawer();
    }
  });

  // 3. Automatic Scroll Reveal IntersectionObserver
  const revealTargets = document.querySelectorAll('.card, .section-header, .img-wrapper, .timeline-item, .contact-info-card');
  
  revealTargets.forEach((target, idx) => {
    target.classList.add('reveal');
    // Stagger delay for items in grid
    const delay = (idx % 3) + 1;
    target.classList.add(`delay-${delay}`);
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .zoom-in').forEach(el => {
    revealObserver.observe(el);
  });

  // 4. Smooth Stat Number Counting Animation
  const statNumbers = document.querySelectorAll('.stat-number');
  
  if (statNumbers.length > 0) {
    const animateCounter = (el) => {
      const targetText = el.getAttribute('data-target') || el.innerText;
      const numericMatch = targetText.match(/\d+/);
      if (!numericMatch) return;
      
      const targetVal = parseInt(numericMatch[0], 10);
      const prefix = targetText.substring(0, targetText.indexOf(numericMatch[0]));
      const suffix = targetText.substring(targetText.indexOf(numericMatch[0]) + numericMatch[0].length);
      
      let currentVal = 0;
      const duration = 1800; // ms
      const steps = 50;
      const increment = targetVal / steps;
      const stepTime = duration / steps;
      
      const timer = setInterval(() => {
        currentVal += increment;
        if (currentVal >= targetVal) {
          currentVal = targetVal;
          clearInterval(timer);
        }
        el.innerText = `${prefix}${Math.floor(currentVal)}${suffix}`;
      }, stepTime);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statNumbers.forEach(stat => counterObserver.observe(stat));
  }

  // 5. Contact Form Submission Handling
  const enquiryForm = document.getElementById('enquiryForm');
  const formSuccess = document.getElementById('formSuccess');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name')?.value.trim();
      const phone = document.getElementById('phone')?.value.trim();

      if (!name || !phone) {
        alert('Please fill in your Name and Phone Number.');
        return;
      }

      enquiryForm.style.display = 'none';
      if (formSuccess) {
        formSuccess.style.display = 'block';
        formSuccess.classList.add('zoom-in', 'active');
      }
    });
  }
});
