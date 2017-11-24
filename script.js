var width = 600;
var height = 700;

var projection = d3.geo.mercator()
  .translate([1500, 300])
  .scale([900]);

var path = d3.geo.path().projection(projection);

var mapa = d3.select("div#mapa")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g");

var div = d3.select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

d3.select("div.tooltip")
  .append("h3");

d3.json("mapacolombia.geojson", function(json) {
  mapa.selectAll("path")
    .data(json.features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("stroke", "#fff")
    .style("fill", function(d) {
      if (d.properties["meso:name_local"] == "Bogota") {
        return "red";
      } else {
        return "#ccc";
      }
    })
    .style("stroke-width", "0.5")

  .on("mouseover", function(d) {
    console.log("corriendo");
    div.transition()
      .duration(200)
      .style("opacity", 0.9);
    div.select("h3")
      .text(d.properties["meso:name_local"]);
    div
      .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY - 30) + "px");
  })
})