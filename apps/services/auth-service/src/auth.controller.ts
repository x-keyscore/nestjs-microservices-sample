import { MessagePattern } from "@nestjs/microservices";
import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@MessagePattern("AUTH.SIGNUP")
	signup(): string {
		return (this.authService.signup());
	}
}
