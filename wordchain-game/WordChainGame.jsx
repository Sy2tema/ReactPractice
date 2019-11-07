//사용을 원하는 모듈은 reqire메소드를 이용해 요청한 후 불러온다.
const React = require('react');
const {Component} = React;

//클래스 형식으로 작성한 코드
class WordChainGame extends Component {
    state = {
        word: '자동차',
        inputValue: '',
        isCorrect: ''
    };

    onSubmitForm = (e) => {
        e.preventDefault();

        if (this.inputValue === '')
            return;

        if (this.state.word[this.state.word.length - 1] === this.state.inputValue[0]) {
            this.setState({
                isCorrect: '형식에 잘 맞게 작성하셨습니다.',
                word: this.state.inputValue,
                inputValue: ''
            });
        } else {
            this.setState({
                isCorrect: '제시된 글자의 가장 뒤 글자와 입력할 단어의 제일 앞 단어를 일치시켜주세요.',
                inputValue: ''
            });
        }

        this.input.focus();
    };

    onChangeInput = (e) => {
        this.setState({inputValue: e.target.value});
    };

    input;
    
    inputRef = (target) => {
        this.input = target;
    };

    render() {
        return (
            <>
                <div>현재 단어 : {this.state.word}</div>
                <form onSubmit={this.onSubmitForm}>
                    <input type="text" ref={this.inputRef} value={this.state.inputValue} onChange={this.onChangeInput}/>
                    <button>입력</button>
                </form>
                <div>{this.state.isCorrect}</div>
            </>
        );
    };
}

//다른 파일에서 이 컴포넌트를 불러올 수 있도록 export작업을 수행한다.
module.exports = WordChainGame;