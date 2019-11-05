//기존의 script태그를 통해 홈페이지로부터 불러오는 방식 대신 node를 이용해 패키지를 다운로드 후 
//require메소드로 해당 모듈을 불러오는 방식으로 바꾸게 되었다.
const React = require('react');
const ReactDOM = require('react-dom');

const WordChainGame = require('./WordChainGame');

ReactDOM.render(<WordChainGame/>, document.querySelector('#root'));