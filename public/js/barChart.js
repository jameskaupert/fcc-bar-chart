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

  const yMin = 0
  const yMax = d3.max(dataset, d => d[1]);

  const xMin = d3.min(dataset, d => new Date(d[0]))
  const xMax = d3.max(dataset, d => new Date(d[0]))

  const margin = { top: 60, bottom: 60, left: 60, right: 60 }
  const w = 1000;
  const h = 500;

  const xScale = d3
    .scaleTime()
    .domain([xMin, xMax])
    .range([margin.left, w - margin.right]);
  const yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([h - margin.bottom, margin.top]);

  const xAxis = d3.axisBottom().scale(xScale)
  const yAxis = d3.axisLeft().scale(yScale)


  let tooltip = d3.select('.chart')
    .append('div')
    .attr('id', 'tooltip')
    .attr('class', 'tooltip')
    .style('opacity', 0)
    .style('position', 'absolute')
    .style('z-index', '10')
    .style('display', 'none')

  const svg = d3
    .select(".chart")
    .append("svg")
    .attr("width", w)
    .attr("height", h)

    svg.append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0, ${h - margin.bottom})`)
    .call(xAxis)

    svg
      .append('g')
      .attr('id', 'y-axis')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis)



  const barWidth = 4
  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d, i) => xScale(new Date(d[0])))
    .attr("y", (d, i) => yScale(d[1]))
    .attr("width", barWidth)
    .attr("height", (d, i) => h - margin.bottom - yScale(d[1]))
    .attr("class", "bar")
    .attr("data-date", d => d[0])
    .attr("data-gdp", d => d[1])
    .on('mouseover', function(d, i) {
      tooltip.transition()
             .duration(200)
      tooltip.style('opacity', '1')
             .style('display', 'block')
             .style('top', (event.pageY-10)+"px")
             .style('left', (event.pageX+10)+"px")
             .html('<div class="tooltipWrapper"><p>Date: ' + d[0] + '</p><p>GDP: ' + d[1] +'</p></div>')
             .attr('data-date', d[0])
    })
    .on('mouseout', function(d, i) {
      tooltip
        .style('opacity', '0')
        .style('display', 'none')
    })

};
