import { Module } from "@nestjs/common";
import { CommonService } from "./common.service";

@Module({
	providers: [CommonService],
	exports: [CommonService]
})
export class CommonModule {}

export function foo(name: string): string {
	return `Hello ${name}, from shared lib!`;
}
