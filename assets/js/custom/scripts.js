
	// header fade
	$(function() {
	   var header = $('#header');
	   setTimeout(function(){
	   	header.addClass('show');
	   },800);
	});

	//header background on scroll
	var body = $('body');
	$(window).on('scroll', function() {
	   var st2 = $(this).scrollTop();

	   if (st2 > 0) {
	      // console.log(st2);
           body.addClass('scrolling');

	   } else {
           body.removeClass('scrolling');
	   }

	});


    // for smooth scroll
	// if ( $('a').is('.smooth-scroll') ) {
    //     smoothScroll.init({
    //         selector: '.smooth-scroll', // Selector for links (must be a class, ID, data attribute, or element tag)
    //         speed: 500, // Integer. How fast to complete the scroll in milliseconds
    //         easing: 'easeInQuad', // Easing pattern to use
    //         offset: 130 // Integer. How far to offset the scrolling anchor location in pixels
    //     });
    // }

jQuery(document).ready(function($) {
    // for placeholder link
    // function prevent(){
    //     $('.prevent, .btn-modal, a[href=#]').on('click touch', function(event){
    //         event.preventDefault();
    //     });
    // }

    // for burger menu
    $('.mobile-menu-toggle, .mobile-menu-overlay').on('click', function(){
        $('.mobile-menu-toggle').toggleClass('active');
        $('.mobile-menu-wrap').toggleClass('showing');
        $(document.body).toggleClass('overflow');
    });

    $(window).on('resize', function() {
        var windowWidth = $(window).width();
        if (windowWidth > 1024) {
            if ($('.mobile-menu-toggle').hasClass('active')) {
                $('.mobile-menu-toggle').removeClass('active');
                $('.mobile-menu-wrap').removeClass('showing');
                $(document.body).removeClass('overflow');
            }
        }
    });

        // for empty link
        // prevent();

        //initialize swiper when document ready
        var mySwiper = new Swiper ('.social-slider', {
            slidesPerView: 3,
            spaceBetween: 30,
            // loop: true,
            navigation: {
                nextEl: '.swiper-social-button-next',
                prevEl: '.swiper-social-button-prev',
            },
            breakpoints: {
                // when window width is <= 320px
                // 320: {
                //     slidesPerView: 1,
                //     spaceBetween: 10
                // },
                // when window width is <= 480px
                540: {
                    slidesPerView: 1
                },
                // when window width is <= 640px
                767: {
                    slidesPerView: 2
                }
            }
        })

		//for popup
		if ($('.youtube-video').length) {
            $('.youtube-video').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 350,
                preloader: false,
                fixedContentPos: false,
				fixedBgPos: true
            });
        }

        //for More Info btn
        if ($('.service-box').length && $('.more-info-btn').length) {
            $('.more-info-btn').on('click', function (e) {
                e.preventDefault();

               if ($(this).hasClass('open')) {
                   $(this).removeClass('open').next('.service-info-box.more').slideUp(350);
               } else {
                   $(this).addClass('open').next('.service-info-box.more').slideDown(350);
               }
            });
        }
});


