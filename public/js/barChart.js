let req = new XMLHttpRequest();
req.open(
  "GET",
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json",
  true
);
req.send();
req.onload = function() {
  const json = JSON.parse(req.responseText);
  const dataset = json["data"];
  console.log(dataset);

  const yMin = d3.min(dataset, d => d[1]);
  const yMax = d3.max(dataset, d => d[1]);

  console.log('yMin', yMin, 'yMax', yMax)

  const w = 963;
  const h = 500;
  const padding = 20;

  const xScale = d3
    .scaleLinear()
    .domain([0, dataset.length])
    .range([padding, w - padding]);
  const yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([h - padding, padding]);

  const svg = d3
    .select(".chart")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 3.5)
    .attr("y", (d, i) => yScale(d[1]))
    .attr("width", 2.5)
    .attr("height", (d, i) => h - yScale(d[1]))
    .attr("class");
};
