import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import LogoContainer from "../LogoContainer.vue";
import SiteList from "../SiteList.vue";

describe("HelloWorld", () => {
  it("renders properly", () => {
    const wrapper = mount(LogoContainer, { props: { msg: "Displays logo" } });
    expect(wrapper.text()).toContain("PARAWEB");
  });
  it("gets data from API", () => {
    const wrapper = mount(SiteList, { props: { msg: "Kovk" } });
    expect(wrapper.text()).toContain("Kovk");
  });
});
