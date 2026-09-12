<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Elder Care Services | OnPoint Nurse & Home Care</title>
  <meta name="description" content="Personal care, dementia and memory care, companionship, fall prevention, nursing and health monitoring, wound care, infection prevention and emergency support at home.">

  <link rel="canonical" href="https://onpointhomecare.care/services">

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
    <div class="page-header-banner">
          <div class="container">
            <div class="breadcrumb"><a href="/">Home</a> / <span>Elder Care
                Services</span></div>
            <h1 class="page-title">Our Elder Care Services</h1>
            <p class="page-tagline">Clinical, personal, and emotional healthcare services designed around your loved one's
              specific needs.</p>
          </div>
        </div>

        <div class="container page-content-block">
          <!-- Services Navigation / Tabs -->
          <div class="services-nav-tabs" id="serviceTabs">
            <button class="s-tab-btn active" onclick="filterServices('all')">All Services (8)</button>
            <button class="s-tab-btn" onclick="filterServices('daily')">Daily Living &amp; Personal</button>
            <button class="s-tab-btn" onclick="filterServices('clinical')">Clinical &amp; Nursing</button>
            <button class="s-tab-btn" onclick="filterServices('safety')">Safety &amp; Memory</button>
          </div>

          <div class="detailed-services-container">
            <!-- Service Item 1 -->
            <div class="service-detail-box" id="personal-care" data-cat="daily">
              <div class="s-detail-content">
                <div class="s-tag">Daily Living</div>
                <h2 class="s-title">1. Personal Care &amp; Daily Living (ADLs)</h2>
                <p class="s-desc">
                  Support with activities of daily living while protecting dignity and independence. We assist seniors
                  with everyday routines so they feel fresh, comfortable, and respected.
                </p>
                <div class="s-inclusions">
                  <h4>What Is Included:</h4>
                  <div class="inclusions-grid">
                    <div class="inc-item">✓ Personal hygiene &amp; bathing support</div>
                    <div class="inc-item">✓ Dignified dressing assistance</div>
                    <div class="inc-item">✓ Feeding &amp; hydration support</div>
                    <div class="inc-item">✓ Mobility &amp; gentle transfer assistance</div>
                    <div class="inc-item">✓ Daily schedule &amp; routine coordination</div>
                    <div class="inc-item">✓ Incontinence care with total discretion</div>
                  </div>
                </div>
                <div class="btn-group">
                  <a href="personal-care.php" class="btn btn-secondary btn-sm">View
                    Full Personal Care Page</a>
                  <a href="care-assessment.php" class="btn btn-primary btn-sm">Request Personal
                    Care Assessment</a>
                </div>
              </div>
            </div>

            <!-- Service Item 2 -->
            <div class="service-detail-box featured-box" id="dementia-service" data-cat="safety">
              <div class="s-detail-content">
                <div class="s-tag">Featured Clinical Program</div>
                <h2 class="s-title">2. Dementia &amp; Memory Care</h2>
                <p class="s-desc">
                  Compassionate, person-centered support for seniors experiencing memory loss, Alzheimer's, or cognitive
                  changes. We help create a peaceful, predictable environment that reduces agitation and supports family
                  understanding.
                </p>
                <div class="s-inclusions">
                  <h4>What Is Included:</h4>
                  <div class="inclusions-grid">
                    <div class="inc-item">✓ Dementia-certified routine management</div>
                    <div class="inc-item">✓ Gentle behavioral de-escalation</div>
                    <div class="inc-item">✓ Cognitive stimulation activities</div>
                    <div class="inc-item">✓ Family coping &amp; communication guidance</div>
                    <div class="inc-item">✓ Cognitive screening &amp; observation</div>
                    <div class="inc-item">✓ Safe wandering prevention</div>
                  </div>
                </div>
                <div class="btn-group">
                  <a href="dementia-care.php" class="btn btn-secondary btn-sm">View
                    Dedicated Memory Care Page</a>
                  <a href="care-assessment.php" class="btn btn-primary btn-sm">Book Memory
                    Assessment</a>
                </div>
              </div>
            </div>

            <!-- Service Item 3 -->
            <div class="service-detail-box" id="companionship" data-cat="daily">
              <div class="s-detail-content">
                <div class="s-tag">Emotional Wellbeing</div>
                <h2 class="s-title">3. Companionship &amp; Emotional Support</h2>
                <p class="s-desc">
                  Meaningful companionship that helps reduce isolation, loneliness, and depression while supporting mental
                  vitality and social connection.
                </p>
                <div class="s-inclusions">
                  <h4>What Is Included:</h4>
                  <div class="inclusions-grid">
                    <div class="inc-item">✓ Social conversation &amp; active listening</div>
                    <div class="inc-item">✓ Accompanying on garden walks</div>
                    <div class="inc-item">✓ Reading books &amp; discussing news</div>
                    <div class="inc-item">✓ Engaging in board games &amp; crafts</div>
                    <div class="inc-item">✓ Encouraging family call connections</div>
                    <div class="inc-item">✓ Respectful spiritual &amp; devotional accompaniment</div>
                  </div>
                </div>
                <div class="btn-group">
                  <a href="companion-care.php" class="btn btn-secondary btn-sm">View
                    Full Companion Care Page</a>
                  <a href="care-assessment.php" class="btn btn-primary btn-sm">Request Companion
                    Care</a>
                </div>
              </div>
            </div>

            <!-- Service Item 4 -->
            <div class="service-detail-box" id="fall-prevention" data-cat="safety">
              <div class="s-detail-content">
                <div class="s-tag">Safety &amp; Mobility</div>
                <h2 class="s-title">4. Fall Prevention &amp; Home Safety</h2>
                <p class="s-desc">
                  Identify everyday environmental hazards and create safer home spaces so seniors can walk and move around
                  with confidence.
                </p>
                <div class="s-inclusions">
                  <h4>What Is Included:</h4>
                  <div class="inclusions-grid">
                    <div class="inc-item">✓ In-home environmental hazard audit</div>
                    <div class="inc-item">✓ Safe transfer techniques (bed, sofa, bathroom)</div>
                    <div class="inc-item">✓ Assistive device coaching (canes, walkers)</div>
                    <div class="inc-item">✓ Gait &amp; balance stabilization support</div>
                    <div class="inc-item">✓ Bathroom &amp; hallway safety recommendations</div>
                    <div class="inc-item">✓ Fall-risk monitoring and regular reassessment</div>
                  </div>
                </div>
                <a href="care-assessment.php" class="btn btn-primary btn-sm">Schedule Safety
                  Audit</a>
              </div>
            </div>

            <!-- Service Item 5 -->
            <div class="service-detail-box" id="nursing-care" data-cat="clinical">
              <div class="s-detail-content">
                <div class="s-tag">Clinical Nursing</div>
                <h2 class="s-title">5. Nursing &amp; Health Monitoring</h2>
                <p class="s-desc">
                  Professional registered nursing oversight to observe vital signs, monitor chronic conditions, manage
                  medication regimens, and keep families accurately informed.
                </p>
                <div class="s-inclusions">
                  <h4>What Is Included:</h4>
                  <div class="inclusions-grid">
                    <div class="inc-item">✓ Vital signs recording (BP, pulse, glucose, SpO2)</div>
                    <div class="inc-item">✓ Medication administration supervision</div>
                    <div class="inc-item">✓ Chronic illness observation (Hypertension, Diabetes)</div>
                    <div class="inc-item">✓ Health status reporting to family &amp; doctors</div>
                    <div class="inc-item">✓ Post-hospitalization convalescence support</div>
                    <div class="inc-item">✓ Care coordination with treating specialists</div>
                  </div>
                </div>
                <div class="btn-group">
                  <a href="nursing-health-monitoring.php" class="btn btn-secondary btn-sm">View
                    Full Health Monitoring Page</a>
                  <a href="care-assessment.php" class="btn btn-primary btn-sm">Request Nursing
                    Care</a>
                </div>
              </div>
            </div>

            <!-- Service Item 6 -->
            <div class="service-detail-box" id="wound-care" data-cat="clinical">
              <div class="s-detail-content">
                <div class="s-tag">Clinical Specialty</div>
                <h2 class="s-title">6. Specialized Wound Care</h2>
                <p class="s-desc">
                  Advanced clinical wound assessment, sterile dressing changes, pressure injury prevention, and meticulous
                  healing progress tracking.
                </p>
                <div class="s-inclusions">
                  <h4>What Is Included:</h4>
                  <div class="inclusions-grid">
                    <div class="inc-item">✓ Clinical wound staging and assessment</div>
                    <div class="inc-item">✓ Sterile dressing management &amp; cleansing</div>
                    <div class="inc-item">✓ Pressure ulcer relief protocols</div>
                    <div class="inc-item">✓ Diabetic foot ulcer care</div>
                    <div class="inc-item">✓ Surgical incision post-op monitoring</div>
                    <div class="inc-item">✓ Infection sign identification</div>
                  </div>
                </div>
                <div class="btn-group">
                  <a href="wound-care.php" class="btn btn-secondary btn-sm">View
                    Full Wound Care Page</a>
                  <a href="care-assessment.php" class="btn btn-primary btn-sm">Consult Wound Care
                    Nurse</a>
                </div>
              </div>
            </div>

            <!-- Service Item 7 -->
            <div class="service-detail-box" id="infection-prevention" data-cat="clinical">
              <div class="s-detail-content">
                <div class="s-tag">Clinical Hygiene</div>
                <h2 class="s-title">7. Infection Prevention &amp; Control</h2>
                <p class="s-desc">
                  Strict healthcare hygiene protocols and clean environment practices designed to protect vulnerable
                  seniors from infections and complications.
                </p>
                <div class="s-inclusions">
                  <h4>What Is Included:</h4>
                  <div class="inclusions-grid">
                    <div class="inc-item">✓ Hospital-grade sanitization protocols</div>
                    <div class="inc-item">✓ Personal protective equipment (PPE) compliance</div>
                    <div class="inc-item">✓ Medical device sanitization</div>
                    <div class="inc-item">✓ Respiratory &amp; urinary hygiene monitoring</div>
                    <div class="inc-item">✓ Early fever and infection detection</div>
                    <div class="inc-item">✓ Safe disposal of medical consumables</div>
                  </div>
                </div>
                <a href="care-assessment.php" class="btn btn-primary btn-sm">Learn More</a>
              </div>
            </div>

            <!-- Service Item 8 -->
            <div class="service-detail-box" id="emergency-support" data-cat="safety">
              <div class="s-detail-content">
                <div class="s-tag">Safety Response</div>
                <h2 class="s-title">8. Emergency &amp; First-Aid Support</h2>
                <p class="s-desc">
                  First-aid trained clinical staff and clear emergency response protocols to ensure swift action and
                  hospital transit coordination when unexpected health changes arise.
                </p>
                <div class="s-inclusions">
                  <h4>What Is Included:</h4>
                  <div class="inclusions-grid">
                    <div class="inc-item">✓ First-aid and CPR-certified nursing care</div>
                    <div class="inc-item">✓ Rapid clinical triage &amp; vital stabilization</div>
                    <div class="inc-item">✓ Ambulance &amp; hospital emergency coordination</div>
                    <div class="inc-item">✓ Immediate family notification protocols</div>
                    <div class="inc-item">✓ Medical summary handover for hospital staff</div>
                  </div>
                </div>
                <a href="care-assessment.php" class="btn btn-primary btn-sm">Inquire About
                  Emergency Protocols</a>
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
