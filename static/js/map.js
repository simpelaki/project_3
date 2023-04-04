// Display data with console.log
console.log("Data:", data);

// Assign cities variable to empty list
var cities = [];

// Iterate through data for cities and push to empty list
data.forEach(row => {
    // let city = row.City;
    cities.push(row.City)
});

// Display cities with console.log
console.log("Cities:", cities);

// Add the tile layers
var topo = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'", {
    attribution:
        'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
});

// L.titleLayer from https://leaflet-extras.github.io/leaflet-providers/preview/
var basic = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// L.tileLayer from "https://developers.google.com/maps/documentation/ios-sdk/tiles"
var satellite = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

// Create the map object
var myMap = L.map("map", {
    center: [40.7, -94.5],
    zoom: 3
});

// Add basic tile layer to map
basic.addTo(myMap);

// Icons referenced from https://github.com/coryasilva/Leaflet.ExtraMarkers
//     Create color icons for markers

var violetIcon = L.ExtraMarkers.icon({
    icon: "ion-wifi",
    iconColor: "white",
    markerColor: "purple",
    shape: "circle"
});

var blueIcon = L.ExtraMarkers.icon({
    icon: "ion-wifi",
    iconColor: "white",
    markerColor: "blue",
    shape: "circle"
});

var greenIcon = L.ExtraMarkers.icon({
    icon: "ion-wifi",
    iconColor: "white",
    markerColor: "green",
    shape: "penta"
});
var yellowIcon = L.ExtraMarkers.icon({
    icon: "ion-wifi",
    iconColor: "white",
    markerColor: "yellow",
    shape: "penta"
});

var orangeIcon = L.ExtraMarkers.icon({
    icon: "ion-wifi",
    iconColor: "white",
    markerColor: "orange",
    shape: "star"
});

var redIcon = L.ExtraMarkers.icon({
    icon: "ion-wifi",
    iconColor: "white",
    markerColor: "red",
    shape: "star"
});

// Create function to set legend colors by wifi hours
function setColor(wifi) {
    // Pass in true or false as arguements to validate thru the cases and return values
    switch (true) {
        case wifi >= 75:
            return redIcon;
        case wifi >= 60:
            return orangeIcon;
        case wifi >= 45:
            return yellowIcon;
        case wifi >= 30:
            return greenIcon;
        case wifi >= 15:
            return blueIcon;
        default:
            return violetIcon;
    }
};

// Create layer groups 
var locations = new L.LayerGroup();
var topFive = new L.layerGroup();
var topTen = new L.layerGroup();

// Iterate through data  to extract values
for (let i = 0; i < data.length; i++) {

    // Assign latitude and longitude values to variables
    let lat = data[i].Lat;
    let lng = data[i].Lng;
    let wifiSpeed = data[i]["Avg_WiFi_Speed(Mbps)"]

    // Add markers to the map
    // Pass latitude, longitude and setColor function 
    let marker = L.marker([lat, lng], { icon: setColor(wifiSpeed) })
        .bindPopup(
            `<h2>Location: </h2>`
            + `<h3>${data[i].City}, ${data[i].Country}</h3> <hr>`
            + `<h2>Rank: </h2>`
            + `<h3>${data[i].Ranking}</h3> <hr>`
            + `<h2>Wifi Speed: </h2>`
            + `<h3>${data[i]["Avg_WiFi_Speed(Mbps)"]} mbps</h3> <hr>`
            + `<h2>Average Sunshine (yearly): </h2>`
            + `<h3>${data[i]["Avg_Sunshine(hr/yr)"]} hours</h3> <hr>`            
            + `<h2>Air Quality: </h2>`
            + `<h3>${parseFloat(data[i].Air_Quality).toFixed(2)} </h3> <hr>`            
            + `<h2>Water Pollution: </h2>`
            + `<h3>${parseFloat(data[i].Water_Pollution).toFixed(2)} </h3> <hr>`);

    // Add markers to locations layer
    marker.addTo(locations);

    // Use conditional to filter markers for Top 5 and Top Ten 
    // Add markers to topFive and topTen layers
    if (data[i].Ranking <= 5) {
        marker.addTo(topFive);
    }
    ;
    if (data[i].Ranking <= 10) {
        marker.addTo(topTen);
    }
    ;
};

// Add layer groups to map
topFive.addTo(myMap);
topTen.addTo(myMap);
locations.addTo(myMap);


// Create baseMaps
var baseMaps = {
    Basic: basic,
    Topography: topo,
    Satellite: satellite

};

// Create overlays
var overlays = {
    "Top 5 Cities": topFive,
    "Top 10 Cities": topTen,
    Cities: locations
};

// Set control with layer groups to map
L.control
    .layers(baseMaps, overlays, { collapsed: false })
    .addTo(myMap);

// Create legend for wifi Hours ranges
var legend = L.control({ 
    position: "bottomright"
});

// Create the add ons for legend div container 
legend.onAdd = function () {
    var div = L.DomUtil.create("div", "info legend");
    div.innerHTML += "<h3 align = center>WIFI SPEED</h3> \n <h4 align = center>(average Mbps)</h4> <hr>"

    // Set wifi ranges for square labels
    var wifiRanges = [0, 15, 30, 45, 60, 75];

    // Set colors for square labels
    var colors = [
        "violet",
        "blue",
        "green",
        "yellow",
        "orange",
        "red"];

    // Iterate through wifiRanges to create labels for each color and add to div container
    for (var i = 0; i < wifiRanges.length; i++) {
        div.innerHTML += "<i style='background: "
            + colors[i]
            + "'></i> "
            + wifiRanges[i]
            + (wifiRanges[i + 1] ? "&ndash;" + wifiRanges[i + 1] + "<br>" : "+ ");
    }
    // returns this add ons to the div container created under variable div above with L.DomUtil.create
    return div;
};

// Add legend map
legend.addTo(myMap);
