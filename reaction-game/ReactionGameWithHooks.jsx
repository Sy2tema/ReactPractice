import React, {useState, useRef} from 'react';

//class구조에 비해 timeout, startTime, endTime을 변환하는데 많은 차이가 있다.
//Hooks에서는 이들을 ref를 활용해 표현하고 있다. 이 때는 ref의 현재 상태에 값을 넣어주어야 하기 때문에
//current를 추가해줘야 한다.
//state와 ref의 차이라고 한다면 state는 값이 변경되면 return부분이 다시 시작해 랜더링하나 ref는 값이 변경되더라도 
//랜더링이 다시 일어나지 않게 된다. 이를 활용해 값은 바뀌더라도 화면에 영향을 미치고 싶지 않은 값들은 useRef를 통해 선언하게 된다.
//ref는 주로 자주 바뀌지만 화면에 영향을 미치고싶지 않은 값이나 인터벌을 선언할 때 자주 사용된다고 할 수 있다.
const ReactionGameWithHooks = () => {
    const [currentScreen, setScreen] = useState('waiting');
    const [information, setInfo] = useState('클릭해서 시작하세요.');
    const [reactionTime, setList] = useState([]);
    const timeout = useRef(null);
    const startTime = useRef(0);
    const endTime = useRef(0);

    const onClickScreen = () => {
        if (currentScreen === 'waiting') {
            setScreen('ready');
            setInfo('화면이 초록색으로 바뀌면 클릭하세요.');

            timeout.current = setTimeout(() => {
                setScreen('now');
                setInfo('지금 클릭하세요!');
                startTime.current = new Date();
            }, Math.floor(Math.random() * 2000) + 2000);
        } else if (currentScreen === 'ready') {
            clearTimeout(timeout.current);
            setScreen('waiting');
            setInfo('너무 빠르게 클릭하셨습니다. 초록색이 된 후에 클릭하세요.');
        } else {
            endTime.current = new Date();
            setScreen('waiting');
            setInfo('클릭해서 시작하세요.');
            //화살표 함수를 정의한 후 반환값이 있으면 return을 꼭 해주도록 하자
            setList((prevList) => {
                return [...prevList, endTime.current - startTime.current];
            });
        }
    };

    const renderAverage = () => {
        return reactionTime.length === 0 ?
            null : 
            <>
                <div>평균 반응시간 : {reactionTime.reduce((a, c) => a + c) / reactionTime.length}ms</div>
                <button onClick={resetHistory}>기록 초기화</button>
            </>
    };

    const resetHistory = () => {
        setList([]);
    };

    return (
        <>
            <div
                id='screen'
                className={currentScreen}
                onClick={onClickScreen}
            >
                {information}
            </div>
            {renderAverage}
        </>
    );
};

export default ReactionGameWithHooks;