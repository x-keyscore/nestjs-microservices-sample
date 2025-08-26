import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { Test, TestingModule } from "@nestjs/testing";

import { GatewayModule } from "../src/gateway.module";

describe("GatewayController (Functional)", () => {
	let app: NestFastifyApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [GatewayModule]
		}).compile();

		app = moduleFixture.createNestApplication<NestFastifyApplication>(
			new FastifyAdapter()
		);

		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	it("/ (GET)", async () => {
		const res = await app.inject({
			method: "POST",
			url: "/"
		});

		expect(res.statusCode).toBe(201);
		expect(res.payload).toBe("OK");
	});
});
