/**
 * OnPoint Nurse & Home Care - Core Client Application
 *
 * Each page is its own document at its own URL (built by build.js), so there is
 * no router here. This file only handles on-page behaviour: the drawer, forms,
 * accordions, the assessment wizard, modals and toasts.
 */

document.addEventListener('DOMContentLoaded', () => {
  loadIncludes().then(() => {
    initComingSoonLinks();
    initHeaderScroll();
  });
  initWizard();
  initTestimonialsSlider();
  initScrollReveal();
  initFormAntiLinkSecurity();
});

/**
 * Loads header and footer partials from includes/ folder if placeholders are present.
 */
async function loadIncludes() {
  const headerContainer = document.getElementById('header-include') || document.querySelector('[data-include="header"]');
  const footerContainer = document.getElementById('footer-include') || document.querySelector('[data-include="footer"]');

  const tasks = [];

  if (headerContainer && headerContainer.innerHTML.trim() === '') {
    tasks.push(
      fetch('includes/header.html')
        .then(res => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.text();
        })
        .then(html => {
          headerContainer.innerHTML = html;
          highlightActiveNavLink();
        })
        .catch(err => console.warn('Header include load skipped/failed:', err))
    );
  } else {
    highlightActiveNavLink();
  }

  if (footerContainer && footerContainer.innerHTML.trim() === '') {
    tasks.push(
      fetch('includes/footer.html')
        .then(res => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.text();
        })
        .then(html => {
          footerContainer.innerHTML = html;
        })
        .catch(err => console.warn('Footer include load skipped/failed:', err))
    );
  }

  await Promise.all(tasks);
}

/**
 * Automatically highlights the active page link and parent dropdown in navigation
 */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a, .mobile-drawer a, .footer-links-list a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      const dropdown = link.closest('.nav-dropdown');
      if (dropdown) {
        const trigger = dropdown.querySelector('.nav-dropdown-trigger');
        if (trigger) trigger.classList.add('active');
      }
      const drawerGroup = link.closest('.drawer-group');
      if (drawerGroup) {
        drawerGroup.setAttribute('open', '');
      }
    }
  });
}

/**
 * Links to pages in the sitemap that have not been built yet carry data-soon.
 * They keep their real destination in the markup, so launching a page is just a
 * routes.js change, but until then a click is answered with a toast rather than
 * a 404.
 */
