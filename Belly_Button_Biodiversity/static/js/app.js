 function buildMetadata(sample) {

// @TODO: Complete the following function that builds the metadata panel
console.log("Is this being run at all?");
// Use `d3.json` to fetch the metadata for a sample
d3.json(`/metadata/${sample}`).then(function(metadata, error)  {
  console.log(metadata);
  if (error) return console.warn(error);
  var $metadata = document.getElementById("sample-metadata");
  $metadata.innerHTML = "";
  for (var key in metadata){
    console.log("We are in the loop");
    tag = document.createElement("h6");
    h6text=document.createTextNode(`${key}:${metadata[key]}`);
    tag.append(h6text);
    $metadata.appendChild(tag);
  }

});
//     // Use d3 to select the panel with id of `#sample-metadata`

//     // Use `.html("") to clear any existing metadata

//     // Use `Object.entries` to add each key and value pair to the panel
//     // Hint: Inside the loop, you will need to use d3 to append new
//     // tags for each key-value in the metadata.

//     // BONUS: Build the Gauge Chart
//     // buildGauge(data.WFREQ);
 }

function buildCharts(sample) {
  
  console.log("what is sample"+sample);
  d3.json(`/samples/${sample}`).then(function(sdata, error)  {
    console.log(sdata);
    if (error) return console.warn(error);
    var $metadata = document.getElementById("sample-metadata");
    $metadata.innerHTML = "";

    // Pie Chart
    var piedata=[
      {
        values:sdata["sample_values"].slice(0,10),
        labels:sdata["otu_ids"].slice(0,10),
        hovertext:sdata["otu_labels"].slice(0,10),
        hoverinfo:"hovertext",
        type:"pie"
      }
    ];
    var pielayout ={
      margin: {t:0, l:0}
    };
// purge will be used on the div that you wish clear of Plotly plots
    Plotly.purge("pie");
    Plotly.plot("pie",piedata,pielayout)
    

// Bubble Chart
    var bubbledata =[
      {
      "x": sdata.otu_ids,
      "y": sdata.sample_values,
      "text": sdata.otu_labels,
      "mode": "markers",
      "marker": {
          "size": sdata.sample_values,
          "color": sdata.otu_ids,
          "colorscale": "Viridis"
        }
      }
    ];
    Plotly.purge("bubble");
    Plotly.plot("bubble",bubbledata)
  });
   
// purge will be used on the div that you wish clear of Plotly plots

    
};
//   // @TODO: Use `d3.json` to fetch the sample data for the plots

//     // @TODO: Build a Bubble Chart using the sample data

//     // @TODO: Build a Pie Chart
//     // HINT: You will need to use slice() to grab the top 10 sample_values,
//     // otu_ids, and labels (10 each).}

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
