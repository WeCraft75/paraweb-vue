export default {
  mounted() {
    let leaflet = document.createElement("script");
    leaflet.setAttribute(
      "src",
      "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
    );
    leaflet.setAttribute(
      "integrity",
      "sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
    );
    leaflet.setAttribute("crossorigin", "");
    document.head.appendChild(leaflet);

    let leafletCSS = document.createElement("link");
    leafletCSS.setAttribute("rel", "stylesheet");
    leafletCSS.setAttribute(
      "src",
      "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    );
    leafletCSS.setAttribute(
      "integrity",
      "sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    );
    leafletCSS.setAttribute("crossorigin", "");
    document.head.appendChild(leafletCSS);
  },
};
