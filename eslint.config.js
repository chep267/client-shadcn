/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginQuery from '@tanstack/eslint-plugin-query';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
    {
        ignores: ['dist/**/*', 'node_modules/**/*', 'public/**/*', '.vercel/**/*'],
    },

    eslint.configs.recommended,
    ...tsEslint.configs.recommended,

    {
        files: ['*.js', '*.mjs', '*.cjs'],
        languageOptions: {
            parserOptions: {
                projectService: false,
            },
        },
    },
    {
        files: ['**/*.{ts,tsx,vue}'],
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
            'react-hooks': pluginReactHooks,
            'react-refresh': pluginReactRefresh,
            '@tanstack/query': pluginQuery,
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

            // Others
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/jsx-no-target-blank': 'warn',
            '@typescript-eslint/ban-ts-ignore': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            'import/no-named-as-default': 'off',
            'no-case-declarations': 'off',
            'react-hooks/exhaustive-deps': 'off',

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

    eslintConfigPrettier,
]);
