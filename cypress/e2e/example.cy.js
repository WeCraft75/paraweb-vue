// https://docs.cypress.io/api/introduction/api.html

describe("Site loads", () => {
  it("visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "PARAWEB");
  });
});
