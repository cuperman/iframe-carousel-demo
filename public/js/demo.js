$(document).ready(function() {
  $('#carousel').iframeCarousel({
    // cycle through the following pages
    sources: [
      '/pages/red.html',
      '/pages/green.html',
      '/pages/blue.html'
    ],
    // loading new page every 5 seconds
    interval: 5000,
    // using the following transition on entrance
    transitionIn: 'zoomInDown',
    // using the following transition on exit
    transitionOut: 'zoomOutDown'
    // see https://daneden.github.io/animate.css for more transition options
  });
});
