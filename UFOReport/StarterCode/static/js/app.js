// from data.js
var tableData = data;
var tbody = d3.select("tbody");


data.forEach((UFOReport) => {
    var row = tbody.append("tr");
    Object.entries(UFOReport).forEach(([key, value]) => {
      var cell = tbody.append("td");
      cell.text(value);
    });
  });

// Select the submit button
var submit = d3.select("#filter-btn");

submit.on("click", function() {

// Prevent the page from refreshing
    d3.event.preventDefault();

    // grab the value of the input field
    var value = d3.select("#datetime").node().value;

    console.log(value);
   

    var filteredData = tableData.filter(tableData => tableData.datetime === value);

    console.log(filteredData);
    tbody.html("");

    filteredData.forEach((UFOReport) => {
      var row = tbody.append("tr");
      Object.entries(UFOReport).forEach(([key, value]) => {
        var cell = tbody.append("td");
        cell.text(value);
      });
    });
  });
    // clear the existing output
   // output.html("");
  
