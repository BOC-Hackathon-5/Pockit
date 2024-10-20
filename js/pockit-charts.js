const toTimestamp = (strDate) => {
  const dt = new Date(strDate).getTime();
  return dt / 1000;
};

function createPieCharts(data){
     
  // const data = {
  //   "Total": 184,
  //   "Results": [
  //     {"transaction_id": "709", "pocket_id": "4", "description": "Water Bill", "category": "Utility Bill", "amount": "78.06", "timestamp": "2023-04-28 00:00:00"},
  //     {"transaction_id": "705", "pocket_id": "4", "description": "Online Grocery", "category": "Groceries", "amount": "186.22", "timestamp": "2023-04-27 00:00:00"},
  //     {"transaction_id": "704", "pocket_id": "4", "description": "Gas Station", "category": "Transportation", "amount": "80.78", "timestamp": "2023-04-27 00:00:00"},
  //     {"transaction_id": "703", "pocket_id": "4", "description": "Electric Bill", "category": "Utility Bill", "amount": "133.4", "timestamp": "2023-04-27 00:00:00"},
  //     {"transaction_id": "689", "pocket_id": "4", "description": "Gas Station", "category": "Transportation", "amount": "40.12", "timestamp": "2023-04-25 00:00:00"},
  //     {"transaction_id": "684", "pocket_id": "4", "description": "Taxi", "category": "Transportation", "amount": "7.12", "timestamp": "2023-04-24 00:00:00"},
  //     {"transaction_id": "685", "pocket_id": "4", "description": "Water Bill", "category": "Utility Bill", "amount": "101.8", "timestamp": "2023-04-24 00:00:00"},
  //     {"transaction_id": "679", "pocket_id": "4", "description": "Rent Payment", "category": "Housing", "amount": "102.64", "timestamp": "2023-04-23 00:00:00"}
  //     // Add more data as needed
  //   ]
  // };

  // Step 1: Process data to calculate the total amount spent per category
  const categoryTotals = {};

  data.Results.forEach(transaction => {
    const category = transaction.category;
    const amount = parseFloat(transaction.amount);

    if (categoryTotals[category]) {
      categoryTotals[category] += amount;
    } else {
      categoryTotals[category] = amount;
    }
  });

  // Convert the categoryTotals object into an array for the chart
  const chartData = Object.keys(categoryTotals).map(category => {
    return {
      category: category,
      value: categoryTotals[category]
    };
  });

  // Step 2: Create the pie chart using amCharts 5
  var root = am5.Root.new("chartdiv2");

  // Set themes
  root.setThemes([
    am5themes_Animated.new(root)
  ]);

  // Create chart
  var chart = root.container.children.push(am5percent.PieChart.new(root, {
    layout: root.verticalLayout
  }));

  // Create series
  var series = chart.series.push(am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category"
  }));

  // Set the processed data to the chart
  series.data.setAll(chartData);

  // Play initial series animation
  series.appear(1000, 100);

}

