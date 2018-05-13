const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const postcssNext = require('postcss-cssnext');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: 'errors-only',
    host,
    port,
    open: true,
    overlay: true,
  },
});

exports.extractCSS = ({ include, exclude, use }) => {
  const plugin = new ExtractTextPlugin({
    allChunks: true,
    filename: 'css/[name].[md5:contenthash:hex:20].css',
  });
  return {
    module: {
      rules: [
        {
          test: /\.scss/,
          include,
          exclude,

          use: plugin.extract({
            use,
            fallback: 'style-loader',
          }),
        },
      ],
    },
    plugins: [plugin],
  };
};

exports.loadHTML = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.html$/,
        include,
        exclude,

        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
              attrs: ['img:src', 'img:srcset', 'source:srcset', 'xlink: href'],
              interpolate: true,
            },
          },
        ],
      },
    ],
  },
});

exports.loadSCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        include,
        exclude,

        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [postcssNext()],
            },
          },
        ],
      },
    ],
  },
});

exports.purifyCSS = ({ paths }) => ({
  plugins: [new PurifyCSSPlugin({ paths })],
});

exports.postCSSPlugins = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => [postcssNext()],
  },
});

exports.loadResponsiveImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpe?g)$/i,
        include,
        exclude,
        use: {
          loader: 'responsive-loader',
          options,
        },
      },
    ],
  },
});

// exports.loadImagesOpti = ({ include, exclude } = {}) => ({
//   module: {
//     rules: [
//       {
//         test: /\.(png|jpg)$/,
//         include,
//         exclude,
//         use: [
//           {
//             loader: 'url-loader',
//             options: {
//               limit: 10000,
//               name: './images/[name].[hash:4].[ext]',
//             },
//           },
//           {
//             loader: 'image-webpack-loader',
//             options: {
//               mozjpeg: {
//                 progressive: true,
//                 quality: 85,
//               },
//               // optipng.enabled: false will disable optipng
//               optipng: {
//                 enabled: false,
//               },
//               pngquant: {
//                 quality: '65-90',
//                 speed: 4,
//               },
//               gifsicle: {
//                 interlaced: false,
//               },
//               // the webp option will enable WEBP
//               webp: {
//                 quality: 75,
//               },
//             },
//           },
//         ],
//       },
//     ],
//   },
// });

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        include,
        exclude,
        use: {
          loader: 'url-loader',
          options,
        },
      },
    ],
  },
});

exports.loadSVGS = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.svg$/,
        include,
        exclude,
        use: {
          loader: 'svg-sprite-loader',
          options,
        },
      },
    ],
  },
});

exports.loadFonts = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(woff|woff2)$/,
        include,
        exclude,
        use: {
          loader: 'url-loader',
          options,
        },
      },
    ],
  },
});

exports.loadJavaScript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        use: 'babel-loader',
      },
    ],
  },
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

exports.clean = path => ({
  plugins: [new CleanWebpackPlugin([path])],
});

exports.minifyCSS = ({ options }) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false,
    }),
  ],
});

exports.page = ({
  path = '',
  template = require.resolve('html-webpack-plugin/default_index.ejs'),
  title,
  entry,
} = {}) => ({
  entry,
  plugins: [
    new HtmlWebpackPlugin({
      filename: `${path && path + '/'}index.html`,
      template,
      title,
    }),
  ],
});
