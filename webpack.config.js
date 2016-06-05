module.exports = {
  plugins: [],
  entry: './public/js/index.js',
  module: {
    loaders: [
      { 
        test: /\.css$/, 
        loader: "style!css!postcss" 
      }, {
        test: /\.json$/,
        loader: 'json',
      }
    ]
  },
  postcss: function () {
    return [require('autoprefixer')];
  },
  output: {
    path: './public/dist/',
    filename: 'index.js',
  }
};