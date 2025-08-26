import { Controller, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { GatewayService } from "./gateway.service";
import { foo } from "@app/common";

@Controller()
export class GatewayController {
	constructor(private readonly gatewayService: GatewayService) {}

	@Post("/")
	@HttpCode(HttpStatus.CREATED)
	async signup() {
		foo("test");

		const response = await this.gatewayService.signup();
		
		return (response);
	}
}
