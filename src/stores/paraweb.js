import { reactive } from "vue";

export const store = reactive({
  leaflet: window.L,
  jumpPointsList: null,
  onlyOneMatchedBefore: false,
});
