describe("Home Page", () => {
  it("should redirect unauthenticated user to login", () => {
    cy.visit("/");

    cy.url().should("eq", "http://localhost:3000/login");

    cy.get("body").should("be.visible");
  });
});