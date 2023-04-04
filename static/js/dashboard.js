// Pop up message at page load
alert("Welcome to our project page on Best Cities for Workation!!!");


// Display data in console
console.log("Data:", data);


// Create empty array to hold all city names
var cityArray = [];


// Create empty array to hold the city's info to be displayed in box
var infoArray = []; 
var airQuality = [];
var waterPollution = [];
var countryArray = [];
var tripAdvisor = [];
var ig = [];


// Iterate through data for cities and its info. Then push to empty arrays
data.forEach(row => {
  infoArray.push({
    "City": row.City,
    "Country": row.Country,
    "Rank": row.Ranking,
    "Air Quality": parseFloat(row.Air_Quality).toFixed(2),
    "Water Pollution": parseFloat(row.Water_Pollution).toFixed(2),
    "Wifi Speed": row["Avg_WiFi_Speed(Mbps)"],
    
  });

  cityArray.push(row.City);
  countryArray.push(row.Country);
  airQuality.push(row.Air_Quality);
  waterPollution.push(row.Water_Pollution);
  tripAdvisor.push(row["No.TripAdvisor_Attractions"]);
  ig.push(row["No.Instagram_#Photos"]);
  
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


/* Create a function called optionChanged for when new value is selected/clicked in dropdown menu
Call the functions to display the new city info and plots*/
function optionChanged(city) {
  cityInfo(city);
};


// Create function to extract the city info when city name is selected
function cityInfo(city) {

  let result = infoArray.filter(row => row.City == city);

  let info = result[0];

  let wifiSpeed = info["Wifi Speed"]

  // Assign variable for selected element - city-info box
  let box = d3.select("#city-info");

  // Clear the data in the box
  box.html("");

  // Call gauge function to create gauge chart
  gauge(wifiSpeed);

  // Iterate through the info variable and append each key and property to city info box
  for (key in info) {
    box.append("h4").text(`${key}: ${info[key]}`);
  };

};

// Create a function for gauge chart
function gauge(speed) {

  var options = {
    series: [speed],
    chart: {
      height: 500,
      type: 'radialBar',
      toolbar: {
        show: true
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: '70%',
          background: '#fff',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: '#fff',
          strokeWidth: '67%',
          margin: 0, 
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },

        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '17px'
          },
          value: {
            formatter: function (val) {
              return `${parseInt(val)} Mbps`;
            },
            color: '#111',
            fontSize: '36px',
            show: true,
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#ABE5A1'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: 'round'
    },
    labels: ['Wifi Speed'],
  };

  // Plot gauge with options and then update options to reset series to 0
  var chart = new ApexCharts(document.querySelector("#gauge"), options);
  chart.updateOptions({
    series: [],
  });

  // Render the chart 
  chart.render();
};


// Assign variables for empty lists to hold Top Ten Cities values
var infoArray10 = [];
var cityArray10 = [];
var countryArray10 = [];
var airQuality10 = [];
var waterPollution10 = [];
var tripAdvisor10 = [];
var ig10 = [];


// Iterate through data to extract only the cities that ranked up to 10
data.slice(0,11).forEach(row =>{
  infoArray10.push(row);
  }); 

infoArray10.forEach(row =>{
  airQuality10.push(row.Air_Quality);
  cityArray10.push(row.City);
  countryArray10.push(row.Country);
  waterPollution10.push(row.Water_Pollution);
  tripAdvisor10.push(row["No.TripAdvisor_Attractions"]);
  ig10.push(row["No.Instagram_#Photos"]);

});


// Display array in console log to validate
console.log(infoArray10);


// Set traces 1-4 for bar chart
var trace1 = {
  x: cityArray,
  y: tripAdvisor,
  name: "TripAdvisor Attractions - All",
  type: "bar",
  marker: {color: "orchid"}
};

var trace2 = {
  x: cityArray,
  y: ig,
  name: "Instagram # Photos - All",
  type: "bar",
  marker: {color: "teal"}
};

var trace3 = {
  x: cityArray10,
  y: tripAdvisor10,
  name: "TripAdvisor - Top 10",
  type: "bar",
  marker: {color: "red"}
};

var trace4 = {
  x: cityArray10,
  y: ig10,
  name: "Instagram - Top 10",
  type: "bar",
  marker: {color: "green"}
};

// Set data for bar chart
var barData = [trace1, trace2, trace3, trace4];

// Set layout for bar chart
let barLayout = {
  margin: { t: 75, l: 75, b: 150 },
  title: "TripAdvisor Attractions & Instagram # Photos",
  xaxis: { title: "Cities" },
  barmode: "group"
};

// Plot bar chart with barData and barLayout
Plotly.newPlot("bar", barData, barLayout);


// Set layout for bubble chart
let bubbleLayout = {
  hovermode: "closest",
  xaxis: { title: "Cities" },
  title: "Air Quality & Water Pollution",
  margin: { t: 50, l: 75, b: 125 }
};

// Set traces 5-8 for bubble chart
var trace5 = {
  x: cityArray,
  y: airQuality,
  name: "Air Quality - All",
  type: "bubble",
  mode: "markers",
  marker: {
    size: airQuality,
    colorscale: "Sunset"
  }
};

var trace6 = {
  x: cityArray,
  y: waterPollution,
  name: "Water Pollution - All",
  type: "bubble",
  mode: "markers",
  marker: {
    size: waterPollution,
    colorscale: "Viridis"
  }
};

var trace7 = {
  x: cityArray10,
  y: airQuality10,
  name: "Air Quality - Top 10",
  type: "bubble",
  mode: "markers",
  marker: {
    size: airQuality,
    colorscale: "Blues"
  }
};

var trace8 = {
  x: cityArray10,
  y: waterPollution10,
  name: "Water Pollution - Top 10",
  type: "bubble",
  mode: "markers",
  marker: {
    size: waterPollution,
    colorscale: "Darkmint"
  }
};

// Set data for bubble chart
let bubbleData = [trace5, trace6, trace7, trace8];

// Plot bubble chart with bubbleData and bubbleLayout
Plotly.newPlot("bubble", bubbleData, bubbleLayout);

