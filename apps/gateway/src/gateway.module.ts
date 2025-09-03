import { ClientsModule, Transport } from "@nestjs/microservices";
import { Module } from "@nestjs/common";
import { GatewayController } from "./gateway.controller";
import { GatewayService } from "./gateway.service";
import { env } from "./config/env";

@Module({
	imports: [
		ClientsModule.register([{
			name: "GATEWAY",
			transport: Transport.NATS,
			options: {
				servers: [env.NATS_TRANSPORT_URL as any]
			}
		}])
	],
	controllers: [GatewayController],
	providers: [GatewayService]
})
export class GatewayModule {}
