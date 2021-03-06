//
// Expand/collapse nav
//
var expandCollapseNav = function() {
    // Toggle open and close nav styles on click
    $('#nav-toggle').click(function() {
      $('nav ul').slideToggle();
      $('.nav-wrapper').toggleClass('open');
    });
    // Hamburger to X toggle
    $('#nav-toggle').on('click', function() {
      this.classList.toggle('active');
    });
};


//
// Add class to div while scrolling past
// ADAPTED FROM: http://jsfiddle.net/tovic/vVaat/light/
//
var activateScrollSections = function() {
  function isScrolledIntoView(elem) {
      var $window = $(window),
          docViewTop = $window.scrollTop(),
          windowHeight = $window.height(),
          docViewBottom = docViewTop + windowHeight * 1.25 + 30,
          elemTop = $(elem).offset().top,
          elemBottom = elemTop + $(elem).outerHeight();
      return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop - windowHeight * .75 - 30));
  }

  $(window).on("scroll", function() {

      // Example 2
      $('.scroll-section').each(function() {
          if (isScrolledIntoView(this)) {
              $(this).addClass('active');
          } else {
              $(this).removeClass('active');
          }
      });

  });
};


//
// Arrow keys for art archive
//
// (function($) { // Begin jQuery
//   $(document).keydown(function(e) {
//       switch(e.which) {
//           case 38: // up
//             $('.scroll-section.active').find('.prev-link').trigger('click');
//           break;
//           case 40: // down
//             $('.scroll-section.active').find('.next-link').trigger('click');
//           break;

//           default: return; // exit this handler for other keys
//       }
//   });
// })(jQuery);


//
// Lazy load images
// ADAPTED FROM: https://www.sitepoint.com/how-to-build-your-own-progressive-image-loader/
//
var lazyLoadImages = function() {
  // progressive-image.js
  if (window.addEventListener && window.requestAnimationFrame && document.getElementsByClassName) window.addEventListener('load', function() {

    // start
    var pItem = document.getElementsByClassName('progressive replace'), timer;

    window.addEventListener('scroll', scroller, false);
    window.addEventListener('resize', scroller, false);
    inView();


    // throttled scroll/resize
    function scroller(e) {

      timer = timer || setTimeout(function() {
        timer = null;
        requestAnimationFrame(inView);
      }, 300);

    }


    // image in view?
    function inView() {

      var wT = window.pageYOffset, wB = wT + window.innerHeight, cRect, pT, pB, p = 0, loadOffset = window.innerHeight;
      while (p < pItem.length) {

        cRect = pItem[p].getBoundingClientRect();
        pT = wT + cRect.top;
        pB = pT + cRect.height;

        // loadOffset subtraction/addition ensures previous/next image loads as well
        if (wT - loadOffset < pB && wB + loadOffset > pT) {
          loadFullImage(pItem[p]);
          pItem[p].classList.remove('replace');
        }
        else p++;

      }

    }


    // replace with full image
    function loadFullImage(item) {

      if (!item || !item.href) return;

      // load image
      var img = new Image();
      if (item.dataset) {
        img.srcset = item.dataset.srcset || '';
        img.sizes = item.dataset.sizes || '';
      }
      img.src = item.href;
      img.className = 'reveal';
      if (img.complete) addImg();
      else img.onload = addImg;

      // replace image
      function addImg() {

        // disable click
        item.addEventListener('click', function(e) { e.preventDefault(); }, false);

        // add full image
        item.appendChild(img).addEventListener('animationend', function(e) {

          // remove preview image
          var pImg = item.querySelector && item.querySelector('img.preview');
          if (pImg) {
            e.target.alt = pImg.alt || '';
            item.removeChild(pImg);
            e.target.classList.remove('reveal');

            // MODIFICATION: Set width of lightbox image wrapper to match image width
            var imgWidth = $(this).width();
            // var imgWidth = $(this).get(0).naturalWidth;
            $(this).parents('.lightbox-image-wrapper').css('width', imgWidth);
          }

        });

      }

    }

  }, false);
};

//
// Lightbox
// Adapted from: https://stackoverflow.com/questions/38615852/set-display-of-div-by-using-the-data-target-attribute
// https://jsfiddle.net/nw3m7g2r/1/
//
var theLightbox = function() {
  $(".lightbox-open").click(function() {
      var target = $(this).data("target");
      // var imgWidth = $(target).find('img').get(0).naturalWidth;
      $(target).addClass('open');
      // $(target).find('.image-wrapper').css('width', imgWidth);
  })
  $(".lightbox-close").click(function() {
      $(".lightbox").removeClass('open');
  })
  $(".parent-close").click(function() {
      $(this).parents(".lightbox").removeClass('open');
  })
  $(document).keydown(function(e) {
      switch(e.which) {
          case 27: // esc key
            $('.lightbox-close').trigger('click');
          break;
          case 37: // left
            $('.lightbox.open').find('.lightbox-prev').trigger('click');
          break;
          // case 38: // up
          //   $('.lightbox.open').find('.lightbox-prev').trigger('click');
          // break;
          case 39: // right
            $('.lightbox.open').find('.lightbox-next').trigger('click');
          break;
          // case 40: // down
          //   $('.lightbox.open').find('.lightbox-next').trigger('click');
          // break;

          default: return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
  });
};


jQuery(document).ready(function() {
    expandCollapseNav();
    activateScrollSections();
    lazyLoadImages();
    theLightbox();
});