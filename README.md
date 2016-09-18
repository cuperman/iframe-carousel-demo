# Iframe Carousel Demo

A demonstration of how to have a collection of iframes rotate into full-screen view with fancy transition animations.

## Getting started

Clone the repo and use pow to serve the app:

```bash
$ git clone git@github.com:cuperman/iframe-carousel-demo.git
$ pushd ~/.pow
$ ln -s ~/path/to/iframe-carousel-demo
$ popd
```

Then visit [iframe-carousel-demo.dev](http://iframe-carousel-demo.dev/) in your favorite browser

## Testing

Open [iframe-carousel-demo.dev/test.html](http://iframe-carousel-demo.dev/test.html) to run the [Jasmine](http://jasmine.github.io/) tests.

Use [jshint](http://jshint.com/) to check for lint errors.

```bash
$ npm -g install jshint
$ jshint public/js/*.js
```

## Usage

If you want to use this in another app, you can steal the `iframe-carousel.js` and `iframe-carousel.css` files.

They depend on [jQuery](https://jquery.com/) and [animate.css](https://daneden.github.io/animate.css/), so make sure to include those as well.

You can bind the carousel to any element on the page, so create an empty element, make sure it has a width and height, and then instantiate the jQuery plugin:

```html
<!DOCTYPE html>
<html>
	<head>
		<!-- Dependencies -->
		<link href="animate.css" rel="stylesheet" />
		<link href="iframe-carousel.css" rel="stylesheet" />
		<script src="jquery.js"></script>
		<script src="iframe-carousel.js"></script>
		<!-- Example of how to fill the entire page with css -->
		<style>
			html, body, #carousel {
				margin: 0;
				padding: 0;
				width: 100%;
				height: 100%;
			}
		</style>
	</head>
	<body>
		<!-- Empty element to contain the view -->
		<div id="carousel"></div>
		<!-- Script to instantiate the plugin -->
		<script>
			$("#carousel").IframeCarousel({
				// cycle through the following pages
				sources: [
					'http://page1.com',
					'http://page2.com',
					'http://page3.com'
				],
				// loading new page every 30 seconds
				interval: 30000,
				// using the following transition on entrance
				transitionIn: 'zoomInDown',
				// using the following transition on exit
				transitionOut: 'zoomOutDown'
				// see https://daneden.github.io/animate.css for more transition options
			});
		</script>
	</body>
</html>
```