function createFunctionAmountsChart(amount_data){
    // Create root element
  var root = am5.Root.new("chartdiv");

  // Define a theme (optional)
  const myTheme = am5.Theme.new(root);

  myTheme.rule("AxisLabel", ["minor"]).setAll({
    dy:1
  });

  myTheme.rule("Grid", ["x"]).setAll({
    strokeOpacity: 0.05
  });

  myTheme.rule("Grid", ["x", "minor"]).setAll({
    strokeOpacity: 0.05
  });

  // Set themes
  root.setThemes([
    am5themes_Animated.new(root),
    myTheme
  ]);

  // Create chart
  var chart = root.container.children.push(am5xy.XYChart.new(root, {
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX",
    maxTooltipDistance: 0,
    pinchZoomX:true
  }));

  // Create axes
  var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
    maxDeviation: 0.2,
    baseInterval: {
      timeUnit: "day",
      count: 1
    },
    renderer: am5xy.AxisRendererX.new(root, {
      minorGridEnabled: true
    }),
    tooltip: am5.Tooltip.new(root, {})
  }));

  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  }));


  var pocket_names = ["emergency_savings", "savings_and_investments","splurge_money","living_expenses"];
  for (var n=0; n<pocket_names.length; n++){
    var name = pocket_names[n];

    // Add series
    var series = chart.series.push(am5xy.LineSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "amount",
      valueXField: "timestamp",
      legendValueText: "{valueY}",
      tooltip: am5.Tooltip.new(root, {
        pointerOrientation: "horizontal",
        labelText: "{valueY}"
      })
    }));

      var data = [];
      var current_data = amount_data[name];
      for (var i=0; i< current_data.length; i++){
          value= parseFloat(current_data[i]['amount']);
          kostakis = current_data[i]['timestamp'];
          data.push({"timestamp":kostakis,"amount":value});
      }

      // Convert timestamp to Date object (if necessary)
      data.forEach(function(item) {
        item.timestamp = new Date(item.timestamp).getTime();
      });

      // Set the data for the series
      series.data.setAll(data);
  }


  // Add cursor
  var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
    behavior: "none"
  }));
  cursor.lineY.set("visible", false);

  // Add scrollbar
  chart.set("scrollbarX", am5.Scrollbar.new(root, {
    orientation: "horizontal"
  }));

  // Add legend
  var legend = chart.rightAxesContainer.children.push(am5.Legend.new(root, {
    width: 200,
    paddingLeft: 15,
    height: am5.percent(100)
  }));

  // Set legend data after all events are set
  legend.data.setAll(chart.series.values);

  // Animate on load
  chart.appear(1000, 100);
}



am5.ready(function() {

  $.ajax({
    url: LOCALHOST+'/rest_api/get-all-amounts.php',  // Your backend endpoint
    method: 'GET',
    success: function(data) {
        createFunctionAmountsChart(data);
    },
    error: function(err) {
      console.error('Error fetching updates:', err);
    }
  });


  // Create Living Expenses Pie chart
  $.ajax({
    url: LOCALHOST+'/rest_api/get-transactions.php',  // Your backend endpoint
    method: 'GET',
    data: {"pocket_id": 4 },      // Send the pocket_id as a parameter
    dataType: 'json',  
    success: function(data) {
        createPieCharts(data);
    },
    error: function(err) {
      console.error('Error fetching updates:', err);
    }
  });

}); // end am5.ready()

// DOESNT WORK FROM THIS POINT - USE FOR REFERENCE

// am5.ready(function() {


// // Create root element
// // https://www.amcharts.com/docs/v5/getting-started/#Root_element
// var root = am5.Root.new("chartdiv");


// // Set themes
// // https://www.amcharts.com/docs/v5/concepts/themes/
// root.setThemes([
//   am5themes_Animated.new(root)
// ]);


// // Create chart
// // https://www.amcharts.com/docs/v5/charts/xy-chart/
// var chart = root.container.children.push(am5xy.XYChart.new(root, {
//   panX: true,
//   panY: true,
//   wheelX: "panX",
//   wheelY: "zoomX",
//   pinchZoomX: true,
//   paddingLeft: 0
// }));


// // Add cursor
// // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
// var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
// cursor.lineX.set("forceHidden", true);
// cursor.lineY.set("forceHidden", true);

// // Generate random data
// var date = new Date();
// date.setHours(0, 0, 0, 0);

// var value = 20;
// function generateData() {
//   value = am5.math.round(Math.random() * 10 - 4.8 + value, 1);
//   if (value < 0) {
//     value = Math.random() * 10;
//   }

//   if (value > 100) {
//     value = 100 - Math.random() * 10;
//   }
//   am5.time.add(date, "day", 1);
//   return {
//     date: date.getTime(),
//     value: value
//   };
// }

// function generateDatas(count) {
//   var data = [];
//   for (var i = 0; i < count; ++i) {
//     data.push(generateData());
//   }
//   return data;
// }


// // Create axes
// // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
// var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
//   baseInterval: {
//     timeUnit: "day",
//     count: 1
//   },
//   renderer: am5xy.AxisRendererX.new(root, {
//     minorGridEnabled: true,
//     minGridDistance: 90
//   })
// }));

// var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
//   renderer: am5xy.AxisRendererY.new(root, {})
// }));


// // Add series
// // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
// var series = chart.series.push(am5xy.LineSeries.new(root, {
//   name: "Series",
//   xAxis: xAxis,
//   yAxis: yAxis,
//   valueYField: "value",
//   valueXField: "date",
//   tooltip: am5.Tooltip.new(root, {
//     labelText: "{valueY}"
//   })
// }));

