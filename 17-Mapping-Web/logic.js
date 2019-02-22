
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"

  var myMap = L.map("map", {
    center: [
      30.09, -99.71
    ],
    zoom: 5,
  });
  
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);

// Perform a GET request to the query URL
d3.json(url, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});



function createFeatures(earthquakeData) {




for (var i = 0; i < earthquakeData.length; i++) {

  // Conditionals for magnitude
  var color = "";
  if (earthquakeData[i].properties.mag > 5) {
    color = "red";
  }
  else if (earthquakeData[i].properties.mag > 4) {
    color = "orange";
  }
  else if (earthquakeData[i].properties.mag > 3) {
    color = "yellow";
  }
  else {
    color = "green";
  }

var coords = [earthquakeData[i].geometry.coordinates[1],earthquakeData[i].geometry.coordinates[0]]

  // Add circles to map
L.circle(coords,{
    radius: earthquakeData[i].properties.mag*10000,
    fillColor: color,
    color: "black",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}).addTo(myMap).bindPopup("<h3>" + earthquakeData[i].properties.place +
      "</h3><hr><p>Magnitude:" + earthquakeData[i].properties.mag + "</p>"
	  +"<hr><p>" + new Date(earthquakeData[i].properties.time)+"</p>");



}
  // create legend

 var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = [5,4,3,2];
    var colors = ["red","orange","yellow","green"];
    var labels = [];

    // Add min & max
    var legendInfo = "<h1>Magnitude</h1><h4 align = 'center'>(Last 30 Days)<hr></h4>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">>" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);
  
  
}

  // Create our map, giving it the streetmap and earthquakes layers to display on load


  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map

