function createMap(geoStations) {


  
  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });
  
  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap,
    "Dark Map": darkmap
  };

  // Create an overlayMaps object to hold the geoStations layer
  var overlayMaps = {
    "Earthquake Points": geoStations
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [lightmap, geoStations]
  });

  // // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  // L.control.layers(baseMaps, overlayMaps, {
  //   collapsed: false
  // }).addTo(map);
}

// function createMarkers(response) {

//   // Pull the "earthquakes" properties off of response.data
//   var stations = response.data.properties;

//   // Initialize an array to hold bike markers
//   var eqMarkers = [];

//   // Loop through the earthquake array
//   for (var index = 0; index < stations.length; index++) {
//     var coordinate = coordinates[index];

//     // For each station, create a marker and bind a popup with the station's name
//     var eqMarkers = L.marker([coordinate.lat, earthquake.lon])
//       .bindPopup("<h3>" + earthquake.mag + "<h3><h3>Magnitude: " + station.capacity + "<h3>");

//     // Add the marker to the eqMarkers array
//     eqMarkers.push(eqMarkers);
//   }

  // Create a layer group made from the bike markers array, pass it into the createMap function
//   createMap(L.layerGroup(eqMarkers));
// }


// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json", createMarkers);
