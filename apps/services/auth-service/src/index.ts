import type { MicroserviceOptions } from "@nestjs/microservices";
import { Transport } from "@nestjs/microservices";
import { NestFactory } from "@nestjs/core";
import { AuthModule } from "./auth.module";
import { env } from "./config/env";

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
		transport: Transport.NATS,
		options: {
			servers: [env.NATS_TRANSPORT_URL]
		}
	});

	await app.listen();
}

bootstrap().catch((err) => {
	console.error(err);
	process.exit(1);
});
