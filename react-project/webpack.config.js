const path = require('path');
const webpack = require('webpack');

module.exports = {
    name: 'wordchain-game',
    mode: 'development', //배포를 위할 때는 production으로 바꿔줘야 한다.
    devtool: 'eval', //개발 시 사용할 옵션이며 배포시에는 hidden-source-map으로 두는 것이 좋다.
    resolve: { 
        extensions: ['.js', '.jsx'],
    }, //resolve의 extensions옵션에 원하는 확장자들을 넣어주면 웹팩이 알아서 해당 확장자로 된 파일이 있는지 찾아준다.
    
    //입력과 모듈, 출력에 대한 설정은 가장 중요한 부분중 하나이다.
    entry: {
        app: ['./client']
    }, //입력 설정
    module: {
        rules: [{
            test: /\.jsx?/, //정규 표현식 문법. .js와 .jsx확장자를 찾는다는 뜻이다.
            loader: 'babel-loader',
            options: {
                //플러그인들의 모음을 presets라고 부른다.
                presets: [['@babel/preset-env', {
                    targets: {
                        browsers: ['> 5% in KR'] //babel이 지원할 브라우저 버전을 설정할 수 있다.
                    } //>5% in KR이라 설정한다면 한국에서 브라우저 점유율이 5%를 넘는 브라우저들을 전부 지원한다는 뜻이다.
                }], '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties'] //state를 사용하기 위해 필요한 모듈
            }, //Babel의 옵션들을 넣어준다.
        }]
    }, //합치기로 한 파일들에 모듈을 적용한다.
    plugins: [
        new webpack.LoaderOptionsPlugin({debug: true}),
    ], //모듈에 적용한 플러그인 외의 추가적으로 사용하고자 하는 외부 플러그인들을 설정한다.
    output: {
        path: path.join(__dirname, 'dist'), //현재 폴더 경로에 입력한 경로를 합쳐준다.
        filename: 'app.js'
    }, //출력 설정

};