function initComingSoonLinks() {
  document.querySelectorAll('[data-soon]').forEach(el => {
    el.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      const label = el.getAttribute('data-soon');
      showToast(`${label} is coming soon. Call us or book a care assessment and our team will help right away.`);
      const drawer = document.getElementById('mobileDrawer');
      if (drawer && drawer.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  });
}

// Sticky Header On Scroll
function initHeaderScroll() {
  const header = document.getElementById('mainHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  drawer.classList.toggle('open');
  backdrop.classList.toggle('open');
}

// FAQ Accordion Handler
function toggleFaq(buttonElement) {
  const item = buttonElement.closest('.faq-item');
  const isOpen = item.classList.contains('active');

  // Close other items in the same container
  const container = item.closest('.faq-accordion-container');
  const allItems = container.querySelectorAll('.faq-item');
  allItems.forEach(i => i.classList.remove('active'));

  if (!isOpen) {
    item.classList.add('active');
  }
}

// Service Filter Tabs (on Services Page)
function filterServices(category) {
  const tabBtns = document.querySelectorAll('.s-tab-btn');
  tabBtns.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  const cards = document.querySelectorAll('.service-detail-box');
  cards.forEach(card => {
    const cat = card.getAttribute('data-cat');
    if (category === 'all' || cat === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Interactive Memory Screener Tool
function updateScreenerResult() {
  const chk1 = document.getElementById('chk1').checked;
  const chk2 = document.getElementById('chk2').checked;
  const chk3 = document.getElementById('chk3').checked;
  const chk4 = document.getElementById('chk4').checked;
  const chk5 = document.getElementById('chk5').checked;

  const count = [chk1, chk2, chk3, chk4, chk5].filter(Boolean).length;
  const feedbackEl = document.getElementById('screenerFeedback');

  if (count === 0) {
    feedbackEl.innerHTML = "Select any checkboxes above to view clinical recommendations for your family.";
  } else if (count === 1) {
    feedbackEl.innerHTML = `<strong>Mild / Early Observation (1 sign checked):</strong> Occasional subtle changes can be related to normal aging, fatigue, or minor stress. However, keeping a gentle weekly log of these occurrences will provide valuable context. We recommend a proactive, stress-free clinical wellness review with our Lead Registered Nurse.`;
  } else if (count === 2 || count === 3) {
    feedbackEl.innerHTML = `<strong>Moderate Cognitive Signs (${count} signs checked):</strong> These indicators warrant a formal, person-centered in-home nursing assessment. An early clinical evaluation helps rule out treatable conditions (e.g., vitamin deficiencies, medication interactions) and allows your family to structure comforting routines and vital medical directives early.`;
  } else {
    feedbackEl.innerHTML = `<strong>High Need for Proactive Clinical Evaluation (${count} signs checked):</strong> Multiple distinct cognitive and behavioral shifts indicate that comprehensive dementia and memory care support will significantly protect your loved one's safety, dignity, and wellbeing. We urge you to arrange an in-home assessment with Risper Murunga, RN, BSN, MPH promptly.`;
  }
}

// Interactive Care Assessment Wizard
let currentWizardStep = 1;
function initWizard() {
  // Set default preferred date to 3 days from now
  const dateInput = document.getElementById('wPreferredDate');
  if (dateInput) {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    dateInput.value = d.toISOString().split('T')[0];
  }
}

function goToWizardStep(stepNumber) {
  // Update panels
  document.getElementById('wizardStep1').classList.remove('active');
  document.getElementById('wizardStep2').classList.remove('active');
  document.getElementById('wizardStep3').classList.remove('active');
  document.getElementById('wizardSuccess').style.display = 'none';

  const nextPanel = document.getElementById(`wizardStep${stepNumber}`);
  if (nextPanel) {
    nextPanel.classList.add('active');
  }

  // Update progress badges
  for (let i = 1; i <= 3; i++) {
    const badge = document.getElementById(`wStep${i}Badge`);
    if (i <= stepNumber) {
      badge.classList.add('active');
    } else {
      badge.classList.remove('active');
    }
  }

  const line1 = document.getElementById('wLine1');
  const line2 = document.getElementById('wLine2');
  if (line1) line1.classList.toggle('active', stepNumber >= 2);
  if (line2) line2.classList.toggle('active', stepNumber >= 3);

  currentWizardStep = stepNumber;
  window.scrollTo({ top: document.querySelector('.wizard-container').offsetTop - 100, behavior: 'smooth' });
}

function handleWizardSubmit(e) {
  e.preventDefault();

  // Gather values
  const forWho = document.querySelector('input[name="wizFor"]:checked')?.value || 'Senior';
  const age = document.getElementById('wizAge')?.value || 'Not specified';
  const location = document.getElementById('wizLocation')?.value || 'Nairobi Area';
  
  const checkedNeeds = Array.from(document.querySelectorAll('input[name="wizNeeds"]:checked')).map(cb => cb.value);
  const name = document.getElementById('wName')?.value || '';
  const phone = document.getElementById('wPhone')?.value || '';
  const email = document.getElementById('wEmail')?.value || '';
  const prefDate = document.getElementById('wPreferredDate')?.value || 'Flexible';

  // Render summary
  const summaryDisplay = document.getElementById('wizSummaryDisplay');
  if (summaryDisplay) {
    summaryDisplay.innerHTML = `
      <h4 style="color:#0F4C5C; margin-bottom:0.5rem; font-size:1rem;">Booking Summary:</h4>
      <p style="font-size:0.875rem; margin-bottom:0.25rem;"><strong>Care Recipient:</strong> ${forWho} (Age: ${age})</p>
      <p style="font-size:0.875rem; margin-bottom:0.25rem;"><strong>Location:</strong> ${location}</p>
      <p style="font-size:0.875rem; margin-bottom:0.25rem;"><strong>Requested Services:</strong> ${checkedNeeds.join(', ') || 'General Home Assessment'}</p>
      <p style="font-size:0.875rem; margin-bottom:0.25rem;"><strong>Family Contact:</strong> ${name} (${phone})</p>
      <p style="font-size:0.875rem;"><strong>Target Date:</strong> ${prefDate}</p>
    `;
  }

  // Hide step 3, show success
  document.getElementById('wizardStep3').classList.remove('active');
  const successPanel = document.getElementById('wizardSuccess');
  successPanel.style.display = 'block';

  showToast(`Care Assessment request received for ${name}! Our Lead RN will contact you.`);
}

// General Lead Form Submit Handler
function handleLeadFormSubmit(e, formId) {
  e.preventDefault();
  const form = document.getElementById(formId);
  const nameInput = form.querySelector('input[name="fullName"]');
  const senderName = nameInput ? nameInput.value : 'Valued Family';

  showToast(`Thank you, ${senderName}. Your care inquiry has been securely sent to our clinical team.`);
  form.reset();
}

// Modal Helpers
function closeModalOnBackdrop(e, modalId) {
  if (e.target.id === modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.remove('open');
  }
}

// Toast System
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const msgEl = document.getElementById('toastMessage');
  if (toast && msgEl) {
    msgEl.innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }
}

// Testimonials Carousel / Slider
let currentTestimonialIndex = 0;
let testimonialAutoPlayTimer = null;

function getVisibleSlidesCount() {
  if (window.innerWidth <= 768) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

function getMaxTestimonialIndex() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const visible = getVisibleSlidesCount();
  return Math.max(0, slides.length - visible);
}

function updateTestimonialSlider() {
  const track = document.getElementById('testimonialTrack');
  const slides = document.querySelectorAll('.testimonial-slide');
  if (!track || slides.length === 0) return;

  const maxIndex = getMaxTestimonialIndex();
  if (currentTestimonialIndex > maxIndex) {
    currentTestimonialIndex = maxIndex;
  }
  if (currentTestimonialIndex < 0) {
    currentTestimonialIndex = 0;
  }

  const slideWidth = slides[0].getBoundingClientRect().width;
  const gap = 28; // 1.75rem gap in px
  const offset = currentTestimonialIndex * (slideWidth + gap);
  track.style.transform = `translateX(-${offset}px)`;

  // Update Buttons
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');
  if (prevBtn) prevBtn.disabled = currentTestimonialIndex === 0;
  if (nextBtn) nextBtn.disabled = currentTestimonialIndex >= maxIndex;

  // Update Dots
  const dots = document.querySelectorAll('.slider-dot');
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentTestimonialIndex);
  });
}

function renderTestimonialDots() {
  const dotsContainer = document.getElementById('testimonialDots');
  const slides = document.querySelectorAll('.testimonial-slide');
  if (!dotsContainer || slides.length === 0) return;

  const maxIndex = getMaxTestimonialIndex();
  dotsContainer.innerHTML = '';
  for (let i = 0; i <= maxIndex; i++) {
    const dot = document.createElement('button');
    dot.className = `slider-dot ${i === currentTestimonialIndex ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Go to testimonial slide ${i + 1}`);
    dot.onclick = () => goToTestimonialSlide(i);
    dotsContainer.appendChild(dot);
  }
}

function slideTestimonials(direction) {
  const maxIndex = getMaxTestimonialIndex();
  currentTestimonialIndex += direction;
  if (currentTestimonialIndex > maxIndex) {
    currentTestimonialIndex = 0;
  } else if (currentTestimonialIndex < 0) {
    currentTestimonialIndex = maxIndex;
  }
  updateTestimonialSlider();
  resetAutoPlay();
}

function goToTestimonialSlide(index) {
  currentTestimonialIndex = index;
  updateTestimonialSlider();
  resetAutoPlay();
}

function initTestimonialsSlider() {
  const wrapper = document.getElementById('testimonialSliderWrapper');
  if (!wrapper) return;

  renderTestimonialDots();
  updateTestimonialSlider();

  window.addEventListener('resize', () => {
    renderTestimonialDots();
    updateTestimonialSlider();
  });

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  wrapper.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoPlay();
  }, { passive: true });

  wrapper.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        slideTestimonials(1);
      } else {
        slideTestimonials(-1);
      }
    }
    startAutoPlay();
  }, { passive: true });

  // Mouse hover pause
  wrapper.addEventListener('mouseenter', stopAutoPlay);
  wrapper.addEventListener('mouseleave', startAutoPlay);

  startAutoPlay();
}

