let path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: [
        './src/main.js'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    devServer: {
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loaders: ['babel-loader'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.scss$/,
                use: ["style-loader","css-loader","sass-loader"]
            }
        ]
    }
};