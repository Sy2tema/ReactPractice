const React = require('react');
const ReactDOM = require('react-dom');
const {hot} = require('react-hot-loader/root');

//class형식으로 작성한 코드를 불러오고자 할 경우 태그에서 WithHooks를 지워주면 된다. 
const WordChainGameWithHooks = require('./WordChainGameWithHooks');

//수정사항이 실시간으로 반영되도록 만들어주는 모듈을 적용
const Hot = hot(WordChainGameWithHooks);

ReactDOM.render(<Hot />, document.querySelector('#root'));