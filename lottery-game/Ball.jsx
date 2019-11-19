import React, {memo} from 'react';

//state를 사용하지 않는 자식 컴포넌트라면 class로 만들지 않고 함수형 컴포넌트로 만들어도 무방하다.
//또한 함수 컴포넌트를 PureComponent로 만들어주기 위해 React.memo를 적용해주는데 이를 Higher order Component라고 부른다.
const Ball = memo(({number}) => {
    let background;

    if (number <= 10)
        background = 'red';
    else if (number <= 20)
        background = 'orange';
    else if (number <= 30)
        background = 'yellowgreen';
    else if (number <= 40)
        background = 'lime';
    else
        background = 'skyblue';

    return (
        <div className='ball' style={{background}}>{number}</div>
    );
});

export default Ball;