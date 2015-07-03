var webpack = require('webpack');

var config = {
  entry: {
    app: [
      'webpack-dev-server/client?http://0.0.0.0:8080',
      'webpack/hot/only-dev-server',
      './example/app.jsx'
    ],
  },
  output: {
    path: './example',
    filename: "bundle.js"
  },
  eslint: {
    configFile: './.eslintrc'
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [
        { test: /\.(js|jsx)$/, loaders: ['react-hot', 'babel?experimental'], exclude: /node_modules/},
        { test: /\.(js|jsx)$/, loader: "eslint-loader", exclude: /node_modules/},
        { test: /\.css$/, loader: 'style!css'  },
        { test: /\.(png|woff)$/, loader: 'url-loader?limit=100000'  }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};

module.exports = config;
