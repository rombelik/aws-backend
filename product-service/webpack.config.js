// const webpack = require('webpack')
// const slsw = require('serverless-webpack');
 
// module.exports = (async () => {
//   const accountId = await slsw.lib.serverless.providers.aws.getAccountId();
//   return {
//     entry: './src/handler.js',
//     target: 'node',
//     plugins: [
//       new webpack.DefinePlugin({
//         AWS_ACCOUNT_ID: `${accountId}`,
//       }),
//     ],
//     module: {
//       rules: []
//     }
//   };
// })();