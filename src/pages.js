/**
 * The pages the build emits. One entry per real URL.
 *
 *   route  - key in routes.js; supplies the output URL
 *   body   - file in src/pages/
 *   nav    - value of data-page on the nav item to highlight (optional)
 *   title / description - <head> metadata for this page
 *
 * Adding a page: create src/pages/<name>.html, flip its route in routes.js from
 * soon() to built(), add an entry here, and run `npm run build`.
 */

const PAGES = [
  {
    route: 'home',
    body: 'home.html',
    title: 'OnPoint Nurse and Home Care | Professional Senior & Elder Care',
    description:
      'Compassionate, professional elder care and home nursing led by experienced clinical nursing leadership. Dementia care, daily living support, fall prevention, and health monitoring.',
  },
  {
    route: 'about',
    body: 'about.html',
    nav: 'about',
    title: 'About Us | OnPoint Nurse & Home Care',
    description:
      'How OnPoint Nurse & Home Care approaches elder care: clinical excellence, personal dignity, and family-centred support led by a registered nurse.',
  },
  {
    route: 'services',
    body: 'services.html',
    nav: 'services',
    title: 'Elder Care Services | OnPoint Nurse & Home Care',
    description:
      'Personal care, dementia and memory care, companionship, fall prevention, nursing and health monitoring, wound care, infection prevention and emergency support at home.',
  },
  {
    route: 'dementia-care',
    body: 'dementia-care.html',
    nav: 'services',
    title: 'Dementia & Memory Care at Home | OnPoint Nurse & Home Care',
    description:
      'Person-centred dementia and memory care at home: recognising the early signs of cognitive change, structured routines, and guidance for families.',
  },
  {
    route: 'team',
    body: 'team.html',
    nav: 'about',
    title: 'Our Care Team | OnPoint Nurse & Home Care',
    description:
      'Meet the clinical leadership and care team behind OnPoint Nurse & Home Care, and the standards every care plan is held to.',
  },
  {
    route: 'resources',
    body: 'resources.html',
    nav: 'resources',
    title: 'Family Guides & Resources | OnPoint Nurse & Home Care',
    description:
      'Practical guides for families arranging care for an ageing parent — recognising when help is needed, planning ahead, and supporting a caregiver.',
  },
  {
    route: 'faqs',
    body: 'faqs.html',
    nav: 'resources',
    title: 'Frequently Asked Questions | OnPoint Nurse & Home Care',
    description:
      'Answers to the questions families ask most about arranging home nursing and home care — how care starts, who provides it, and what to expect.',
  },
  {
    route: 'contact',
    body: 'contact.html',
    title: 'Contact Our Care Team | OnPoint Nurse & Home Care',
    description:
      'Speak with the OnPoint care coordinators about home nursing and home care. Call, email, or send a care request and our nursing team will respond.',
  },
  {
    route: 'assessment',
    body: 'assessment.html',
    title: 'Book a Care Assessment | OnPoint Nurse & Home Care',
    description:
      'Request an in-home care assessment. Tell us about your loved one and our lead registered nurse will review the request and get in touch.',
  },
];

module.exports = { PAGES };
