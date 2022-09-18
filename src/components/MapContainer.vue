<script setup>
import { store } from "../stores/paraweb.js";
</script>
<template>
  <div id="mapid"></div>
</template>

<script>
export default {
  mounted() {
    store.map = store.leaflet.map("mapid", { doubleClickZoom: false }).locate({
      setView: true,
      maxZoom: 12,
    });

    store.leaflet
      .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
      .addTo(store.map);

    function setMapToUserLocation(e) {
      var radius = e.accuracy;
      if (radius > 2000) {
        // filter for inaccurate location search
        defaultMapDisplay();
        return;
      }
      store.leaflet
        .marker(e.latlng)
        .addTo(store.map)
        .bindPopup(`Vaša lokacija z natančnostjo na ${radius.toFixed(2)}m`);

      store.leaflet
        .circle(e.latlng, radius, { color: "#ff2919", opacity: "0.4" })
        .addTo(store.map);
    }

    function defaultMapDisplay() {
      //default to geographical center of Slovenia, zoom to fit whole country
      store.map.setView([46.119944, 14.815333], 9);
    }

    store.map.on("locationfound", setMapToUserLocation);
    store.map.on("locationerror", defaultMapDisplay);
  },
};
</script>
