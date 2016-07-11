/*
 * Helper: root(), and rootDir() are defined at the bottom
 */
var path = require('path');
// Webpack Plugins
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const autoprefixer = require('autoprefixer');

var metadata = {
    title: 'vue-typescript ts sample',
    host: 'localhost',
    port: 8080,
    ENV: ENV
};
/*
 * Config
 */
module.exports = {
    // static data for index.html
    metadata: metadata,
    // for faster builds use 'eval'
    devtool: 'source-map', //to point console errors to ts files instead of compiled js
    debug: true,

    entry: [
        './src/main.ts' //app main file
    ],

    // Config for our build files
    output: {
        path: root('dist'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        // ensure loader extensions match
        extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.sass', '.html'], // <-- include .scss
        fallback: [path.join(__dirname, './node_modules')] //default to node_modules when not found
    },
    resolveLoader: {
        fallback: [path.join(__dirname, './node_modules')]
    },
    module: {
        loaders: [
            // Support for .ts files.
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: [/\.(spec|e2e)\.ts$/]
            },

            // Support for *.json files.
            { test: /\.json$/, loader: 'json-loader' },

            // Support for CSS as raw text
            { test: /\.css$/, loaders: ['style', 'css'] },

            // support for .html as raw text
            { test: /\.html$/, loader: 'raw-loader', exclude: [ root('src/index.html') ] },

            // if you add a loader include the resolve file extension above

            { test: /\.(scss|sass)$/, loaders: ['style', 'css', 'sass'] },

            { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' },

            // Bootstrap 4
            { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' }
        ]
    },
    
    // sassResources: path.resolve(__dirname, "./node_modules/bootstrap/scss"),

    postcss: [autoprefixer], // <--- postcss

    plugins: [
        new CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js', minChunks: Infinity }),
        // static assets
        new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }]),
        // generating html
        new HtmlWebpackPlugin({ template: 'src/index.html' }),
        // replace
        new DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(metadata.ENV),
                'NODE_ENV': JSON.stringify(metadata.ENV)
            }
        }),

        //Make jquery and Vue globally available without the need to import them
        new ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery',
            Vue: 'vue'
        })
    ],

    // our Webpack Development Server config
    devServer: {
        port: metadata.port,
        host: metadata.host,
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 }
    }
};

// Helper functions

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}

function rootNode(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return root.apply(path, ['node_modules'].concat(args));
}