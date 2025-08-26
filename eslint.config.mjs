import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

const eslintConfig = tseslint.config(
	eslint.configs.recommended,
  	tseslint.configs.recommended,
	{
		plugins: {
			'@stylistic': stylistic
		},
		ignores: [
			"eslint.config.mjs",
			"**/*jest.config.mjs"
		],
		rules: {
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/no-floating-promises": "warn",
			"@typescript-eslint/no-unsafe-argument": "warn",
			"@stylistic/indent": ["error", "tab"],
			"@stylistic/comma-dangle": ["error", "never"],
			"@stylistic/quotes": ["error", "double", { "allowTemplateLiterals": "always" }],
			"@stylistic/semi": ["error", "always"],
			"@stylistic/semi-spacing": ["error", { "before": false, "after": true }],
			"@stylistic/object-curly-spacing": ["error", "always"],
			"@stylistic/object-curly-newline": ["error", { "multiline": true, "consistent": true }]
		},
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest,
			},
			sourceType: "module",
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			}
		}
	}
);

export default eslintConfig;