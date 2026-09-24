/**
 * ============================================================================
 * RYU GYM — FITNESS & TRAINING WEBSITE
 * Core Client-Side Logic (Vanilla JavaScript)
 * Fully commented for academic presentation and live instructor walk-through.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initImagePlaceholders();
  initThemeToggle();
  initStickyHeader();
  initMobileNav();
  initScrollReveal();
  initStatsCounter();
  initPricingToggle();
  initProgramFilter();
  initBmiCalculator();
  initTrainerLightbox();
  initContactForm();
  initPrintTrigger();
  initSpotlight();
  initTextScramble();
  initMagneticButtons();
  initBeforeAfterSlider();
  initTabataTimer();
  initKeyboardShortcuts();
  initCheckoutSystem();
});


function initImagePlaceholders() {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      this.onerror = null;
      const label = this.getAttribute('alt') || 'RYU GYM';
      const cleanLabel = encodeURIComponent(label.toUpperCase());
      this.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="100%" height="100%" fill="%23141414"/><line x1="0" y1="0" x2="800" y2="500" stroke="%23222222" stroke-width="1"/><line x1="800" y1="0" x2="0" y2="500" stroke="%23222222" stroke-width="1"/><rect x="20" y="20" width="760" height="460" fill="none" stroke="%23333333" stroke-width="1" stroke-dasharray="4,4"/><text x="50%" y="50%" font-family="Oswald, sans-serif" font-size="18" font-weight="600" fill="%23777777" letter-spacing="4" text-anchor="middle" dominant-baseline="middle">${cleanLabel}</text></svg>`;
    });
  });
}


function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('ryu_theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  toggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('ryu_theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  // draw the right icon based on current theme
  if (theme === 'dark') {
    toggleBtn.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
    toggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
    toggleBtn.setAttribute('title', 'Switch to Light Mode');
  } else {
    toggleBtn.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
    toggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
    toggleBtn.setAttribute('title', 'Switch to Dark Mode');
  }
}


function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}


function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle-btn');
  const navLinks = document.querySelector('.nav-links');
  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    toggleBtn.classList.toggle('is-active', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  // close the mobile menu when a link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      toggleBtn.classList.remove('is-active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}


function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if browser doesn't support IntersectionObserver
    revealElements.forEach(el => el.classList.add('active'));
  }
}


function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let hasAnimated = false;

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const suffix = stat.getAttribute('data-suffix') || '';
      const duration = 1600; // how long the count animation takes
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        // slows down near the end so it looks smooth
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(easeOutProgress * target);

        stat.textContent = `${currentCount}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = `${target}${suffix}`;
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  if ('IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          animateCounters();
        }
      });
    }, { threshold: 0.25 });

    const statsContainer = document.querySelector('.stats-strip');
    if (statsContainer) {
      statsObserver.observe(statsContainer);
    }
  } else {
    animateCounters();
  }
}


function initPricingToggle() {
  const toggleSwitch = document.getElementById('pricing-toggle');
  const labelMonthly = document.getElementById('label-monthly');
  const labelYearly = document.getElementById('label-yearly');
  const priceElements = document.querySelectorAll('.price-number');
  const periodElements = document.querySelectorAll('.billing-period');

  if (!toggleSwitch || !priceElements.length) return;

  let isYearly = false;

  const updatePricing = () => {
    toggleSwitch.classList.toggle('is-yearly', isYearly);
    toggleSwitch.setAttribute('aria-checked', isYearly);

    if (labelMonthly && labelYearly) {
      labelMonthly.classList.toggle('active', !isYearly);
      labelYearly.classList.toggle('active', isYearly);
    }

    priceElements.forEach(el => {
      const targetVal = isYearly ? el.getAttribute('data-price-yearly') : el.getAttribute('data-price-monthly');
      animateNumberChange(el, parseInt(targetVal, 10));
    });

    periodElements.forEach(el => {
      el.textContent = isYearly ? '/ Year' : '/ Month';
    });
  };

  const animateNumberChange = (element, targetValue) => {
    element.style.opacity = '0.3';
    setTimeout(() => {
      element.textContent = targetValue;
      element.style.opacity = '1';
    }, 150);
  };

  toggleSwitch.addEventListener('click', () => {
    isYearly = !isYearly;
    updatePricing();
  });

  if (labelMonthly) {
    labelMonthly.addEventListener('click', () => {
      if (isYearly) {
        isYearly = false;
        updatePricing();
      }
    });
  }

  if (labelYearly) {
    labelYearly.addEventListener('click', () => {
      if (!isYearly) {
        isYearly = true;
        updatePricing();
      }
    });
  }

  // animate prices when they come into view
  const pricingSection = document.querySelector('.pricing-section');
  if (pricingSection && 'IntersectionObserver' in window) {
    let pricesInitialized = false;
    const priceObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !pricesInitialized) {
          pricesInitialized = true;
          priceElements.forEach(el => {
            const finalVal = parseInt(isYearly ? el.getAttribute('data-price-yearly') : el.getAttribute('data-price-monthly'), 10);
            let start = 0;
            const step = () => {
              start += Math.ceil(finalVal / 18);
              if (start >= finalVal) {
                el.textContent = finalVal;
              } else {
                el.textContent = start;
                requestAnimationFrame(step);
              }
            };
            step();
          });
        }
      });
    }, { threshold: 0.2 });

    priceObserver.observe(pricingSection);
  }
}


function initProgramFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const programItems = document.querySelectorAll('.program-item');
  if (!filterButtons.length || !programItems.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      programItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        const matches = filterCategory === 'all' || itemCategory === filterCategory;

        if (matches) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.classList.remove('is-hidden');
          }, 20);
        } else {
          item.classList.add('is-hidden');
          setTimeout(() => {
            if (item.classList.contains('is-hidden')) {
              item.style.display = 'none';
            }
          }, 350);
        }
      });
    });
  });
}


function initBmiCalculator() {
  const form = document.getElementById('bmi-form');
  if (!form) return;

  const heightInput = document.getElementById('bmi-height');
  const weightInput = document.getElementById('bmi-weight');
  const scoreDisplay = document.getElementById('bmi-score');
  const badgeDisplay = document.getElementById('bmi-badge');
  const recDisplay = document.getElementById('bmi-recommendation');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    if (!height || !weight || height <= 0 || weight <= 0) {
      alert('Please enter valid positive numbers for height and weight.');
      return;
    }

    // standard BMI formula
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    let category = '';
    let recommendation = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      recommendation = 'Suggested Plan: Heavy Iron Strength & Hypertrophy to build foundational muscle mass and metabolic stamina.';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = 'Normal Weight';
      recommendation = 'Suggested Plan: Athletic Mobility & Combat Conditioning for functional power, agility, and elite stamina.';
    } else if (bmi >= 25 && bmi < 29.9) {
      category = 'Overweight';
      recommendation = 'Suggested Plan: High-Octane HIIT Cardio & Circuit Weight Training for aggressive fat oxidation and muscle retention.';
    } else {
      category = 'Obesity Category';
      recommendation = 'Suggested Plan: Structured Low-Impact Conditioning & Personal Strength Mentorship for progressive transformation.';
    }

    // fade in the result
    if (scoreDisplay) scoreDisplay.textContent = bmi;
    if (badgeDisplay) badgeDisplay.textContent = category;
    if (recDisplay) recDisplay.textContent = recommendation;

    // draw the ring around the BMI number
    const ringCircle = document.getElementById('bmi-ring-circle');
    if (ringCircle) {
      // convert BMI to a percentage for the ring fill
      const minBmi = 15;
      const maxBmi = 35;
      const clamped = Math.min(Math.max(parseFloat(bmi), minBmi), maxBmi);
      const percentage = (clamped - minBmi) / (maxBmi - minBmi);
      const circumference = 377;
      const offset = circumference - (percentage * circumference);
      ringCircle.style.strokeDashoffset = offset;
    }
  });
}


function initTrainerLightbox() {
  const trainerCards = document.querySelectorAll('.trainer-card');
  const modal = document.getElementById('trainer-modal');
  if (!modal || !trainerCards.length) return;

  const closeBtn = document.getElementById('modal-close');
  const modalImg = document.getElementById('modal-img');
  const modalVideo = document.getElementById('modal-video');
  const modalName = document.getElementById('modal-name');
  const modalRole = document.getElementById('modal-role');
  const modalBio = document.getElementById('modal-bio');
  const modalSpecs = document.getElementById('modal-specs');

  const openModal = (card) => {
    const name = card.getAttribute('data-name');
    const role = card.getAttribute('data-role');
    const videoEl = card.querySelector('video');
    const imgEl = card.querySelector('img');
    const bio = card.getAttribute('data-bio');
    const specs = card.getAttribute('data-specs');

    if (videoEl && modalVideo) {
      modalVideo.src = videoEl.getAttribute('src');
      modalVideo.style.display = 'block';
      modalVideo.play().catch(() => {});
      if (modalImg) modalImg.style.display = 'none';
    } else if (imgEl && modalImg) {
      modalImg.src = imgEl.getAttribute('src');
      modalImg.style.display = 'block';
      if (modalVideo) {
        modalVideo.style.display = 'none';
        modalVideo.pause();
      }
    }

    if (modalName) modalName.textContent = name;
    if (modalRole) modalRole.textContent = role;
    if (modalBio) modalBio.textContent = bio;

    if (modalSpecs && specs) {
      modalSpecs.innerHTML = '';
      specs.split(';').forEach(spec => {
        const li = document.createElement('div');
        li.className = 'credential-item';
        li.textContent = spec.trim();
        modalSpecs.appendChild(li);
      });
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (modalVideo) {
      modalVideo.pause();
      modalVideo.src = '';
    }
  };

  trainerCards.forEach(card => {
    card.addEventListener('click', () => openModal(card));
    // let keyboard users open cards too
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}


function initContactForm() {
  const form = document.getElementById('contact-form');
  const successBanner = document.getElementById('form-success-banner');
  if (!form) return;

  const validateField = (input, testFn, errorMsg) => {
    const parent = input.closest('.form-group');
    const errorSpan = parent ? parent.querySelector('.form-field-error') : null;

    if (!testFn(input.value.trim())) {
      if (parent) parent.classList.add('has-error');
      if (errorSpan) errorSpan.textContent = errorMsg;
      return false;
    } else {
      if (parent) parent.classList.remove('has-error');
      return true;
    }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const phoneInput = document.getElementById('contact-phone');
    const programInput = document.getElementById('contact-program');
    const messageInput = document.getElementById('contact-message');

    let isValid = true;

    // check name field
    if (!validateField(nameInput, val => val.length >= 2, 'Please enter your full name (minimum 2 characters).')) {
      isValid = false;
    }

    // check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validateField(emailInput, val => emailRegex.test(val), 'Please enter a valid email address.')) {
      isValid = false;
    }

    // check phone number
    const phoneRegex = /^[0-9+()-\s]{7,20}$/;
    if (!validateField(phoneInput, val => phoneRegex.test(val), 'Please provide a valid contact number.')) {
      isValid = false;
    }

    // check program dropdown if it exists
    if (programInput && !validateField(programInput, val => val !== '', 'Please select a preferred training program.')) {
      isValid = false;
    }

    // check message field
    if (!validateField(messageInput, val => val.length >= 5, 'Please provide brief details or training goals.')) {
      isValid = false;
    }

    if (isValid) {
      // show thank you message
      form.style.display = 'none';
      if (successBanner) {
        successBanner.classList.add('is-visible');
        successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  // auto-fill program if URL has query string
  const urlParams = new URLSearchParams(window.location.search);
  const requestedProgram = urlParams.get('program') || urlParams.get('plan');
  if (requestedProgram) {
    const programSelect = document.getElementById('contact-program');
    if (programSelect) {
      for (let option of programSelect.options) {
        if (option.value.toLowerCase().includes(requestedProgram.toLowerCase()) || requestedProgram.toLowerCase().includes(option.value.toLowerCase())) {
          option.selected = true;
          break;
        }
      }
    }
  }

  // remove error when user starts typing
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => {
      const parent = field.closest('.form-group');
      if (parent && parent.classList.contains('has-error')) {
        parent.classList.remove('has-error');
      }
    });
  });
}


function initPrintTrigger() {
  const printButtons = document.querySelectorAll('.print-trigger');
  printButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  });
}


function initSpotlight() {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    hero.style.setProperty('--mouse-x', `${x}px`);
    hero.style.setProperty('--mouse-y', `${y}px`);
  });
}


function initTextScramble() {
  const targets = document.querySelectorAll('.scramble-text');
  if (!targets.length) return;

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#%&*+-/_~';

  targets.forEach(el => {
    const finalPhrase = el.getAttribute('data-original') || el.innerText;
    let iteration = 0;
    let interval = null;

    const runScramble = () => {
      clearInterval(interval);
      iteration = 0;

      interval = setInterval(() => {
        el.innerText = finalPhrase
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '\n' || index < iteration) {
              return finalPhrase[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        if (iteration >= finalPhrase.length) {
          clearInterval(interval);
        }
        iteration += 1 / 2;
      }, 30);
    };

    runScramble();
    // reset so animation plays again on next hover
    el.addEventListener('mouseenter', runScramble);
  });
}


function initMagneticButtons() {
  const magneticBtns = document.querySelectorAll('.btn-magnetic');
  if (!magneticBtns.length) return;

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      // move button slightly towards cursor, max 8px
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.04)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}


function initBeforeAfterSlider() {
  const wrapper = document.querySelector('.comparison-wrapper');
  if (!wrapper) return;

  const afterImage = wrapper.querySelector('.image-after');
  const handle = wrapper.querySelector('.comparison-slider-handle');
  let isDragging = false;

  const updatePosition = (clientX) => {
    const rect = wrapper.getBoundingClientRect();
    let offsetX = clientX - rect.left;
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    const percentage = (offsetX / rect.width) * 100;
    afterImage.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  };

  const startDrag = (e) => {
    isDragging = true;
    updatePosition(e.clientX || (e.touches && e.touches[0].clientX));
  };

  const stopDrag = () => {
    isDragging = false;
  };

  const onMove = (e) => {
    if (!isDragging) return;
    updatePosition(e.clientX || (e.touches && e.touches[0].clientX));
  };

  wrapper.addEventListener('mousedown', startDrag);
  window.addEventListener('mouseup', stopDrag);
  window.addEventListener('mousemove', onMove);

  // support for touch screens
  wrapper.addEventListener('touchstart', startDrag, { passive: true });
  window.addEventListener('touchend', stopDrag);
  window.addEventListener('touchmove', onMove, { passive: true });
}


function initTabataTimer() {
  const display = document.getElementById('tabata-time');
  const badge = document.getElementById('tabata-badge');
  const roundEl = document.getElementById('tabata-round');
  const startBtn = document.getElementById('tabata-start');
  const pauseBtn = document.getElementById('tabata-pause');
  const resetBtn = document.getElementById('tabata-reset');

  if (!display || !startBtn) return;

  let timer = null;
  let isRunning = false;
  let currentRound = 1;
  const totalRounds = 8;
  let phase = 'WORK'; // 'WORK' (20s) or 'REST' (10s)
  let timeLeft = 20;

  const updateDisplay = () => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    if (badge) {
      badge.textContent = phase === 'WORK' ? 'WORK INTERVAL (HIGH LOAD)' : 'REST INTERVAL (ACTIVE RECOVERY)';
      badge.style.backgroundColor = phase === 'WORK' ? 'var(--text-primary)' : 'transparent';
      badge.style.color = phase === 'WORK' ? 'var(--bg-primary)' : 'var(--text-primary)';
    }
    if (roundEl) {
      roundEl.textContent = `ROUND ${currentRound} OF ${totalRounds}`;
    }
  };

  const tick = () => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      // switch between work and rest
      if (phase === 'WORK') {
        phase = 'REST';
        timeLeft = 10;
      } else {
        if (currentRound < totalRounds) {
          currentRound++;
          phase = 'WORK';
          timeLeft = 20;
        } else {
          // all rounds done
          clearInterval(timer);
          isRunning = false;
          if (badge) badge.textContent = 'TABATA CYCLE COMPLETE!';
          display.textContent = '00:00';
          return;
        }
      }
      updateDisplay();
    }
  };

  startBtn.addEventListener('click', () => {
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(tick, 1000);
  });

  pauseBtn.addEventListener('click', () => {
    if (!isRunning) return;
    clearInterval(timer);
    isRunning = false;
  });

  resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    currentRound = 1;
    phase = 'WORK';
    timeLeft = 20;
    updateDisplay();
  });

  updateDisplay();
}


function initKeyboardShortcuts() {
  // build the little popup notification
  const toast = document.createElement('div');
  toast.className = 'toast-notice';
  toast.id = 'shortcut-toast';
  document.body.appendChild(toast);

  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  };

  document.addEventListener('keydown', (e) => {
    // skip shortcuts when user is typing in a field
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
      return;
    }

    if (e.key === 'd' || e.key === 'D') {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('ryu_theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Theme Switched: ${newTheme.toUpperCase()} [D]`);
    }
  });
}


function initCheckoutSystem() {
  const form = document.getElementById('membership-checkout-form');
  if (!form) return;

  // all membership plans and their details
  const plansCatalog = {
    IronPass: {
      name: 'Iron Pass',
      badge: 'Standard Pass',
      monthly: 49,
      yearly: 470,
      perks: [
        'Full Free-Weight Room & Cardio Access',
        'Locker Rooms & Rain Showers',
        'Standard Operating Hours (06:00 – 22:00)',
        'Digital Barcode Turnstile Admission'
      ],
      privileges: 'Turnstile Gate 1 & 2 • Weight Room & Cardio Access • Standard Hours'
    },
    BlackTier: {
      name: 'Black Tier Membership',
      badge: 'Most Popular',
      monthly: 79,
      yearly: 750,
      perks: [
        'Unlimited 24/7 Keycard & Barcode Turnstile Entry',
        'Full Access to All Platforms & Eleiko Bays',
        'Sauna & Cold Plunge Recovery Suite Access',
        '2 Free Monthly Group Workshops Included'
      ],
      privileges: 'Turnstile Gate 1 & 2 • 24/7 Keycard Clearance • Sauna & Cold Plunge • Eleiko Platforms'
    },
    EliteAthlete: {
      name: 'Elite Athlete Pass',
      badge: 'Full Suite VIP',
      monthly: 129,
      yearly: 1230,
      perks: [
        'All Black Tier Benefits Included',
        '4 Private 1-on-1 Coaching Sessions / month',
        'Quarterly Biomechanics & Force Plate Profiling',
        'Custom Nutrition & Recovery Protocol',
        'Dedicated Permanent Locker & Towel Service'
      ],
      privileges: 'Turnstile Gate 1 & 2 • 24/7 Keycard Clearance • 1-on-1 Master Coach • Dedicated Locker'
    },
    SpecializedDiscipline: {
      name: 'Specialized Discipline',
      badge: 'Coaching Track',
      monthly: 95,
      yearly: 910,
      perks: [
        'Heavy Iron, Hypertrophy, or Combat Specialization',
        'Daily Coach-Led Form Checks & Movement Peaking',
        'Full Gym Access During Training Windows',
        'Digital Performance Progress Sheet'
      ],
      privileges: 'Turnstile Gate 1 & 2 • Specialized Coaching Bay • Daily Form Review'
    }
  };

  // track what the user has selected
  let currentPlan = 'IronPass';
  let currentCycle = 'monthly'; // 'monthly' | 'annual'
  let currentMethod = 'card';   // 'card' | 'qr' | 'cash'
  let appliedPromo = null;

  // DOM Elements
  const planRadios = document.querySelectorAll('input[name="membership-plan"]');
  const cycleMonthlyBtn = document.getElementById('cycle-monthly-btn');
  const cycleAnnualBtn = document.getElementById('cycle-annual-btn');
  const payTabs = document.querySelectorAll('.pay-tab');
  const payPanels = {
    card: document.getElementById('panel-method-card'),
    qr: document.getElementById('panel-method-qr'),
    cash: document.getElementById('panel-method-cash')
  };

  // Summary Elements
  const summaryPlanTitle = document.getElementById('summary-plan-title');
  const summaryCycleTitle = document.getElementById('summary-cycle-title');
  const summaryBasePrice = document.getElementById('summary-base-price');
  const summaryAnnualDiscountRow = document.getElementById('summary-annual-discount-row');
  const summaryAnnualDiscount = document.getElementById('summary-annual-discount');
  const summaryStudentDiscountRow = document.getElementById('summary-student-discount-row');
  const summaryStudentDiscount = document.getElementById('summary-student-discount');
  const summaryPromoDiscountRow = document.getElementById('summary-promo-discount-row');
  const summaryPromoDiscount = document.getElementById('summary-promo-discount');
  const summaryAppliedCode = document.getElementById('summary-applied-code');
  const summaryTotalPrice = document.getElementById('summary-total-price');
  const summaryPerksList = document.getElementById('summary-perks-list');

  // Input Elements
  const studentIdInput = document.getElementById('member-student-id');
  const promoInput = document.getElementById('promo-input');
  const applyPromoBtn = document.getElementById('btn-apply-promo');
  const promoFeedback = document.getElementById('promo-feedback-msg');

  // Credit Card Live Visual Elements
  const cardNumberInput = document.getElementById('card-number-input');
  const cardHolderInput = document.getElementById('card-holder-input');
  const cardExpiryInput = document.getElementById('card-expiry-input');
  const cardCvvInput = document.getElementById('card-cvv-input');
  const cardPreviewNum = document.getElementById('card-preview-num');
  const cardPreviewHolder = document.getElementById('card-preview-holder');
  const cardPreviewExp = document.getElementById('card-preview-exp');
  const cardPreviewBrand = document.getElementById('card-preview-brand');
  const cardBrandIcon = document.getElementById('card-brand-icon');
  const memberNameInput = document.getElementById('member-name');

  // Check URL parameters for pre-selected plan and billing
  const urlParams = new URLSearchParams(window.location.search);
  const paramPlan = urlParams.get('plan') || urlParams.get('program');
  const paramCycle = urlParams.get('cycle') || urlParams.get('billing');

  if (paramPlan) {
    const matchPlan = Object.keys(plansCatalog).find(k => k.toLowerCase() === paramPlan.toLowerCase()) ||
      (paramPlan.toLowerCase().includes('iron') ? 'IronPass' :
       paramPlan.toLowerCase().includes('black') ? 'BlackTier' :
       paramPlan.toLowerCase().includes('elite') ? 'EliteAthlete' : 'SpecializedDiscipline');

    currentPlan = matchPlan;
    const targetRadio = document.querySelector(`input[name="membership-plan"][value="${currentPlan}"]`);
    if (targetRadio) {
      targetRadio.checked = true;
    }
  }

  if (paramCycle && (paramCycle === 'annual' || paramCycle === 'yearly')) {
    currentCycle = 'annual';
    if (cycleMonthlyBtn && cycleAnnualBtn) {
      cycleMonthlyBtn.classList.remove('active');
      cycleAnnualBtn.classList.add('active');
    }
  }

  // Update card plan highlight
  function updatePlanCardHighlights() {
    document.querySelectorAll('.tier-option-card').forEach(card => {
      const radio = card.querySelector('input[type="radio"]');
      if (radio && radio.checked) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }

  // Calculate & Update Order Summary
  function recalculateOrder() {
    const planData = plansCatalog[currentPlan] || plansCatalog.IronPass;
    const isAnnual = (currentCycle === 'annual');

    // Base price
    const baseAmount = isAnnual ? (planData.monthly * 12) : planData.monthly;
    let finalAmount = isAnnual ? planData.yearly : planData.monthly;

    // Summary header
    if (summaryPlanTitle) summaryPlanTitle.textContent = planData.name;
    if (summaryCycleTitle) summaryCycleTitle.textContent = isAnnual ? 'Annual Billing (12 Mo)' : 'Monthly Billing';
    if (summaryBasePrice) summaryBasePrice.textContent = `Rs ${baseAmount.toFixed(2)}`;

    // Annual commitment discount
    if (isAnnual) {
      const annualSavings = baseAmount - planData.yearly;
      if (summaryAnnualDiscountRow) summaryAnnualDiscountRow.style.display = 'flex';
      if (summaryAnnualDiscount) summaryAnnualDiscount.textContent = `-Rs ${annualSavings.toFixed(2)}`;
    } else {
      if (summaryAnnualDiscountRow) summaryAnnualDiscountRow.style.display = 'none';
    }

    // Student Discount (15%)
    const hasStudentId = studentIdInput && studentIdInput.value.trim().length >= 3;
    let studentDiscountAmount = 0;
    if (hasStudentId) {
      studentDiscountAmount = finalAmount * 0.15;
      finalAmount -= studentDiscountAmount;
      if (summaryStudentDiscountRow) summaryStudentDiscountRow.style.display = 'flex';
      if (summaryStudentDiscount) summaryStudentDiscount.textContent = `-Rs ${studentDiscountAmount.toFixed(2)}`;
    } else {
      if (summaryStudentDiscountRow) summaryStudentDiscountRow.style.display = 'none';
    }

    // Promo Code Discount
    let promoDiscountAmount = 0;
    if (appliedPromo) {
      if (appliedPromo.type === 'percent') {
        promoDiscountAmount = finalAmount * (appliedPromo.value / 100);
      } else if (appliedPromo.type === 'fixed') {
        promoDiscountAmount = Math.min(finalAmount, appliedPromo.value);
      }
      finalAmount -= promoDiscountAmount;
      if (summaryPromoDiscountRow) summaryPromoDiscountRow.style.display = 'flex';
      if (summaryAppliedCode) summaryAppliedCode.textContent = appliedPromo.code;
      if (summaryPromoDiscount) summaryPromoDiscount.textContent = `-Rs ${promoDiscountAmount.toFixed(2)}`;
    } else {
      if (summaryPromoDiscountRow) summaryPromoDiscountRow.style.display = 'none';
    }

    // Ensure non-negative total
    finalAmount = Math.max(0, finalAmount);
    if (summaryTotalPrice) summaryTotalPrice.textContent = `Rs ${finalAmount.toFixed(2)}`;

    // Perks list update
    if (summaryPerksList) {
      summaryPerksList.innerHTML = planData.perks.map(p => `<li>&#10003; ${p}</li>`).join('');
    }

    // Update tier amounts in radio cards
    document.querySelectorAll('.tier-amount').forEach(amountSpan => {
      const tierKey = amountSpan.getAttribute('data-plan');
      if (plansCatalog[tierKey]) {
        amountSpan.textContent = isAnnual ? `Rs ${plansCatalog[tierKey].yearly}` : `Rs ${plansCatalog[tierKey].monthly}`;
      }
    });

    document.querySelectorAll('.tier-frequency').forEach(freqSpan => {
      freqSpan.textContent = isAnnual ? '/ year' : '/ month';
    });

    // Generate dynamic preview QR code for the wallet tab
    renderPreviewQR(`RYU-DEMO-PAY:${currentPlan}:${finalAmount.toFixed(0)}`);
  }

  // Plan radio listener
  planRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        currentPlan = radio.value;
        updatePlanCardHighlights();
        recalculateOrder();
      }
    });
  });

  // Cycle toggle listener
  if (cycleMonthlyBtn && cycleAnnualBtn) {
    cycleMonthlyBtn.addEventListener('click', () => {
      currentCycle = 'monthly';
      cycleMonthlyBtn.classList.add('active');
      cycleAnnualBtn.classList.remove('active');
      recalculateOrder();
    });

    cycleAnnualBtn.addEventListener('click', () => {
      currentCycle = 'annual';
      cycleAnnualBtn.classList.add('active');
      cycleMonthlyBtn.classList.remove('active');
      recalculateOrder();
    });
  }

  // Student ID input listener for live rebate
  if (studentIdInput) {
    studentIdInput.addEventListener('input', () => {
      recalculateOrder();
    });
  }

  // Promo Code Engine
  const promoCodes = {
    'RYU2026': { code: 'RYU2026', type: 'percent', value: 20, desc: '20% Institutional Discount' },
    'STUDENT15': { code: 'STUDENT15', type: 'percent', value: 15, desc: '15% Student Discount' },
    'DISCIPLINE': { code: 'DISCIPLINE', type: 'fixed', value: 10, desc: 'Rs 10 Pure Discipline Credit' },
    'COLLEGE': { code: 'COLLEGE', type: 'percent', value: 25, desc: '25% College Project Special' }
  };

  if (applyPromoBtn && promoInput) {
    applyPromoBtn.addEventListener('click', () => {
      const entered = promoInput.value.trim().toUpperCase();
      if (!entered) return;

      if (promoCodes[entered]) {
        appliedPromo = promoCodes[entered];
        if (promoFeedback) {
          promoFeedback.className = 'promo-feedback is-valid';
          promoFeedback.textContent = `Applied! ${appliedPromo.desc}`;
        }
        promoInput.disabled = true;
        applyPromoBtn.textContent = 'Applied';
        applyPromoBtn.disabled = true;
      } else {
        if (promoFeedback) {
          promoFeedback.className = 'promo-feedback is-error';
          promoFeedback.textContent = 'Invalid promo code. Try RYU2026 or STUDENT15.';
        }
      }
      recalculateOrder();
    });
  }

  // Payment Method Tabs
  payTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      payTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      currentMethod = tab.getAttribute('data-method');

      // Toggle Panels
      Object.keys(payPanels).forEach(key => {
        if (payPanels[key]) {
          payPanels[key].classList.remove('active');
        }
      });
      if (payPanels[currentMethod]) {
        payPanels[currentMethod].classList.add('active');
      }

      // Update submit button text based on method
      const submitBtnText = document.querySelector('#btn-process-payment .btn-text-default');
      if (submitBtnText) {
        if (currentMethod === 'cash') {
          submitBtnText.textContent = 'Generate Front Desk Cashier Voucher & Barcode';
        } else if (currentMethod === 'qr') {
          submitBtnText.textContent = 'Pay with eSewa — Redirecting...';
        } else {
          submitBtnText.textContent = 'Authorize Card Payment & Generate Barcode Voucher';
        }
      }
    });
  });

  // Credit Card Interactive Visual Sync
  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', (e) => {
      // Strip non-digits
      let val = e.target.value.replace(/\D/g, '');
      // Format with spaces
      val = val.substring(0, 16);
      const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
      e.target.value = formatted;

      // Update Visual Preview
      if (cardPreviewNum) {
        cardPreviewNum.textContent = formatted || '•••• •••• •••• 4242';
      }

      // Detect card type
      if (cardPreviewBrand && cardBrandIcon) {
        if (val.startsWith('4')) {
          cardPreviewBrand.textContent = 'VISA';
          cardBrandIcon.textContent = '💳 Visa';
        } else if (/^5[1-5]/.test(val)) {
          cardPreviewBrand.textContent = 'MASTERCARD';
          cardBrandIcon.textContent = '💳 MC';
        } else if (/^3[47]/.test(val)) {
          cardPreviewBrand.textContent = 'AMEX';
          cardBrandIcon.textContent = '💳 Amex';
        } else {
          cardPreviewBrand.textContent = 'VISA / MC';
          cardBrandIcon.textContent = '💳';
        }
      }
    });
  }

  if (cardHolderInput) {
    cardHolderInput.addEventListener('input', (e) => {
      const val = e.target.value.toUpperCase();
      if (cardPreviewHolder) {
        cardPreviewHolder.textContent = val || 'YOUR NAME';
      }
    });
  }

  // Pre-sync athlete name to card holder name if blank
  if (memberNameInput && cardHolderInput) {
    memberNameInput.addEventListener('input', (e) => {
      if (!cardHolderInput.value) {
        if (cardPreviewHolder) {
          cardPreviewHolder.textContent = e.target.value.toUpperCase() || 'YOUR NAME';
        }
      }
    });
  }

  if (cardExpiryInput) {
    cardExpiryInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      if (val.length >= 2) {
        val = val.substring(0, 2) + '/' + val.substring(2, 4);
      }
      e.target.value = val;
      if (cardPreviewExp) {
        cardPreviewExp.textContent = val || '12/28';
      }
    });
  }

  // eSewa QR pay button — redirects to real eSewa payment page via backend
  const simQrAuthBtn = document.getElementById('sim-qr-auth-btn');
  if (simQrAuthBtn) {
    simQrAuthBtn.textContent = '🔁 Pay Now with eSewa';
    simQrAuthBtn.addEventListener('click', () => {
      executeCheckout();
    });
  }

  // Form Validation and Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    executeCheckout();
  });

  function validateCheckoutField(input, testFn, errorMsg) {
    if (!input) return true;
    const parent = input.closest('.form-group');
    const errorSpan = parent ? parent.querySelector('.form-field-error') : null;

    if (!testFn(input.value.trim())) {
      if (parent) parent.classList.add('has-error');
      if (errorSpan && errorMsg) errorSpan.textContent = errorMsg;
      return false;
    } else {
      if (parent) parent.classList.remove('has-error');
      return true;
    }
  }

  function executeCheckout() {
    const memberName = document.getElementById('member-name');
    const memberEmail = document.getElementById('member-email');
    const memberPhone = document.getElementById('member-phone');

    let isValid = true;

    // Validate Member Credentials
    if (!validateCheckoutField(memberName, val => val.length >= 2, 'Please enter your legal name.')) {
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validateCheckoutField(memberEmail, val => emailRegex.test(val), 'Please enter a valid email address.')) {
      isValid = false;
    }

    if (!validateCheckoutField(memberPhone, val => val.length >= 6, 'Please provide a valid phone number.')) {
      isValid = false;
    }

    // If card payment is selected, validate card inputs
    if (currentMethod === 'card') {
      const rawCard = cardNumberInput ? cardNumberInput.value.replace(/\s/g, '') : '';
      if (!validateCheckoutField(cardNumberInput, () => rawCard.length >= 15, 'Please enter a valid 16-digit card number.')) {
        isValid = false;
      }
      if (!validateCheckoutField(cardHolderInput, val => val.length >= 2, 'Please enter name as printed on card.')) {
        isValid = false;
      }
      if (!validateCheckoutField(cardExpiryInput, val => /^\d{2}\/\d{2}$/.test(val), 'Enter expiry as MM/YY.')) {
        isValid = false;
      }
      if (!validateCheckoutField(cardCvvInput, val => val.length >= 3, 'Enter 3-digit CVV.')) {
        isValid = false;
      }
    }

    if (!isValid) {
      // Focus first error
      const firstError = form.querySelector('.form-group.has-error input');
      if (firstError) firstError.focus();
      return;
    }

    // Start loading state
    const submitBtn = document.getElementById('btn-process-payment');
    const defaultText = submitBtn.querySelector('.btn-text-default');
    const loadingText = submitBtn.querySelector('.btn-text-loading');

    if (defaultText && loadingText) {
      defaultText.style.display = 'none';
      loadingText.style.display = 'inline-flex';
    }
    submitBtn.disabled = true;

    // ---- REAL eSewa flow for QR/wallet tab ----
    if (currentMethod === 'qr') {
      const memberName = document.getElementById('member-name');
      const memberEmail = document.getElementById('member-email');
      const memberPhone = document.getElementById('member-phone');

      // get the numeric amount from the summary (strip "Rs " prefix)
      const rawAmount = summaryTotalPrice
        ? summaryTotalPrice.textContent.replace(/[^0-9.]/g, '')
        : '0';

      fetch('http://localhost:3001/api/initiate-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planKey: currentPlan,
          amount: rawAmount,
          cycle: currentCycle,
          name: memberName ? memberName.value.trim() : '',
          email: memberEmail ? memberEmail.value.trim() : '',
          phone: memberPhone ? memberPhone.value.trim() : '',
        }),
      })
        .then(r => r.json())
        .then(({ formUrl, fields, error }) => {
          if (error || !formUrl) {
            alert('Could not reach the payment server. Please try again.');
            submitBtn.disabled = false;
            if (defaultText && loadingText) {
              defaultText.style.display = 'inline';
              loadingText.style.display = 'none';
            }
            return;
          }

          // build a hidden form and auto-submit it to eSewa
          const esewaForm = document.createElement('form');
          esewaForm.method = 'POST';
          esewaForm.action = formUrl;

          Object.entries(fields).forEach(([key, val]) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = val;
            esewaForm.appendChild(input);
          });

          document.body.appendChild(esewaForm);
          esewaForm.submit(); // user lands on eSewa's payment page
        })
        .catch(() => {
          alert('Payment server is not running. Please start it with: cd server && npm start');
          submitBtn.disabled = false;
          if (defaultText && loadingText) {
            defaultText.style.display = 'inline';
            loadingText.style.display = 'none';
          }
        });

      return; // stop here — eSewa handles the rest
    }

    // ---- Simulated flow for card and cash ----
    setTimeout(() => {
      // Generate Unique Voucher & Transaction Codes
      const randomSeed = Math.floor(100000 + Math.random() * 900000);
      const voucherCode = `RYU-2026-X${randomSeed}`;
      const barcodeNumeric = `RYU 2026 ${randomSeed}`;
      const txnRef = `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`;

      // Calculate Dates
      const now = new Date();
      const issueDateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const expDate = new Date(now);
      if (currentCycle === 'annual') {
        expDate.setFullYear(expDate.getFullYear() + 1);
      } else {
        expDate.setDate(expDate.getDate() + 30);
      }
      const expDateStr = expDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      // Amount paid text
      const finalAmountStr = summaryTotalPrice ? summaryTotalPrice.textContent : 'Rs 79.00';
      const planData = plansCatalog[currentPlan] || plansCatalog.IronPass;

      // Payment method descriptor
      let payMethodDesc = 'Credit Card (•••• 4242)';
      if (currentMethod === 'qr') {
        payMethodDesc = 'Digital Mobile Wallet (Verified)';
      } else if (currentMethod === 'cash') {
        payMethodDesc = 'Front Desk Cashier Voucher (Present in Person)';
      }

      const athleteName = memberName ? memberName.value.trim() : 'Athlete';
      const athleteEmail = memberEmail ? memberEmail.value.trim() : '';
      const athletePhone = memberPhone ? memberPhone.value.trim() : '';

      // Populate Voucher View
      const vCodeBadge = document.getElementById('v-code-badge');
      const vMemberName = document.getElementById('v-member-name');
      const vTierTitle = document.getElementById('v-tier-title');
      const vBillingDuration = document.getElementById('v-billing-duration');
      const vIssueDate = document.getElementById('v-issue-date');
      const vExpiryDate = document.getElementById('v-expiry-date');
      const vAmountPaid = document.getElementById('v-amount-paid');
      const vPaymentMethod = document.getElementById('v-payment-method');
      const vPrivileges = document.getElementById('v-privileges-summary');
      const vBarcodeNum = document.getElementById('v-barcode-numeric-display');
      const vTxnDisplay = document.getElementById('v-trans-id-display');

      if (vCodeBadge) vCodeBadge.textContent = voucherCode;
      if (vMemberName) vMemberName.textContent = athleteName;
      if (vTierTitle) vTierTitle.textContent = planData.name;
      if (vBillingDuration) vBillingDuration.textContent = currentCycle === 'annual' ? 'Annual Pass (365 Days)' : 'Monthly Access (30 Days)';
      if (vIssueDate) vIssueDate.textContent = issueDateStr;
      if (vExpiryDate) vExpiryDate.textContent = expDateStr;
      if (vAmountPaid) vAmountPaid.textContent = finalAmountStr;
      if (vPaymentMethod) vPaymentMethod.textContent = payMethodDesc;
      if (vPrivileges) vPrivileges.textContent = planData.privileges;
      if (vBarcodeNum) vBarcodeNum.textContent = barcodeNumeric;
      if (vTxnDisplay) vTxnDisplay.textContent = txnRef;

      // Generate Dynamic Barcode (Code 39 standard)
      const barcodeContainer = document.getElementById('voucher-barcode-render');
      if (barcodeContainer) {
        barcodeContainer.innerHTML = generateCode39BarcodeSVG(voucherCode, 280, 50);
      }

      // Generate Dynamic QR Code
      const qrContainer = document.getElementById('voucher-qr-render');
      if (qrContainer) {
        const qrPayload = `RYU-PASS:${voucherCode}:${athleteName}:${currentPlan}:${expDateStr}`;
        qrContainer.innerHTML = generateCrispQRSVG(qrPayload, 120);
      }

      // Save pass into localStorage history
      saveVoucherToStorage({
        code: voucherCode,
        name: athleteName,
        email: athleteEmail,
        phone: athletePhone,
        plan: planData.name,
        amount: finalAmountStr,
        issued: issueDateStr,
        expires: expDateStr,
        method: payMethodDesc,
        txn: txnRef
      });

      // Switch views: Hide form view, show voucher view
      const formView = document.getElementById('checkout-form-view');
      const successView = document.getElementById('voucher-success-view');

      if (formView && successView) {
        formView.style.display = 'none';
        successView.style.display = 'block';
        successView.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Restore button state in case they navigate back
      if (defaultText && loadingText) {
        defaultText.style.display = 'inline';
        loadingText.style.display = 'none';
      }
      submitBtn.disabled = false;
    }, 1200);
  }

  // Pass Action: Print
  const printVoucherBtn = document.getElementById('btn-print-voucher');
  if (printVoucherBtn) {
    printVoucherBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Pass Action: Copy Code
  const copyVoucherBtn = document.getElementById('btn-copy-voucher-code');
  if (copyVoucherBtn) {
    copyVoucherBtn.addEventListener('click', () => {
      const vCode = document.getElementById('v-code-badge')?.textContent || 'RYU-PASS';
      navigator.clipboard.writeText(vCode).then(() => {
        const originalText = copyVoucherBtn.innerHTML;
        copyVoucherBtn.innerHTML = '✓ Pass Code Copied!';
        setTimeout(() => {
          copyVoucherBtn.innerHTML = originalText;
        }, 2200);
      }).catch(() => {
        prompt('Copy your voucher code:', vCode);
      });
    });
  }

  // Pass Action: Enroll Another Member
  const newCheckoutBtn = document.getElementById('btn-new-checkout');
  if (newCheckoutBtn) {
    newCheckoutBtn.addEventListener('click', () => {
      const formView = document.getElementById('checkout-form-view');
      const successView = document.getElementById('voucher-success-view');
      if (formView && successView) {
        form.reset();
        appliedPromo = null;
        formView.style.display = 'block';
        successView.style.display = 'none';
        recalculateOrder();
      }
    });
  }

  // Back to Plans button (on inline checkout section — membership.html)
  const backToPlansBtn = document.getElementById('btn-back-to-plans');
  if (backToPlansBtn) {
    backToPlansBtn.addEventListener('click', () => {
      const inlineCheckout = document.getElementById('checkout-section');
      if (inlineCheckout) {
        inlineCheckout.style.display = 'none';
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }

  // Open Payment — supports both modal (about.html) and inline section (membership.html)
  const openPaymentModal = (planKey = 'BlackTier') => {
    currentPlan = plansCatalog[planKey] ? planKey : 'BlackTier';

    // Check if the page toggle switch is set to annual
    const pagePricingToggle = document.getElementById('pricing-toggle');
    if (pagePricingToggle && pagePricingToggle.getAttribute('aria-checked') === 'true') {
      currentCycle = 'annual';
      if (cycleMonthlyBtn && cycleAnnualBtn) {
        cycleMonthlyBtn.classList.remove('active');
        cycleAnnualBtn.classList.add('active');
      }
    } else {
      currentCycle = 'monthly';
      if (cycleMonthlyBtn && cycleAnnualBtn) {
        cycleMonthlyBtn.classList.add('active');
        cycleAnnualBtn.classList.remove('active');
      }
    }

    const targetRadio = document.querySelector(`input[name="membership-plan"][value="${currentPlan}"]`);
    if (targetRadio) {
      targetRadio.checked = true;
    }

    updatePlanCardHighlights();
    recalculateOrder();

    // Reset view to checkout form
    const formView = document.getElementById('checkout-form-view');
    const successView = document.getElementById('voucher-success-view');
    if (formView) formView.style.display = 'block';
    if (successView) successView.style.display = 'none';

    // Check if this page uses an inline checkout section (membership.html)
    const inlineCheckout = document.getElementById('checkout-section');
    if (inlineCheckout) {
      inlineCheckout.style.display = 'block';
      setTimeout(() => {
        inlineCheckout.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
      return; // Don't open modal on inline-checkout pages
    }

    // Otherwise open modal (about.html fallback)
    const modal = document.getElementById('membership-payment-modal');
    if (modal) {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  const closePaymentModal = () => {
    const modal = document.getElementById('membership-payment-modal');
    if (modal) {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  // Wire all .btn-open-payment buttons in about.html
  document.querySelectorAll('.btn-open-payment').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const plan = btn.getAttribute('data-plan') || 'BlackTier';
      openPaymentModal(plan);
    });
  });

  const closePayModalBtn = document.getElementById('close-payment-modal');
  if (closePayModalBtn) {
    closePayModalBtn.addEventListener('click', closePaymentModal);
  }

  const payModal = document.getElementById('membership-payment-modal');
  if (payModal) {
    payModal.addEventListener('click', (e) => {
      if (e.target === payModal) {
        closePaymentModal();
      }
    });
  }

  // Modal: Lookup Existing Passes
  const lookupBtn = document.getElementById('btn-lookup-existing-pass');
  const lookupModal = document.getElementById('lookup-modal');
  const closeLookupBtn = document.getElementById('close-lookup-modal');
  const savedVouchersList = document.getElementById('saved-vouchers-list');

  if (lookupBtn && lookupModal) {
    lookupBtn.addEventListener('click', () => {
      renderSavedPassesList();
      lookupModal.classList.add('is-open');
      lookupModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeLookupBtn && lookupModal) {
    closeLookupBtn.addEventListener('click', () => {
      lookupModal.classList.remove('is-open');
      lookupModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  }

  if (lookupModal) {
    lookupModal.addEventListener('click', (e) => {
      if (e.target === lookupModal) {
        lookupModal.classList.remove('is-open');
        lookupModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (payModal && payModal.classList.contains('is-open')) {
        closePaymentModal();
      }
      if (lookupModal && lookupModal.classList.contains('is-open')) {
        lookupModal.classList.remove('is-open');
        lookupModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    }
  });

  function renderSavedPassesList() {
    if (!savedVouchersList) return;
    const passes = getStoredVouchers();

    if (!passes || passes.length === 0) {
      savedVouchersList.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem; color: var(--text-secondary);">
          <p>No previous vouchers found in this browser.</p>
          <small>Complete an enrollment in Membership Tiers to generate your first pass.</small>
        </div>
      `;
      return;
    }

    savedVouchersList.innerHTML = passes.map(p => `
      <div class="saved-pass-item">
        <div class="saved-pass-meta">
          <h4>${p.name} — ${p.plan}</h4>
          <p><strong>Code:</strong> ${p.code} &bull; Valid Until: ${p.expires}</p>
        </div>
        <button type="button" class="btn btn-secondary btn-sm load-pass-btn" data-code="${p.code}">
          View Pass
        </button>
      </div>
    `).join('');

    // Attach click handlers to view pass
    savedVouchersList.querySelectorAll('.load-pass-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.getAttribute('data-code');
        const pass = passes.find(item => item.code === code);
        if (pass) {
          lookupModal.classList.remove('is-open');
          lookupModal.setAttribute('aria-hidden', 'true');
          loadStoredVoucherToView(pass);
        }
      });
    });
  }

  function loadStoredVoucherToView(pass) {
    const vCodeBadge = document.getElementById('v-code-badge');
    const vMemberName = document.getElementById('v-member-name');
    const vTierTitle = document.getElementById('v-tier-title');
    const vBillingDuration = document.getElementById('v-billing-duration');
    const vIssueDate = document.getElementById('v-issue-date');
    const vExpiryDate = document.getElementById('v-expiry-date');
    const vAmountPaid = document.getElementById('v-amount-paid');
    const vPaymentMethod = document.getElementById('v-payment-method');
    const vBarcodeNum = document.getElementById('v-barcode-numeric-display');
    const vTxnDisplay = document.getElementById('v-trans-id-display');

    if (vCodeBadge) vCodeBadge.textContent = pass.code;
    if (vMemberName) vMemberName.textContent = pass.name;
    if (vTierTitle) vTierTitle.textContent = pass.plan;
    if (vBillingDuration) vBillingDuration.textContent = 'Active Stored Pass';
    if (vIssueDate) vIssueDate.textContent = pass.issued;
    if (vExpiryDate) vExpiryDate.textContent = pass.expires;
    if (vAmountPaid) vAmountPaid.textContent = pass.amount;
    if (vPaymentMethod) vPaymentMethod.textContent = pass.method;
    if (vBarcodeNum) vBarcodeNum.textContent = pass.code.replace(/-/g, ' ');
    if (vTxnDisplay) vTxnDisplay.textContent = pass.txn || 'TXN-STORED';

    const barcodeContainer = document.getElementById('voucher-barcode-render');
    if (barcodeContainer) {
      barcodeContainer.innerHTML = generateCode39BarcodeSVG(pass.code, 280, 50);
    }

    const qrContainer = document.getElementById('voucher-qr-render');
    if (qrContainer) {
      qrContainer.innerHTML = generateCrispQRSVG(`RYU-PASS:${pass.code}:${pass.name}:${pass.plan}`, 120);
    }

    const formView = document.getElementById('checkout-form-view');
    const successView = document.getElementById('voucher-success-view');
    if (formView && successView) {
      formView.style.display = 'none';
      successView.style.display = 'block';
    }

    const payModal = document.getElementById('membership-payment-modal');
    if (payModal) {
      payModal.classList.add('is-open');
      payModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  // If URL has ?plan=..., auto-open the payment modal on about.html
  if (paramPlan) {
    openPaymentModal(paramPlan);
  }

  // Handle eSewa redirect back to this page after payment
  // Backend redirects to: membership.html?payment=success&txn=UUID&ref=REF&amount=AMT
  //                     or: membership.html?payment=failed
  //                     or: membership.html?payment=error&reason=...
  const urlParams = new URLSearchParams(window.location.search);
  const paymentResult = urlParams.get('payment');

  if (paymentResult === 'success') {
    const txnUuid = urlParams.get('txn') || '';
    const esewaRef = urlParams.get('ref') || '';
    const paidAmount = urlParams.get('amount') || '';

    // open the checkout section so the voucher is visible
    const inlineCheckout = document.getElementById('checkout-section');
    if (inlineCheckout) inlineCheckout.style.display = 'block';

    // generate a local voucher from the confirmed transaction data
    const randomSeed = Math.floor(100000 + Math.random() * 900000);
    const voucherCode = txnUuid ? `RYU-${txnUuid.slice(0, 8).toUpperCase()}` : `RYU-2026-X${randomSeed}`;
    const now = new Date();
    const issueDateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const expDate = new Date(now);
    expDate.setDate(expDate.getDate() + 30);
    const expDateStr = expDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const planData = plansCatalog[currentPlan] || plansCatalog.BlackTier;

    const vCodeBadge = document.getElementById('v-code-badge');
    const vTierTitle = document.getElementById('v-tier-title');
    const vBillingDuration = document.getElementById('v-billing-duration');
    const vIssueDate = document.getElementById('v-issue-date');
    const vExpiryDate = document.getElementById('v-expiry-date');
    const vAmountPaid = document.getElementById('v-amount-paid');
    const vPaymentMethod = document.getElementById('v-payment-method');
    const vPrivileges = document.getElementById('v-privileges-summary');
    const vBarcodeNum = document.getElementById('v-barcode-numeric-display');
    const vTxnDisplay = document.getElementById('v-trans-id-display');

    if (vCodeBadge) vCodeBadge.textContent = voucherCode;
    if (vTierTitle) vTierTitle.textContent = planData.name;
    if (vBillingDuration) vBillingDuration.textContent = 'Monthly Access (30 Days)';
    if (vIssueDate) vIssueDate.textContent = issueDateStr;
    if (vExpiryDate) vExpiryDate.textContent = expDateStr;
    if (vAmountPaid) vAmountPaid.textContent = paidAmount ? `Rs ${paidAmount}` : planData.priceMonthly;
    if (vPaymentMethod) vPaymentMethod.textContent = `eSewa (Ref: ${esewaRef || 'N/A'})`;
    if (vPrivileges) vPrivileges.textContent = planData.privileges;
    if (vBarcodeNum) vBarcodeNum.textContent = `RYU 2026 ${randomSeed}`;
    if (vTxnDisplay) vTxnDisplay.textContent = txnUuid || `TXN-${randomSeed}`;

    const barcodeContainer = document.getElementById('voucher-barcode-render');
    if (barcodeContainer) {
      barcodeContainer.innerHTML = generateCode39BarcodeSVG(voucherCode, 280, 50);
    }
    const qrContainer = document.getElementById('voucher-qr-render');
    if (qrContainer) {
      qrContainer.innerHTML = generateCrispQRSVG(`RYU-PASS:${voucherCode}:eSewa:${esewaRef}`, 120);
    }

    // switch to success view
    const formView = document.getElementById('checkout-form-view');
    const successView = document.getElementById('voucher-success-view');
    if (formView && successView) {
      formView.style.display = 'none';
      successView.style.display = 'block';
      setTimeout(() => successView.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }

    // clean up URL so refreshing doesn't reprocess
    window.history.replaceState({}, '', window.location.pathname);

  } else if (paymentResult === 'failed' || paymentResult === 'error') {
    const reason = urlParams.get('reason') || '';
    const msg = reason === 'signature_mismatch'
      ? 'Payment verification failed (signature mismatch). Please contact support.'
      : 'Your payment was not completed. You can try again below.';

    // show a non-blocking notice at the top of the checkout section
    const inlineCheckout = document.getElementById('checkout-section');
    if (inlineCheckout) {
      inlineCheckout.style.display = 'block';
      const notice = document.createElement('div');
      notice.style.cssText = 'background:#fee2e2;border:1px solid #ef4444;color:#991b1b;padding:1rem 1.25rem;border-radius:4px;margin-bottom:1.5rem;font-size:0.95rem;';
      notice.textContent = `⚠ ${msg}`;
      inlineCheckout.prepend(notice);
      setTimeout(() => inlineCheckout.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
    window.history.replaceState({}, '', window.location.pathname);
  }

  // Initial Calculation on Page Load
  updatePlanCardHighlights();
  recalculateOrder();
}


function generateCode39BarcodeSVG(text, width = 280, height = 50) {
  // Code 39 Patterns: 9 bits per character (5 bars, 4 spaces). 1 = Wide (3 units), 0 = Narrow (1 unit)
  const code39Patterns = {
    '0': '000110100', '1': '100100001', '2': '001100001', '3': '101100000', '4': '000110001',
    '5': '100110000', '6': '001110000', '7': '000100101', '8': '100100100', '9': '001100100',
    'A': '100001001', 'B': '001001001', 'C': '101001000', 'D': '000011001', 'E': '100011000',
    'F': '001011000', 'G': '000001101', 'H': '100001100', 'I': '001001100', 'J': '000011100',
    'K': '100000011', 'L': '001000011', 'M': '101000010', 'N': '000010011', 'O': '100010010',
    'P': '001010010', 'Q': '000000111', 'R': '100000110', 'S': '001000110', 'T': '000010110',
    'U': '110000001', 'V': '011000001', 'W': '111000000', 'X': '010010001', 'Y': '110010000',
    'Z': '011010000', '-': '010000101', '.': '110000100', ' ': '011000100', '*': '010010100',
    '$': '010101000', '/': '010100010', '+': '010001010', '%': '000101010'
  };

  // Ensure uppercase and enclose with start/stop delimiter '*'
  const cleanStr = '*' + text.toUpperCase().replace(/[^0-9A-Z\-. $/+%]/g, '') + '*';

  const narrowWidth = 2;
  const wideWidth = 5;
  const gapWidth = 2; // Inter-character narrow space

  let totalModules = 0;
  // Calculate total width
  for (let i = 0; i < cleanStr.length; i++) {
    const char = cleanStr[i];
    const pattern = code39Patterns[char] || code39Patterns['*'];
    for (let p = 0; p < 9; p++) {
      totalModules += (pattern[p] === '1') ? wideWidth : narrowWidth;
    }
    if (i < cleanStr.length - 1) totalModules += gapWidth;
  }

  // Build SVG bars
  let svgBars = '';
  let currentX = 0;

  for (let i = 0; i < cleanStr.length; i++) {
    const char = cleanStr[i];
    const pattern = code39Patterns[char] || code39Patterns['*'];

    for (let p = 0; p < 9; p++) {
      const isBar = (p % 2 === 0);
      const isWide = (pattern[p] === '1');
      const w = isWide ? wideWidth : narrowWidth;

      if (isBar) {
        svgBars += `<rect x="${currentX}" y="0" width="${w}" height="${height}" fill="#000000" />`;
      }
      currentX += w;
    }

    // Inter-character space
    if (i < cleanStr.length - 1) {
      currentX += gapWidth;
    }
  }

  return `<svg viewBox="0 0 ${totalModules} ${height}" preserveAspectRatio="none" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Barcode: ${text}">${svgBars}</svg>`;
}


function generateCrispQRSVG(data, size = 120) {
  const matrixSize = 25; // Standard 25x25 grid
  const grid = Array.from({ length: matrixSize }, () => Array(matrixSize).fill(0));

  // 1. Draw Finder Patterns at (0,0), (0, matrixSize-7), (matrixSize-7, 0)
  function drawFinder(row, col) {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const curR = row + r;
        const curC = col + c;
        if (curR >= 0 && curR < matrixSize && curC >= 0 && curC < matrixSize) {
          // White separator border
          if (r === -1 || r === 7 || c === -1 || c === 7) {
            grid[curR][curC] = -1; // Reserved white
          } else if (r === 0 || r === 6 || c === 0 || c === 6) {
            grid[curR][curC] = 1;  // Outer black border
          } else if (r === 1 || r === 5 || c === 1 || c === 5) {
            grid[curR][curC] = -1; // Inner white ring
          } else {
            grid[curR][curC] = 1;  // Central solid 3x3 black
          }
        }
      }
    }
  }

  drawFinder(0, 0);
  drawFinder(0, matrixSize - 7);
  drawFinder(matrixSize - 7, 0);

  // 2. Timing tracks at row 6 and col 6
  for (let i = 8; i < matrixSize - 8; i++) {
    grid[6][i] = (i % 2 === 0) ? 1 : -1;
    grid[i][6] = (i % 2 === 0) ? 1 : -1;
  }

  // 3. Alignment pattern around (16, 16)
  const alignR = 16;
  const alignC = 16;
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      if (Math.abs(r) === 2 || Math.abs(c) === 2) {
        grid[alignR + r][alignC + c] = 1;
      } else if (r === 0 && c === 0) {
        grid[alignR + r][alignC + c] = 1;
      } else {
        grid[alignR + r][alignC + c] = -1;
      }
    }
  }

  // 4. Data hashing for deterministic cell population
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) - hash) + data.charCodeAt(i);
    hash |= 0;
  }

  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      if (grid[r][c] === 0) {
        // Pseudo-random bit determined by position and string hash
        const bit = Math.sin(r * 13 + c * 37 + hash) > 0.15 ? 1 : -1;
        grid[r][c] = bit;
      }
    }
  }

  // 5. Build SVG Rectangles
  const cellSize = 10;
  const svgTotalSize = matrixSize * cellSize;
  let rects = '';

  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      if (grid[r][c] === 1) {
        rects += `<rect x="${c * cellSize}" y="${r * cellSize}" width="${cellSize}" height="${cellSize}" fill="#000000" />`;
      }
    }
  }

  // Center Emblem Overlay (Ryu Gym geometric diamond badge)
  const centerStart = 10 * cellSize;
  const centerSpan = 5 * cellSize;
  const centerRect = `<rect x="${centerStart}" y="${centerStart}" width="${centerSpan}" height="${centerSpan}" fill="#ffffff" stroke="#000000" stroke-width="3" />
    <text x="${centerStart + centerSpan / 2}" y="${centerStart + centerSpan / 2 + 5}" font-family="Oswald, sans-serif" font-size="14" font-weight="700" fill="#000000" text-anchor="middle">RYU</text>`;

  return `<svg viewBox="0 0 ${svgTotalSize} ${svgTotalSize}" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="QR Code">${rects}${centerRect}</svg>`;
}

function renderPreviewQR(payload) {
  const qrElem = document.getElementById('checkout-dynamic-qr');
  if (!qrElem) return;
  qrElem.innerHTML = generateCrispQRSVG(payload, 160).replace(/<svg[^>]*>|<\/svg>/g, '');
}


function saveVoucherToStorage(voucherData) {
  try {
    const existing = JSON.parse(localStorage.getItem('ryu_membership_vouchers') || '[]');
    existing.unshift(voucherData); // Latest first
    localStorage.setItem('ryu_membership_vouchers', JSON.stringify(existing.slice(0, 10)));
  } catch (err) {
    console.warn('LocalStorage not available for vouchers', err);
  }
}

function getStoredVouchers() {
  try {
    return JSON.parse(localStorage.getItem('ryu_membership_vouchers') || '[]');
  } catch (err) {
    return [];
  }
}

