import { Topology, GeometryCollection } from "topojson-specification";

export interface Margin {
  top: number;
  right: number;
  left: number;
  bottom: number;
}

export interface UsTopology extends Topology {
  objects: {
    states: GeometryCollection;
    counties: GeometryCollection;
  };
}

export interface EducationData {
  fips: number;
  state: string;
  area_name: string;
  bachelorsOrHigher: number;
}