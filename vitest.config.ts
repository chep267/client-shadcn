/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';

/** config */
import viteConfig from './vite.config';

export default mergeConfig(
    viteConfig({ mode: 'test', command: 'build' }),
    defineConfig({
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: ['./tests/vitest.setup.ts'],
            alias: { '@/': new URL('./src', import.meta.url).pathname },
        },
    })
);
