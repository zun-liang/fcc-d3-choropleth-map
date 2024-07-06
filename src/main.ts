import "./style.css";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { Margin, UsTopology, EducationData } from "./types";

const width: number = 960;
const height: number = 600;
const margin: Margin = { top: 80, left: 70, right: 70, bottom: 80 };

const getCountyData = (education: EducationData[], id: string) => education.find(
  (e) => e.fips.toString().padStart(5, "0") === id
);

const getId = (d: any) => (d.id ?? "").toString();

Promise.all([
  d3.json<EducationData[]>(
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"
  ),
]).then((educationData) => {
  const education = educationData[0]!;

  const educationValues = education?.map((d) => d.bachelorsOrHigher)!;

  const colorScale = d3
    .scaleSequential(d3.interpolateGreens)
    .domain([d3.min(educationValues)!, d3.max(educationValues)!]);

  const drawMap = async () => {
    const us = await d3.json<UsTopology>("https://d3js.org/us-10m.v2.json");

    if (!us || !us.objects) {
      console.error("Failed to load or parse US topology data");
      return;
    }

    const states = topojson.feature(us, us.objects.states).features;
    const counties = topojson.feature(us, us.objects.counties).features;

    const svg = d3
      .select("div#app")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .classed("svg-content", true);

    const path = d3.geoPath();

    const tooltip = d3.select("body").append("div").attr("id", "tooltip");

    svg
      .append("g")
      .selectAll("path")
      .data(counties)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "county")
      .attr("data-fips", (d) => {
        const county = getCountyData(education, getId(d));
        return county ? county.fips.toString() : "";
      })
      .attr("data-education", (d) => {
        const county = getCountyData(education, getId(d));
        return county ? county.bachelorsOrHigher.toString() : "";
      })
      .attr("fill", (d) => {
        const county = getCountyData(education, getId(d));
        return county ? colorScale(county.bachelorsOrHigher) : "black";
      })
      .on("mouseover", (event, d) => {
        const county = getCountyData(education, getId(d));
        tooltip
          .style("display", "block")
          .html(
            `${county?.area_name}, ${county?.state}: ${county?.bachelorsOrHigher}%`
          )
          .attr("data-education", county?.bachelorsOrHigher.toString() ?? "å")
          .style("left", `${event.pageX - 50}px`)
          .style("top", `${event.pageY + 30}px`);
      })
      .on("mouseout", () => tooltip.style("display", "none"));

    svg
      .append("g")
      .selectAll("path")
      .data(states)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "state");

    svg
      .append("text")
      .text("United States Educational Attainment")
      .attr("id", "title")
      .attr("x", width / 2)
      .attr("y", -80)
      .attr("text-anchor", "middle");

    svg
      .append("text")
      .text(
        "Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)"
      )
      .attr("id", "description")
      .attr("x", width / 2)
      .attr("y", -30)
      .attr("text-anchor", "middle");

    const sourceText = "Source: USDA Economic Research Service";
    const linkText = "USDA Economic Research Service";
    const linkURL =
      "https://www.ers.usda.gov/data-products/county-level-data-sets/county-level-data-sets-download-data/";

    const textElement = svg
      .append("text")
      .attr("id", "source")
      .attr("x", width / 2 + 100)
      .attr("y", height + 20);

    textElement.append("tspan").text(sourceText.split(linkText)[0]);

    textElement
      .append("tspan")
      .append("a")
      .attr("xlink:href", linkURL)
      .append("tspan")
      .text(linkText);

    textElement.append("tspan").text(sourceText.split(linkText)[1]);

    const legendWidth = 250;
    const legendHeight = 10;
    const legendX = width - legendWidth - margin.right;
    const legendY = 0;

    const legend = svg
      .append("g")
      .attr("id", "legend")
      .attr("transform", `translate(${legendX}, ${legendY})`);

    const legendScale = d3
      .scaleLinear()
      .domain(colorScale.domain())
      .range([0, legendWidth])
      .nice();

    const legendAxis = d3.axisBottom(legendScale).ticks(6).tickSize(-legendHeight).tickFormat(d => `${d}%`);

    legend
      .selectAll("rect")
      .data(d3.range(legendWidth))
      .enter()
      .append("rect")
      .attr("x", (d) => d)
      .attr("y", 0)
      .attr("width", 1)
      .attr("height", legendHeight)
      .attr("fill", (d) => colorScale(legendScale(d / 10)));

    legend
      .append("g")
      .attr("transform", `translate(0, ${legendHeight})`)
      .call(legendAxis);
  };

  drawMap();
});
