const path = require('path');

const appRoot = require('app-root-path').path;

const CopyWebpackPlugin = require('copy-webpack-plugin');

const Reloader = require('advanced-extension-reloader-watch-2/umd/reloader');

const reloader = new Reloader({
    port: 6220,
});

reloader.watch();

const app_root = appRoot;

const ext_id = 'dphafhlelejgffkmbmnmomfehnekdnlj';
let first_reload_completed = false;

module.exports = () => {
    const paths = {
        js: path.join(app_root, 'src', 'js'),
    };

    return {
        entry: {
            background: path.join(paths.js, 'background.js'),
            options: path.join(paths.js, 'options.js'),
        },
        output: {
            filename: '[name].js',
            path: path.join(app_root, 'dist'),
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.join(app_root, 'src', 'html'),
                    },
                    {
                        from: path.join(app_root, 'src', 'css'),
                    },
                    {
                        from: path.join(app_root, 'src', 'manifest.json'),
                    },
                ],
            }),
            {
                apply: (compiler) => {
                    compiler.hooks.done.tap('done', (stats) => {
                        const an_error_occured = stats.compilation.errors.length !== 0;

                        if (an_error_occured) {
                            reloader.play_error_notification();
                        } else if (first_reload_completed) {
                            reloader.reload({
                                ext_id,
                                hard_paths: ['background', 'manifest.json'],
                                hard: false,
                                all_tabs: false,
                                play_sound: true,
                                after_reload_delay: 1000,
                                manifest_path: true,
                            });
                        } else {
                            reloader.reload({
                                ext_id,
                                hard: true,
                                all_tabs: false,
                                play_sound: true,
                                after_reload_delay: 1000,
                                manifest_path: true,
                            });

                            first_reload_completed = true;
                        }
                    });
                },
            },
        ],
        target: 'web',
        devtool: false,
    };
};

