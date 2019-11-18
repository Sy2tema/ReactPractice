import React, {Component} from 'react';

const RSPCoords = {
    rock: '0',
    scissor: '-142px',
    paper: '-284px'
};

const scores = {
    scissor: 1,
    rock: 0,
    paper: -1
};

const computerChoice = (imgCoord) => {
    return Object.entries(RSPCoords).find(function (value) {
        return value[1] === imgCoord;
    })[0];
};

//LifeCycle
//class의 경우 => constructor -> render -> ref -> componentDidMount -> (stata/props바뀔때) shouldComponentUpdate -> render 
//-> componentDidUpdate -> (부모가 없애고자 할 때)componentWillUnmount -> 제거됨
class RockScissorsPaperGame extends Component {
    state = {
        resultString: '',
        totalScore: 0,
        imgCoord: RSPCoords.rock
    };

    interval;
    timeout;

    //render()메소드가 처음 실행된 후 성공적으로 컴포넌트에 올라갔다면 실행
    //반대로 컴포넌트에서 제거되기 직전은 componentWillUnmount메소드를 사용해 컨트롤하면 된다.
    //componentDidUpdate메소드는 랜더링이 다시 진행될 때마다 실행되는 메소드다.
    componentDidMount() {
        //인터벌이 시작되면 별도의 종료명령을 선언하지 않는다면 브라우저가 종료되기 전까지 계속 반복된다.
        //또한 인터벌 등을 관리할 때는 클로저 문제에 대해 고려하지 않으면 문제가 발생할 수 있다.
        this.interval = setInterval(this.changeHand, 100);
    };

    //컴포넌트가 제거되기 전에는 비동기 요청`들에 대한 정리를 주로 하게 된다.
    //자식 컴포넌트를 빠져나올때는 이 메소드를 등록해주어야 메모리 누수가 덜 일어나도록 만들 수 있다.
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onClickButton = (choice) => () => {
        clearTimeout(this.timeout); //결과가 제대로 출력되기 전에 다른 손을 냈을 경우 로테이션되는 속도가 점점 빨라지는 문제 수정
        const {imgCoord} = this.state;
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const result = myScore - cpuScore;

        if (result === 0) {
            this.setState({
                resultString: '비겼습니다.'
            });
        } else if ([-1, 2].includes(result)) {
            this.setState((prevState) => {
                return {
                    resultString: '이겼습니다!',
                    totalScore: prevState.totalScore + 1
                };
            });
        } else {
            this.setState((prevState) => {
                return {
                    resultString: '졌습니다...',
                    totalScore: prevState.totalScore - 1
                };
            });
        }

        //결과를 잠시동안 보여준 후 다시 게임을 시작하도록 만든다.
        this.timeout = setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100);
        }, 1000);
    };

    changeHand = () => {
        const {imgCoord} = this.state;
        if (imgCoord === RSPCoords.rock) {
            this.setState({
                imgCoord: RSPCoords.scissor
            });
        } else if (imgCoord == RSPCoords.scissor) {
            this.setState({
                imgCoord: RSPCoords.paper
            });
        } else {
            this.setState({
                imgCoord: RSPCoords.rock
            });
        }
    }

    render() {
        const {totalScore, resultString, imgCoord} = this.state;

        return (
            <>
                <div id='computer' style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
                <div>
                    <button id='scissor' className='button' onClick={this.onClickButton('scissor')}>가위</button>
                    <button id='rock' className='button' onClick={this.onClickButton('rock')}>바위</button>
                    <button id='paper' className='button' onClick={this.onClickButton('paper')}>보</button>
                </div>
                <div>{resultString}</div>
                <div>현재 점수는 {totalScore}점 입니다.</div>
            </>
        );
    }
}

export default RockScissorsPaperGame;