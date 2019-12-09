const Path = require('path');

module.exports = {
    name: 'sass-proj',
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry: {
        app: ['./client']
    },
    module: {
        rules: [{ //Sass를 사용하기 위해 config에 등록해주어야 하는 부분
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader'
        }, {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 1% in KR']
                        },
                        debug: true
                    }], 
                    '@babel/preset-react'
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-hot-loader/babel'
                ]
            }
        }]
    },
    output: {
        path: Path.join(__dirname, 'dist'),
        filename: 'app.js'
    }
}