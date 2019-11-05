const path = require('path');

module.exports = {
    name: 'wordchain-game',
    mode: 'development', //배포를 위할 때는 production으로 바꿔줘야 한다.
    devtool: 'eval', //개발 시 사용할 옵션이며 배포시에는 hidden-source-map으로 두는 것이 좋다.
    resolve: { 
        extensions: ['.js', '.jsx'],
    }, //resolve의 extensions옵션에 원하는 확장자들을 넣어주면 웹팩이 알아서 해당 확장자로 된 파일이 있는지 찾아준다.
    
    //입력과 출력에 대한 설정은 가장 중요한 부분중 하나이다.
    entry: {
        app: ['./client']
    }, //입력 설정

    module: {
        rules: [{
            test: /\.jsx?/, //정규 표현식 문법. .js와 .jsx확장자를 찾는다는 뜻이다.
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties'] //state를 사용하기 위해 필요한 모듈
            }, //Babel의 옵션들을 넣어준다.
        }]
    }, //합치기로 한 파일들에 모듈을 적용한다.

    output: {
        path: path.join(__dirname, 'dist'), //현재 폴더 경로에 입력한 경로를 합쳐준다.
        filename: 'app.js'
    }, //출력 설정

};
