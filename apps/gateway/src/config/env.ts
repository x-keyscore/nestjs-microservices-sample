import { Schema } from "valia";

const envRequirement = new Schema({
	type: "object",
	shape: {
		HTTP_GATEWAY_PORT: { type: "string" },
		NATS_TRANSPORT_URL: { type: "string" },
		MYSQL_DATABASE_URL: { type: "string" }
	},
	values: { type: "unknown" }
});

const data = {
	NATS_TRANSPORT_URL: "",
	MYSQL_DATABASE_URL: "",
	VSCODE_GIT_IPC_HANDLE: "/run/user/1000/vscode-git-58d99ebb79.sock",
	TERM_PROGRAM: "vscode",
	npm_lifecycle_script: "node ./concurrently.config.mjs",
	SSH_AUTH_SOCK: "/run/user/1000/keyring/ssh",
	GSETTINGS_SCHEMA_DIR: "/home/anraymon/snap/code/204/.local/share/glib-2.0/schemas",
	ORIGINAL_XDG_CURRENT_DESKTOP: "ubuntu:GNOME",
	SHELL: "/bin/bash"
};

console.log(envRequirement.evaluate(data));

/*
const envRequirement = new Schema({
	type: "object",
	shape: {
		HTTP_GATEWAY_PORT: { type: "string" },
		NATS_TRANSPORT_URL: { type: "string" },
		MYSQL_DATABASE_URL: { type: "string" }
	},
	values: { type: "unknown" }
});

console.log(envRequirement.evaluate(process.env));
if (!envRequirement.validate(process.env)) {
	throw new Error("Missing properties in the environment variable.");
}
*/
export const env = process.env;