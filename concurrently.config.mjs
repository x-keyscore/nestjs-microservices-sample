import ecosystemConfig from "./ecosystem.config.mjs";
import concurrently from "concurrently";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

concurrently(
    Object.entries(ecosystemConfig.services).map(([name, config]) => ({ 
        name,
        command: config.start,
        env: config.environment,
        cwd: __dirname,
		shell: false
    })),
    {
	    prefix: "name",
	    restartTries: 3,
	    killOthersOn: ["failure", "success"]
    }
);