import { Topology, GeometryCollection } from "topojson-specification";

export interface UsTopology extends Topology {
  objects: {
    states: GeometryCollection;
  };
}

export interface EducationData {
  fips: number;
  state: string;
  area_name: string;
  bachelorOrHigher: number;
}

export interface CountyData  extends Topology {
  objects: {
    counties: GeometryCollection;
  };
}