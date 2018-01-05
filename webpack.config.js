const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './app/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, use: 'babel-loader', exclude: /node_modules/ },

      { 
        test: /\.(css|scss)$/, 
	use: ExtractTextPlugin.extract({
		fallback: 'style-loader',
		use: [ 
		  {
		    loader: 'css-loader',
		    options: {
		      sourceMap: true
		    }
		  },
		  {
		    loader: 'sass-loader' 
		  }
		]
	})
      },
      { test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/, loader: 'url-loader' },
    ]
  },
  plugins: [
	  HtmlWebpackPluginConfig,
	  new ExtractTextPlugin('[name].css')
  ]
}
