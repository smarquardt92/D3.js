// @TODO: YOUR CODE HERE!
function makeResponsive() {
    // SVG wrapper dimensions
    var svgWidth = 1200;
    var svgHeight = 660;

    var margin = {
        top: 50,
        right: 50,
        left: 50,
        bottom: 50
    };

    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;

    var svg = d3
        .select("#scatter")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // read CSV

    d3.csv("assets/data/data.csv")
        .then(function(censusData){
            censusData.forEach(function(data) {
                data.income = +data.income;
                data.obesity = +data.obesity;
                data.smokes = +data.smokes;
                data.abbr = data.abbr;
            });

    // Scales
        var xScale = d3.scaleLinear()
            .domain([20, d3.max(censusData, d => d.obesity)])
            .range([20, width]);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(censusData, d => d.income)])
            .range([height, 0]);
    // Create axis
        var xAxis = d3.axisBottom(xScale);
        var yAxis = d3.axisLeft(yScale);

    // Append axis
        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        chartGroup.append("g")
            .call(yAxis);

    // Create data circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(censusData)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.obesity))
        .attr("cy", d => yScale(d.income))
        .attr("r", 13)
        .attr("fill", "lightslategrey")
        .attr("stroke", "white");
    
    // Apend cirlce lables
    chartGroup.append("text")
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .style("color", "white")
        .selectAll("tspan")
        .data(censusData)
        .enter()
        .append("tspan")
            .attr("x", d => xScale(d.obesity))
            .attr("y", d => yScale(d.income))
            .text(d => d.abbr);

    // Axes labels
    // Y axis
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left - 9)
        .attr("x", 0 - (height/2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Average Income ($)")
    // X axis
        chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top - 3})`)
        .attr("class", "axisText")
        .text("Rate of Obesity (%)")

        // function update(data) {
        //     xScale
        //         .domain([0, d3.max(censusData, d => d.smokes)])
        //         .range([0, width]);

        // }
    });
    };


makeResponsive();

d3.select(window).on("resize", makeResponsive);
