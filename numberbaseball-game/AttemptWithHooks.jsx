import React from 'react';

//구조분해를 통해 props.attemptInfo.속성 이라 적을 부분의 props를 생략할 수 있도록 만들었다.
const AttemptWithHooks = ({attemptInfo}) => {
    return (
        <li>
            <div>{attemptInfo.attempt}</div>
            <div>{attemptInfo.result}</div>
        </li>
    );
}

export default AttemptWithHooks;