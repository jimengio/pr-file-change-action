
module.exports = {
  entry: './index.js',
  target: 'node',
  optimization: {
    minimize: false
  },
  output: {
    filename: "bundle.js"
  }
};
