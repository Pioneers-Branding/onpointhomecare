<?php
/**
 * Rendered (with a real 404 status, set by the caller) when a scheduled
 * blog post is requested before its publish date, or any blog URL that
 * doesn't resolve to a post.
 */
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <?php include __DIR__ . '/../gtm-head.php'; ?>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found | OnPoint Nurse &amp; Home Care</title>
  <meta name="robots" content="noindex">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap"
    rel="stylesheet">

  <link rel="stylesheet" href="styles.css">
  <link rel="icon" type="image/png" href="assets/images/favicon.png">
</head>

<body>
  <?php include __DIR__ . '/../gtm-body.php'; ?>

  <?php include __DIR__ . '/../header.php'; ?>

  <main id="mainContent">
    <div class="page-header-banner">
      <div class="container">
        <div class="breadcrumb"><a href="/">Home</a> / <span>Not Found</span></div>
        <h1 class="page-title">Page Not Found</h1>
        <p class="page-tagline">This page doesn't exist, or isn't published yet. Explore our latest articles instead.</p>
      </div>
    </div>
    <div class="container page-content-block" style="text-align:center;">
      <a href="blog" class="btn btn-primary"><span>Back to the Blog</span></a>
    </div>
  </main>

  <?php include __DIR__ . '/../footer.php'; ?>

  <script src="app.js"></script>
</body>

</html>
