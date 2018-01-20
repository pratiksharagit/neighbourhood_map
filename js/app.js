var map; 
var infoWindow;

var markersDataArray = [
  {
    title: 'Gillys Rest-O-Bar',
    lat: 12.9329866,
    lng: 77.6147555,
    id: '53a5aa42498e7989b0b0bb3d'
  }, {
    title: 'Koramangala Social',
    lat: 12.9353938,
    lng: 77.6142306,
    id: '57fe668e498ea64ba5a539e4'
  }, {
    title: 'Fennys Lounge & Kitchen',
    lat: 12.9351457,
    lng: 77.6135365,
    id: '512dd16dd86cdfb81d74a7fc'
  }, {
    title: 'Harrys Bar + cafe',
    lat: 12.9343937,
    lng: 77.6126163,
    id: '54df893d498ecbdb398313f9'
  }, {
    title: 'Over The Top',
    lat: 12.934433,
    lng: 77.6234804,
    id: '4fb91b99e4b057d608b56457'
  }
];

function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 12.9353938, lng: 77.6142306},
    zoom: 14
  });

  infoWindow = new google.maps.InfoWindow();
  ko.applyBindings(new ViewModel());
}

function handleGoogleMapsError() {
  alert('Fail to load Google Maps');
}

function MarkerObj(data) {
  var that = this;

  this.title = data.title;
  this.lat = data.lat;
  this.lng = data.lng;
  this.id = data.id;

  this.address = '';
  this.url = '';

  this.marker = new google.maps.Marker({
    position: new google.maps.LatLng(data.lat, data.lng),
    map: map,
    title: data.title,
    animation: google.maps.Animation.DROP
  });

  var urlEnd = '?client_id=FXVJMKAQRLD40WOSNBH52XI1VPME1W01SB0RVO1S4NDNTXDP&client_secret=UL1XQ1KGTPPCA0DHUVMTCX5WVCHVUNYMWNYO0DVCEJ4KEQE5&v=20180109';

  $.ajax({
    url: 'https://api.foursquare.com/v2/venues/' + data.id + urlEnd,
      dataType: "json",
      success: function(data) {

        var results = data.response.venue;
    		that.address = results.location.formattedAddress[0] + ' - ' + results.location.formattedAddress[1]; // formattedAddress[0] is street and [2] city, state
        that.url = results.url;
      },
      error: function() {
        alert('Failed to connect to Foursquare');
      }
  });


  this.marker.addListener('click', function() {

    loungeURL = that.url ? '<div><a href="' + that.url + '" target="_blank">' + that.url + '</a></div>' : '';

    that.infoWindowContent = '<div style="text-align: center;"><strong>' + data.title + '</strong></div>' +
                             '<div>' + that.address + '</div>' + loungeURL;

    infoWindow.setContent(that.infoWindowContent);
    infoWindow.open(map, this);
    that.marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
        that.marker.setAnimation(null);
    }, 700);
  });

  MarkerObj.prototype.listClick = function() {
    google.maps.event.trigger(this.marker, 'click');
  };
}

function ViewModel() {
  var that = this;

  this.markersArray = ko.observableArray([]);

  markersDataArray.forEach(function(data) {
    that.markersArray.push(new MarkerObj(data));
  });

  var bounds = new google.maps.LatLngBounds();

  this.markersArray().forEach(function(data) {

    data.marker.setMap(map);

    bounds.extend(data.marker.position);
  });

  map.fitBounds(bounds); 

  google.maps.event.addDomListener(window, 'resize', function() {
    map.fitBounds(bounds);
  });

  this.visibleMarkersArray = ko.observableArray([]);

  this.markersArray().forEach(function(data) {
    that.visibleMarkersArray.push(data);
  });

  this.userInput = ko.observable('');

  this.filter = function() {

    infoWindow.close();

    var input = that.userInput().toLowerCase();

    that.visibleMarkersArray.removeAll();

    that.markersArray().forEach(function(data) {
      if(data.title.toLowerCase().includes(input) === true) {
        data.marker.setVisible(true);
        that.visibleMarkersArray.push(data);
      } else {
        data.marker.setVisible(false);
      }
    });
  };

}
