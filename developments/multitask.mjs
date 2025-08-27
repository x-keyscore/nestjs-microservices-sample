#!/usr/bin/env node
import { spawn, spawnSync } from "node:child_process";
import path from "node:path";
import fs from "node:fs";
import os from "node:os";

const config = {
	rootPath: "./",
	logsPath: "developments/logs",
	apps: [
		{
			name: "gateway",
			exec: "nest start gateway --watch",
			args: ["start", "gateway", "--watch"],
			env: {
				HTTP_GATEWAY_PORT: "3000",
				NATS_TRANSPORT_URL: "nats://nats:4222",
				MYSQL_DATABASE_URL: "mysql://user:pass@mysql:3306/app"
			}
		}
	]
};

/*
const basePath = path.resolve(
	config.rootPath
);
const logFilePath = path.join(basePath, `developments/logs/test.log`);
const logFile = fs.openSync(logFilePath, "a");
const subprocess = spawn(
	"cmd.exe",
	["/c", "node", "-e", "console.log('hello');"],
	{
		stdio: ["ignore", logFile, logFile],
		cwd: "./",
		//detached: true,
		//windowsHide: true
	
	}
);
*/
const DUMP_PATH = path.join(os.homedir(), ".multitask");
if (!fs.existsSync(DUMP_PATH)) {
	fs.mkdirSync(DUMP_PATH);
}
const DUMP_PROCESSES_FILE = path.join(DUMP_PATH, "processes.json");
if (!fs.existsSync(DUMP_PROCESSES_FILE)) {
	fs.writeFileSync(DUMP_PROCESSES_FILE, "{}", "utf-8");
}

function readJsonFile(filePath) {
	try {
		return (JSON.parse(fs.readFileSync(filePath, "utf-8")));
	} catch (err) {
		throw new Error(
			`Failed to read JSON file '${filePath}': ${err.message}`
		);
	}
}

function writeJsonFile(filePath, data) {
	try {
		fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
	} catch (err) {
		throw new Error(
			`Failed to write JSON file '${filePath}': ${err.message}`
		);
	}
}

class ProcessManager {
	/**
	 * @param {Object} config 
	 * @param {Object.<string, number>} processes 
	 */
	constructor(processes, config) {
		this.processes = processes;
		this.config = config;

		this.basePath = path.resolve(
			config.rootPath
		);

		this.logsPath = path.join(
			this.basePath,
			config.logsPath
		);

		if (!fs.existsSync(this.logsPath)) {
			fs.mkdirSync(this.logsPath);
		}
	}

	addProcess(name, pid) {
		this.processes[name] = pid;
	}

	delProcess(name) {
		if (this.processes[name]) {
			delete this.processes[name];
		}
	}

	getProcess(name) {
		return (this.processes[name]);
	}

	hasProcess(name) {
		return (!!this.getProcess(name));
	}

	startProcess(task) {
		const logFilePath = path.join(this.logsPath, `${task.name}.log`);
		const logFile = fs.openSync(logFilePath, "a");

		const subprocess = spawn(
			"cmd.exe",
			["/c", "node", "-e", "console.log('hello');"],
			{
				stdio: ["ignore", logFile, logFile],
				cwd: this.basePath,
				detached: true,
			
			}
		);

		this.addProcess(task.name, subprocess.pid);
		//subprocess.unref();
	}

	stopProcess(name) {
		const pid = processManager.getProcess(name);
		if (!pid) throw new Error("Invalid name");

		try {
			process.kill(pid);
			this.delProcess(name);
			console.log(`Successful to stop process '${name}' (${pid})`);
		} catch (err) {
			console.error(`Failed to stop process '${name}' (${pid}) :\n`, err.message);
		}
	}
}

const processManager = new ProcessManager(
	readJsonFile(DUMP_PROCESSES_FILE),
	config
);

const [, , cmd, arg] = process.argv;

switch (cmd) {
	case "start":
		for (const app of config.apps) {
			processManager.startProcess(app);
		}
		break;
	case "stop":
		if (!arg) {
			for (const name in processManager.processes) {
				processManager.stopProcess(name);
			}
			break;
		}
		processManager.stopProcess(arg);
		break;

	case "list":
		if (!arg) {
			processManager.stopAllProcesses();
			break;
		}
		processManager.stopProcess(arg);
		break;

	case "logs":
		if (!arg) {

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

process.on("exit", () => {
	writeJsonFile(DUMP_PROCESSES_FILE, processManager.processes);
});

process.on("SIGINT", () => {
	writeJsonFile(DUMP_PROCESSES_FILE, processManager.processes);
	process.exit();
});

process.on("SIGTERM", () => {
	writeJsonFile(DUMP_PROCESSES_FILE, processManager.processes);
	process.exit();
});