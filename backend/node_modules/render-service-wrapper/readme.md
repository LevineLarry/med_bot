# render-service-wrapper

`render-service-wrapper` is a lightweight npm package designed to streamline the deployment and management of services on Render.com. This thin wrapper provides essential functionalities, a customizable health check endpoint, and works for cron jobs, background workers, and web services.

## Installation
```
npm install render-service-wrapper
```

## Usage
To get started, import `render-service-wrapper` into your Node.js application:

### Create your service:
``` ts
//myservice.ts
import { Service } from "render-service-wrapper"

export class MyService extends Service {
    async run(): Promise<void> {
        // Service code goes here, and will be executed when the service is started
    }
}
```

### Run your service:
``` ts
//index.ts
import { MyService } from "./myservice"

const service = new MyService({
    isCronJob: false, //Set to true if this is a cron job. If set to true, it will make sure to terminate after execution is complete
    healthCheckPort: 10000, //Defaults to 10000
    healthCheckEndpoint: "/healthz" //Defaults to "/"
})

service.start()
```

In the above example, index.ts would be the entry point for your service.

## Configuration Options
The constructor for the `Service` class accepts the following configuration options:

- port (number): The port on which the service will run (default: 10000).
- healthCheckPath (string): The path for the health check endpoint (default: '/').
- isCronJob (boolean): Weather or not this service is a cron job. If set to true, the class will ensure to terminate the execution of the code once the `run()` function has completed, to prevent a hanging cron job execution.