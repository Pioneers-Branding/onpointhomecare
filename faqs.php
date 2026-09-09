<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Frequently Asked Questions | OnPoint Nurse & Home Care</title>
  <meta name="description" content="Answers to the questions families ask most about arranging home nursing and home care — how care starts, who provides it, and what to expect.">

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
            <div class="breadcrumb"><a href="/">Home</a> / <span>Frequently Asked
                Questions</span></div>
            <h1 class="page-title">Frequently Asked Questions</h1>
            <p class="page-tagline">Everything you need to know about our home care services, assessment process, and
              clinical oversight across Metro Vancouver, BC.</p>
          </div>
        </div>

        <div class="container page-content-block">
          <div class="faq-full-container">
            <div class="faq-accordion-container" id="fullFaqAccordion">
              <!-- All FAQs embedded -->
              <div class="faq-item active">
                <button class="faq-trigger" onclick="toggleFaq(this)">
                  <span class="faq-q-text">What type of elder care do you provide?</span>
                  <span class="faq-q-icon">+</span>
                </button>
                <div class="faq-content">
                  <p>We provide comprehensive in-home elder care spanning personal care and daily living assistance
                    (hygiene, dressing, feeding, mobility), specialized dementia and memory care, companionship, fall
                    prevention and environmental safety, registered nursing health monitoring, wound care, infection
                    control, and emergency first-aid coordination.</p>
                </div>
              </div>

              <div class="faq-item">
                <button class="faq-trigger" onclick="toggleFaq(this)">
                  <span class="faq-q-text">Can care be provided in the senior's home?</span>
                  <span class="faq-q-icon">+</span>
                </button>
                <div class="faq-content">
                  <p>Yes, all our services are delivered directly within the senior's residence across Vancouver, Burnaby, Surrey, New Westminster & Richmond, and surrounding Metro Vancouver communities. This allows your loved one to stay in the
                    comfort of their home, preserve daily habits, and enjoy the companionship of family and familiar
                    surroundings while receiving high-level clinical support.</p>
                </div>
              </div>

              <div class="faq-item">
                <button class="faq-trigger" onclick="toggleFaq(this)">
                  <span class="faq-q-text">How do you create a personalized care plan?</span>
                  <span class="faq-q-icon">+</span>
                </button>
                <div class="faq-content">
                  <p>Our Lead Registered Nurse conducts a structured in-home assessment. We evaluate medical history,
                    mobility, cognitive status, nutrition, and home environment. We listen carefully to family preferences
                    and the senior's personal habits to design a tailored care plan that adapts over time.</p>
                </div>
              </div>

              <div class="faq-item">
                <button class="faq-trigger" onclick="toggleFaq(this)">
                  <span class="faq-q-text">Do you provide dementia and memory-care support?</span>
                  <span class="faq-q-icon">+</span>
                </button>
                <div class="faq-content">
                  <p>Yes. Our memory care program is led by registered nurses experienced in cognitive decline,
                    Alzheimer's, and related conditions. We focus on structured routines, gentle stimulation,
                    de-escalation of anxiety or defensive behaviors, and continuous guidance for family members.</p>
                </div>
              </div>

              <div class="faq-item">
                <button class="faq-trigger" onclick="toggleFaq(this)">
                  <span class="faq-q-text">Can family members participate in the care planning process?</span>
                  <span class="faq-q-icon">+</span>
                </button>
                <div class="faq-content">
                  <p>Yes, we strongly encourage family involvement. We view family members as essential partners in care.
                    You are included in all initial evaluations, routine reviews, and any plan modifications.</p>
                </div>
              </div>

              <div class="faq-item">
                <button class="faq-trigger" onclick="toggleFaq(this)">
                  <span class="faq-q-text">How do you support seniors with mobility challenges?</span>
                  <span class="faq-q-icon">+</span>
                </button>
                <div class="faq-content">
                  <p>Our staff are trained in safe body mechanics and transfer techniques (bed to chair, chair to walker).
                    We assess fall risks in the home, recommend safety adaptations, and assist with walking to build
                    strength safely without causing strain.</p>
                </div>
              </div>

              <div class="faq-item">
                <button class="faq-trigger" onclick="toggleFaq(this)">
                  <span class="faq-q-text">What happens during the initial care assessment?</span>
                  <span class="faq-q-icon">+</span>
                </button>
                <div class="faq-content">
                  <p>A registered nurse visits the home to meet the senior and family in a calm, respectful setting. We
                    review physical health, medications, cognitive function, safety risks, and daily living needs,
                    creating a comprehensive foundation for your personalized care plan.</p>
                </div>
              </div>

              <div class="faq-item">
                <button class="faq-trigger" onclick="toggleFaq(this)">
                  <span class="faq-q-text">How do we get started?</span>
                  <span class="faq-q-icon">+</span>
                </button>
                <div class="faq-content">
                  <p>Simply call our clinical care team at (778) 244-1332 or submit an
                    online request using our Book a Care Assessment tool. We will schedule a convenient time to meet your
                    family in Vancouver, Burnaby, Surrey, New Westminster, Richmond, or surrounding areas.</p>
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
