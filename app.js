/**
 * OnPoint Nurse & Home Care Kenya - Core Client Application
 * Single Page Architecture, Dynamic View Router, Interactive Tools & Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  initHeaderScroll();
  initWizard();
});

// View Navigation & SPA Router
function navigateTo(pageId, subTargetId = null) {
  const views = document.querySelectorAll('.page-view');
  views.forEach(view => view.classList.remove('active'));

  const targetView = document.getElementById(`view-${pageId}`);
  if (targetView) {
    targetView.classList.add('active');
  } else {
    // Route exists in the sitemap but the page has not been built yet:
    // show Home and tell the visitor rather than failing silently.
    document.getElementById('view-home').classList.add('active');
    showToast(`${formatRouteLabel(pageId)} is coming soon. Call us or book a care assessment and our team will help right away.`);
  }

  // Update active nav links
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    if (item.getAttribute('data-page') === pageId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Handle scrolling to subtarget or top
  if (subTargetId) {
    setTimeout(() => {
      const el = document.getElementById(subTargetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update URL hash
  if (history.pushState) {
    history.pushState(null, null, `#${pageId}`);
  }
}

// Turns a route slug ("post-discharge-nursing") into a readable label
function formatRouteLabel(pageId) {
  return pageId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Router Initialization via URL Hash
function initRouter() {
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const parts = hash.split('/');
    const page = parts[0];
    const subTarget = parts[1] || null;
    navigateTo(page, subTarget);
  }

  window.addEventListener('hashchange', () => {
    const currentHash = window.location.hash.replace('#', '');
    if (currentHash) {
      const parts = currentHash.split('/');
      navigateTo(parts[0], parts[1] || null);
    }
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

// WhatsApp Direct Connect Modal
function openWhatsAppModal() {
  const modal = document.getElementById('whatsappModal');
  if (modal) modal.classList.add('open');
}

function closeWhatsAppModal() {
  const modal = document.getElementById('whatsappModal');
  if (modal) modal.classList.remove('open');
}

function closeModalOnBackdrop(e, modalId) {
  if (e.target.id === modalId) {
    document.getElementById(modalId).classList.remove('open');
  }
}

function setWaPrompt(text) {
  const textarea = document.getElementById('waCustomMessage');
  if (textarea) textarea.value = text;
}

function launchWhatsApp() {
  const message = encodeURIComponent(document.getElementById('waCustomMessage').value || 'Hello OnPoint Care Team, I would like to inquire about home care in Metro Vancouver.');
  // Placeholder number (+1 604 000 0000) — replace with the client's real WhatsApp line
  const phone = '16040000000';
  const url = `https://wa.me/${phone}?text=${message}`;
  window.open(url, '_blank');
  closeWhatsAppModal();
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
