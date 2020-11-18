import * as geobuf from "./geobuf";
import counties2012 from "./counties-1992.json";
import * as _ from "lodash";

describe("geobuf", () => {
  beforeEach(() => {
    // geojson = _.cloneDeep(counties1992);
  });
  it("works with null", () => {
    const geojson = null;
    expect(() => geobuf.encodeGeoJsonToGeobuf(geojson)).toThrow();
  });

  it("works with normal human geojson", () => {
    const geojson = require("./counties-1992.json");
    expect(() => geobuf.encodeGeoJsonToGeobuf(geojson)).not.toThrow();
  });

  test.only("saves things in the normal human way", () => {
    const geojson = require("./counties-1992.json");

    expect(() =>
      geobuf.saveGeoJsonAsGeobuf(geojson, "myFileName.pbf")
    ).not.toThrow();
  });
});
