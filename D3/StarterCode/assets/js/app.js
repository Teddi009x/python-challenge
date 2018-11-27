var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 30,
  right: 40,
  bottom: 100,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select(`.chart`)
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var chartGroup = svg.append("g");
  

//Append a div to the body to create tooltips, and assign it a class.
d3.select(".chart")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 1);

// Import Data

//  d3.csv("/data/data.csv",function(err,healthData){
  //    if (err)throw console.err;
  //    ;

   d3.csv("assets/data/data.csv")
    .then(function(healthData) {
     
//    var poverty = healthData.map(data => data.poverty);
//     console.log("poverty", poverty);    
//    var healthcare = healthData.map(data => data.healthcare);
//     console.log("healthcare", healthcare); 
//      if(err) throw err;
      
      healthData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
      
        
      console.log(healthData)
    });


    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([0, d3.max(healthData, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(healthData, d => d.healthcare)])
      .range([height, 0]);


    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    
    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0`,` ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // // Step 5: Create Circles
    // // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
      .data(healthData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.poverty))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r", "15")
      .attr("fill", "lightblue")
      .attr("opacity", ".5");
    circlesGroup.append("text")
      .attr("dy", function(data, index){return 5;})
      .attr("text-anchor", "middle")
      .text(function(data, index){return data.abbr;})
      .attr("font-size", 10)
      .attr('fill', 'white');

    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>Poverty Rate %: ${d.poverty}<br>Lacks Healthcare %: ${d.healthcare}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // // Step 8: Create event listeners to display and hide the tooltip
    // // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Insurance (%)");

    chartGroup.append("text")
      .attr("transform", "translate(" + width / 2 + " ," + (height + margin.top + 30) + ")")
      .attr("class", "axisText")
      .text("In Poverty (%)");
});
