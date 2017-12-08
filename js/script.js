var map;
var markersArray = [];

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAfmdUZkf3Fgti6BE0wBGKlFNYHzocniTw&v=3.exp&callback=initMap';
  document.body.appendChild(script);
}
window.onload = loadScript;

//Initialize the map and its contents
function initMap() {  

    var styles = [
  {
    "stylers": [
      {
        "saturation": 5
      },
      {
        "visibility": "simplified"
      },
      {
        "weight": 1.5
      }
    ]
  },
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
];


    var mapOptions = {
        zoom: 13,
        center: {lat: 21.1458, lng: 79.0882},
        mapTypeControl: false,
        styles: styles,
        animation: google.maps.Animation.BOUNCE,
        disableDefaultUI: true
    };
    if($(window).width() <= 1080) {
        mapOptions.zoom = 12;
    }
    if ($(window).width() < 850 || $(window).height() < 595) {
        hideNav();
         mapOptions.zoom = 13;
    }

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);  

    setMarkers(markers);

    setAllMap();

    //Reset map on click handler 
    function resetMap() {
        var windowWidth = $(window).width();
        if(windowWidth <= 1080) {
            map.setZoom(12);
            map.setCenter(mapOptions.center);
        } else if(windowWidth > 1080) {
            map.setZoom(13);
            map.setCenter(mapOptions.center);   
        }
    }
    $("#reset").click(function() {
        resetMap();
    });
   $(window).resize(function() {
        resetMap();
    }); 
        
}

//Determines if markers should be visible
//This function is passed in the knockout viewModel function
function setAllMap() {
  for (var i = 0; i < markers.length; i++) {
    if(markers[i].status === true) {
    markers[i].holdMarker.setMap(map);
    } else {
    markers[i].holdMarker.setMap(null);
    }
  }
}



