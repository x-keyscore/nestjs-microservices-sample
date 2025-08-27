#!/usr/bin/env node
import { spawn } from "node:child_process";
import path from "node:path";
import fs from "node:fs";

const config = {
	rootPath: "./",
	logsPath: "developments/logs",
	processFile: "developments/processes.json",
	apps: [
		{
			name: "gateway",
			exec: "nest",
			args: ["start", "gateway", "--watch"],
			env: {
				HTTP_GATEWAY_PORT: "3000",
				NATS_TRANSPORT_URL: "nats://nats:4222",
				MYSQL_DATABASE_URL: "mysql://user:pass@mysql:3306/app"
			}
		}
	]
};

class ProcessManager {
	constructor(config) {
		this.config = config;

		this.basePath = path.resolve(
			config.rootPath
		);

		this.logsPath = path.join(
			this.basePath,
			config.logsPath
		);

		this.processFile = path.join(
			this.basePath,
			config.processFile
		);

		if (!fs.existsSync(this.logsPath)) {
			fs.mkdirSync(this.logsPath);
		}
	}

	#readProcessFile() {
		try {
			return (JSON.parse(fs.readFileSync(this.processFile, "utf-8")));
		} catch (err) {
			throw new Error(
				`Failed to read process file '${this.processFile}': ${err.message}`
			);
		}
	}

	#writeProcessFile(data) {
		try {
			fs.writeFileSync(this.processFile, JSON.stringify(data, null, 2));
		} catch (err) {
			throw new Error(
				`Failed to write process file '${this.processFile}': ${err.message}`
			);
		}
	}

	addProcess(name, pid) {
		const processes = this.#readProcessFile();
		processes[name] = pid;
		this.#writeProcessFile(processes);
	}

	delProcess(name) {
		const processes = this.#readProcessFile();
		if (processes[name]) {
			delete processes[name];
			this.#writeProcessFile(processes);
		}
	}

	getProcess(name) {
		const processes = this.#readProcessFile();
		if (name) return (processes[name]);
		return (null);
	}

	getAllProcesses() {
		const processes = this.#readProcessFile();
		return (processes);
	}

	hasProcess(name) {
		return (!!this.getProcess(name));
	}

	startProcess(task) {
		const logFile = path.join(this.logsPath, `${task.name}.log`);
		const logStream = fs.createWriteStream(logFile, { flags: "a" });

		const childProcess = spawn(task.exec, task.args, {
			stdio: ["pipe", "pipe", "pipe"],
			detached: true,
			shell: true,
			cwd: this.basePath,
			env: {
				...process.env,
				...task.env
			}
		});

		this.addProcess(task.name, childProcess.pid);

		childProcess.stdout.on("data", (data) => {
			const line = `[${task.name}] ${data}`;

			process.stdout.write(line);
			logStream.write(line);
		});

		childProcess.stderr.on("data", (data) => {
			const line = `[${task.name} ERROR] ${data}`;

			process.stderr.write(line);
			logStream.write(line);
		});

		childProcess.on("error", (err) => {
			const message = `[${task.name} FAILLED] ${err.message}\n`;

			process.stderr.write(message);
			logStream.write(message, () => {
				logStream.end();
			});
		});

		childProcess.on("close", (code, signal) => {
			const message = `[${task.name} STOPPED] Exited with code '${code}' (${signal}) \n`;

			process.stdout.write(message);
			logStream.write(message, () => {
				logStream.end();
			});
			this.delProcess(task.name);
		});

		childProcess.unref();
	}

	stopProcess(name) {
		const pid = processManager.getProcess(name);
		if (!pid) {
			console.error(`Successful to stop process '${name}' (${pid})`);
			return;
		}

		try {
			process.kill(pid, "SIGTERM");
			console.info(`Process '${name}' (${pid}) stopped`);
			this.delProcess(name);
		} catch (err) {
			console.error(`Failed to stop process '${name}' (${pid}) :`, err.message);
		}
	}

	stopAllProcesses() {
		const processes = this.getAllProcesses();

		for (const name in processes) {
			stopProcess(name);
		}
	}
}

const processManager = new ProcessManager(config);

const [, , cmd, arg] = process.argv;

switch (cmd) {
	case "start":
		for (const app of config.apps) {
			processManager.startProcess(app);
		}
		break;

	case "stop":
		if (!arg) processManager.stopAllProcesses();
		processManager.stopProcess(arg);
		break;

	case "stop":
		if (!arg) processManager.stopAllProcesses();
		processManager.stopProcess(arg);
		break;

	case "logs":
		if (!arg) {
			console.error("❌ Usage: node multitask.js logs <service>");
			process.exit(1);
		}
		streamLogs(arg);
		break;

	default:
		console.log(
			"Usage:\n" +
			"node multitask.js start            # Démarre tous les services\n" +
			"node multitask.js stop <name|all>  # Stoppe un service ou tous\n" +
			"node multitask.js logs <name>      # Affiche les logs en live d'un service\n"
		);
}