import type { SignupRequestContract, SignupResponseContract } from "@app/common/auth";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
	signup(payload: SignupRequestContract): SignupResponseContract {
		console.log("Payload :", payload);

		return ({
			token: "OK"
		});
	}
}
