interface Env extends NodeJS.ProcessEnv {
	HTTP_GATEWAY_PORT: string;
	NATS_TRANSPORT_URL: string;
	MYSQL_DATABASE_URL: string;
}

export const env: Env = process.env as Env;