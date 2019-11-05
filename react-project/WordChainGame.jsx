//사용을 원하는 모듈은 reqire메소드를 이용해 요청한 후 불러온다.
const React = require('react');
const {Component} = React;

class WordChainGame extends Component {
    state = {
        text: 'Hello, world!'
    };

    render() {
        return <h1>{this.state.text}</h1>
    }
}

//다른 파일에서 이 컴포넌트를 불러올 수 있도록 export작업을 수행한다.
module.exports = WordChainGame;