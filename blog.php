<?php
require_once __DIR__ . '/includes/blog-schedule.php';
require_once __DIR__ . '/includes/blog-index-data.php';

$publishedPosts = array_values(array_filter($BLOG_POSTS, function ($post) {
    return blog_is_published($post['publish_date']);
}));

usort($publishedPosts, function ($a, $b) {
    return strcmp($b['publish_date'], $a['publish_date']);
});

$featuredPost = array_shift($publishedPosts);
$gridPosts = $publishedPosts;

function blog_format_date(string $date): string
{
    return (new DateTimeImmutable($date))->format('M j, Y');
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <?php include __DIR__ . '/gtm-head.php'; ?>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Home Care &amp; Caregiving Blog | OnPoint Nurse &amp; Home Care</title>
  <meta name="description"
    content="Clinical insights and practical guides for families caring for aging parents in Metro Vancouver: dementia signs, falls, discharge planning, caregiver support.">

  <link rel="canonical" href="https://onpointhomecare.care/blog">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap"
    rel="stylesheet">

  <!-- CSS Stylesheet -->
  <link rel="stylesheet" href="styles.css">
  <link rel="icon" type="image/png" href="assets/images/favicon.png">

  <!-- Structured data -->
  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "name": "The OnPoint Care Blog",
      "description": "Clinical insights and practical guides for families caring for aging parents in Metro Vancouver.",
      "url": "https://onpointhomecare.care/blog",
      "publisher": {
        "@type": "HomeHealthCareService",
        "name": "OnPoint Nurse & Home Care"
      },
      "blogPost": [
        <?php
        $allPublished = array_merge([$featuredPost], $gridPosts);
        $jsonPosts = [];
        foreach ($allPublished as $post) {
            $jsonPosts[] = [
                '@type' => 'BlogPosting',
                'headline' => $post['title'],
                'url' => 'https://onpointhomecare.care/' . $post['slug'],
                'datePublished' => $post['publish_date'],
                'author' => ['@type' => 'Person', 'name' => AUTHOR_NAME],
            ];
        }
        echo substr(json_encode($jsonPosts, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES), 1, -1);
        ?>
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://onpointhomecare.care/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://onpointhomecare.care/blog" }
      ]
    }
  ]
}
</script>
</head>

<body>
  <?php include __DIR__ . '/gtm-body.php'; ?>

  <?php include 'header.php'; ?>

  <main id="mainContent">
    <!-- HERO / BANNER -->
    <div class="page-header-banner">
      <div class="container">
        <div class="breadcrumb"><a href="/">Home</a> / <span>Blog</span></div>
        <h1 class="page-title">The OnPoint Care Blog</h1>
        <p class="page-tagline">Clinical insight and practical guidance from our Registered Nurse-led team, written for families navigating dementia, hospital transitions, home safety, and caregiving in Metro Vancouver.</p>
      </div>
    </div>

    <div class="container page-content-block">

      <!-- Featured Post -->
      <a href="<?php echo htmlspecialchars($featuredPost['slug']); ?>" class="blog-hero-featured" aria-label="Featured article: <?php echo htmlspecialchars($featuredPost['title']); ?>">
        <div class="blog-featured-img-wrap">
          <span class="blog-featured-badge">Featured</span>
          <img src="<?php echo htmlspecialchars($featuredPost['image']); ?>" alt="<?php echo htmlspecialchars($featuredPost['alt']); ?>" fetchpriority="high" decoding="async">
        </div>
        <div class="blog-featured-content">
          <span class="blog-featured-kicker">Latest from our care team</span>
          <span class="blog-tag-pill"><?php echo htmlspecialchars($featuredPost['tag_pill']); ?></span>
          <h2 class="blog-featured-title"><?php echo htmlspecialchars($featuredPost['title']); ?></h2>
          <p class="blog-featured-excerpt"><?php echo htmlspecialchars($featuredPost['excerpt']); ?></p>
          <div class="blog-post-meta">
            <img src="assets/images/risper_murunga_leader.jpg" alt="" class="blog-author-avatar">
            <div class="blog-meta-text">
              <span class="blog-meta-author"><?php echo htmlspecialchars(AUTHOR_NAME); ?></span>
              <span><?php echo htmlspecialchars(blog_format_date($featuredPost['publish_date'])); ?> &middot; <?php echo htmlspecialchars($featuredPost['read_time']); ?></span>
            </div>
          </div>
          <span class="btn btn-primary btn-sm blog-featured-action" aria-hidden="true">
            <span>Read the Full Article</span>
            <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </span>
        </div>
      </a>

      <!-- Article Grid -->
      <div class="blog-section-label">
        <div>
          <span class="section-tag">Practical care resources</span>
          <h2 class="section-heading">Recent guides for families</h2>
          <p>Clear, nurse-led advice to help you make confident care decisions at home.</p>
        </div>
      </div>

      <div class="blog-grid">
        <?php foreach ($gridPosts as $post): ?>
        <a href="<?php echo htmlspecialchars($post['slug']); ?>" class="blog-card">
          <img src="<?php echo htmlspecialchars($post['image']); ?>" alt="<?php echo htmlspecialchars($post['alt']); ?>" class="blog-card-img" loading="lazy" decoding="async">
          <div class="blog-card-body">
            <span class="blog-tag-pill"><?php echo htmlspecialchars($post['tag_pill']); ?></span>
            <h3 class="blog-card-title"><?php echo htmlspecialchars($post['title']); ?></h3>
            <p class="blog-card-excerpt"><?php echo htmlspecialchars($post['excerpt']); ?></p>
            <div class="blog-card-meta">
              <span><?php echo htmlspecialchars(blog_format_date($post['publish_date'])); ?> &middot; <?php echo htmlspecialchars($post['read_time']); ?></span>
              <span class="blog-card-link">Read &rarr;</span>
            </div>
          </div>
        </a>
        <?php endforeach; ?>
      </div>

      <div class="page-cta-banner">
        <h3>Have a Question These Articles Didn't Answer?</h3>
        <p>Our Lead Registered Nurse offers a free, no-pressure care assessment to walk through your family's specific situation.</p>
        <div class="btn-group">
          <a href="care-assessment" class="btn btn-primary"><span>Book a Care Assessment</span><svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
          <a href="contact" class="btn btn-outline-white">Speak With Our Care Team</a>
        </div>
      </div>
    </div>
  </main>

  <?php include 'footer.php'; ?>

<!-- Core JavaScript -->
  <script src="app.js"></script>
</body>

</html>
