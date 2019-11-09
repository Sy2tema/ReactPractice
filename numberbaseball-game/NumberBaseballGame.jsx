import React, {Component} from 'react';
import Attempt from './Attempt'

function createQuestion() {
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const list = [];

    for (let i = 0; i < 4; i++) {
        const choice = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        list.push(choice);
    }

    return list;
}

//import형식 사용 및 화살표 함수를 쓰지 않은 과거 버전으로 작성
class NumberBaseballGame extends Component {
    constructor(props) {
        super(props);

        //리액트에서는 push메소드로 배열에 요소를 추가해서는 안된다. 불변성의 이유 때문이다.
        //리액트는 변동사항이 있으면 이를 감지해 랜더링을 다시 진행하게 되는데 배열에 push를 하게 된다면 배열내의 요소만 바뀌고
        //참조가 바뀌지 않기 때문에 리액트는 같은 배열이라고 판단하여 랜더링을 진행하지 않는다.
        this.state = {
            resultString: '',
            inputValue: '',
            questionNumber: createQuestion(),
            attempts: []
        };

        //화살표 함수를 사용할때와는 다른 메소드 바인딩 범위로 인해 state를 사용하기 위해서는
        //별도로 해당 함수에 바인딩하는 과정이 필요해진다.
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.inputRef = this.inputRef.bind(this);
    }
    

    onSubmitForm(e) {
        e.preventDefault();

        if (this.state.inputValue === '')
            return;

        //...(객체명)방식으로 쓰는 것을 spread문법이라 하며 얕은 복사가 가능하도록 만들어준다.
        if (this.state.inputValue === this.state.questionNumber.join('')) {
            this.setState({
                resultString: `입력한 숫자인 ${this.value}는 정답입니다!`,
                attempts: [...this.state.attempts, {attempt: this.state.inputValue, result: '홈런!'}] 
            });

            alert('게임을 다시 시작합니다.');

            this.setState({
                value: '',
                questionNumber: createQuestion(),
                attempts: []
            });
        } else {
            //입력받은 4자리수를 각각 쪼개 inputArray객체에 넣어준다.
            const inputArray = this.state.inputValue.split('').map((value) => parseInt(value));
            let strike = 0;
            let ball = 0;

            if (this.state.attempts.length >= 9) {
                this.setState({
                    resultString: `10번 틀리셨습니다. 정답은 ${this.state.questionNumber.join('')} 입니다.`
                });

                this.setState({
                    value: '',
                    questionNumber: createQuestion(),
                    attempts: []
                });
            } else {
                for (let i = 0; i < 4; i++) {
                    if (inputArray[i] === this.state.questionNumber[i])
                        strike++;
                    else if (this.state.questionNumber.includes(inputArray[i]))
                        ball++;
                }

                this.setState({
                    attempts: [...this.state.attempts, {attempt: this.state.inputValue, result: `${strike}스트라이크 ${ball}볼 입니다.`}],
                    inputValue: ''
                });
            }
        }

        this.input.focus();
    }

    onChangeInput(e) {
        this.setState({inputValue: e.target.value});
    }

    input;
    inputRef(target) {
        this.input = target;
    }

    //React에서 반복문을 사용하는 과정에서 map의 내부에 화살표함수를 생성한 후 반복하는 중 key의 기준을 설정하는 데 애를 먹을 수 있다.
    //Java의 Collection에 있는 map과 마찬가지로 키와 값을 넣어줄 수 있으며 그때의 키와 같은 역할을 하는 것이다.
    //성능 최적화를 위해서라도 반드시 키는 단순한 인덱스 번호를 설정하기보다 반복되지 않는 문자열을 설정해주는것이 좋다.
    //정확하게는 react가 key를 기준으로 요소를 추가, 수정, 삭제 판단하기 때문에 배열의 순서가 바뀌게 될 경우 곧바로 문제가 생길 수도 있기 때문이다.
    //이 때 분리된 컴포넌트에 대해 속성값이 따라가지 못한다는 문제가 있는데 HTML에서 태그에 attribute를 지정해주듯이 props를 지정해주어 문제를 해결할 수 있다.

    render() {
        return (
            <>
                <h1>{this.state.resultString}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input 
                        ref={this.inputRef} 
                        type="number" 
                        minLength={4} 
                        maxLength={4} 
                        value={this.state.inputValue} 
                        onChange={this.onChangeInput}
                    />
                </form>
                <div>시도 수 : {this.state.attempts.length}</div>
                <ul>
                    {this.state.attempts.map((value, index) => {
                        return (
                            <Attempt key={`${index + 1}차 시도 : `} attemptInfo={value}/>
                        );
                    })}
                </ul>
            </>
        );
    }
}

export default NumberBaseballGame;