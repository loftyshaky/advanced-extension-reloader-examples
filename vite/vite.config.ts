import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import watch from 'rollup-plugin-watch';

import Reloader from 'advanced-extension-reloader-watch-2/es/reloader';

const reloader = new Reloader({ port: 6224 });

reloader.watch();

const extension_id = 'ppeafhheghiffmmflaenlfihmeoloiad';

export default defineConfig({
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: 'src/html/**/*',
                    dest: '.',
                },
                {
                    src: 'src/css/**/*',
                    dest: '.',
                },
                {
                    src: 'src/manifest.json',
                    dest: '.',
                },
            ],
        }),
        {
            name: 'build-events',
            apply: 'build',
            buildEnd(an_error_occured) {
                if (an_error_occured) {
                    reloader.play_error_notification({ extension_id });
                } else {
                    reloader.reload({
                        extension_id,
                        play_notifications: true,
                        open_popup: true,
                        manifest_path: true,
                        open_popup_paths: ['popup'],
                    });
                }
            },
        },
        watch({ dir: 'src' }),
    ],
    build: {
        outDir: 'dist',
        watch: {},
        rollupOptions: {
            input: {
                background: './src/ts/background.ts',
                options: './src/ts/options.ts',
                popup: './src/ts/popup.ts',
            },
            output: [
                {
                    entryFileNames: '[name].js',
                    chunkFileNames: 'chunk-[name].js',
                    sourcemap: false,
                },
            ],
        },
    },
});
