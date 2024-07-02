import { Topology, GeometryCollection } from "topojson-specification";

export interface UsTopology extends Topology {
  objects: {
    states: GeometryCollection;
  };
}
