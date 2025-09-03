import { Test } from "@nestjs/testing";
import { GatewayController } from "./gateway.controller";
import { GatewayService } from "./gateway.service";

describe("GatewayController", () => {
	let gatewayService: GatewayService;

	beforeEach(async () => {
		const mockResponses = {
			signup: jest.fn()
		};

		const app = await Test.createTestingModule({
			controllers: [GatewayController],
			providers: [{
				provide: GatewayService,
				useValue: mockResponses
			}]
		}).compile();

		gatewayService = app.get<GatewayService>(GatewayService);
	});

	describe("auth/signup", () => {
		it("should call the service with the request and return a response", async () => {
			const mockRequest = {
				name: "Bob",
				email: "bob@domain.com",
				password: "123"
			};

			expect(gatewayService.authSignup).toHaveBeenCalledWith(mockRequest);
		});
	});
});
