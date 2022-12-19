const { defineConfig } = require('cypress');
const cypressReplay = require('@replayio/cypress');
const { writeFileSync } = require('fs');

module.exports = defineConfig({
  fixturesFolder: 'test/cypress/fixtures',
  video: false,
  viewportWidth: 1440,
  viewportHeight: 900,
  e2e: {
    setupNodeEvents(on, config) {
      cypressReplay.default(on, config);
      on('after:run', (afterRun) => {
        const data = JSON.stringify(afterRun.totalDuration);
        const filename = 'duration.json';
        writeFileSync(filename, data);
        console.log('cypress-json-results: wrote results to %s', filename);
      });
      return config;
    },
    baseUrl: 'http://localhost:9002',
    specPattern: 'test/cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'test/cypress/support/index.js'
  }
});
