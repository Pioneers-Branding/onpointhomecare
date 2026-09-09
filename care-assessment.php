<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Book a Care Assessment | OnPoint Nurse & Home Care</title>
  <meta name="description"
    content="Request an in-home care assessment. Tell us about your loved one and our lead registered nurse will review the request and get in touch.">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap"
    rel="stylesheet">

  <!-- CSS Stylesheet -->
  <link rel="stylesheet" href="styles.css">
  <link rel="icon" type="image/png" href="assets/images/favicon.png">
</head>

<body>

  <?php include 'header.php'; ?>























  <main id="mainContent">
    <div class="page-header-banner banner-sage">
      <div class="container">
        <div class="breadcrumb"><a href="/">Home</a> / <span>Care Assessment
            Booking</span></div>
        <h1 class="page-title">Book an In-Home Care Assessment</h1>
        <p class="page-tagline">A guided 3-step evaluation to help our Lead Registered Nurse design the ideal care
          plan for your loved one in Metro Vancouver.</p>
      </div>
    </div>

    <div class="container page-content-block">
      <div class="wizard-container">
        <!-- Wizard Steps Progress Bar -->
        <div class="wizard-progress-bar">
          <div class="w-step active" id="wStep1Badge">
            <span class="w-step-num">1</span>
            <span class="w-step-title">Senior's Profile</span>
          </div>
          <div class="w-step-line" id="wLine1"></div>
          <div class="w-step" id="wStep2Badge">
            <span class="w-step-num">2</span>
            <span class="w-step-title">Care Needs</span>
          </div>
          <div class="w-step-line" id="wLine2"></div>
          <div class="w-step" id="wStep3Badge">
            <span class="w-step-num">3</span>
            <span class="w-step-title">Schedule &amp; Contact</span>
          </div>
        </div>

        <!-- Wizard Form Container -->
        <div class="wizard-form-box">
          <!-- Step 1: Senior Profile -->
          <div class="wizard-step-panel active" id="wizardStep1">
            <h3 class="panel-heading">Step 1: Tell Us About Your Loved One</h3>
            <p class="panel-desc">Understanding their age and living arrangement helps us assess the right level of
              support.</p>

            <div class="form-group">
              <label>Who are you seeking care for?</label>
              <div class="wizard-option-grid">
                <label class="wizard-tile">
                  <input type="radio" name="wizFor" value="Mother / Mother-in-law" checked>
                  <div class="tile-card">
                    <span class="tile-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="7" r="4"></circle>
                        <path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2"></path>
                        <path d="M9 9a3 3 0 0 1 6 0"></path>
                      </svg></span>
                    <span class="tile-name">Mother / Mother-in-law</span>
                  </div>
                </label>
                <label class="wizard-tile">
                  <input type="radio" name="wizFor" value="Father / Father-in-law">
                  <div class="tile-card">
                    <span class="tile-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="7" r="4"></circle>
                        <path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2"></path>
                        <path d="M9 4.5a3 3 0 0 1 6 0"></path>
                      </svg></span>
                    <span class="tile-name">Father / Father-in-law</span>
                  </div>
                </label>
                <label class="wizard-tile">
                  <input type="radio" name="wizFor" value="Spouse / Partner">
                  <div class="tile-card">
                    <span class="tile-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg></span>
                    <span class="tile-name">Spouse / Partner</span>
                  </div>
                </label>
                <label class="wizard-tile">
                  <input type="radio" name="wizFor" value="Myself (Senior)">
                  <div class="tile-card">
                    <span class="tile-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 21a6 6 0 0 0-12 0"></path>
                        <circle cx="12" cy="11" r="4"></circle>
                        <path d="m19 7 2-2"></path>
                        <path d="m21 9-2-2"></path>
                      </svg></span>
                    <span class="tile-name">Myself (Senior)</span>
                  </div>
                </label>
              </div>
            </div>

            <div class="form-row-2">
              <div class="form-group">
                <label for="wizAge">Senior's Approximate Age</label>
                <input type="number" id="wizAge" placeholder="e.g. 76" min="50" max="115" class="form-input" value="75">
              </div>
              <div class="form-group">
                <label for="wizLocation">Location in Metro Vancouver / Municipality</label>
                <input type="text" id="wizLocation"
                  placeholder="e.g. Vancouver (Kitsilano / West End / Richmond / Burnaby / etc.)" class="form-input">
              </div>
            </div>

            <div class="wizard-btn-row">
              <div></div>
              <button type="button" class="btn btn-primary" onclick="goToWizardStep(2)">
                <span>Next: Select Care Needs</span>
                <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          <!-- Step 2: Care Needs -->
          <div class="wizard-step-panel" id="wizardStep2">
            <h3 class="panel-heading">Step 2: What Specific Support Does Your Loved One Need?</h3>
            <p class="panel-desc">Select all that apply. Our registered nurse will tailor the assessment around these
              priorities.</p>

            <div class="wizard-checkbox-grid">
              <label class="wizard-chk-tile">
                <input type="checkbox" name="wizNeeds" value="Dementia & Memory Care">
                <div class="chk-tile-card">
                  <span class="chk-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round">
                      <path
                        d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z">
                      </path>
                      <path
                        d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z">
                      </path>
                    </svg></span>
                  <div>
                    <strong>Dementia &amp; Memory Care</strong>
                    <p>Managing cognitive changes, memory lapses, and routine structure.</p>
                  </div>
                </div>
              </label>

              <label class="wizard-chk-tile">
                <input type="checkbox" name="wizNeeds" value="Daily Living & Personal Care" checked>
                <div class="chk-tile-card">
                  <span class="chk-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                      <path d="M15 8h2a3 3 0 0 1 3 3v1H12v-1a3 3 0 0 1 3-3z"></path>
                      <path d="M13 16h.01"></path>
                      <path d="M17 16h.01"></path>
                      <path d="M15 19h.01"></path>
                    </svg></span>
                  <div>
                    <strong>Personal Care &amp; Daily Living</strong>
                    <p>Assistance with bathing, dressing, grooming, and mobility.</p>
                  </div>
                </div>
              </label>

              <label class="wizard-chk-tile">
                <input type="checkbox" name="wizNeeds" value="Nursing & Health Observation">
                <div class="chk-tile-card">
                  <span class="chk-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round">
                      <path
                        d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3">
                      </path>
                      <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path>
                      <circle cx="20" cy="10" r="2"></circle>
                    </svg></span>
                  <div>
                    <strong>Nursing &amp; Health Monitoring</strong>
                    <p>Vital signs monitoring, medication compliance, and chronic care.</p>
                  </div>
                </div>
              </label>

              <label class="wizard-chk-tile">
                <input type="checkbox" name="wizNeeds" value="Fall Prevention & Safety">
                <div class="chk-tile-card">
                  <span class="chk-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg></span>
                  <div>
                    <strong>Fall Prevention &amp; Home Safety</strong>
                    <p>Reducing trip hazards, transfer assistance, and mobility support.</p>
                  </div>
                </div>
              </label>

              <label class="wizard-chk-tile">
                <input type="checkbox" name="wizNeeds" value="Companionship & Emotional Support">
                <div class="chk-tile-card">
                  <span class="chk-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round">
                      <path
                        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z">
                      </path>
                    </svg></span>
                  <div>
                    <strong>Companionship &amp; Social Vitality</strong>
                    <p>Meaningful conversation, walks, and emotional encouragement.</p>
                  </div>
                </div>
              </label>

              <label class="wizard-chk-tile">
                <input type="checkbox" name="wizNeeds" value="Wound Care Management">
                <div class="chk-tile-card">
                  <span class="chk-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round">
                      <path d="M14 4.5 19.5 10l-10 10L4 14.5z"></path>
                      <path d="m9 9 6 6"></path>
                      <circle cx="11.5" cy="12.5" r=".5" fill="currentColor"></circle>
                      <circle cx="12.5" cy="11.5" r=".5" fill="currentColor"></circle>
                    </svg></span>
                  <div>
                    <strong>Specialized Wound Care</strong>
                    <p>Clinical dressing changes and pressure sore management.</p>
                  </div>
                </div>
              </label>
            </div>

            <div class="wizard-btn-row">
              <button type="button" class="btn btn-outline" onclick="goToWizardStep(1)">&larr; Back</button>
              <button type="button" class="btn btn-primary" onclick="goToWizardStep(3)">
                <span>Next: Contact Details</span>
                <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          <!-- Step 3: Contact & Confirmation -->
          <div class="wizard-step-panel" id="wizardStep3">
            <h3 class="panel-heading">Step 3: Where Should We Send the Assessment Details?</h3>
            <p class="panel-desc">Our Lead Registered Nurse Risper Murunga will personally review your answers and
              contact you.</p>

            <form id="assessmentWizardForm" accept-charset='UTF-8'
              action='https://app.formester.com/forms/JNmHIP398/submissions' method='POST'>
              <div class="form-row-2">
                <div class="form-group">
                  <label for="wName">Your Full Name <span class="req">*</span></label>
                  <input type="text" id="wName" name="wName" required placeholder="e.g. David Miller"
                    class="form-input">
                </div>
                <div class="form-group">
                  <label for="wPhone">Your Phone Number <span class="req">*</span></label>
                  <input type="tel" id="wPhone" name="wPhone" required placeholder="(778) XXX-XXXX" class="form-input">
                </div>
              </div>

              <div class="form-row-2">
                <div class="form-group">
                  <label for="wEmail">Your Email Address <span class="req">*</span></label>
                  <input type="email" id="wEmail" name="wEmail" required placeholder="you@example.com"
                    class="form-input">
                </div>
                <div class="form-group">
                  <label for="wPreferredDate">Preferred Assessment Date</label>
                  <input type="date" id="wPreferredDate" name="wPreferredDate" class="form-input">
                </div>
              </div>

              <div class="form-group">
                <label for="wNotes">Additional Notes or Immediate Concerns (Optional)</label>
                <textarea id="wNotes" name="wNotes" rows="3"
                  placeholder="Any specific requirements, medical diagnoses, or family timing considerations..."
                  class="form-textarea"></textarea>
              </div>

              <div class="wizard-btn-row">
                <button type="button" class="btn btn-outline" onclick="goToWizardStep(2)">&larr; Back</button>
                <button type="submit" class="btn btn-primary btn-lg">
                  <span>Confirm &amp; Book Care Assessment</span>
                  <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </button>
              </div>
            </form>
          </div>

          <!-- Confirmation Success State -->
          <div class="wizard-step-panel" id="wizardSuccess" style="display:none;">
            <div class="success-box-center">
              <div class="success-icon-bubble">✓</div>
              <h2>Thank You! Your Care Assessment Request Has Been Received.</h2>
              <p class="success-sub">
                Lead Registered Nurse <strong>Risper Murunga</strong> and our clinical care team have received your
                request. We will review your answers and reach out to you within 24 hours to confirm the in-home
                visit.
              </p>
              <div class="success-summary-card" id="wizSummaryDisplay"></div>
              <div class="success-actions-row">
                <a href="/" class="btn btn-primary">Return to Home</a>
                <a href="tel:+17782441332" class="btn btn-sage">Call Direct Line: (778) 244-1332</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <?php include 'footer.php'; ?>

<!-- Core JavaScript -->
  <script src="app.js"></script>
</body>

</html>