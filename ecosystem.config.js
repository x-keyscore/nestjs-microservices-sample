module.exports = {
	apps: [
		{
			name: "my_app",
			script: "npm",
			
			args: "node_modules/@nestjs/cli/bin/nest.js"
    	}
		/*{
			name: "gateway",
			cwd: "./",
			exec_mode: "cluster",
			args: "nest start gateway --watch",
			watch: false,
			env: {
				NODE_ENV: "development",
				HTTP_GATEWAY_PORT: "3000",
				NATS_TRANSPORT_URL: "nats://localhost:4222",
				MYSQL_DATABASE_URL: "mysql://user:pass@localhost:3306/app"
			}
		}*/
	]
};