function startAutoPlay() {
  stopAutoPlay();
  testimonialAutoPlayTimer = setInterval(() => {
    const maxIndex = getMaxTestimonialIndex();
    if (currentTestimonialIndex >= maxIndex) {
      currentTestimonialIndex = 0;
    } else {
      currentTestimonialIndex++;
    }
    updateTestimonialSlider();
  }, 5500);
}

function stopAutoPlay() {
  if (testimonialAutoPlayTimer) {
    clearInterval(testimonialAutoPlayTimer);
    testimonialAutoPlayTimer = null;
  }
}

function resetAutoPlay() {
  stopAutoPlay();
  startAutoPlay();
}


/**
 * Scroll reveal — sections and their card grids ease in the first time they
 * enter the viewport. Purely decorative, so it is skipped entirely when the
 * visitor has asked for reduced motion or the browser lacks IntersectionObserver;
 * in both cases the .reveal opt-in class is simply never applied and content
 * renders at its final state.
 */
function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

  const targets = document.querySelectorAll(
    '.section-header-center, .trust-card, .service-card, .cognitive-card, ' +
    '.comparison-card, .why-card, .step-card, .family-persona-card, ' +
    '.intro-grid, .community-grid, .leadership-container-card, .cta-inner-card'
  );
  if (!targets.length) return;

  const DURATION = 700;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      observer.unobserve(el);
      el.classList.add('is-revealed');
      // Drop the reveal classes once the transition is done. They declare a
      // transform, which would otherwise out-rank the cards' :hover lift.
      const delay = parseInt(el.style.getPropertyValue('--reveal-delay'), 10) || 0;
      setTimeout(() => {
        el.classList.remove('reveal', 'is-revealed');
        el.style.removeProperty('--reveal-delay');
      }, DURATION + delay + 60);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger siblings within a grid so rows cascade rather than pop as one.
    el.style.setProperty('--reveal-delay', `${(i % 4) * 70}ms`);
    observer.observe(el);
  });
}

