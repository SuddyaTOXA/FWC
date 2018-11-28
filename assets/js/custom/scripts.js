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

        function scrollEffects() {
            var $window = $(window),
                html = $('html'),
                body = $('body'),
                header = $('#header-main'),
                breadcrumbsBar = $('.breadcrumbs-bar'),
                anchorNav = $('.page-nav.sticky-nav'),
                lastScrollTop = 0,
                triggerPlus = 0;

            setTimeout(function () {
                if ($window.width() < 1025) {
                    if (breadcrumbsBar.length) {
                        header.addClass('fixed');
                        breadcrumbsBar.css('opacity', '1');
                    }
                }
            }, 5000);

            $window.on('load resize', function () {
                body.removeClass('direction-up direction-down');
                header.removeClass('fixed');

                setTimeout(function () {
                    var windowWidth = $window.width(),
                        headerOffset = header.offset().top,
                        headerHeight = header.outerHeight();

                    if (anchorNav.length) {
                        var anchorNavOffset = anchorNav.offset().top;
                    }

                    if (windowWidth < 1025) {
                        // for mobile & tablet
                        var headerTrigger = headerOffset + headerHeight + triggerPlus;

                        if (breadcrumbsBar.length) {
                            header.addClass('fixed');
                            breadcrumbsBar.css('opacity', '1');
                        }

                        $window.unbind('scroll');
                        $window.on('scroll', function () {
                            var top = $window.scrollTop();

                            if (lastScrollTop > top) {
                                // scroll UP
                                if (breadcrumbsBar.length) {
                                    if (!(body.hasClass('direction-up'))) {
                                        body.removeClass('direction-down').addClass('direction-up');
                                    }
                                } else {
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
                                }
                            } else {
                                // scroll DOWN
                                if (breadcrumbsBar.length) {
                                    if (!(body.hasClass('direction-down'))) {
                                        body.removeClass('direction-up').addClass('direction-down');
                                    }
                                } else {
                                    if (top > 2 * headerTrigger) {
                                        if (!(body.hasClass('direction-down'))) {
                                            body.removeClass('direction-up').addClass('direction-down');
                                            setTimeout(function () {
                                                header.addClass('fixed');
                                            },400);
                                        }
                                    }
                                }
                            }

                            lastScrollTop = top;
                        });
                    } else {
                        //for desktop
                        var headerTrigger = headerOffset + headerHeight + triggerPlus;

                        if (breadcrumbsBar.length) {
                            header.removeClass('fixed');
                        }

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
                                    var anchorNavTrigger = anchorNavOffset - headerOffset - headerHeight;

                                    if (top < anchorNavTrigger) {
                                        if (anchorNav.hasClass('affix')) {
                                            anchorNav.removeClass('affix');
                                        }
                                    }
                                }
                            } else {
                                // scroll DOWN
                                //for main nav
                                if (top > 2 * headerTrigger) {
                                    if (!(body.hasClass('direction-down'))) {
                                        body.removeClass('direction-up').addClass('direction-down');
                                        setTimeout(function () {
                                            header.addClass('fixed');
                                        },350);
                                    }
                                }

                                //for anchor nav
                                if (anchorNav.length) {
                                    var anchorNavTrigger = anchorNavOffset;

                                    if (top > anchorNavTrigger) {
                                        if (!(anchorNav.hasClass('affix'))) {
                                            anchorNav.addClass('affix');
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

    });

});


