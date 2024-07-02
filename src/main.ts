import "./style.css";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { UsTopology } from "./types";

const width: number = 960;
const height: number = 600;

const drawMap = async () => {
  const us = await d3.json<UsTopology>("https://d3js.org/us-10m.v2.json");

  if (!us || !us.objects) {
    console.error("Failed to load or parse US topology data");
    return;
  }

  const data = topojson.feature(us, us.objects.states).features;

  const svg = d3
    .select("div#app")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const path = d3.geoPath();

  d3.select("svg")
    .append("g")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr("d", path);

  // Promise.all([
  //   d3.json(
  //     "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"
  //   ),
  //   d3.json(
  //     "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"
  //   ),
  // ]).then(([educationData, countyData]) => {
  //   console.log(educationData);
  //   console.log(countyData);
  // });
};

drawMap();
