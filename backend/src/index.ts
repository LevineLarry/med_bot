import { MedbotBackend } from "./microservice";

const medbotBackend = new MedbotBackend({
    isCronJob: true
});
medbotBackend.start();