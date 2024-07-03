import "./style.css";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { Margin, UsTopology, EducationData } from "./types";

const width: number = 960;
const height: number = 600;
const margin: Margin = { top: 80, left: 70, right: 70, bottom: 80 };

Promise.all([
  d3.json<EducationData[]>(
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"
  ),
]).then((educationData) => {
  const education = educationData[0]!;

  const educationValues = education?.map((d) => d.bachelorOrHigher)!;
  const colorScale = d3
    .scaleSequential(d3.interpolateCool)
    .domain(educationValues);

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
      .attr("width", width)
      .attr("height", height);

    const path = d3.geoPath();

    svg
      .append("g")
      .selectAll("path")
      .data(counties)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "county")
      .attr("fill", (d) => {
        const county = education.find((e) => e.fips === d.id);
        return county ? colorScale(county.bachelorOrHigher) : "green";
      });

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
      .attr("y", -120)
      .attr("text-anchor", "middle");

    svg
      .append("text")
      .text(
        "Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)"
      )
      .attr("id", "description")
      .attr("x", width / 2)
      .attr("y", -70)
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
      .text(linkText)
      .attr("id", "link");
    textElement.append("tspan").text(sourceText.split(linkText)[1]);

    const legendWidth = 200;
    const legendHeight = 20;
    const legendX = width - legendWidth - margin.right;
    const legendY = height - margin.bottom / 2;

    const legend = svg
      .append("g")
      .attr("id", "legend")
      .attr("transform", `translate(${legendX}, ${legendY})`);
  };

  drawMap();
});
