import "./styles.css";
import "mapbox-gl/dist/mapbox-gl.css";
import * as mapboxgl from "mapbox-gl";
import settings from "./settings.json";

let map;

async function init() {
    const custom = await import("./custom-style.json");
    const tracts = await import("../data/source_files/Census2000_Tracts_SF.json");
    const style = map.getStyle();



    style.sources = {
        ...style.sources,
        ...custom.sources
    };
    style.layers.push(...custom.layers);
    map.setStyle(style);

    map.getSource("tracts").setData(tracts)
}

mapboxgl.accessToken = settings.accessToken;
map = new mapboxgl.Map(settings);
map.on("load", init);
