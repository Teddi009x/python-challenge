function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
var dataset =[]
d3.csv("dataSets/belly_button_metadata.csv", function(D) {
  return{
    ctu_id: +d.ctu_id,
    ctu_labelP d.ctu_label, // need to iterate thru columns
    data: 
  };
  , fuction(data){
    console.log(d[0]);
  };
});
    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
    // 
    
    
    
    
    // // Part 5 - Working Pie Chart
    // 
    // Columns in the csv
    // EVENT,ETHNICITY,GENDER,AGE,WFREQ,BBTYPE,LOCATION,COUNTRY012,ZIP012,COUNTRY1319,ZIP1319,
    // DOG,CAT,IMPSURFACE013,NPP013,MMAXTEMP013,PFC013,IMPSURFACE1319,NPP1319,MMAXTEMP1319,PFC1319
    // 
    // html:
    // // <script>
    //     var url = "/pie";
    //     d3.json(url).then(function(data){
    //         var layout = {
    //             title: "Lyric Frequency"}
    //         Plotly.plot("pie", data, layout);
    //     });
    //     </script>
    // 
    // Day 2 Act. 4 Stu_Stock shows 
    // How to Grab values from the data json object to build the plots

var trace1 = {
  labels: [otu_ids],
  values: [sample_values],
  type: 'pie'
};
// Trace1 for the Greek Data
var trace1 = {
  x: data.map(row => row.greekSearchResults),
  y: data.map(row => row.greekName),
  text: data.map(row => row.greekName),
  name: "Greek",
  type: "pie"
};

var data = [trace1];

var layout = {
  title: "'Pie' Chart",
};

Plotly.newPlot("pie", data, layout);

}
var dataset =[]
d3.csv("dataSets/belly_button_data.csv", function(D) {
  return{
    ctu_id: +d.ctu_id,
    ctu_labelP d.ctu_label,
    data: 
  };
  , fuction(data){
    console.log(d[0]);
  };
});

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
