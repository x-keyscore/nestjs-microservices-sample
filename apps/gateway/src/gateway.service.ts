import type { SignupRequestContract } from "@app/common/auth";
import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class GatewayService {
	constructor(@Inject("GATEWAY") private readonly client: ClientProxy) {}

	async authSignup(body: SignupRequestContract): Promise<string> {
		return await lastValueFrom(this.client.send("AUTH.SIGNUP", body));
	}
}
