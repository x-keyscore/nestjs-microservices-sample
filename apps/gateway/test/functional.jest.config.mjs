import ecosystemConfig from "../../../ecosystem.config.mjs";
import tsconfig from "../../../tsconfig.json" with { type: "json" };
import { pathsToModuleNameMapper } from "ts-jest";

const functionalJestConfig = {
	rootDir: ".",
	transform: {
		"^.+\\.(t|j)s$": "ts-jest"
	},
	globals: {
		...ecosystemConfig.services.gateway.environement
  	},
	testEnvironment: "node",
	testRegex: ".functional.spec.ts$",
	modulePaths: [tsconfig.compilerOptions.baseUrl],
	moduleFileExtensions: ["js", "json", "ts"],
	moduleNameMapper: pathsToModuleNameMapper(
		tsconfig.compilerOptions.paths,
		{ prefix: "../../../" }
	)
};

export default functionalJestConfig;
