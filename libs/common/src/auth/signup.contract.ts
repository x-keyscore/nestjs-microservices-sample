import { Schema, SchemaInfer } from "valia";

export const signupRequestContract = new Schema({
	type: "object",
	shape: {
		name: { type: "string" },
		email: {
			type: "string",
			pipe: {
				isEmail: true
			}
		},
		password: { type: "string" }
	}
});

export type SignupRequestContract = SchemaInfer<typeof signupRequestContract>;

export interface SignupResponseContract {
	token: string;
};