/**
 * Anti-Phishing & Anti-Spam Link Blocker
 * Prevents bots and scammers from typing, pasting, or submitting links / URLs in form fields.
 */
function containsForbiddenLinks(text, isEmailField = false) {
  if (!text || typeof text !== 'string') return false;

  // Clean string of zero-width and invisible control characters used to bypass regex
  const cleanedText = text.replace(/[\u200B-\u200D\uFEFF\u00A0]/g, '').trim();
  if (!cleanedText) return false;

  if (isEmailField) {
    // For email inputs: ensure it doesn't contain URL schemes, slashes, HTML tags, or multiple @
    const badEmailPattern = /(?:https?:\/\/|ftp:\/\/|\/\/|www\.|<\s*a\b|href\s*=|\[url|\/|\s|[?#])/i;
    if (badEmailPattern.test(cleanedText)) return true;
    // Legitimate email format check
    const validEmailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return !validEmailPattern.test(cleanedText);
  }

  // 1. URI Schemes / Protocols (http, https, ftp, file, ws, hxxp, telegram, etc.)
  const schemePattern = /\b(?:https?|ftp|ftps|file|ws|wss|tg|mailto|data|javascript|hxxps?|h[\*_]ps?):\/\//i;
  if (schemePattern.test(cleanedText)) return true;

  // 2. www. prefix
  const wwwPattern = /\bwww\.[a-z0-9\-]+(?:\.[a-z0-9\-]+)*/i;
  if (wwwPattern.test(cleanedText)) return true;

  // 3. Domain names with popular/spam/generic TLDs (com, net, org, io, xyz, top, site, online, ru, cn, etc.)
  const tldList = 'com|net|org|edu|gov|mil|biz|info|io|co|me|tv|ai|app|dev|xyz|top|site|online|tech|store|shop|club|vip|icu|live|work|space|cloud|link|click|buzz|fun|fit|press|host|today|agency|digital|solutions|world|guru|rocks|trade|bid|loan|win|download|stream|review|date|best|rest|page|group|design|media|news|blog|zone|lat|wiki|ltd|cc|ws|to|pw|tk|ml|ga|cf|gq|us|uk|ca|au|nz|de|fr|es|it|nl|be|ch|at|se|no|fi|dk|pt|gr|tr|il|ae|sa|eg|in|pk|bd|cn|jp|kr|ru|su|ua|by|kz|ir|br|mx|ar|cl|pe|za|ng|ke|gh|ug|tz|rw|et|vn|th|id|ph|my|sg|hk|tw|pro|mobi|asia|int|xxx|porn|adult|casino|bet|gdn|mom|men|kim|accountant|faith|cricket|party|science|uno';
  const domainPattern = new RegExp(`(?:^|[^\\w@])(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+(?:${tldList})(?=[/\\?:;#\\s\\.,!\\)]|$)`, 'i');
  if (domainPattern.test(cleanedText)) return true;

  // 4. Common URL Shorteners & Messaging Invites
  const shortenerPattern = /\b(?:t\.me|telegram\.me|wa\.me|api\.whatsapp\.com|chat\.whatsapp\.com|bit\.ly|tinyurl\.com|cutt\.ly|rb\.gy|shorturl\.at|goo\.gl|ow\.ly|is\.gd|buff\.ly|adf\.ly|rebrand\.ly|linktr\.ee|discord\.gg)\b/i;
  if (shortenerPattern.test(cleanedText)) return true;

  // 5. HTML tags / attributes (<a>, <iframe>, <script>, href=, src=)
  const htmlPattern = /<\s*(?:a\b|iframe\b|script\b|embed\b|object\b)|href\s*=|src\s*=/i;
  if (htmlPattern.test(cleanedText)) return true;

  // 6. BBCode & Markdown link formatting
  const bbcodePattern = /\[(?:url|link)[=\s\]]|\[\/?url\]|\[\/?link\]|\]\s*\(\s*https?:/i;
  if (bbcodePattern.test(cleanedText)) return true;

  // 7. Obfuscated domains ([dot], (dot), {dot}, dot com, [slash], hxxp)
  const obfuscatedPattern = /\[dot\]|\(dot\)|\{dot\}|<dot>|\s+dot\s+|\.dot\.|\/dot\/|\[slash\]|\(slash\)|\{slash\}|hxxp|h\*\*p|h__p/i;
  if (obfuscatedPattern.test(cleanedText)) return true;

  // 8. Raw IPv4 Addresses
  const ipPattern = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?::\d{1,5})?(?:[/?#]|\b)/;
  if (ipPattern.test(cleanedText)) return true;

  return false;
}

function showFieldLinkError(field, message = "Links and URLs are not permitted in this form to protect against spam.") {
  field.classList.add('has-link-error');
  field.setCustomValidity(message);

  // Position error message relative to phone group container or field itself
  const parentGroup = field.closest('.phone-input-group') || field;
  let existingError = parentGroup.parentElement ? parentGroup.parentElement.querySelector('.field-link-error') : null;

  if (!existingError) {
    const errorEl = document.createElement('div');
    errorEl.className = 'field-link-error';
    errorEl.setAttribute('role', 'alert');
    errorEl.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <span>${message}</span>
    `;
    if (parentGroup.nextSibling) {
      parentGroup.parentNode.insertBefore(errorEl, parentGroup.nextSibling);
    } else {
      parentGroup.parentNode.appendChild(errorEl);
    }
  }
}

function clearFieldLinkError(field) {
  field.classList.remove('has-link-error');
  field.setCustomValidity("");

  const parentGroup = field.closest('.phone-input-group') || field;
  if (parentGroup.parentElement) {
    const existingError = parentGroup.parentElement.querySelector('.field-link-error');
    if (existingError) {
      existingError.remove();
    }
  }
}

function validateFieldForLinks(field) {
  const isEmail = field.type === 'email';
  const val = field.value || '';

  if (val.trim() === '') {
    clearFieldLinkError(field);
    return true;
  }

  if (containsForbiddenLinks(val, isEmail)) {
    const errorMsg = isEmail
      ? "Please enter a valid email address without links or URLs."
      : "Links and web addresses are strictly prohibited in this field.";
    showFieldLinkError(field, errorMsg);
    return false;
  } else {
    clearFieldLinkError(field);
    return true;
  }
}

function initFormAntiLinkSecurity() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    // Add invisible honeypot field for bot trap if not present
    if (!form.querySelector('input[name="_hp_sec_check"]')) {
      const hpWrap = document.createElement('div');
      hpWrap.style.cssText = 'display:none!important;position:absolute!important;left:-9999px!important;visibility:hidden!important;';
      hpWrap.setAttribute('aria-hidden', 'true');
      hpWrap.innerHTML = '<input type="text" name="_hp_sec_check" tabindex="-1" autocomplete="off" value="">';
      form.appendChild(hpWrap);
    }

    // Intercept input / paste on textareas, text inputs, email, and tel
    const formFields = form.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"]), textarea');

    formFields.forEach(field => {
      // Real-time validation on user keystrokes
      field.addEventListener('input', () => {
        validateFieldForLinks(field);
      });

      field.addEventListener('blur', () => {
        validateFieldForLinks(field);
      });

      // Prevent pasting links
      field.addEventListener('paste', (e) => {
        const pasteData = (e.clipboardData || window.clipboardData)?.getData('text') || '';
        const isEmail = field.type === 'email';
        if (containsForbiddenLinks(pasteData, isEmail)) {
          e.preventDefault();
          showFieldLinkError(field, "Pasting links and URLs is not allowed.");
          showToast("Links and URLs are not permitted in this form to prevent spam.");
        }
      });
    });

    // Form submission blocker
    form.addEventListener('submit', (e) => {
      // Check honeypot
      const hpField = form.querySelector('input[name="_hp_sec_check"]');
      if (hpField && hpField.value.trim() !== '') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      let hasLinkError = false;
      let firstOffender = null;

      formFields.forEach(field => {
        const isValid = validateFieldForLinks(field);
        if (!isValid) {
          hasLinkError = true;
          if (!firstOffender) {
            firstOffender = field;
          }
        }
      });

      if (hasLinkError) {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();

        if (firstOffender) {
          firstOffender.focus();
          firstOffender.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (firstOffender.reportValidity) {
            firstOffender.reportValidity();
          }
        }

        showToast("⚠️ Form submission blocked: Links and URLs are not permitted.");
        return false;
      }
    }, true);
  });
}
