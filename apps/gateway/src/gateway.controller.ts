import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
import { GatewayService } from "./gateway.service";
import { signupRequestContract } from "@app/common/auth";

@Controller()
export class GatewayController {
	constructor(private readonly gatewayService: GatewayService) {}

	@Post("auth/signup")
	async authSignup(@Body() body: unknown) {
		if (!signupRequestContract.validate(body)) {
			throw new BadRequestException();
		}

		return (await this.gatewayService.authSignup(body));
	}
}
