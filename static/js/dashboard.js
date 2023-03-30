// Display data in console
console.log("Data:", data);

// Create empty array to hold all city names
var cityArray = [];

// Create empty array to hold the city's info to be displayed in box
var infoArray = [];

var airQuality = [];
var waterPollution = [];
var countryArray = [];

// Iterate through data for cities and its info. Then push to empty arrays
data.forEach(row => {
    infoArray.push({
        "City": row.City,
        "Country": row.Country,
        "Rank": row.Ranking,
        "Air Quality": parseFloat(row.Air_Quality).toFixed(2),
        "Water Pollution": parseFloat(row.Water_Pollution).toFixed(2),
        "Wifi Speed": row["Avg_WiFi_Speed(Mbps)"]
    });

    cityArray.push(row.City);
    countryArray.push(row.Country);
    airQuality.push(row.Air_Quality);
    waterPollution.push(row.Water_Pollution);

});

// Display cities and info to console.log for validation
console.log("Cities:", cityArray);
console.log("Info:", infoArray);

// Assign variable for selected element - City dropdown menu 
let selector = d3.select("#selDataset");

// Iterate through cityArray and append to selected element for drop down menu
for (let i = 0; i < cityArray.length; i++) {
    selector
        .append("option")
        .text(cityArray[i])
        .property("value", cityArray[i])
};

// Call cityInfo function to display the info for first city as default
cityInfo(cityArray[0]);

// Create function to extract the city info when city name is selected
function cityInfo(city) {

    let result = infoArray.filter(row => row.City == city);

    let info = result[0];
    // Extract dictionary from array and assign to variable

    // Assign variable for selected element - Demographic Info Table
    let box = d3.select("#city-info");

    // Clear the data in the table
    box.html("");

    // Iterate through the result variable and append each key and property to city info table
    for (key in info) {
        box.append("h4").text(`${key}: ${info[key]}`);
    };

};


// Create a function called optionChanged for when new value is selected/clicked in dropdown menu
// Call the functions to display the new city info and plots
function optionChanged(city) {
    cityInfo(city);
};

// Set layout for bubble chart
let bubbleLayout = {
    title: "Air Quality by Cities",
    margin: { t: 0 },
    hovermode: "closest",
    xaxis: { title: "Cities" },
    margin: { t: 30 }
};

// Set data for bubble chart
let bubbleData = [
    {
        x: cityArray,
        y: airQuality,
        mode: "markers",
        marker: {
            size: airQuality,
            color: airQuality,
            colorscale: "Earth"
        }
    }
];

// Plot bubble chart with bubbleData and bubbleLayout
Plotly.newPlot("bubble", bubbleData, bubbleLayout);


