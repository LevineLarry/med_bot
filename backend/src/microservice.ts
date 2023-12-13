import { Service } from "render-service-wrapper"

export class MedbotBackend extends Service {
    run(): Promise<void> {
        // Get list of notifications which need to be sent out
        // Send out notifications
        // Update db to mark notifications as sent
    }
}