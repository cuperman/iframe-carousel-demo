(function() {
  'use strict';

  //============================================================================
  // Views
  //============================================================================

  /**
   * Object abstraction of generic HTML element
   */
  var Element = function(name, options) {
    name = name || 'div';
    options = options || {};

    this.el = document.createElement(name);
    this.$el = $(this.el);

    if (options.classed) {
      this.$el.addClass(options.classed);
    }

    return this;
  };

  Element.prototype.appendTo = function(parentElement) {
    $(parentElement).append(this.$el);
    return this;
  };

  Element.prototype.show = function() {
    this.$el.show();
    return this;
  };

  Element.prototype.hide = function() {
    this.$el.hide();
    return this;
  };
  
  Element.prototype._animate = function(before, after) {
    var deferred = $.Deferred();
    this.$el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      deferred.resolve();
    });
    if ($.isFunction(after)) {
      deferred.then(after.bind(this));
    }
    if ($.isFunction(before)) {
      before.call(this);
    }
    return deferred.promise();
  };

  Element.prototype.animateIn = function(transition) {
    var classed = ['animated', transition].join(' ');
    return this._animate(function() {
      this.$el.addClass(classed);
      this.$el.show();
    }, function() {
      this.$el.removeClass(classed);
    });
  };

  Element.prototype.animateOut = function(transition) {
    var classed = ['animated', transition].join(' ');
    return this._animate(function() {
      this.$el.addClass(classed);
    }, function() {
      this.$el.hide();
      this.$el.removeClass(classed);
    });
  };

  /**
   * Object abstraction of iframe element
   */
  var Frame = function() {
    // super
    Element.call(this, 'iframe', { classed: 'carousel-frame' });
    return this;
  };

  // Inherit Element prototype
  Frame.prototype = Object.create(Element.prototype);

  Frame.prototype.setSource = function(source) {
    this.$el.attr('src', source);
    return this;
  };

  //============================================================================
  // Controllers
  //============================================================================

  /**
   * Controls the carousel
   */
  var Carousel = function(el, options) {
    this.$el = $(el);
    this.sources = options.sources || [];
    this.interval = options.interval || 5000; // 5 seconds
    this.transitionIn = options.transitionIn || 'bounceInLeft';
    this.transitionOut = options.transitionOut || 'bounceOutRight';
    
    if (this.sources.length < 2) {
      throw new Error('InsufficientSources');
    }

    this.currentSourceIndex = 0;

    this.container = new Element('div', { classed: 'carousel-container' });
    this.frames = [
      new Frame(),
      new Frame()
    ];
    this.visibleFrame = this.frames[0].show();
    this.hiddenFrame  = this.frames[1].hide();

    this.container.appendTo(this.$el);
    this.frames.forEach(function(frame) {
      frame.appendTo(this.container.$el);
    }.bind(this));

    return this;
  };

  Carousel.prototype.currentSource = function() {
    return this.sources[this.currentSourceIndex];
  };

  Carousel.prototype.nextSource = function() {
    var nextIndex = this.currentSourceIndex + 1;
    if (nextIndex === this.sources.length) {
      nextIndex = 0;
    }
    return this.sources[nextIndex];
  };

  Carousel.prototype.incrementSource = function() {
    this.currentSourceIndex++;
    if (this.currentSourceIndex === this.sources.length) {
      this.currentSourceIndex = 0;
    }
  };

  Carousel.prototype.loadFirstFrame = function() {
    this.visibleFrame.setSource(this.currentSource());
  };

  Carousel.prototype.loadNextFrame = function() {
    this.hiddenFrame.setSource(this.nextSource());
  };

  Carousel.prototype.toggleFrames = function() {
    var promise = $.when(
      this.visibleFrame.animateOut(this.transitionOut),
      this.hiddenFrame.animateIn(this.transitionIn)
    );

    var tmp = this.visibleFrame;
    this.visibleFrame = this.hiddenFrame;
    this.hiddenFrame = tmp;

    return promise;
  };

  Carousel.prototype.run = function() {
    this.loadFirstFrame();
    this.loadNextFrame();

    setInterval(function() {
      this.toggleFrames().then(function() {
        this.incrementSource();
        this.loadNextFrame();
      }.bind(this));
    }.bind(this), this.interval);
  };

  //============================================================================
  // jQuery Plugin
  //============================================================================

  /**
   * Exports Carousel as a jQuery plugin
   */
  $.fn.iframeCarousel = function(options) {
    new Carousel(this, options).run();
  };
  
  /**
   * Exports objects to the window for testing
   */
  window.iframeCarousel = {
    Element: Element,
    Frame: Frame,
    Carousel: Carousel
  };
})();