// series.fills.template.setAll({
//   fillOpacity: 0.2,
//   visible: true
// });


// // Add scrollbar
// // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
// chart.set("scrollbarX", am5.Scrollbar.new(root, {
//   orientation: "horizontal"
// }));

// // DRAGGABLE RANGE
// // add series range
// var rangeDataItem = yAxis.makeDataItem({});
// yAxis.createAxisRange(rangeDataItem);

// // create container for all elements, you can put anything you want top it
// var container = am5.Container.new(root, {
//   centerY: am5.p50,
//   draggable: true,
//   layout: root.horizontalLayout
// })

// // restrict from being dragged vertically
// container.adapters.add("x", function() {
//   return 0;
// });

// // restrict from being dragged outside of plot
// container.adapters.add("y", function(y) {
//   return Math.max(0, Math.min(chart.plotContainer.height(), y));
// });

// // change range when y changes
// container.events.on("dragged", function() {
//   updateLabel();
// });

// // this is needed for the bullets to be interactive, above the plot
// yAxis.topGridContainer.children.push(container);

// // create bullet and set container as a bullets sprite
// rangeDataItem.set("bullet", am5xy.AxisBullet.new(root, {
//   sprite: container
// }));

// // decorate grid of a range
// rangeDataItem.get("grid").setAll({
//   strokeOpacity: 1,
//   visible: true,
//   stroke: am5.color(0x000000),
//   strokeDasharray: [2, 2]
// })

// // create background for the container
// var background = am5.RoundedRectangle.new(root, {
//   fill: am5.color(0xffffff),
//   fillOpacity: 1,
//   strokeOpacity: 0.5,
//   cornerRadiusTL: 0,
//   cornerRadiusBL: 0,
//   cursorOverStyle: "ns-resize",
//   stroke: am5.color(0xff0000)
// })

// container.set("background", background);

// // add label to container, this one will show value and text
// var label = container.children.push(am5.Label.new(root, {
//   paddingTop: 5,
//   paddingBottom: 5
// }))

// // add x button 
// var xButton = container.children.push(am5.Button.new(root, {
//   cursorOverStyle: "pointer",
//   paddingTop: 5,
//   paddingBottom: 5,
//   paddingLeft: 2,
//   paddingRight: 8
// }))

// // add label to the button (you can add icon instead of a label)
// xButton.set("label", am5.Label.new(root, {
//   text: "X",
//   paddingBottom: 0,
//   paddingTop: 0,
//   paddingRight: 0,
//   paddingLeft: 0,
//   fill: am5.color(0xff0000)
// }))

// // modify background of x button
// xButton.get("background").setAll({
//   strokeOpacity: 0,
//   fillOpacity: 0
// })

// // dispose item when x button is clicked
// xButton.events.on("click", function() {
//   yAxis.disposeDataItem(rangeDataItem);
// })

// function updateLabel(value) {
//   var y = container.y();
//   var position = yAxis.toAxisPosition(y / chart.plotContainer.height());

//   if(value == null){
//     value = yAxis.positionToValue(position);
//   }

//   label.set("text", root.numberFormatter.format(value, "#.00") + ">Stop loss");

//   rangeDataItem.set("value", value);
// }

// // when data is validated, set range value to the middle
// series.events.on("datavalidated", () => {
//   var max = yAxis.getPrivate("max", 1);
//   var min = yAxis.getPrivate("min", 0);

//   var value = min + (max - min) / 2;
//   rangeDataItem.set("value", value);
//   updateLabel(value);
// })

// // Set data
// var data = generateDatas(300);
// series.data.setAll(data);

// // Make stuff animate on load
// // https://www.amcharts.com/docs/v5/concepts/animations/
// series.appear(1000);
// chart.appear(1000, 100);



// // Chart Pocket Budget

// // Create root element
// // https://www.amcharts.com/docs/v5/getting-started/#Root_element
// var root = am5.Root.new("chartdiv-pockets");


// // Set themes
// // https://www.amcharts.com/docs/v5/concepts/themes/
// root.setThemes([
//   am5themes_Animated.new(root)
// ]);


