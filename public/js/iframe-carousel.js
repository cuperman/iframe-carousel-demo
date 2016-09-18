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
    this.$el = $(document.createElement(name));
    if (options.classed) {
      this.$el.addClass(options.classed);
    }
    return this;
  };

  Element.prototype.appendTo = function(parent) {
    $(parent).append(this.$el);
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
  }

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
  var Iframe = function() {
    // super
    Element.call(this, 'iframe', { classed: 'carousel-frame' });
    return this;
  };

  // Inherit Element prototype
  Iframe.prototype = Object.create(Element.prototype);

  Iframe.prototype.setSource = function(source) {
    this.$el.attr('src', source);
    return this;
  };

  //============================================================================
  // Controllers
  //============================================================================

  /**
   * Controls the carousel
   */
  var IframeCarousel = function(el, sources) {
    this.$el = $(el);
    this.sources = sources || [];
    this.interval = 5000; // 5 seconds
    this.transitionIn = 'zoomInDown';
    this.transitionOut = 'zoomOutDown';
    
    if (this.sources.length < 2) {
      throw 'InsufficientSources';
    }

    this.visibleSourceIndex = 0;

    this.container = new Element('div', { classed: 'carousel-container' });
    this.frames = [
      new Iframe(),
      new Iframe()
    ];
    this.visibleFrame = this.frames[0].show();
    this.hiddenFrame  = this.frames[1].hide();

    this.container.appendTo(this.$el);
    this.frames.forEach(function(frame) {
      frame.appendTo(this.container.$el);
    }.bind(this));

    return this;
  };

  IframeCarousel.prototype.visibleSource = function() {
    return this.sources[this.visibleSourceIndex];
  };

  IframeCarousel.prototype.nextSource = function() {
    var nextIndex = this.visibleSourceIndex + 1;
    if (nextIndex === this.sources.length) {
      nextIndex = 0;
    }
    return this.sources[nextIndex];
  };

  IframeCarousel.prototype.incrementSource = function() {
    this.visibleSourceIndex++;
    if (this.visibleSourceIndex === this.sources.length) {
      this.visibleSourceIndex = 0;
    }
  };

  IframeCarousel.prototype.loadFirstFrame = function() {
    this.visibleFrame.setSource(this.visibleSource());
  };

  IframeCarousel.prototype.loadNextFrame = function() {
    this.hiddenFrame.setSource(this.nextSource());
  };

  IframeCarousel.prototype.toggleFrames = function() {
    var promise = $.when(
      this.visibleFrame.animateOut(this.transitionOut),
      this.hiddenFrame.animateIn(this.transitionIn)
    );

    var tmp = this.visibleFrame;
    this.visibleFrame = this.hiddenFrame;
    this.hiddenFrame = tmp;

    return promise;
  };

  IframeCarousel.prototype.run = function() {
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
   * Exports IframeCarousel as a jQuery plugin
   */
  $.fn.iframeCarousel = function(options) {
    new IframeCarousel(this, options.sources).run();
  };
})();
