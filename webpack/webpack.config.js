const path = require('path');

const appRoot = require('app-root-path').path;

const CopyWebpackPlugin = require('copy-webpack-plugin');

const Reloader = require('advanced-extension-reloader-watch-2/umd/reloader');

const reloader = new Reloader({
    port: 6223,
});

reloader.watch();

const app_root = appRoot;

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
                    compiler.hooks.done.tap('done', () => {
                        reloader.reload({
                            ext_id: 'dphafhlelejgffkmbmnmomfehnekdnlj',
                            hard_paths: ['background', 'manifest.json'],
                            hard: false,
                            all_tabs: false,
                            play_sound: true,
                        });
                    });
                },
            },
        ],
        target: 'web',
        devtool: false,
    };
};
