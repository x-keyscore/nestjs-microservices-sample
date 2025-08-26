interface Env extends NodeJS.ProcessEnv {
	NATS_TRANSPORT_URL: string;
	MYSQL_DATABASE_URL: string;
}

export const env: Env = process.env as Env;