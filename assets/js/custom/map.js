jQuery(document).ready(function($) {
    (function($) {
        function initMap() {
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: {lat:  37.6979, lng: -97.314},
                disableDefaultUI: true
            });

            setMarkers(map);
        }

// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
        var beaches = [
            ['San Francisco', '24335 Prielipp Road, # 124<br> Wildomar, CA 92595<br> Phone: 800-511-4159', 37.773972, -122.431297],
            ['Los Angeles', '24335 Prielipp Road, # 124<br> Wildomar, CA 92595<br> Phone: 800-511-4159', 34.0522342, -118.2436849],
            ['Las Vegas', '24335 Prielipp Road, # 124<br> Wildomar, CA 92595<br> Phone: 800-511-4159', 36.114647, -115.172813],
            ['Chicago', '24335 Prielipp Road, # 124<br> Wildomar, CA 92595<br> Phone: 800-511-4159', 41.881832, -87.623177]
        ];

        function setMarkers(map) {
            // Adds markers to the map.

            // Marker sizes are expressed as a Size of X,Y where the origin of the image
            // (0,0) is located in the top left of the image.

            // Origins, anchor positions and coordinates of the marker increase in the X
            // direction to the right and in the Y direction down.
            var image = {
                // url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                url: 'img/marker.png',
                // This marker is 20 pixels wide by 32 pixels high.
                size: new google.maps.Size(28, 37),
                // // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(14, 37)
            };
            // Shapes define the clickable region of the icon. The type defines an HTML
            // <area> element 'poly' which traces out a polygon as a series of X,Y points.
            // The final coordinate closes the poly by connecting to the first coordinate.
            var shape = {
                coords: [15,36,21,25,27,20,27,8,21,4,13,1,7,2,2,9,1,17,4,22],
                type: 'poly'
            };

            var infowindow =  new google.maps.InfoWindow({});

            for (var i = 0; i < beaches.length; i++) {
                var beach = beaches[i];
                var marker = new google.maps.Marker({
                    position: {lat: beach[2], lng: beach[3]},
                    map: map,
                    icon: image,
                    shape: shape,
                    title: beach[0]
                });

                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infowindow.setContent('<div class="service-marker-box">' +
                        '                           <h2 class="service-marker-title">' + beach[0] + '</h2>' +
                                                    '<div class="service-marker-info">' + beach[1] + '</div>' +
                                                '</div>');
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }
        }

        initMap();
        /*
        var center = {lat: 34.052235, lng: -118.243683};
        var locations = [
            ['Philz Coffee<br>\
    801 S Hope St A, Los Angeles, CA 90017<br>\
   <a href="https://goo.gl/maps/L8ETMBt7cRA2">Get Directions</a>',   34.046438, -118.259653],
            ['Philz Coffee<br>\
    525 Santa Monica Blvd, Santa Monica, CA 90401<br>\
   <a href="https://goo.gl/maps/PY1abQhuW9C2">Get Directions</a>', 34.017951, -118.493567],
            ['Philz Coffee<br>\
    146 South Lake Avenue #106, At Shoppers Lane, Pasadena, CA 91101<br>\
    <a href="https://goo.gl/maps/eUmyNuMyYNN2">Get Directions</a>', 34.143073, -118.132040],
            ['Philz Coffee<br>\
    21016 Pacific Coast Hwy, Huntington Beach, CA 92648<br>\
    <a href="https://goo.gl/maps/Cp2TZoeGCXw">Get Directions</a>', 33.655199, -117.998640],
            ['Philz Coffee<br>\
    252 S Brand Blvd, Glendale, CA 91204<br>\
   <a href="https://goo.gl/maps/WDr2ef3ccVz">Get Directions</a>', 34.142823, -118.254569]
        ];
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 9,
            center: center
        });
        var infowindow =  new google.maps.InfoWindow({});
        var marker, count;
        for (count = 0; count < locations.length; count++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[count][1], locations[count][2]),
                map: map,
                title: locations[count][0]
            });
            google.maps.event.addListener(marker, 'click', (function (marker, count) {
                return function () {
                    infowindow.setContent(locations[count][0]);
                    infowindow.open(map, marker);
                }
            })(marker, count));
        }
        /*
        var center = {lat: 34.052235, lng: -118.243683};

        var locations = [
            [  'Bozeman Montana 1',
                '24335 Prielipp Road, # 124 Wildomar, CA 92595 Phone: 800-511-4159',
                34.046438,
                -118.259653, ],
            [  'Bozeman Montana 1',
                '24335 Prielipp Road, # 124 Wildomar, CA 92595 Phone: 800-511-4159',
                34.042338,
                -118.251153, ],
            // [   ['title', 'Bozeman Montana 1'],
            //     ['info', '24335 Prielipp Road, # 124 Wildomar, CA 92595 Phone: 800-511-4159'],
            //     ['lat', 34.046438],
            //     ['lng', -118.259653]
            // ],
            // [   ['title', 'Bozeman Montana 2'],
            //     ['info', '24335 Prielipp Road, # 124 Wildomar, CA 92595 Phone: 800-511-4159'],
            //     ['lat', 34.046438],
            //     ['lng', -118.259653]
            // ],
            // [   ['title', 'Bozeman Montana 3'],
            //     ['info', '24335 Prielipp Road, # 124 Wildomar, CA 92595 Phone: 800-511-4159'],
            //     ['lat', 34.046438],
            //     ['lng', -118.259653]
            // ],
            // [   ['title', 'Bozeman Montana 4'],
            //     ['info', '24335 Prielipp Road, # 124 Wildomar, CA 92595 Phone: 800-511-4159'],
            //     ['lat', 34.046438],
            //     ['lng', -118.259653]
            // ],
            // [   ['title', 'Bozeman Montana 5'],
            //     ['info', '24335 Prielipp Road, # 124 Wildomar, CA 92595 Phone: 800-511-4159'],
            //     ['lat', 34.046438],
            //     ['lng', -118.259653]
            // ],
        ];
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 9,
            center: center
        });
        var infowindow =  new google.maps.InfoWindow({});
        var marker, count;
        for (count = 0; count < locations.length; count++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[count][3], locations[count][4]),
                map: map,
                title: locations[count][1]
            });
            google.maps.event.addListener(marker, 'click', (function (marker, count) {
                return function () {
                    infowindow.setContent(locations[count][2]);
                    infowindow.open(map, marker);
                }
            })(marker, count));
        }
/*
        var testPos = {lat: 39.1435, lng: -106.4239};
        // // The map, centered at Uluru
        // var map = new google.maps.Map(
        //     document.getElementById('map'), {zoom: 4, center: uluru});
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4.5,
            center: new google.maps.LatLng(39.1435, -106.4239),
            mapTypeId: 'roadmap'
        });

        var customIcon = 'img/marker.png';

        // var beaches = [
        //     ['Bondi Beach', -33.890542, 151.274856, 4],
        //     ['Coogee Beach', -33.923036, 151.259052, 5],
        //     ['Cronulla Beach', -34.028249, 151.157507, 3],
        //     ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
        //     ['Maroubra Beach', -33.950198, 151.259302, 1]
        // ];

        // The marker, positioned at Uluru
        var marker = new google.maps.Marker({
            position: testPos,
            icon: customIcon,
            map: map});

        function new_map( $el ) {

            // var
            var $markers = $el.find('.marker');

            // vars
            var args = {
                zoom		: 16,
                center		: new google.maps.LatLng(0, 0),
                disableDefaultUI: true,
                mapTypeId	: google.maps.MapTypeId.ROADMAP
            };

            // create map
            var map = new google.maps.Map( $el[0], args);

            // add a markers reference
            map.markers = [];

            // add markers
            $markers.each(function(){
                add_marker( $(this), map );
            });

            // center map
            center_map( map );

            // return
            return map;
        }

        function add_marker( $marker, map ) {
            // var
            var latlng = new google.maps.LatLng( $marker.attr('data-lat'), $marker.attr('data-lng') );

            // create marker
            var marker = new google.maps.Marker({
                position	: latlng,
                map			: map
            });

            // add to array
            map.markers.push( marker );

            // if marker contains HTML, add it to an infoWindow
            if( $marker.html() ) {
                // create info window
                var infowindow = new google.maps.InfoWindow({
                    content		: $marker.html()
                });

                // show info window when marker is clicked
                google.maps.event.addListener(marker, 'click', function() {

                    infowindow.open( map, marker );

                });
            }
        }

        function center_map( map ) {
            // vars
            var bounds = new google.maps.LatLngBounds();

            // loop through all markers and create bounds
            $.each( map.markers, function( i, marker ){
                var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );
                bounds.extend( latlng );
            });

            // only 1 marker?
            if( map.markers.length == 1 ) {
                // set center of map
                map.setCenter( bounds.getCenter() );
                map.setZoom( 16 );
            } else {
                // fit to bounds
                map.fitBounds( bounds );
            }
        }

        var map = null;

        $(document).ready(function(){
            $('.acf-map').each(function(){
                // create map
                map = new_map( $(this) );
            });
        });
        */
    })(jQuery);
});


