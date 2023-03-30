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


// Create a function called optionChanged for when new value is selected/clicked in dropdown menu
// Call the functions to display the new city info and plots
function optionChanged(city) {
  cityInfo(city);
};


// Create function to extract the city info when city name is selected
function cityInfo(city) {

  let result = infoArray.filter(row => row.City == city);

  let info = result[0];

  let wifiSpeed = info["Wifi Speed"]

  // Assign variable for selected element - Demographic Info Table
  let box = d3.select("#city-info");

  // Clear the data in the table
  box.html("");

  // Call gauge function to create gauge
  gauge(wifiSpeed);

  // Iterate through the result variable and append each key and property to city info table
  for (key in info) {
    box.append("h4").text(`${key}: ${info[key]}`);
  };

};

// Create a function for gauge chart
function gauge(speed) {

  var options = {
    series: [speed],
    chart: {
    height: 350,
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
        margin: 0, // margin is in pixels
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
          formatter: function(val) {
            return parseInt(val);
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

  // Plot gauge with options and then update chart to reset series to 0
  var chart = new ApexCharts(document.querySelector("#gauge"), options);
  chart.updateOptions({
    series:[],
  });

  // Render the chart 
  chart.render();
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

