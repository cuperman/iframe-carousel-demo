/* globals describe, it, expect */

(function() {
  'use strict';
  
  // Undo the namespacing for simpler references in tests
  var Element = window.iframeCarousel.Element,
      Iframe  = window.iframeCarousel.Iframe,
      IframeCarousel = window.iframeCarousel.IframeCarousel;
  
  describe('Element', function() {
    describe('::constructor', function() {
      describe('with no arguments', function() {
        it('creates a div element', function() {
          var element = new Element();
          expect(element.el.outerHTML).toEqual('<div></div>');
        });
        
        it('creates a jQuery object', function() {
          var element = new Element();
          expect(element.$el instanceof jQuery).toBe(true);
        });
      });
      
      describe('with a name', function() {
        it('creates a specific element', function() {
          var element = new Element('span');
          expect(element.el.outerHTML).toEqual('<span></span>');
        });
      });
      
      describe('with a name and classed', function() {
        it('creates a specific element with class attributes', function() {
          var element = new Element('span', { classed: 'foo bar' });
          expect(element.el.outerHTML).toEqual('<span class="foo bar"></span>');
        });
      });
    });
    
    describe('#appendTo', function() {
      var parentElement = new Element('div', { classed: 'parent' }),
          element = new Element('div', { classed: 'child' });

      it('appends the element to the parent element', function() {
        element.appendTo(parentElement.el);
        expect(parentElement.el.outerHTML).toEqual('<div class="parent"><div class="child"></div></div>');
      });
    });
    
    describe('#show', function() {
      it('does something');
    });
    
    describe('#hide', function() {
      it('does something');
    });
    
    describe('#animateIn', function() {
      it('does something');
    });
    
    describe('#animateOut', function() {
      it('does something');
    });
  });
  
  describe('Iframe', function() {
    describe('::constructor', function() {
      it('creates an iframe element classed carousel-frame', function() {
        var iframe = new Iframe();
        expect(iframe.el.outerHTML).toEqual('<iframe class="carousel-frame"></iframe>');
      });
    });
    
    describe('#setSource', function() {
      var iframe = null;

      beforeEach(function() {
        iframe = new Iframe();
      });
      
      afterEach(function() {
        iframe = null;
      });

      it('sets the src attribute of the iframe', function() {
        iframe.setSource('/foo.html')
        expect(iframe.el.outerHTML).toMatch('src="/foo.html"')
      });
    });
  });
    
  describe('IframeCarousel', function() {
    var el = null,
        sources = null;
    
    beforeEach(function() {
      el = document.createElement('div');
      sources = [
        '/foo.html',
        '/bar.html',
        '/baz.html'
      ]
    });
    
    afterEach(function() {
      el = null;
      sources = null;
    });

    describe('::constructor', function() {
      it('saves the element as a jQuery object', function() {
        var carousel = new IframeCarousel(el, { sources: sources });
        expect(carousel.$el instanceof jQuery).toBe(true);
      });
      
      it('saves the options', function() {
        var carousel = new IframeCarousel(el, {
          sources: sources,
          interval: 12345,
          transitionIn: 'fadeIn',
          transitionOut: 'fadeOut'
        });
        expect(carousel.sources).toEqual(sources);
        expect(carousel.interval).toEqual(12345);
        expect(carousel.transitionIn).toEqual('fadeIn');
        expect(carousel.transitionOut).toEqual('fadeOut');
      });
      
      it('throws an error if sources are less than 2', function() {
        expect(function() {
          new IframeCarousel(el, ['/foo.html']);
        }).toThrowError('InsufficientSources');
      });

      it('initializes visibleSourceIndex to 0', function() {
        var carousel = new IframeCarousel(el, { sources: sources });
        expect(carousel.visibleSourceIndex).toEqual(0);
      });
      
      it('initializes the dom with 2 iframes, one visible and one hidden, inside a container', function() {
        var carousel = new IframeCarousel(el, { sources: sources });
        expect(carousel.$el.get(0).outerHTML).toEqual(
          '<div>' +
            '<div class="carousel-container">' +
              '<iframe class="carousel-frame"></iframe>' +
              '<iframe class="carousel-frame" style="display: none;"></iframe>' +
            '</div>' +
          '</div>' 
        );
      });
    });
    
    describe('#visibleSource', function() {
      it('does something');
    });
    
    describe('#nextSource', function() {
      it('does something');
    });
    
    describe('#incrementSource', function() {
      it('does something');
    });
    
    describe('#loadFirstFrame', function() {
      it('does something');
    });
    
    describe('#loadNextFrame', function() {
      it('does something');
    });
    
    describe('#toggleFrames', function() {
      it('does something');
    });
    
    describe('#run', function() {
      it('does something');
    });
  });
})();
