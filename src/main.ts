import "./style.css";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { UsTopology, EducationData, CountyData } from "./types";

const width: number = 960;
const height: number = 600;

Promise.all([
  d3.json<EducationData>(
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"
  )
]).then((educationData) => {
  console.log(educationData);

  const drawMap = async () => {
    const us = await d3.json<UsTopology>("https://d3js.org/us-10m.v2.json");
    console.log(us);

    if (!us || !us.objects) {
      console.error("Failed to load or parse US topology data");
      return;
    }

    const states = topojson.feature(us, us.objects.states).features;
    const counties = topojson.feature(us, us.objects.states).features;

    const svg = d3
      .select("div#app")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const path = d3.geoPath();

    d3.select("svg")
      .append("g")
      .selectAll("path")
      .data(states)
      .enter()
      .append("path")
      .attr("d", path);

    d3.select("svg")
      .append("g")
      .selectAll("path")
      .data(counties)
      .enter();

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
      .attr("y", -60)
      .attr("text-anchor", "middle");
  };

  drawMap();
});
