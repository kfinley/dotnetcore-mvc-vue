var path = require('path')
var fs = require('fs')
const { VueLoaderPlugin } = require('vue-loader');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const getLogger = require('webpack-log');
const log = getLogger({ name: 'webpack-build' });

const env = process.env.NODE_ENV;
const sourceMap = env === 'development';
const minify = env === 'production';

log.info('Building for: ' + env);

var srcRoot = path.join(__dirname, '..', 'src');
var srcPagesPath = path.join(srcRoot, 'pages');

var pageEntries = {}
// Loop through src/pages folder and create an entry for each index.ts
fs.readdirSync(srcPagesPath).forEach(function (name) {
  var indexFile = path.join(srcPagesPath, name, 'index.ts');
  log.info('Adding file to webpack: ' + indexFile);
  if (fs.existsSync(indexFile)) {
    pageEntries[name] = indexFile
  }
})

module.exports = {
  context: __dirname + '/..',
  entry: pageEntries,
  mode: env,
  plugins: [
    new VueLoaderPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        vue: true,
        tslint: false,
        configFile: 'tsconfig.json'
      }
    }),
    new CleanWebpackPlugin(),
  ],
  output: {
    path: path.resolve(path.join(__dirname, '..', './wwwroot/bundles/')),
    publicPath: '/bundles/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(srcRoot)
    }
  },
  devtool: sourceMap ? 'eval-cheap-module-source-map' : undefined,
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader'
        }]
      },
      {
        test: /\.ts$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [['babel-preset-typescript-vue', { onlyRemoveTypeImports: true }]],
            plugins: [
              "@babel/plugin-proposal-optional-chaining",
              "@babel/plugin-proposal-numeric-separator",
              "@babel/plugin-proposal-nullish-coalescing-operator",
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }]
            ],
            babelrc: false,
          },
        }],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s[a|c]ss$/,
        exclude: /node_modules/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: false
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        loader: 'file-loader'
      }
    ]
  }
}
