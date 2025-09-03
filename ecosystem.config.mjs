const services = {
	gateway: {
		start: "nest start gateway --watch",
		environment: {
			HTTP_GATEWAY_PORT: "3000",
			NATS_TRANSPORT_URL: "nats://localhost:4222",
			MYSQL_DATABASE_URL: "mysql://user:pass@localhost:3306/app"
		}
	}
};

export default { 
	services
};