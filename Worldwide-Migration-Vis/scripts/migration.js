// Agilan Ampigaipathar 

// Create map instance
var chart = am4core.create("chartdiv", am4maps.MapChart);
chart.projection = new am4maps.projections.Orthographic();
chart.panBehavior = "rotateLongLat";
chart.deltaLongitude = 10;
chart.deltaLatitude = -20;
chart.geodata = am4geodata_worldLow;

// Create map polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

// Limit countries to present
polygonSeries.include = ["KR", "CN", "KP", "JP"];

polygonSeries.north = 90;

// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;

// Configure series
var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";
polygonTemplate.fill = am4core.color("#7ad067");

// Create hover state and set alternative fill color
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#367B25");

var graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
graticuleSeries.mapLines.template.line.stroke = am4core.color("#373ee3");
graticuleSeries.mapLines.template.line.strokeOpacity = 0.2;
graticuleSeries.fitExtent = false;

chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#1277c4");
chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;

var lineSeries = chart.series.push(new am4maps.MapLineSeries());
lineSeries.mapLines.template.stroke = am4core.color("#e03e96");
lineSeries.mapLines.template.strokeWidth = 4;
lineSeries.data = [{
  "multiGeoLine": [
    [
      { "latitude": 48.856614, "longitude": 2.352222 },
      { "latitude": 19.432608, "longitude": -99.133209 },
      { "latitude": 21.306944, "longitude": -157.858337 }
    ]
  ]
}];


// Zoom into Hong Kong and China off the start
let zoomTo = ["KR", "CN", "KP"];

chart.events.on("ready", function(ev) {
  // Init extremes
  var north, south, west, east;

  // Find extreme coordinates for all pre-zoom countries
  for(let i = 0; i < zoomTo.length; i++) {
    var country = polygonSeries.getPolygonById(zoomTo[i]);
    if (north == undefined || (country.north > north)) {
      north = country.north;
    }
    if (south == undefined || (country.south < south)) {
      south = country.south;
    }
    if (west == undefined || (country.west < west)) {
      west = country.west;
    }
    if (east == undefined || (country.east > east)) {
      east = country.east;
    }
    country.isActive = true
  }

  // Pre-zoom
  chart.zoomToRectangle(north, east, south, west, 2, true);
});
