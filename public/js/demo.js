$(document).ready(function() {
  'use strict';

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
    transitionIn: 'bounceInLeft',
    // using the following transition on exit
    transitionOut: 'bounceOutRight'
    // see https://daneden.github.io/animate.css for more transition options
  });
});
