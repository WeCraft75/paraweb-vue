<script setup>
import { store } from "../stores/paraweb.js";
</script>
<template>
  <div id="mapid"></div>
</template>

<style scoped></style>

<script>
export default {
  mounted() {
    var map = store.leaflet.map("mapid", { doubleClickZoom: false }).locate({
      setView: true,
      maxZoom: 12,
    });

    store.leaflet
      .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
      .addTo(map);
  },
};
</script>
