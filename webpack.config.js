const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {template} = require("@babel/core");
const buildPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const getSettingsForStyles = (withModules = false) => {
    return [MiniCssExtractPlugin.loader,
        !withModules ? 'css-loader' : {
            loader: 'css-loader',
            options: {
                modules: {
                    localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]'
                }
            }
        }, {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: ['autoprefixer']
                }
            }
        }, 'sass-loader']
}

module.exports = {
    entry: path.resolve(__dirname, './src/index.tsx'),
    target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',
    devtool: isProd? 'hidden-source-map' : 'eval-source-map',
    output: {
        path: buildPath,
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html')
        }),
        !isProd && new ReactRefreshWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]-[hash].css'
        }),
        new TsCheckerPlugin()
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.module\.s?css$/,
                use: getSettingsForStyles(true)
            },
            {
                test: /\.s?css$/,
                exclude: /\.module\.s?css$/,
                use: getSettingsForStyles()
            },
            {
                test: /\.[tj]sx?$/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|svg|jpg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.jsx', '.js', '.ts'],
        alias: {
            components: path.join(srcPath, 'components'),
            config: path.join(srcPath, 'config'),
            styles: path.join(srcPath, 'styles'),
            utils: path.join(srcPath, 'utils'),
            models: path.join(srcPath, 'models'),
            store: path.join(srcPath, 'store'),
            pages: path.join(srcPath, 'App/pages'),
            shared: path.join(srcPath, 'shared')
            },
    },
    devServer: {
        host: '127.0.0.1',
        port: 3000,
        hot: true,
        // inline: true
    }
}