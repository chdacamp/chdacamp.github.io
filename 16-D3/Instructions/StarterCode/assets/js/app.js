// @TODO: YOUR CODE HERE!


var svgWidth = 700;
var svgHeight = 500;


var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
   .classed("svg-container", true) //container class to make it responsive
   .append("svg")
   //responsive SVG needs these 2 attributes and no width and height attr
   .attr("preserveAspectRatio", "xMinYMin meet")
   .attr("viewBox","0 0 " + svgWidth + " " + svgHeight)
   //class to make it responsive
   .classed("svg-content-responsive", true); 

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);



  // Import Data
d3.csv("assets/data/data.csv")
  .then(function(sourceData) {

    // Parse Data/Cast as numbers
    // ==============================
    sourceData.forEach(function(data) {
      data.income = +data.income;
      data.smokes = +data.smokes;
    });

    // Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(sourceData, d => d.income)*0.9, d3.max(sourceData, d => d.income)*1.05])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(sourceData, d => d.smokes)*0.9, d3.max(sourceData, d => d.smokes)*1.05])
      .range([height, 0]);

    // Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    //  Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(sourceData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.income))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", "10")
    .attr("fill", "blue")
    .attr("opacity", ".5");

    // Create Text
    // ==============================
    var textGroup = chartGroup.selectAll("#abbr")
	.data(sourceData)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.income))
    .attr("y", d => yLinearScale(d.smokes))
	.text(d => d.abbr)
    .attr("font-family", "sans-serif")
    .attr("font-size", "8px")
	.attr("text-anchor", "middle")
	.attr("alignment-baseline", "middle")
	.attr("fill", "black");

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
	  .attr("text-anchor", "middle")
      .text("Percentage of Smokers (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
	  .attr("text-anchor", "middle")
      .text("Average Annual Income ($)");
  });
 