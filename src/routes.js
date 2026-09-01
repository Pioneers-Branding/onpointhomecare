/**
 * Every route the navigation can point at.
 *
 *   url   - path relative to the site root, always ending in "/" (or "" for home)
 *   soon  - true while the page has no content yet; links are intercepted in
 *           app.js and answered with a "coming soon" toast instead of a 404
 *   label - human name used in that toast
 *
 * To launch one of the "soon" pages: drop `soon`, add the page to src/pages.js
 * with a body in src/pages/, then run `npm run build`. Every link across the
 * site starts working — no page-by-page edits.
 */

const built = (url) => ({ url, soon: false });
const soon = (url, label) => ({ url, soon: true, label });

const ROUTES = {
  // --- Live pages -----------------------------------------------------------
  home: built(''),
  about: built('about-us/'),
  services: built('services/'),
  'dementia-care': built('dementia-care/'),
  team: built('our-care-team/'),
  resources: built('resources/'),
  faqs: built('faqs/'),
  contact: built('contact/'),
  assessment: built('care-assessment/'),

  // --- Home Nursing pillar --------------------------------------------------
  'home-nursing': soon('home-nursing/', 'Home Nursing'),
  'post-discharge-nursing': soon('home-nursing/post-discharge-nursing/', 'Post-Discharge Nursing'),
  'post-operative-care': soon('home-nursing/post-operative-care/', 'Post-Operative Care'),
  'private-nursing': soon('home-nursing/private-nursing/', 'Private Nursing'),
  '24-hour-nursing-care': soon('home-nursing/24-hour-nursing-care/', '24-Hour Nursing Care'),
  'palliative-care': soon('home-nursing/palliative-care/', 'Palliative & End-of-Life Care'),

  // --- Home Care pillar -----------------------------------------------------
  'home-care': soon('home-care/', 'Home Care'),
  'respite-care': soon('home-care/respite-care/', 'Respite Care'),
  '24-hour-home-care': soon('home-care/24-hour-home-care/', '24-Hour Home Care'),
  'overnight-care': soon('home-care/overnight-care/', 'Overnight Care'),

  // --- Specialized Care pillar ----------------------------------------------
  'specialized-care': soon('specialized-care/', 'Specialized Care'),
  'hospital-to-home-care': soon('specialized-care/hospital-to-home-care/', 'Hospital to Home Care'),
  'caregiver-burnout': soon('specialized-care/caregiver-burnout/', 'Caregiver Burnout & Support'),
  'aging-in-place': soon('specialized-care/aging-in-place/', 'Aging in Place'),
  'complex-care-at-home': soon('specialized-care/complex-care-at-home/', 'Complex Care at Home'),

  // --- Areas we serve -------------------------------------------------------
  locations: soon('locations/', 'Areas We Serve'),
  vancouver: soon('locations/vancouver/', 'Home Care Vancouver'),
  richmond: soon('locations/richmond/', 'Home Care Richmond'),
  burnaby: soon('locations/burnaby/', 'Home Care Burnaby'),
  surrey: soon('locations/surrey/', 'Home Care Surrey'),

  // --- Healthcare professional funnel ---------------------------------------
  'healthcare-professionals': soon('healthcare-professionals/', 'For Healthcare Professionals'),
  'refer-a-patient': soon('refer-a-patient/', 'Refer a Patient'),
  'healthcare-referral-process': soon('healthcare-referral-process/', 'Referral Process'),
  'hospital-discharge-planners': soon(
    'healthcare-professionals/hospital-discharge-planners/',
    'For Hospital Discharge Planners'
  ),

  // --- Trust & conversion ---------------------------------------------------
  'why-onpoint': soon('why-onpoint/', 'Why OnPoint'),
  'how-it-works': soon('how-it-works/', 'How It Works'),
  reviews: soon('reviews/', 'Reviews & Testimonials'),
  'home-care-cost': soon('home-care-cost/', 'Home Care Cost'),
  'care-stories': soon('care-stories/', 'Care Stories'),
  'get-care-now': soon('get-care-now/', 'Get Care Now'),

  // --- Legal ----------------------------------------------------------------
  'privacy-policy': soon('privacy-policy/', 'Privacy Policy'),
  terms: soon('terms/', 'Terms & Conditions'),
  accessibility: soon('accessibility/', 'Accessibility Commitment'),
};

module.exports = { ROUTES };
