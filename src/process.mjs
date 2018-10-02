import fs from "fs";
import turf from "@turf/turf";
import tracts from "../data/source_files/Census2000_Tracts_SF.json"
import fire_incidents from "../data/fire_incidents2.json"

fire_incidents.features.forEach(function(feature) {
    feature.properties = {
        count: 1
    };
});

let output = turf.collect(tracts, fire_incidents, "count", "count");

output.features = output.features.filter(function(feature, i) {
    feature.id = i;
    console.log(feature.properties.count);
    feature.properties.count = feature.properties.count.length;
    return feature.properties.count > 0;
});

output = JSON.stringify(output, null, "\t");

fs.writeFile("../data/ouput.json", output, function(err) {
  if (err) throw err;

console.log("success. 👍");
} )
