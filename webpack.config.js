const path = require('path');

module.exports = {
	mode: process.env.NODE_ENV,
	entry: './client/index.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/build/'
	},
	devServer: {
		publicPath: '/build/',
		proxy: {
			'/api': 'http://localhost:3000',
		}
	},

	module: {
		rules: [
			{
				test: /\.jsx?/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					}
				}
			}, 
			{
				test: /\.s[ac]ss$/i,  // Andie wrote /\.s?css
				use: [ 'style-loader', 'css-loader','sass-loader' ],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [ 'file-loader', ],
			},
		]
	}
}