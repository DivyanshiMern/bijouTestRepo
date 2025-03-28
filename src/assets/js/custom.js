// ====header sticky====
jQuery(document).ready(function () {
    $(window).scroll(function () {
      var sticky = $('#header'),
        scroll = $(window).scrollTop();
      if (scroll >= 30) sticky.addClass('fixed');
      else sticky.removeClass('fixed');
    });
  
  });
  
  jQuery(document).ready(function () {
    jQuery(".menu").click(function () {
      jQuery("html").toggleClass("show-menu");
    });
  
    jQuery(".close-button").click(function () {
      jQuery("html").removeClass("show-menu");
    });
  });
  
  
  
  /*Home page(Box) slider Start */
  // jQuery(document).ready(function () {
  //   $('.box-section .top-box').slick({
  //     arrows: false,
  //     dots: false,
  //     centerMode: true,
  //     centerPadding: '60px',
  //     slidesToShow: 3,
  //     autoplay: true,
  //     responsive: [
  //       {
  //         breakpoint: 768,
  //         settings: {
  //           arrows: false,
  //           centerMode: true,
  //           centerPadding: '40px',
  //           slidesToShow: 2
  //         }
  //       },
  //       {
  //         breakpoint: 480,
  //         settings: {
  //           arrows: false,
  //           centerMode: true,
  //           centerPadding: '40px',
  //           slidesToShow: 1
  //         }
  //       }
  //     ]
  //   });
  // });
  $(document).ready(function () {
    var rev = $('.top-box');
  
    rev.on('init', function (event, slick) {
      var cur = $(slick.$slides[slick.currentSlide]);
      var next = cur.next();
      var prev = cur.prev();
  
      prev.addClass('slick-sprev');
      next.addClass('slick-snext');
      cur.removeClass('slick-snext slick-sprev');
  
      slick.$prev = prev;
      slick.$next = next;
    });
  
    rev.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      var cur = $(slick.$slides[nextSlide]);
      var next = cur.next();
      var prev = cur.prev();
  
      slick.$prev && slick.$prev.removeClass('slick-sprev');
      slick.$next && slick.$next.removeClass('slick-snext');
  
      prev.addClass('slick-sprev');
      next.addClass('slick-snext');
  
      slick.$prev = prev;
      slick.$next = next;
  
      cur.removeClass('slick-snext slick-sprev');
    });
  
    rev.slick({
      speed: 1000,
      arrows: false,
      dots: false,
      infinite: true,
      centerMode: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerPadding: '0',
      swipe: true,
      autoplay: true,
      autoplaySpeed: 2000,
    });
  });
  
  /*Home page(Box) slider End */
  
  /*Earing Product page(Product) slider Start */
  $(document).ready(function ($) {
    $(' ul.product').slick({
      dots: false,
      arrows: true,
      infinite: false,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      responsive: [
        {
          breakpoint: 1121,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
  
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '20px',
          }
        }
      ]
    });
  });
  
  /*Earing Product page(Product) slider End*/
  
  
  /*Earing Product page(Banner) slider Start */
  $(document).ready(function () {
    $('.mini-images li a').on('click', function (e) {
      e.preventDefault();
  
      var index = $(this).parent().index();
      var target = $('.big-images li').eq(index);
  
      if (target.length) {
        $('html, body').stop().animate({
          scrollTop: target.offset().top
        }, 500);
      }
    });
  
    // Update active mini-image on scroll
    $(window).on("scroll", function () {
      var scrollPosition = $(window).scrollTop();
  
      $('.big-images li').each(function (i) {
        var offsetTop = $(this).offset().top;
        var offsetBottom = offsetTop + $(this).outerHeight();
  
        if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetBottom) {
          $('.mini-images li a').removeClass('active');
          $('.mini-images li a').eq(i).addClass('active');
        }
      });
    }).scroll();
  });
  /*Earing Product page(Banner) slider End */
  
  /*Earing Product page(Prize Breakup) slider Start */
  $(document).ready(function () {
    $(".prize-breakup > a").on("click", function (event) {
      event.preventDefault(); // Prevent default anchor behavior
  
      let $this = $(this);
      let $content = $this.siblings(".content");
  
      if ($this.hasClass("active")) {
        $this.removeClass("active");
        $content.slideUp(200);
      } else {
        $(".prize-breakup > a").removeClass("active");
        $(".content").slideUp(200);
  
        $this.addClass("active");
        $content.slideDown(200);
      }
    });
  });
  
  
  /*Earing Product page(Prize Breakup) slider End*/
  
  
  
  /*Bracelete Category page(Collections) slider Start */
  $(document).ready(function () {
    // By default, hide all content sections
    $(".content").hide();
  
    // Click event for all the filter links
    $(".collections > a, .size > a, .price > a, .gemstones > a,.right .short-by").on("click", function (event) {
      event.preventDefault();
  
      var $this = $(this);
      var $content = $this.siblings(".content");
  
      if ($this.hasClass("active")) {
        $this.removeClass("active");
        $content.slideUp(200);
      } else {
        $(".collections > a, .size > a, .price > a, .gemstones > a,.right .short-by").removeClass("active");
        $(".content").slideUp(200);
  
        $this.addClass("active");
        $content.slideDown(200);
      }
    });
  });
  
  /*Bracelete Category page(Collections) slider End */
  
  
  
  /*FAQ Page  Start */
  $(document).ready(function () {
    $(".tabs-content .content ,.jewellery-content .content").hide();
  
    $(".tabs-content .content:first-child ,.jewellery-content .content:first-child").show();
  
    $(".tabs a ,.jewellery-tabs a").on("click", function (e) {
      e.preventDefault();
  
      $(".tabs a ,.jewellery-tabs a").removeClass("active");
  
      $(this).addClass("active");
  
      var selector = $(this).data("toggle");
  
      $(".tabs-content .content ,.jewellery-content .content").hide();
  
      $(selector).show();
    });
  
    $(".tabs a:first ,.jewellery-tabs a:first").addClass("active");
  });
  
  
  /*FAQ Page  End */
  
  /*FAQ Page (FAQ-question and Answer)  Start */
  $(document).ready(function () {
    $(".faq-ques .answer").hide();
  
    $(".faq-ques a").on("click", function (event) {
      event.preventDefault();
  
      var $this = $(this);
      var $content = $this.next(".answer");
  
      if ($content.is(":visible")) {
        $content.slideUp(200);
        $this.removeClass("active");
      } else {
        $(".faq-ques .answer").slideUp(200);
        $(".faq-ques a").removeClass("active");
  
        $content.slideDown(200);
        $this.addClass("active");
      }
    });
  });
  /*FAQ Page (FAQ-question and Answer)  End */