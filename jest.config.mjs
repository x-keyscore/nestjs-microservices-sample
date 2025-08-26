import tsconfig from "./tsconfig.json" with { type: "json" };
import { pathsToModuleNameMapper } from "ts-jest";

const jestConfig = {
    transform: {
      "^.+\\.(t|j)s$": "ts-jest"
    },
	testRegex: ".*\\.spec\\.ts$",
	testEnvironment: "node",
	rootDir: ".",
	roots: [
		"<rootDir>/apps/",
      	"<rootDir>/libs/"
	],
	modulePaths: [tsconfig.compilerOptions.baseUrl],
	moduleFileExtensions: ["js", "json", "ts"],
	moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths),
	coverageDirectory: "./coverage",
	collectCoverageFrom: ["**/*.(t|j)s"]
};

export default jestConfig;