// src/healthCheckManager.ts
var HealthCheckManager = class {
  port;
  app;
  /**
   * 
   * @param port The port to run the healthcheck endpoint on. Usually will be 10000
   * @param endpoint The path to run the healthcheck endpoint on. Usually will be "/"
   */
  constructor(expressApp, endpoint = "/healthz") {
    this.app = expressApp;
    this.app.get(endpoint, (req, res) => {
      res.status(200).send("");
    });
  }
};

// src/service.ts
import express from "express";
var Service = class {
  port;
  healthCheckEndpoint;
  isCronJob;
  healthCheckManager;
  expressApp;
  expressServer = null;
  constructor(config) {
    this.port = config.port ?? 1e4;
    this.healthCheckEndpoint = config.healthCheckEndpoint ?? "/";
    this.isCronJob = config.isCronJob;
    this.expressApp = express();
    this.expressServer = this.expressApp.listen(this.port);
    this.healthCheckManager = new HealthCheckManager(this.expressApp, this.healthCheckEndpoint);
  }
  // Starts the health check manager and runs the microservice
  async start() {
    await this.run();
    if (this.isCronJob) {
      this.expressServer.close();
      this.stop();
    }
  }
  // Stops the microservice
  async stop() {
    process.exit();
  }
};
export {
  HealthCheckManager,
  Service
};
//# sourceMappingURL=index.mjs.map