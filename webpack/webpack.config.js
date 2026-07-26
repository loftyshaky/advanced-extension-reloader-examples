const path = require('path');

const { Reloader } = require('advanced-extension-reloader-watch-2/reloader');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extension_id = 'dphafhlelejgffkmbmnmomfehnekdnlj';

const reloader = new Reloader({
    port: 6221,
});

reloader.watch();

module.exports = () => {
    const paths = {
        js: path.join(__dirname, 'src', 'js'),
    };

    return {
        watch: true,
        entry: {
            background: path.join(paths.js, 'background.js'),
            options: path.join(paths.js, 'options.js'),
            popup: path.join(paths.js, 'popup.js'),
        },
        output: {
            filename: '[name].js',
            path: path.join(__dirname, 'dist'),
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.join('src', 'html'),
                    },
                    {
                        from: path.join('src', 'css'),
                    },
                    {
                        from: path.join('src', 'manifest.json'),
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
                                always_open_popup: true,
                                manifest_path: true,
                                always_open_popup_paths: ['popup'],
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
