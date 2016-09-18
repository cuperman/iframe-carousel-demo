$(document).ready(function() {
  $('#carousel').iframeCarousel({
    // cycle through the following pages
    sources: [
      '/pages/red.html',
      '/pages/green.html',
      '/pages/blue.html'
    ]
  });
});
