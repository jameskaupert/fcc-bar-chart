const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

const w = 500;
const h = 100;

const svg = d3
  .select(".container")
  .append("svg")
  .attr("width", w)
  .attr("height", h);