// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");
//console.log("rebuilding table");
  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
let filters = {};

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    let changedElement = d3.select(this);

    // 4b. Save the value that was changed as a variable.
    let elementValue = changedElement.property("value");
//    console.log(elementValue);

    // 4c. Save the id of the filter that was changed as a variable.
    let filterId = changedElement.attr("id")
//    console.log(filterId);
  
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (elementValue) {
      filters[filterId] = elementValue;
    }
    else {
      delete filters[filterId];
    }

    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
//console.log(filters);  
    // 8. Set the filtered data to the tableData.
    let filteredData = tableData;
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values

    console.log( "Loop start here...." );

    //Got help from Alex Dallman
    //1:51 PM Fri 3/11/2022, much better than a bruised forehead
    Object.entries(filters).forEach(([key, value]) => {
      filteredData = filteredData.filter(row => row[key] === value);
    });



//My version, still doesnt work right
// for (let i = 0; i < Object.keys(filters).length; i++) {
//   //      console.log(Object.keys(filters)[i]);
//   //      console.log("The filter: " + Object.entries(filters)[i][0]);
//   //      console.log("   is:" + Object.entries(filters)[i][1]);
//         switch (Object.entries(filters)[i][0]){
//         case 'datetime':
// //          console.log( Object.entries(filters)[i][0] + "   is:" + Object.entries(filters)[i][1] );
//           filteredData = filteredData.filter((row) => {row.datetime == Object.entries(filters)[i][1]});
//           console.log( "    filtering by date" );
//           break;
//         case 'city':
//           filteredData = filteredData.filter(row => {row.city == Object.entries(filters)[i][1]});
//           console.log( "    filtering by city: " + Object.entries(filters)[i][1]);
//           break;
//         case 'state':
//           filteredData = filteredData.filter(row => {row.state == Object.entries(filters)[i][1]});
//           console.log( "    filtering by state" );
//           break;
//         case 'country':
//           filteredData = filteredData.filter(row => {row.country == Object.entries(filters)[i][1]});
//           console.log( "    filtering by country" );
//           break;
//         case 'shape':
//           filteredData = filteredData.filter(row => {row.shape == Object.entries(filters)[i][1]});
//           console.log( "    filtering by shape: " + (Object.entries(filters)[i][1]) );
//           break;
//       }
//     }
// end my version


//        filteredData.filter(row => row.datetime === date)
  
    // 10. Finally, rebuild the table using the filtered data
//console.log("calling rebuilding table");
    buildTable(filteredData);
    
  }
  
  // 2. Attach an event to listen for changes to each filter
  d3.selectAll("#datetime").on("keyup", updateFilters);
  d3.selectAll("#city").on("keyup", updateFilters);
  d3.selectAll("#state").on("keyup", updateFilters);
  d3.selectAll("#country").on("keyup", updateFilters);
  d3.selectAll("#shape").on("keyup", updateFilters);

  // Build the table when the page loads
  buildTable(tableData);
