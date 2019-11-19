import React, {Component} from 'react';
import Ball from './Ball';

//코드를 진행하는 과정에서 bonusNumber를 설정할 때 numberList의 길이 - 1의 길이를 설정하지 않아 오류가 발생했다.
//또한 로또 번호를 공에 등록하는 과정에서 length - 1번 반복하지 않고 length번 반복하게 해 보너스 공에는 숫자가 등록되지 않은 문제도 발생했었다.
//Encountered two children with the same key문제를 발견했다. 첫 실행시 3개씩 중복되어 공이 렌더링되었다.
const createWinNumber = () => {
    const numberGroup = Array(45).fill().map((value, index) => index + 1);
    const numberList = [];

    //후보 숫자들 중 한개를 뽑으며 후보 리스트에서 하나씩 줄인다.
    while (numberGroup.length > 0) {
        numberList.push(numberGroup.splice(Math.floor(Math.random() * numberGroup.length), 1)[0]);
    }

    const bonusNumber = numberList[numberList.length - 1];
    const winNumber = numberList.slice(0, 6).sort((number1, number2) => number1 - number2);
    return [...winNumber, bonusNumber];
};

//보너스번호인 7번째는 2등에만 영향을 미치니 기억해두자.
//보너스번호를 제외한 앞자리 6개를 전부 맞으면 1등
class LotteryGame extends Component {
    state = {
        winNumbers: createWinNumber(),
        winBalls: [],
        bonusBall: null,
        gameReset: false
    }

    //여러 타이머들을 관리하고자 할 때는 배열로 선언하여 해결할 수 있다.
    timeouts = [];

    //공을 1초마다 차례대로 화면에 렌더링시키는 함수
    drawBalls = () => {
        const {winNumbers} = this.state;

        //let을 이용해 비동기 함수에 변수를 선언하면 클로저 현상을 예방할 수 있게 된다.
        for (let i = 0; i < winNumbers.length - 1; i++) {
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        winBalls: [...prevState.winBalls, winNumbers[i]]
                    };
                });
            }, (i + 1) * 1000);
        }

        this.timeouts[6] = setTimeout(() => {
            this.setState({
                bonusBall: winNumbers[6],
                gameReset: true
            });
        }, 7000);
    }

    componentDidMount() {
        this.drawBalls();
    }

    //componentDidUpdate(prevProps, prevState)에서는 조건문이 중요하다.
    //만일 조건이 존재하지 않으면 상태가 변할때마다 항상 메소드가 실행될 수 있기 때문이다.
    //prevProps를 설정해 부모의 prop이 바뀔때를 캐치하거나 prevState를 통해 이전 상태와 비교해 상태가 변함을 캐치할 수도 있다.
    componentDidUpdate() {
        if (this.state.winBalls.length === 0) {
            this.drawBalls();
        }
    }

    componentWillUnmount() {
        this.timeouts.forEach((timer) => {
            clearTimeout(timer);
        })
    }

    handleResetButton = () => {
        this.setState({
            winNumbers: createWinNumber(),
            winBalls: [],
            bonusBall: null,
            gameReset: false
        });

        this.timeouts = [];
    }

    render() {
        const {winNumber, winBalls, bonusBall, gameReset} = this.state;

        return (
            <>
                <div>당첨 숫자</div>
                <div id='resultWindow'>
                    {winBalls.map((value) => <Ball key={value} number={value} />)}
                </div>
                <div>보너스 번호</div>
                {bonusBall && <Ball number={bonusBall} />}
                {gameReset && <button onClick={this.handleResetButton}>다시하기</button>}
            </>
        );
    }
}

export default LotteryGame;