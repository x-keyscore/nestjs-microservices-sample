import type { SignupRequestContract, SignupResponseContract } from "@app/common/auth";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@MessagePattern("AUTH.SIGNUP")
	signup(@Payload() payload: SignupRequestContract): SignupResponseContract {
		return (this.authService.signup(payload));
	}
}
