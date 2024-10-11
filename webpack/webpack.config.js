const path = require('path');

const appRoot = require('app-root-path').path;

const CopyWebpackPlugin = require('copy-webpack-plugin');

const Reloader = require('advanced-extension-reloader-watch-2/umd/reloader');

const reloader = new Reloader({
    port: 6220,
});

reloader.watch();

const app_root = appRoot;

const extension_id = 'dphafhlelejgffkmbmnmomfehnekdnlj';

module.exports = () => {
    const paths = {
        js: path.join(app_root, 'src', 'js'),
    };

    return {
        entry: {
            background: path.join(paths.js, 'background.js'),
            popup: path.join(paths.js, 'popup.js'),
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
                            reloader.play_error_notification({ extension_id });
                        } else {
                            reloader.reload({
                                extension_id,
                                play_notifications: true,
                                open_popup: true,
                                manifest_path: true,
                                open_popup_paths: ['popup']
                            });
                        }
                    });
                },
            },
        ],
        target: 'web',
        devtool: false,
    };
};
