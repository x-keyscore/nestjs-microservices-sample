import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { NestFactory } from "@nestjs/core";
import { GatewayModule } from "./gateway.module";
import { env } from "./config/env";

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		GatewayModule,
		new FastifyAdapter()
	);

	await app.listen(env.HTTP_GATEWAY_PORT as any);
}

bootstrap().catch((err) => {
	console.error(err);
	process.exit(1);
});
