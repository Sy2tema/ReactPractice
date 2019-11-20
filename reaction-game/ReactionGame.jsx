import React, {Component, createRef} from 'react';

class ReactionGame extends Component {
    state = {
        currentState: 'waiting',
        information: '클릭해서 시작하세요.',
        reactionTime: []
    };

    timeout;
    startTime;
    endTime;

    onClickScreen = () => {
        const {currentState, information, reactionTime} = this.state;

        if (currentState === 'waiting') {
            this.setState({
                currentState: 'ready',
                information: '화면이 초록색으로 바뀌면 클릭하세요.'
            });
            this.timeout = setTimeout(() => {
                this.setState({
                    currentState: 'now',
                    information: '지금 클릭하세요!'
                });

                this.startTime = new Date();
            }, Math.floor(Math.random() * 2000) + 2000); //2~4초 사이에 바뀐다.
        } else if (currentState === 'ready') { //누르지 않아야 할 타이밍에 누른 경우
            clearTimeout(this.timeout);

            this.setState({
                currentState: 'waiting',
                information: '너무 빠르게 클릭하셨습니다. 초록색이 된 후에 클릭하세요.'
            });
        } else {
            this.endTime = new Date();

            this.setState((prevState) => {
                return {
                    currentState: 'waiting',
                    information: '클릭해서 시작하세요.',
                    //reactionTime: prevState.reactionTime.concat(this.endTime - this.startTime)
                    //위 코드처럼 concat메소드를 활용해도 같은 결과를 얻을 수 있다.
                    reactionTime: [...prevState.reactionTime, this.endTime - this.startTime]
                };
            });
        }
    };

    //null일 경우 div태그가 아예 없는 상태가 된다.
    renderAverage = () => {
        const {reactionTime} = this.state;
        return reactionTime.length === 0 ?
            null : 
            <>
                <div>평균 반응시간 : {reactionTime.reduce((a, c) => a + c) / reactionTime.length}ms</div>
                <button onClick={this.resetHistory}>기록 초기화</button>
            </>
    };

    resetHistory = () => {
        this.setState({
            reactionTime: []
        })
    };

    //render메소드 내의 return부분, 즉 JSX부분에서는 for과 if를 쓸 수 없다.
    //JSX에서 조건문을 사용하고 싶을 때는 보통 삼항연산자를 활용하게 된다.
    //JSX안에서는 조건문이나 반복문을 넣지 않는것을 권장하기 때문에 따로 커스텀 함수를 선언하여 가독성을 늘려주는 것이 좋다.
    //JSX에서 false, undefined, null은 태그가 없음을 의미한다.
    //성능 향상을 위해서는 위의 색을 보여주는 div태그와 아래의 반응속도를 기록한 div태그를 분리하는 것이 좋다.
    render() {
        const {currentState, information} = this.state;
        
        return (
            <>
                <div 
                    id='screen' 
                    className={currentState} 
                    onClick={this.onClickScreen}
                >
                    {information}
                </div>
                {this.renderAverage()}
            </>
        );
    };
}

export default ReactionGame;