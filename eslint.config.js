import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint';
import stylisticPlugin from "@stylistic/eslint-plugin";

export default tseslint.config(
	{ ignores: ['dist'] },
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		ignores: ['node_modules', 'dist', "./src/components/ui/**/*"],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			"@stylistic": stylisticPlugin,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			"@stylistic/multiline-ternary": ["error", "always"],
			"@stylistic/indent": ["error", "tab"],
			"@stylistic/space-infix-ops": "error",
			"@stylistic/jsx-tag-spacing": ["error", {
				"closingSlash": "never",
				"beforeSelfClosing": "always",
				"afterOpening": "never",
				"beforeClosing": "never"
			}],
			"@stylistic/eol-last": ["error", "always"],
			"@stylistic/no-mixed-spaces-and-tabs": "error",
			"@typescript-eslint/no-unused-vars": [
				"error", // or "error"
				{
					"argsIgnorePattern": "^_",
					"varsIgnorePattern": "^_",
					"caughtErrorsIgnorePattern": "^_"
				}
			],
			quotes: [
				"error",
				"double",
				{
					avoidEscape: true,
					allowTemplateLiterals: true,
				},
			],
		},
	}
)