// // Create chart
// // https://www.amcharts.com/docs/v5/charts/xy-chart/
// var chart = root.container.children.push(am5xy.XYChart.new(root, {
//   panX: true,
//   panY: true,
//   wheelX: "panX",
//   wheelY: "zoomX",
//   pinchZoomX: true,
//   paddingLeft: 0
// }));


// // Add cursor
// // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
// var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
//   behavior: "none"
// }));
// cursor.lineY.set("visible", false);


// // The data
// var data = [{
//   "year": "1994",
//   "cars": 1587,
//   "motorcycles": 650,
//   "bicycles": 121
// }, {
//   "year": "1995",
//   "cars": 1567,
//   "motorcycles": 683,
//   "bicycles": 146
// }, {
//   "year": "1996",
//   "cars": 1617,
//   "motorcycles": 691,
//   "bicycles": 138
// }, {
//   "year": "1997",
//   "cars": 1630,
//   "motorcycles": 642,
//   "bicycles": 127
// }, {
//   "year": "1998",
//   "cars": 1660,
//   "motorcycles": 699,
//   "bicycles": 105
// }, {
//   "year": "1999",
//   "cars": 1683,
//   "motorcycles": 721,
//   "bicycles": 109
// }, {
//   "year": "2000",
//   "cars": 1691,
//   "motorcycles": 737,
//   "bicycles": 112
// }, {
//   "year": "2001",
//   "cars": 1298,
//   "motorcycles": 680,
//   "bicycles": 101
// }, {
//   "year": "2002",
//   "cars": 1275,
//   "motorcycles": 664,
//   "bicycles": 97
// }, {
//   "year": "2003",
//   "cars": 1246,
//   "motorcycles": 648,
//   "bicycles": 93
// }, {
//   "year": "2004",
//   "cars": 1318,
//   "motorcycles": 697,
//   "bicycles": 111
// }, {
//   "year": "2005",
//   "cars": 1213,
//   "motorcycles": 633,
//   "bicycles": 87
// }, {
//   "year": "2006",
//   "cars": 1199,
//   "motorcycles": 621,
//   "bicycles": 79
// }, {
//   "year": "2007",
//   "cars": 1110,
//   "motorcycles": 210,
//   "bicycles": 81
// }, {
//   "year": "2008",
//   "cars": 1165,
//   "motorcycles": 232,
//   "bicycles": 75
// }, {
//   "year": "2009",
//   "cars": 1145,
//   "motorcycles": 219,
//   "bicycles": 88
// }, {
//   "year": "2010",
//   "cars": 1163,
//   "motorcycles": 201,
//   "bicycles": 82
// }, {
//   "year": "2011",
//   "cars": 1180,
//   "motorcycles": 285,
//   "bicycles": 87
// }, {
//   "year": "2012",
//   "cars": 1159,
//   "motorcycles": 277,
//   "bicycles": 71
// }];


// // Create axes
// // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
// var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
//   categoryField: "year",
//   startLocation: 0.5,
//   endLocation: 0.5,
//   renderer: am5xy.AxisRendererX.new(root, {
//     minorGridEnabled: true,
//     minGridDistance: 70
//   }),
//   tooltip: am5.Tooltip.new(root, {})
// }));

// xAxis.data.setAll(data);

// var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
//   renderer: am5xy.AxisRendererY.new(root, {
//     pan: "zoom"
//   })
// }));

// // Add series
// // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

// function createSeries(name, field) {
//   var series = chart.series.push(am5xy.LineSeries.new(root, {
//     name: name,
//     xAxis: xAxis,
//     yAxis: yAxis,
//     stacked: true,
//     valueYField: field,
//     categoryXField: "year",
//     tooltip: am5.Tooltip.new(root, {
//       pointerOrientation: "horizontal",
//       labelText: "[bold]{name}[/]\n{categoryX}: {valueY}"
//     })
//   }));

//   series.fills.template.setAll({
//     fillOpacity: 0.5,
//     visible: true
//   });

//   series.data.setAll(data);
//   series.appear(1000);
// }

// createSeries("Cars", "cars");
// createSeries("Motorcycles", "motorcycles");
// createSeries("Bicycles", "bicycles");

