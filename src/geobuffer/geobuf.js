import * as geobuf from "geobuf";
import Pbf from "pbf";

import fs from "fs";
var zlib = require("zlib");

export const encodeGeoJsonToGeobuf = (geojson) => {
  var buffer = geobuf.encode(geojson, new Pbf());
  return buffer;
};

export const decodeGeobufToGeoJson = (geobufBytes) => {
  var buffer = geobuf.decode(new Pbf(geobufBytes));
  return buffer;
};

export const saveGeoJsonAsGeobuf = (geojson, filename) => {
  try {
    debugger;
    const bytes = encodeGeoJsonToGeobuf(geojson);
    const deflatedData = zlib.gzipSync(bytes).toString("base64");
    fs.writeFileSync(filename, bytes, { encoding: "utf8" });
    fs.writeFileSync(`${filename}.gz`, deflatedData, { encoding: "utf8" });
    debugger;
    const result = loadGeobufAsGeoJson(filename);
    return result;
  } catch {
    return null;
  }
};

export const loadGeobufAsGeoJson = (filename) => {
  const bytes = fs.readFileSync(filename, null);
  const geojson = decodeGeobufToGeoJson(bytes);
  return geojson;
};
