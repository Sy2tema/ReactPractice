import React, {PureComponent} from 'react';

//반복문 내에 모든 코드를 몰아넣으면 가독성이나 성능등이 측면에서 많은 손해가 발생하기 때문에 적절한 코드 분리가 필요하다.
//코드를 분리 후 원래의 코드로부터 props를 불러왔을 경우 this.props.(props내용)의 형식을 통해 해당 값을 불러올 수 있다.
//반대로 생각해본다면 코드 내에 props가 있다는 것은 그 코드를 사용하는 부모 있다는 것을 의미하기도 한다.
//조상이 몇 단계 아래의 자손에게 props를 넘겨주고자 할 경우도 발생할 수 있다. 이 때 활용하는 것이 redux와 context, mobx등이다.
//jsx파일 형식에서의 주석처리는 {/**/}가 된다.
//PureComponent를 extend하거나 클래스 안에 shouldComponentUpdate메소드를 넣어주는 방식을 통해 변화가 없음에도 계속 다시 랜더링되는
//현상을 개선할 수 있게 된다.
//부모로부터 props로 받아온 속성값은 자식이 바꾸지 않고 부모가 바꿔야 한다. 
//자식이 props의 값을 바꾸고 싶은 경우 따로 자식이 state를 만든 후 해당 값을 넣어준 다음 바꾸는 절차를 통해야 한다.
class Attempt extends PureComponent {
    render() {
        const {attemptInfo} = this.props;

        return (
            <li>
                <div>{attemptInfo.attempt}</div>
                <div>{attemptInfo.result}</div>
            </li>
        );
    }
}

export default Attempt;