// // Add scrollbar
// // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
// chart.set("scrollbarX", am5.Scrollbar.new(root, {
//   orientation: "horizontal"
// }));

// // Create axis ranges
// // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-ranges/
// var rangeDataItem = xAxis.makeDataItem({
//   category: "2001",
//   endCategory: "2003"
// });

// var range = xAxis.createAxisRange(rangeDataItem);

// rangeDataItem.get("grid").setAll({
//   stroke: am5.color(0x00ff33),
//   strokeOpacity: 0.5,
//   strokeDasharray: [3]
// });

// rangeDataItem.get("axisFill").setAll({
//   fill: am5.color(0x00ff33),
//   fillOpacity: 0.1,
//   visible: true
// });

// rangeDataItem.get("label").setAll({
//   inside: true,
//   text: "Fines for speeding increased",
//   rotation: 90,
//   centerX: am5.p100,
//   centerY: am5.p100,
//   location: 0,
//   paddingBottom: 10,
//   paddingRight: 15
// });


// var rangeDataItem2 = xAxis.makeDataItem({
//   category: "2007"
// });

// var range2 = xAxis.createAxisRange(rangeDataItem2);

// rangeDataItem2.get("grid").setAll({
//   stroke: am5.color(0x00ff33),
//   strokeOpacity: 1,
//   strokeDasharray: [3]
// });

// rangeDataItem2.get("axisFill").setAll({
//   fill: am5.color(0x00ff33),
//   fillOpacity: 0.1,
//   visible: true
// });

// rangeDataItem2.get("label").setAll({
//   inside: true,
//   text: "Motorcycle fee introduced",
//   rotation: 90,
//   centerX: am5.p100,
//   centerY: am5.p100,
//   location: 0,
//   paddingBottom: 10,
//   paddingRight: 15
// });

// // Make stuff animate on load
// // https://www.amcharts.com/docs/v5/concepts/animations/
// chart.appear(1000, 100);


// // Chart Allocations

// // Create root element
// // https://www.amcharts.com/docs/v5/getting-started/#Root_element
// var root = am5.Root.new("chartdiv-allocations");


// // Set themes
// // https://www.amcharts.com/docs/v5/concepts/themes/
// root.setThemes([
//   am5themes_Animated.new(root)
// ]);


// // Create chart
// // https://www.amcharts.com/docs/v5/charts/xy-chart/
// var chart = root.container.children.push(am5xy.XYChart.new(root, {
//   panX: true,
//   panY: true,
//   wheelX: "panX",
//   wheelY: "zoomX",
//   pinchZoomX: true,
//   paddingLeft: 0
// }));


// // Add cursor
// // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
// var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
//   behavior: "none"
// }));
// cursor.lineY.set("visible", false);


// // The data
// var data = [{
//   "year": "1994",
//   "cars": 1587,
//   "motorcycles": 650,
//   "bicycles": 121
// }, {
//   "year": "1995",
//   "cars": 1567,
//   "motorcycles": 683,
//   "bicycles": 146
// }, {
//   "year": "1996",
//   "cars": 1617,
//   "motorcycles": 691,
//   "bicycles": 138
// }, {
//   "year": "1997",
//   "cars": 1630,
//   "motorcycles": 642,
//   "bicycles": 127
// }, {
//   "year": "1998",
//   "cars": 1660,
//   "motorcycles": 699,
//   "bicycles": 105
// }, {
//   "year": "1999",
//   "cars": 1683,
//   "motorcycles": 721,
//   "bicycles": 109
// }, {
//   "year": "2000",
//   "cars": 1691,
//   "motorcycles": 737,
//   "bicycles": 112
// }, {
//   "year": "2001",
//   "cars": 1298,
//   "motorcycles": 680,
//   "bicycles": 101
// }, {
//   "year": "2002",
//   "cars": 1275,
//   "motorcycles": 664,
//   "bicycles": 97
// }, {
//   "year": "2003",
//   "cars": 1246,
//   "motorcycles": 648,
//   "bicycles": 93
// }, {
//   "year": "2004",
//   "cars": 1318,
//   "motorcycles": 697,
//   "bicycles": 111
// }, {
//   "year": "2005",
//   "cars": 1213,
//   "motorcycles": 633,
//   "bicycles": 87
// }, {
//   "year": "2006",
//   "cars": 1199,
//   "motorcycles": 621,
//   "bicycles": 79
// }, {
//   "year": "2007",
//   "cars": 1110,
//   "motorcycles": 210,
//   "bicycles": 81
// }, {
//   "year": "2008",
//   "cars": 1165,
//   "motorcycles": 232,
//   "bicycles": 75
// }, {
//   "year": "2009",
//   "cars": 1145,
//   "motorcycles": 219,
//   "bicycles": 88
// }, {
//   "year": "2010",
//   "cars": 1163,
//   "motorcycles": 201,
//   "bicycles": 82
// }, {
//   "year": "2011",
//   "cars": 1180,
//   "motorcycles": 285,
//   "bicycles": 87
// }, {
//   "year": "2012",
//   "cars": 1159,
//   "motorcycles": 277,
//   "bicycles": 71
// }];


