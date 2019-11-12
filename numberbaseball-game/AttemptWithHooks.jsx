import React, {memo} from 'react';

//구조분해를 통해 props.attemptInfo.속성 이라 적을 부분의 props를 생략할 수 있도록 만들었다.
//클래스 구조의 PureComponent등을 사용하지 못하는 Hooks구조에서 그 대안으로 존재하는 memo를 사용해
//같은 효과를 얻도록 했다.
const AttemptWithHooks = memo(({attemptInfo}) => {
    return (
        <li>
            <div>{attemptInfo.attempt}</div>
            <div>{attemptInfo.result}</div>
        </li>
    );
});

export default AttemptWithHooks;