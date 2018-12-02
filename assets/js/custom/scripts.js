 jQuery(function($) {

    // header fade
    $(function () {
        var header = $('#header-main');
        setTimeout(function () {
            header.addClass('show');
        }, 800);
    });

    $(document).ready(function() {
        // for placeholder link
        function prevent(){
            $('.prevent, .btn-modal, a[href="#"]').on('click touch', function(event){
                event.preventDefault();
            });
        }

        // for empty link
        prevent();

        // for burger menu
        $('.mobile-menu-toggle, .mobile-menu-overlay').on('click', function () {
            $('.mobile-menu-toggle').toggleClass('active');
            $('.mobile-menu-wrap').toggleClass('showing');
            $('#header-main').toggleClass('white-bg');
            $('body').toggleClass('overflow');
        });

        $(window).on('resize', function () {
            var windowWidth = $(window).width();
            if (windowWidth > 1024) {
                if ($('.mobile-menu-toggle').hasClass('active')) {
                    $('.mobile-menu-toggle').removeClass('active');
                    $('.mobile-menu-wrap').removeClass('showing');
                    $('#header-main').removeClass('white-bg');
                    $(document.body).removeClass('overflow');
                }
            }
        });

        //for smooth-scroll
        // if (typeof smoothScroll !== 'undefined') {
            var scroll = new SmoothScroll('a[href*="#"]', {

                // Selectors
                ignore: '[data-scroll-ignore]',
                header: null,
                topOnEmptyHash: true,

                // Speed & Duration
                speed: 500,
                speedAsDuration: false,
                durationMax: null,
                durationMin: null,
                clip: true,
                offset: function (anchor, toggle) {

                    var myOffset = 15,
                        currentPos =  $(window).scrollTop(),
                        headerHeight = $('#header-scrolling').outerHeight() + myOffset,
                        anchorNavHeight = $('.anchor-nav-box').outerHeight() + myOffset;

                    if (currentPos > anchor.offsetTop) {
                        //up
                        return anchorNavHeight + headerHeight;
                    } else {
                        //down
                        return anchorNavHeight;
                    }

                },

                // Easing
                easing: 'easeInOutCubic',

                // History
                updateURL: false,
                popstate: true,

                // Custom Events
                emitEvents: true

            });
        // }

        //for nicescroll
        // if ($('.anchor-nav > ul').length) {
        //     $('.anchor-nav > ul').niceScroll({cursorcolor:"#00F"});
        // }

        //initialize swiper when document ready
        if (typeof Swiper !== 'undefined') {
            var mySwiper = new Swiper('.social-slider', {
                slidesPerView: 3,
                spaceBetween: 30,
                navigation: {
                    nextEl: '.swiper-social-button-next',
                    prevEl: '.swiper-social-button-prev',
                },
                breakpoints: {
                    540: {
                        slidesPerView: 1
                    },
                    767: {
                        slidesPerView: 2
                    }
                }
            });
/*
            var galleryThumbs = new Swiper('.gallery-thumbs', {
                spaceBetween: 10,
                slidesPerView: 4,
                freeMode: true,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
            });
            var galleryTop = new Swiper('.gallery-top', {
                spaceBetween: 10,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                thumbs: {
                    swiper: galleryThumbs
                }
            });

            // loop
            var galleryThumbs = new Swiper('.gallery-thumbs', {
                spaceBetween: 10,
                slidesPerView: 4,
                loop: true,
                freeMode: true,
                loopedSlides: 5, //looped slides should be the same
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
            });
            var galleryTop = new Swiper('.gallery-top', {
                spaceBetween: 10,
                loop:true,
                loopedSlides: 5, //looped slides should be the same
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                thumbs: {
                    swiper: galleryThumbs,
                },
            });
            */
        }


        //for popup
        if ($('.youtube-video').length && typeof $.fn.magnificPopup !== 'undefined') {
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
        if ($('.my-customized-view-list img').length) {
            $('.my-customized-view-list').magnificPopup({
                delegate: 'a',
                type: 'image',
                tLoading: 'Loading image #%curr%...',
                mainClass: 'mfp-img-mobile',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                },
                image: {
                    tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                    titleSrc: function (item) {
                        return item.el.attr('title');
                    }
                }
            });
        }

        //for More Info btn
        if (($('.service-box').length || $('.item-box').length) && $('.more-info-btn').length) {
            $('.more-info-btn').on('click', function (e) {
                e.preventDefault();

                if ($(this).hasClass('open')) {
                    $(this).removeClass('open').next('.more').slideUp(350);
                } else {
                    $(this).addClass('open').next('.more').slideDown(350);
                }
            });
        }

        //for select truck
        if ($('.section-select-truck').length && $('.select-truck-list').length) {
            var truckList = $('.select-truck-list:not(.bed-length)'),
                inputs = truckList.find('input');

            inputs.on('change', function () {
                var type = $(this).data('truckType'),
                    currentlist = $('.select-truck-list.bed-length[data-truck-group="'+type+'"]'),
                    truckLengthList = $('.select-truck-list.bed-length');

                truckLengthList.find('input').prop('checked', false);
                truckLengthList.fadeOut(350);
                currentlist.fadeIn(350);

            })
        }

        //for change color
        if ($('.color-box input').length) {
            $('.color-box input').on('change', function () {
                var parentBox = $(this).parents('.color-selector-box'),
                    color = $(this).data('color'),
                    images = parentBox.find('.group-img-wrap img'),
                    currentImg = parentBox.find('img[data-truck-color="'+color+'"]');

                images.removeClass('active');
                currentImg.addClass('active');
            })

        }

        //for tooltip
        if ($('.color-box label').length) {
            var tip = tippy('.color-box label', {
                delay: 100,
                arrow: true,
                arrowType: 'round',
                size: 'large',
                duration: 500,
                animation: 'scale'
            });
        }

        // for anchor nav
        var stickyNav = $('.anchor-nav-box.build');

        if (stickyNav && stickyNav.length) {
            var offset = stickyNav.offset().top,
                stickyNavLinks = stickyNav.find('.anchor-nav').find('a');

            //Handle Active Link on Sroll
            function onScroll(event) {
                if (stickyNavLinks && stickyNavLinks.length) {
                    var scrollPos = $(document).scrollTop();
                    stickyNav.find('a[href^="#"]').each(function () {
                        var currLink = $(this);
                        var refElement = $(currLink.attr("href")),
                            header = $('#header-main'),
                            anchorNav = $('.anchor-nav-box'),
                            headerHeight = header.outerHeight(),
                            anchorNavHeight = anchorNav.outerHeight(),
                            offset = 0;

                        if (refElement && refElement.length) {
                            if ($('body').hasClass('direction-up')) {
                                offset = anchorNavHeight + headerHeight;
                            } else {
                                offset =  anchorNavHeight + 50;
                            }

                            var currSection = (refElement.position().top <= (scrollPos + offset)) && (refElement.position().top + refElement.outerHeight(true)) > (scrollPos + offset);
                            if (currSection) {
                                stickyNavLinks.removeClass("active");
                                currLink.addClass("active");
                            }
                            else {
                                currLink.removeClass("active");
                            }
                        }
                    });
                }
            }

            $(document).on("scroll", onScroll);
        }



        function scrollEffects() {
            var $window = $(window),
                html = $('html'),
                body = $('body'),
                header = $('#header-main'),
                anchorNav = $('.anchor-nav-box.build'),
                lastScrollTop = 0;

            $window.on('load resize', function () {
                var currentPos = $window.scrollTop();

                body.removeClass('direction-up direction-down');
                header.removeClass('fixed');

                setTimeout(function () {
                    var windowWidth = $window.width(),
                        headerOffset = header.offset().top,
                        headerHeight = header.outerHeight(),
                        anchorNavHeight = anchorNav.outerHeight();

                    if (anchorNav.length) {
                        var anchorNavOffset = anchorNav.offset().top;
                    }

                    if (currentPos > headerHeight) {
                        setTimeout(function () {
                            if (!(anchorNav.hasClass('affix'))) {
                                anchorNav.addClass('affix');
                                anchorNav.next().css('margin-top', anchorNavHeight);
                            }
                        }, 500);
                    }

                    if (windowWidth < 1025) {
                        // for mobile & tablet
                        var headerTrigger = headerOffset + headerHeight;

                        $window.unbind('scroll');
                        $window.on('scroll', function () {
                            var top = $window.scrollTop();

                            if (lastScrollTop > top) {
                                // scroll UP
                                if (top == 0 && top < 2 * headerTrigger) {
                                    if (body.hasClass('direction-up')) {
                                        body.removeClass('direction-up');
                                        header.removeClass('fixed');
                                    }
                                } else if (top != 0 && top > 2 * headerTrigger) {
                                    if (!(body.hasClass('direction-up'))) {
                                        body.removeClass('direction-down').addClass('direction-up');
                                    }
                                }

                                //for anchor nav
                                if (anchorNav.length) {
                                    var anchorNavTrigger = headerHeight - 65;

                                    if (top < anchorNavTrigger) {
                                        if (anchorNav.hasClass('affix')) {
                                            anchorNav.removeClass('affix');
                                            anchorNav.next().css('margin-top', '0');
                                        }
                                    }
                                }
                            } else {
                                // scroll DOWN
                                if (top > 2 * headerTrigger) {
                                    if (!(body.hasClass('direction-down'))) {
                                        body.removeClass('direction-up').addClass('direction-down');
                                    }
                                }
                            }

                            //for anchor nav
                            if (anchorNav.length) {
                                var anchorNavTrigger = anchorNavOffset;

                                if (top > anchorNavTrigger) {
                                    if (!(anchorNav.hasClass('affix'))) {
                                        anchorNav.addClass('affix');
                                        anchorNav.next().css('margin-top', anchorNavHeight);
                                    }
                                }
                            }

                            lastScrollTop = top;
                        });
                    } else {
                        //for desktop
                        var headerTrigger = headerOffset + headerHeight;

                        $window.unbind('scroll');
                        $window.on('scroll', function () {
                            var top = $window.scrollTop();

                            if (lastScrollTop > top) {
                                // scroll UP
                                //for main nav
                                if (top == 0 && top < 2 * headerTrigger) {
                                    if (body.hasClass('direction-up')) {
                                        body.removeClass('direction-up');
                                        header.removeClass('fixed');
                                    }
                                } else if (top != 0 && top > 2 * headerTrigger) {
                                    if (!(body.hasClass('direction-up'))) {
                                        body.removeClass('direction-down').addClass('direction-up');
                                    }
                                }

                                //for anchor nav
                                if (anchorNav.length) {
                                    var anchorNavTrigger = headerHeight;

                                    if (top < anchorNavTrigger) {
                                        if (anchorNav.hasClass('affix')) {
                                            anchorNav.removeClass('affix');
                                            anchorNav.next().css('margin-top', '0');
                                        }
                                    }
                                }
                            } else {
                                // scroll DOWN
                                //for main nav
                                if (top > 2 * headerTrigger) {
                                    if (!(body.hasClass('direction-down'))) {
                                        body.removeClass('direction-up').addClass('direction-down');
                                    }
                                }

                                //for anchor nav
                                if (anchorNav.length) {
                                    var anchorNavTrigger = anchorNavOffset;

                                    if (top > anchorNavTrigger) {
                                        if (!(anchorNav.hasClass('affix'))) {
                                            anchorNav.addClass('affix');
                                            anchorNav.next().css('margin-top', anchorNavHeight);
                                        }
                                    }
                                }
                            }

                            lastScrollTop = top;
                        });
                    }
                }, 50);
            });
        }

        scrollEffects();

        // Accordion
        $(function() {
            var accordion = $('.accordion');

            accordion.on('click', function() {
                $(this).toggleClass('active');
                var panel = $(this).next();

                $('.panel').not(panel).slideUp();
                $('.accordion').not($(this)).removeClass('active');
                

                if(panel.is(':visible')) {
                    panel.slideUp();
                } else {
                    panel.slideDown();
                }

            });

        });

    });

});


