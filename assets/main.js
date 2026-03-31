//
// Expand/collapse nav
//
var expandCollapseNav = function() {
    // Toggle open and close nav styles on click
    $('#nav-toggle').click(function() {
      $('nav ul.nav-list').slideToggle();
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
// Customize Lightbox2
//
var customizeLightbox2 = function() {
  lightbox.option({
    'albumLabel': '%1 of %2',
    'fadeDuration': 300,
    'imageFadeDuration': 300,
    'positionFromTop': 60,
    'resizeDuration': 20,
    'wrapAround': true,
  })
};

//
// Design carousel
//
var designCarousel = function() {
  $('.design-carousel').slick({
    adaptiveHeight: true,
    autoplay: false,
    centerMode: true,
    centerPadding: '40px',
    dots: true,
    slidesToScroll: 1,
    slidesToShow: 1,
    // Add more configuration options as needed
  });
};

//
// Isotope with Filtering and Masonry Layout
//
var isotopeFilteringAndMasonry = function() {

  let grid = document.querySelector('.grid');

  if (!grid) {
    console.log('No isotope grid found');
    return;
  }

  if (typeof $.fn.isotope === "undefined") {
    console.log('Isotope not loaded');
    return;
  }

  console.log('isotope init');

  var $grid = $('.grid').imagesLoaded(function() {
    $grid.isotope({
      itemSelector: '.grid-item',
      layoutMode: 'masonry',
      masonry: {
        columnWidth: '.grid-item'
      }
    });
  });

  let filters = document.querySelector('.filters');

  if (filters) {
    $('.filters').on('click', 'button', function() {
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({ filter: filterValue });
    });
  }

};

//
// Case Studies Lightbox
//
var caseStudiesLightbox = function () {

  const lightbox = document.getElementById("case-study-lightbox");
  if (!lightbox) return;

  const slides  = [...lightbox.querySelectorAll(".cs-slide")];
  const triggers = [...document.querySelectorAll(".case-study-trigger")];

  if (!slides.length || !triggers.length) return;

  const prevBtn  = lightbox.querySelector(".cs-prev");
  const nextBtn  = lightbox.querySelector(".cs-next");
  const closeBtn = lightbox.querySelector(".cs-close");

  let current = 0;
  let scrollPosition = 0;

  let touchStartX = 0;
  let touchEndX = 0;

  let lastFocusedElement = null;

  function open(index) {

    lastFocusedElement = document.activeElement;

    current = (index !== undefined) ? index : 0;

    scrollPosition = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = "100%";

    lightbox.style.display = "block";

    // defer focus so browser doesn't ignore it
    setTimeout(() => {
      lightbox.focus();
    }, 0);

    render();
  }

  function close() {

    lightbox.style.display = "none";

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";

    window.scrollTo(0, scrollPosition);

    history.replaceState(null, null, window.location.pathname);

    if(lastFocusedElement){
      lastFocusedElement.focus();
    }
  }

  function render() {

    slides.forEach((slide,i)=>{
      slide.style.display = i === current ? "block" : "none";
    });

    // Reset scroll position
    lightbox.scrollTop = 0;

    const id = slides[current].dataset.id;
    history.replaceState(null, null, "#" + id);

    prevBtn.classList.toggle("active", current > 0);
    nextBtn.classList.toggle("active", current < slides.length - 1);
  }

  function next(){
    if(current < slides.length-1){
      current++;
      render();
    }
  }

  function prev(){
    if(current > 0){
      current--;
      render();
    }
  }

  /* --- click triggers --- */

  triggers.forEach(el => {

    el.addEventListener("click", function(e){

      e.preventDefault();

      this.blur();

      let id = this.dataset.id;

      let index = slides.findIndex(slide => slide.dataset.id === id);

      if(index !== -1){
        open(index);
      }

    });

  });

  /* --- buttons --- */

  nextBtn?.addEventListener("click", next);
  prevBtn?.addEventListener("click", prev);
  closeBtn?.addEventListener("click", close);

  /* --- click outside slide closes --- */

  lightbox.addEventListener("click", e=>{
    if(e.target === lightbox) close();
  });

  /* --- keyboard navigation --- */

  window.addEventListener("keydown", e=>{

    if(lightbox.style.display !== "block") return;

    if(e.key === "Escape") close();
    if(e.key === "ArrowRight") next();
    if(e.key === "ArrowLeft") prev();

  });

  window.addEventListener("hashchange", () => {

    const hash = window.location.hash.replace("#", "");

    if(!hash){
      close();
      return;
    }

    const index = slides.findIndex(slide => slide.dataset.id === hash);

    if(index !== -1){
      open(index);
    }

  });

  /* --- swipe navigation (mobile) --- */

  lightbox.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
  });

  lightbox.addEventListener("touchend", e => {

    touchEndX = e.changedTouches[0].screenX;

    const swipeDistance = touchEndX - touchStartX;

    if(Math.abs(swipeDistance) < 50) return; // ignore tiny swipes

    if(swipeDistance < 0){
      next(); // swipe left
    } else {
      prev(); // swipe right
    }

  });

  /* --- open from URL hash --- */

  const hash = window.location.hash.replace("#", "");

  if(hash){

    const index = slides.findIndex(slide => slide.dataset.id === hash);

    if(index !== -1){
      open(index);
    }

  }

};



window.addEventListener("load", function(){
    expandCollapseNav();
    activateScrollSections();
    lazyLoadImages();
    customizeLightbox2();
    designCarousel();
    isotopeFilteringAndMasonry();
    caseStudiesLightbox();
});