//Information about the different locations
//Provides information for the markers
var markers = [
    {   
    title: "Lisbet Pizza n' Pasta",
    lat: 21.148105, 
    lng: 79.092925,
    streetAddress: "Food Court Empress Mall, Empress City",
    cityAddress: "Nagpur,Maharashtra",
    url: "http://www.zomato.com/nagpur/lisbet-pizza-pasta-sitabuldi",
    id: "nav0",
    visible: ko.observable(true),
   status: true
    },
    {   
    title: "Pablo - The Art Cafe' Lounge",
    lat: 21.150211, 
    lng: 79.067638,
    streetAddress: "240/A, East High Court Road, Civil Lines",
    cityAddress: "Nagpur,Maharashtra",
    url: "http://www.zomato.com/nagpur/pablo-the-art-cafe-lounge-civil-lines",
    id: "nav1",
    visible: ko.observable(true),
   status: true
    },
    {   
    title: "Barbeque Nation",
    lat: 21.143273, 
    lng: 79.080250,
    streetAddress: "2nd Floor, Eternity Mall, Amravati Road, Sitabuldi",
    cityAddress: "Nagpur,Maharashtra",
    url: "http://www.zomato.com/nagpur/barbeque-nation-sitabuldi",
    id: "nav2",
    visible: ko.observable(true),
    status: true
    },
    {   
    title: "Kareem's",
    lat: 21.174828, 
    lng: 79.077735,
    streetAddress: "Ground Floor, Aman Lifestyle Nelson Square, Rajnagar, Sadar",
    cityAddress: "Nagpur,Maharashtra",
    url: "http://www.zomato.com/nagpur/kareems-sadar",
    id: "nav3",
    visible: ko.observable(true),
    status: true
    },
    {
    title: "The Pizza hut",
    lat: 21.125825, 
    lng: 79.061431,
    streetAddress: "South Ambazari Road, Bajaj Nagar",
    cityAddress: "Nagpur,Maharashtra",
    url: "http://www.zomato.com/nagpur/pizza-hut-1-bajaj-nagar",
    id: "nav4",
    visible: ko.observable(true),
    status: true
    },
    {   
    title: "Mainland China",
    lat: 21.089099, 
    lng: 79.064767,
    streetAddress: "Plot 19, Wardha Road",
    cityAddress: "Nagpur,Maharashtra",
    url: "http://www.zomato.com/nagpur/mainland-china-wardha-road",
    id: "nav5",
    visible: ko.observable(true),
    status: true
    },
    {
    title: "Little Italy",
    lat: 21.149472, 
    lng: 79.067059,
    streetAddress: "Plot 1, Near MLA Hostel, Civil Lines",
    cityAddress: "Nagpur,Maharashtra",
    url: "http://www.zomato.com/nagpur/little-italy-civil-lines",
    id: "nav6",
    visible: ko.observable(true),
    status: true
    },
    {
    title: "10 Downing Street",
    lat: 21.136635, 
    lng: 79.078384,
    streetAddress: "5th Floor, Milestone Building, Wardha Road, Ramdaspeth",
    cityAddress: "Nagpur,Maharashtra",
    url: "http://www.zomato.com/nagpur/10-downing-street-ramdaspeth",
    id: "nav7",
    visible: ko.observable(true),
    status: true
    },
    {
    title: "Mocha",
    lat: 21.137732, 
    lng: 79.058609,
    streetAddress: "202, Cement Road, Shankar Nagar, Dharampeth",
    cityAddress: "Nagpur,Maharashtra",
    url: "http://www.zomato.com/nagpur/mocha-dharampeth?zrp_bid=0&zrp_pid=1&ref_id=33&ref_type=city",
    id: "nav8",
    visible: ko.observable(true),
    status: true
    }   
    ,
    {
    title: "Panino-The Sandwich World ",
    lat: 21.146497, 
    lng: 79.135158,
    streetAddress: "panino ,Opposite INOX Mall, Wardhaman Nagar",
    cityAddress: "Nagpur,Maharashtra",
    url: "http://www.zomato.com/nagpur/panino-the-sandwich-world-wardhaman-nagar",
    id: "nav9",
    visible: ko.observable(true),
    status: true
    },
    {
    title: "Crostino",
    lat: 21.134221, 
    lng: 79.115955,
    streetAddress: "329/B, Sharda Chowk, Ganesh Nagar, Nandanvan",
    cityAddress: "Nagpur,Maharashtra",
    url: "http://www.zomato.com/nagpur/crostino-nandanvan",
    id: "nav10",
    visible: ko.observable(true),
    status: true
    }   
];


    //Google Street View Image for each inidividual marker & Passed lat and lng to get each image location    
var streetViewImage;
var streetViewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=180x90&location=';

function MarkerImage() {
    if (i == 3) {
        streetViewImage = streetViewUrl + '21.1458, 79.0882&fov=75&pitch=0';                 
    } else if (i === 4) {
        streetViewImage = streetViewUrl + markers[i].streetAddress + ',' + markers[i].cityAddress +'&fov=75&pitch=0';
    } else {
       streetViewImage = streetViewUrl + markers[i].lat + ',' + markers[i].lng +'&fov=75&pitch=0'; 
                    }                   
}

//Sets the markers on the map within the initialize function
    //Sets the infoWindows to each individual marker
    //The markers are inidividually set using a for loop
