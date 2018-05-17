const imageminMozjpeg = require('imagemin-mozjpeg');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const SystemBellPlugin = require('system-bell-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const parts = require('./webpack.parts');
const merge = require('webpack-merge');
const path = require('path');
const glob = require('glob-all');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const sharp = require('responsive-loader/sharp');

const PATHS = {
  app: path.join(__dirname, 'src/app'),
  build: path.join(__dirname, 'dist'),
  src: path.join(__dirname, 'src'),
};

const commonConfig = merge([
  {
    plugins: [new SystemBellPlugin(), new FriendlyErrorsWebpackPlugin(), new SpriteLoaderPlugin()],
  },
  {
    output: {
      publicPath: '/',
    },
  },
  parts.loadHTML(),
  parts.loadResponsiveImages({
    options: {
      adapter: sharp,
      name: 'images/[name]-[width].[ext]',
      sizes: [350, 600, 700, 800, 1200],
      quality: 100,
    },
  }),
  parts.loadSVGS(),
  parts.loadJavaScript({ include: PATHS.app }),
]);

const productionConfig = merge([
  {
    output: {
      path: PATHS.build,
      publicPath: './',
      chunkFilename: '[name].[chunkhash:4].js',
      filename: '[name].[chunkhash:4].js',
    },
    recordsPath: path.join(__dirname, 'records.json'),
  },
  {
    plugins: [
      new ImageminPlugin({
        pngquant: {
          quality: '65-70',
          speed: 4,
        },
        plugins: [
          imageminMozjpeg({
            progressive: true,
            quality: 80,
          }),
        ],
      }),
    ],
  },
  parts.clean(PATHS.build),
  parts.extractCSS({ use: ['css-loader', 'sass-loader', parts.postCSSPlugins()] }),
  parts.purifyCSS({
    paths: glob.sync([`${PATHS.src}/**/*.html`, `${PATHS.src}/**/*.js`], {
      nodir: true,
    }),
  }),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true,
      },
    },
  }),
  parts.loadFonts({
    options: {
      limit: 50000,
      name: './fonts/[name].[ext]',
      publicPath: '../',
    },
  }),
  parts.loadImages({
    options: {
      limit: 15000,
      name: './images/[name].[hash:4].[ext]',
    },
  }),
  parts.generateSourceMaps({
    type: 'source-map',
  }),
  {
    optimization: {
      splitChunks: {
        chunks: 'initial',
      },
      runtimeChunk: {
        name: 'manifest',
      },
    },
  },
]);

const developmentConfig = merge([
  parts.devServer,
  parts.loadSCSS(),
  parts.loadImages(),
  parts.loadFonts({
    options: {
      limit: 50000,
    },
  }),
]);

module.exports = mode => {
  const pages = [
    parts.page({
      title: 'index',
      entry: { app: PATHS.app },
      template: './src/index.html',
    }),
    parts.page({
      title: 'moreProjects',
      entry: {
        app: PATHS.app,
      },
      template: './src/sitePages/moreProjects.html',
    }),
    parts.page({
      title: 'calculator',
      entry: {
        calculator: path.join(PATHS.app, 'projects/calculator.js'),
      },
      template: './src/sitePages/calculator.html',
    }),
  ];
  const config = mode === 'production' ? productionConfig : developmentConfig;
  return pages.map(page => merge(commonConfig, config, page, { mode }));
};
// if (mode === 'production') {
//   return merge(commonConfig, productionConfig, { mode });
// }
// return merge(commonConfig, developmentConfig, { mode });
