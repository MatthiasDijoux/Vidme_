const Dotenv = require('dotenv-webpack');

module.exports = {
  devServer: {
    port: 8081
  }
}
 
module.exports = {
  plugins: [
    new Dotenv()
  ]
};