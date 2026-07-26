import fs from 'fs';
import path from 'path';

import { Reloader } from 'advanced-extension-reloader-watch-2/reloader';
import chokidar from 'chokidar';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const extension_id = 'vite-firefox-extension-example@loftyshaky';

const reloader = new Reloader({
    port: 6224,
    firefox_advanced_extension_reloader_internal_uuids: [
        'your_advanced_extension_reloader_internal_uuid',
    ],
});

reloader.watch();

const config = defineConfig(() => {
    let build_error: boolean = false;

    const paths = {
        ts: path.join(__dirname, 'src', 'ts'),
    };

    return {
        build: {
            watch: {},
            target: 'esnext',
            lib: {
                entry: {
                    background: path.join(paths.ts, 'background'),
                    options: path.join(paths.ts, 'options'),
                    popup: path.join(paths.ts, 'popup'),
                },
            },
            rolldownOptions: {
                output: [
                    {
                        entryFileNames: '[name].mjs',
                        chunkFileNames: 'chunk-[name].mjs',
                        sourcemap: false,
                    },
                ],
            },
        },
        plugins: [
            viteStaticCopy({
                targets: [
                    {
                        src: ['src/html/**/*', 'src/css/**/*', 'src/manifest.json'],
                        dest: '',
                        rename: { stripBase: true },
                    },
                ],
            }),
            {
                name: 'watch',
                buildStart() {
                    const watcher = chokidar.watch(
                        [
                            path.join('src', 'manifest.json'),
                            path.join('src', 'html'),
                            path.join('src', 'css'),
                        ],
                        {
                            ignoreInitial: true,
                        },
                    );

                    watcher.on('all', () => {
                        const now = new Date();

                        fs.utimesSync(path.join(paths.ts, 'background.ts'), now, now); // updates the watched by vite file timestamps to trigger rebuild
                    });
                },
            },
            {
                name: 'build_event',
                buildEnd(err: unknown) {
                    if (err) {
                        build_error = true;
                    }
                },
                closeBundle() {
                    if (build_error) {
                        reloader.play_error_notification({ extension_id });
                    } else {
                        reloader.reload({
                            extension_id,
                            play_notifications: true,
                            always_open_popup: true,
                            manifest_path: true,
                            always_open_popup_paths: ['popup'],
                        });
                    }

                    build_error = false;
                },
            },
        ],
    };
});

export default config;
