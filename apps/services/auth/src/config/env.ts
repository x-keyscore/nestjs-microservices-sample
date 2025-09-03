import { Schema } from "valia";

const envRequirement = new Schema({
	type: "object",
	shape: {
		NATS_TRANSPORT_URL: { type: "string" },
		MYSQL_DATABASE_URL: { type: "string" }
	},
	keys: { type: "string" },
	values: { type: "string" }
});

if (!envRequirement.validate(process.env)) {
	throw new Error("Missing properties in the environment variable.");
}

export const env = process.env;