// // Create axes
// // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
// var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
//   categoryField: "year",
//   startLocation: 0.5,
//   endLocation: 0.5,
//   renderer: am5xy.AxisRendererX.new(root, {
//     minorGridEnabled: true,
//     minGridDistance: 70
//   }),
//   tooltip: am5.Tooltip.new(root, {})
// }));

// xAxis.data.setAll(data);

// var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
//   renderer: am5xy.AxisRendererY.new(root, {
//     pan: "zoom"
//   })
// }));

// // Add series
// // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

// function createSeries(name, field) {
//   var series = chart.series.push(am5xy.LineSeries.new(root, {
//     name: name,
//     xAxis: xAxis,
//     yAxis: yAxis,
//     stacked: true,
//     valueYField: field,
//     categoryXField: "year",
//     tooltip: am5.Tooltip.new(root, {
//       pointerOrientation: "horizontal",
//       labelText: "[bold]{name}[/]\n{categoryX}: {valueY}"
//     })
//   }));

//   series.fills.template.setAll({
//     fillOpacity: 0.5,
//     visible: true
//   });

//   series.data.setAll(data);
//   series.appear(1000);
// }

// createSeries("Cars", "cars");
// createSeries("Motorcycles", "motorcycles");
// createSeries("Bicycles", "bicycles");

// // Add scrollbar
// // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
// chart.set("scrollbarX", am5.Scrollbar.new(root, {
//   orientation: "horizontal"
// }));

// // Create axis ranges
// // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-ranges/
// var rangeDataItem = xAxis.makeDataItem({
//   category: "2001",
//   endCategory: "2003"
// });

// var range = xAxis.createAxisRange(rangeDataItem);

// rangeDataItem.get("grid").setAll({
//   stroke: am5.color(0x00ff33),
//   strokeOpacity: 0.5,
//   strokeDasharray: [3]
// });

// rangeDataItem.get("axisFill").setAll({
//   fill: am5.color(0x00ff33),
//   fillOpacity: 0.1,
//   visible: true
// });

// rangeDataItem.get("label").setAll({
//   inside: true,
//   text: "Fines for speeding increased",
//   rotation: 90,
//   centerX: am5.p100,
//   centerY: am5.p100,
//   location: 0,
//   paddingBottom: 10,
//   paddingRight: 15
// });


// var rangeDataItem2 = xAxis.makeDataItem({
//   category: "2007"
// });

// var range2 = xAxis.createAxisRange(rangeDataItem2);

// rangeDataItem2.get("grid").setAll({
//   stroke: am5.color(0x00ff33),
//   strokeOpacity: 1,
//   strokeDasharray: [3]
// });

// rangeDataItem2.get("axisFill").setAll({
//   fill: am5.color(0x00ff33),
//   fillOpacity: 0.1,
//   visible: true
// });

// rangeDataItem2.get("label").setAll({
//   inside: true,
//   text: "Motorcycle fee introduced",
//   rotation: 90,
//   centerX: am5.p100,
//   centerY: am5.p100,
//   location: 0,
//   paddingBottom: 10,
//   paddingRight: 15
// });

// // Make stuff animate on load
// // https://www.amcharts.com/docs/v5/concepts/animations/
// chart.appear(1000, 100);


// }); // end am5.ready()