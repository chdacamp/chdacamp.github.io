// from data.js
var tableData = data;



var tbody = d3.select("tbody");


/* tableData.forEach((table) => {
  var row = tbody.append("tr");
  Object.entries(table).forEach(([key, value]) => {
    var cell = tbody.append("td");
    cell.text(value);
  });
}); */

var submit = d3.select("#filter-btn");

submit.on("click", function() {

  d3.event.preventDefault();

  var inputElement = d3.select("#datetime");

  var inputValue = inputElement.property("value");

  var filteredData = tableData.filter(tableData => tableData.datetime === inputValue);
  
	  filteredData.forEach((table) => {
		  var row = tbody.append("tr");
		  Object.entries(table).forEach(([key, value]) => {
			var cell = tbody.append("td");
			cell.text(value);
		});
	});
})
