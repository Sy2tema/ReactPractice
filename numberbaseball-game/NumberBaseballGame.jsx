import React, {Component, createRef} from 'react';
import Attempt from './Attempt'

//this를 사용하지 않는 클래스 내의 부분은 함수로서 분할이 가능하다.
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

    //숫자야구게임에서 값을 아직 submit하지 않고 input창에 입력만 하는데도 리스트의 상태가 계속
    //다시 랜더링되는 문제를 해결하기 위해 추가적으로 함수 적용
    //이 함수를 적용하게 될 경우 이전 상태와 비교해 변경점이 있을 경우에만 해당 컴포넌트를 다시 랜더링하게 된다.
    //이 메소드에서 nextContext를 활용한다면 조상으로부터 자손으로 한 번에 props를 전달할 수 있게 된다.
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if (this.state.counter !== nextState.counter)
    //         return true;
    //     return false;
    // }

    onSubmitForm(e) {
        e.preventDefault();
        //비구조화 할당을 활용해 자주 쓰이는 this.state를 따로 빼줄 수 있다.
        const {resultString, inputValue, questionNumber, attempts} = this.state;

        if (inputValue === '')
            return;

        //...(객체명)방식으로 쓰는 것을 spread문법이라 하며 얕은 복사가 가능하도록 만들어준다.
        if (inputValue === questionNumber.join('')) {
            //prevState변수를 추가적으로 생성해 이전 시도를 저장한 배열을 현재 바꿀 배열과 구분지어야 한다.
            //그렇지 않을 경우 현재 바꾸고자 할 배열과 이전 배열의 관계가 꼬일 수 있기 때문이다.
            //함수 안에 또다른 함수를 넣을 때 이 함수를 일급 함수라고 부른다.
            this.setState(function (prevState) {
                return {
                    resultString: `입력한 숫자인 ${inputValue}은(는) 정답입니다!`,
                    attempts: [...prevState.attempts, {attempt: inputValue, result: '홈런!'}] 
                };
            });

            alert('게임을 다시 시작합니다.');

            this.setState({
                inputValue: '',
                questionNumber: createQuestion(),
                attempts: []
            });
        } else {
            //입력받은 4자리수를 각각 쪼개 inputArray객체에 넣어준다.
            //map메소드를 사용할 때의 주의할 점은 입력값과 출력값의 숫자가 항상 같아야 한다는 것이다.
            const inputArray = inputValue.split('').map((value) => parseInt(value));
            let strike = 0;
            let ball = 0;

            if (attempts.length >= 9) {
                this.setState({
                    resultString: `10번 틀리셨습니다. 정답은 ${questionNumber.join('')} 입니다.`
                });

                this.setState({
                    value: '',
                    questionNumber: createQuestion(),
                    attempts: []
                });
            } else {
                for (let i = 0; i < 4; i++) {
                    if (inputArray[i] === questionNumber[i])
                        strike++;
                    else if (questionNumber.includes(inputArray[i]))
                        ball++;
                }

                this.setState(function(prevState) {
                    return {
                        attempts: [...prevState.attempts, {attempt: inputValue, result: `${strike}스트라이크 ${ball}볼 입니다.`}],
                        inputValue: ''
                    };
                });
            }
        }

        this.inputRef.current.focus();
    }

    onChangeInput(e) {
        this.setState({inputValue: e.target.value});
    }

    //ref를 별도의 함수를 추가해 this로 바인딩하는 대신 createRef()메소드를 사용한다.
    //이전에 썼던 방식에 비해 current를 추가로 넣어야 하는 단점이 발생하지만
    //Hooks구조와의 통일성이라는 면에서는 장점이 된다.
    inputRef = createRef();

    //React에서 반복문을 사용하는 과정에서 map의 내부에 화살표함수를 생성한 후 반복하는 중 key의 기준을 설정하는 데 애를 먹을 수 있다.
    //Java의 Collection에 있는 map과 마찬가지로 키와 값을 넣어줄 수 있으며 그때의 키와 같은 역할을 하는 것이다.
    //성능 최적화를 위해서라도 반드시 키는 단순한 인덱스 번호를 설정하기보다 반복되지 않는 문자열을 설정해주는것이 좋다.
    //정확하게는 react가 key를 기준으로 요소를 추가, 수정, 삭제 판단하기 때문에 배열의 순서가 바뀌게 될 경우 곧바로 문제가 생길 수도 있기 때문이다.
    //이 때 분리된 컴포넌트에 대해 속성값이 따라가지 못한다는 문제가 있는데 HTML에서 태그에 attribute를 지정해주듯이 props를 지정해주어 문제를 해결할 수 있다.
    //render내에는 setState를 절대 넣어주면 안된다. 이를 넣게 되면 render와 반복해 계속 실행되는 무한루프가 발생한다.
    render() {
        const {resultString, inputValue, attempts} = this.state;

        return (
            <>
                <h1>{resultString}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input 
                        ref={this.inputRef} 
                        type="number" 
                        minLength={4} 
                        maxLength={4} 
                        value={inputValue} 
                        onChange={this.onChangeInput}
                    />
                </form>
                <div>시도 수 : {attempts.length}</div>
                <ul>
                    {attempts.map(function (value, index) {
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