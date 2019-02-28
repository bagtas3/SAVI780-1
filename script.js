// This isn't necessary but it keeps the editor from thinking L is a typo
/* global L */

var map = L.map('map').setView([34.03, -82.20], 5);
var myIcon = L.icon({
    iconUrl: 'https://glitch.com/edit/images/illustrations/new-stuff-cat.svg',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

// Add base layer
L.tileLayer('http://a.tile.stamen.com/toner/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

fetch('https://cdn.glitch.com/e000e4c2-1c3d-4106-abe9-81ce8f873147%2Fkedi7.geojson?1549927388027')
// fetch('https://data.cityofnewyork.us/resource/fhrw-4uyv.geojson?$where=latitude is not null')
  .then(function (response) {
    // Read data as JSON
    return response.json();
  })
  .then(function (data) {
    // Create the Leaflet layer for the data 
    var complaintLayer = L.geoJson(data, {
      
      // Show points as Icons
      pointToLayer: function (geoJsonPoint, latlng) {
        return L.marker(latlng, {icon: myIcon}).addTo(map);
      },
      
      // Then we can style them as we would other features
      
    });
  
    complaintLayer.bindPopup(function (layer) {
      // This function is called whenever a feature on the layer is clicked
      // Uncomment this to see all properties on the clicked feature:
      // console.log(layer.feature.properties);
      return '<div class="popup-complaint-type">' +
        '<span class="catSound">' + layer.feature.properties['Written form'] + '</span>' +'<br>' +
        '('+ layer.feature.properties['Languages in use'] + ')' +
      '</div>';
    });
  
    // Add data to the map
    complaintLayer.addTo(map);
  
    // Move the map view so that the complaintLayer is visible
    map.fitBounds(complaintLayer.getBounds());
  });