function setMarkers(location) {
    
    for(i=0; i<location.length; i++) {
        location[i].holdMarker = new google.maps.Marker({
          position: new google.maps.LatLng(location[i].lat, location[i].lng),
          map: map,
          title: location[i].title,
           animation: google.maps.Animation.BOUNCE,
           id: i,
          icon: {
            url: 'img/mark_s.png',
            size: new google.maps.Size(54, 54),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(12.5, 40)
            }
        });

        //function to place google street view images within info windows
        MarkerImage();

        //infoWindow content to each marker
     location[i].contentString = '<img src="' + streetViewImage + '" alt="Street View Image of ' + location[i].title + '"><br><hr style="margin-bottom: 5px"><strong>' + location[i].title + '</strong><br><p>' + location[i].streetAddress + '<br>' + location[i].cityAddress + '<br></p><a class="web-links" href="http://' + location[i].url + '" target="_blank">' + location[i].url + '</a>';

        var infowindow = new google.maps.InfoWindow({
            content: markers[i].contentString
        });

        //Click marker to view infoWindow
            //zoom in and center location on click
        new google.maps.event.addListener(location[i].holdMarker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(location[i].contentString);
            infowindow.open(map,this);
            var windowWidth = $(window).width();
            if(windowWidth <= 1080) {
                map.setZoom(14);
            } else if(windowWidth > 1080) {
                map.setZoom(16);  
            }
            map.setCenter(marker.getPosition());
            location[i].picBoolTest = true;
          }; 
        })(location[i].holdMarker, i));
        
        //Click nav element to view infoWindow
            //zoom in and center location on click
        var searchNav = $('#nav' + i);
        searchNav.click((function(marker, i) {
          return function() {
            infowindow.setContent(location[i].contentString);
            infowindow.open(map,marker);
            map.setZoom(16);
            map.setCenter(marker.getPosition());
            location[i].picBoolTest = true;
          }; 
        })(location[i].holdMarker, i));
    }
}

//Query through the different locations from nav bar with knockout.js
    //only display markers and nav elements that match query result
var viewModel = {
    query: ko.observable(''),
};

viewModel.markers = ko.dependentObservable(function() {
    var self = this;
    var search = self.query().toLowerCase();
    return ko.utils.arrayFilter(markers, function(marker) {
    if (marker.title.toLowerCase().indexOf(search) >= 0) {
            marker.status = true;
            return marker.visible(true);
        } else {
            marker.status = false;
            setAllMap();
            return marker.visible(false);
        }
    });       
}, viewModel);

ko.applyBindings(viewModel);

//show $ hide markers in sync with nav
$("#input").keyup(function() {
setAllMap(map);
});

//Hide and Show entire Nav/Search Bar on click
    // Hide/Show Bound to the arrow button
    //Nav is repsonsive to smaller screen sizes
var isNavVisible = true;
function noNav() {
    $("#place-nav").animate({
                height: 0, 
            }, 500);
            setTimeout(function() {
                $("#place-nav").hide();
            }, 500);    
            $("#arrow").attr("src", "img/menu.png");
            isNavVisible = false;
}
function yesNav() {
    $("#place-nav").show();
            var scrollerHeight = $("#scroller").height() + 55;
            if($(window).height() < 600) {
                $("#place-nav").animate({
                    height: scrollerHeight - 100,
                }, 500, function() {
                    $(this).css('height','auto').css("max-height", 439);
                });  
            } else {
            $("#place-nav").animate({
                height: scrollerHeight,
            }, 500, function() {
                $(this).css('height','auto').css("max-height", 549);
            });
            }
            $("#arrow").attr("src", "img/up-arrow.png");
            isNavVisible = true;
}

function hideNav() {
    if(isNavVisible === true) {
            noNav();
            
    } else {
            yesNav();  
    }
}
$("#arrow").click(hideNav);

//Hide Nav if screen width is resized to < 850 or height < 595
//Show Nav if screen is resized to >= 850 or height is >= 595
    //Function is run when window is resized
$(window).resize(function() {
    var windowWidth = $(window).width();
    if ($(window).width() < 850 && isNavVisible === true) {
            noNav();
        } else if($(window).height() < 595 && isNavVisible === true) {
            noNav();
        }
    if ($(window).width() >= 850 && isNavVisible === false) {
            if($(window).height() > 595) {
                yesNav();
            }
        } else if($(window).height() >= 595 && isNavVisible === false) {
            if($(window).width() > 850) {
                yesNav();
            }     
        }    
});

function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      }

googleError = function googleError() {
    alert(
        'Oops. Google Maps did not load. Please refresh the page and try again!'
    );
};