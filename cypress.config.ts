import { defineConfig } from "cypress";

export default defineConfig({
  projectId: '8scjzf',
  video: false,
  viewportWidth: 1440,
  viewportHeight: 900,
  trashAssetsBeforeRuns: false,

  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents() {},
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
