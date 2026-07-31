/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginQuery from '@tanstack/eslint-plugin-query';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import { reactRefresh } from 'eslint-plugin-react-refresh';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig(
    {
        ignores: ['dist/**/*', 'node_modules/**/*', 'public/**/*', '.vercel/**/*'],
    },
    {
        files: ['**/*.{js,mjs,cjs}'],
        extends: [eslint.configs.recommended],
        languageOptions: {
            parserOptions: {
                ecmaVersion: 'latest',
                globals: {
                    ...globals.browser,
                    ...globals.node,
                },
                projectService: false,
            },
        },
        rules: {
            // Variables
            'no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
        },
    },
    {
        files: ['**/*.{ts,tsx}'],
        extends: [eslint.configs.recommended, ...tsEslint.configs.recommended],
        languageOptions: {
            ecmaVersion: 'latest',
            parser: tsEslint.parser,
            parserOptions: {
                projectService: {
                    allowDefaultProject: ['eslint.config.js'],
                },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            react: pluginReact,
            'react-refresh': reactRefresh.plugin,
            'react-hooks': pluginReactHooks,
            '@tanstack/query': pluginQuery,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            // Variables
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],

            // Style
            'no-console': 'off',

            // TS
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/await-thenable': 'error',
            '@typescript-eslint/ban-ts-comment': 'off',

            // React
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/jsx-no-target-blank': 'warn',

            // React Hooks
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'off',

            // Others
            'no-case-declarations': 'off',

            // @tanstack/query
            '@tanstack/query/exhaustive-deps': 'off',
            '@tanstack/query/no-rest-destructuring': 'warn',
            '@tanstack/query/stable-query-client': 'error',

            'no-restricted-imports': [
                'error',
                {
                    paths: ['lodash'],
                },
            ],
        },
    },
    {
        files: ['src/modules/module-base/components/**/*.{ts,tsx,js,jsx}'],
        rules: {
            'react-refresh/only-export-components': 'off',
        },
    },
    prettierConfig
);
