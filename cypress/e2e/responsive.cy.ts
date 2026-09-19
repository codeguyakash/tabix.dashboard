describe("Responsive Design", () => {
  const viewports = [
    { name: "Mobile", width: 375, height: 667 },
    { name: "Mobile Large", width: 430, height: 932 },
    { name: "Tablet", width: 768, height: 1024 },
    { name: "Laptop", width: 1366, height: 768 },
    { name: "Desktop", width: 1920, height: 1080 },
  ];

  viewports.forEach(({ name, width, height }) => {
    it(`should work correctly on ${name} (${width}x${height})`, () => {
      cy.viewport(width, height);

      const now = new Date();

      const timestamp =
        `${now.getFullYear()}` +
        `${String(now.getMonth() + 1).padStart(2, "0")}` +
        `${String(now.getDate()).padStart(2, "0")}-` +
        `${String(now.getHours()).padStart(2, "0")}` +
        `${String(now.getMinutes()).padStart(2, "0")}` +
        `${String(now.getSeconds()).padStart(2, "0")}`;

      cy.visit("/login");

      cy.get("body").should("be.visible");

      cy.document().then((document) => {
        expect(document.documentElement.scrollWidth).to.be.at.most(
          document.documentElement.clientWidth,
        );
      });

      cy.screenshot(`responsive/${name}-${width}x${height}-${timestamp}`, {
        capture: "fullPage",
      });
    });
  });
});
