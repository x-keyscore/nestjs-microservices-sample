import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class GatewayService {
	constructor(@Inject("GATEWAY") private readonly client: ClientProxy) {}

	async signup(): Promise<string> {
		const response = await lastValueFrom(this.client.send("AUTH.SIGNUP", {}));

		return (response);
	}
}
