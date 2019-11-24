import React, {useState, useRef, useEffect, useMemo} from 'react';
import Ball from './Ball';
import createWinNumber from './CreateWinNumber';

//Hooks구조에서는 선언 순서가 중요하며 state는 조건문 안에 절대로 넣으면 안되며 또한 왠만하면 반복문이나 함수에도 넣지 않는것이 좋다.
const LotterygameWithHooks = () => {
    //useMemo를 사용하게 되면 복잡한 함수의 결과값을 기억해 쓸데없이 재실행하지 않도록 메모해줄 수 있다.
    //useRef는 useMemo와는 달리 일반적인 여러 값들을 기억해둔다.
    //useCallback은 함수 전체를 기억하는 역할을 한다. 이를 통해 함수가 거대하다면 만든 상태로 기억해두어 재생성에 필요한 비용을 줄일 수 있다.
    const lottoNumbers = useMemo(() => createWinNumber(), []);
    const [winNumbers, setWinNumber] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonusBall, setBonusBall] = useState(null);
    const [gameReset, setIsReset] = useState(false);
    const timeouts = useRef([]);

    //useEffect의 두번째 매개변수인 배열부분이 비어있다면 class구조의 componentDidMount와 같은 기능을 한다.
    //이와 달리 배열부분에 state가 있다면 componentDidUpdate까지 함께 수행하게 된다.
    //배열에는 state의 조건식을 포함해 ref등 무언가 판단이 가능하다면 무엇이든 넣어줄 수 있다.
    //이때 주의해야 할 것이 callback은 생성 당시의 state를 기억해두어 state가 변화해도 이전 상태를 기억해두는 문제가 있다.
    //이를 해결하기 위해 두번째 매개변수인 배열에 바뀌었을때 callback을 다시 실행할 state등을 넣어주면 된다.
    //useCallback을 반드시 써야할 때가 있는데 부모 컴포넌트에서 자식 컴포넌트로 함수를 넘길 경우에는 꼭 사용해 보낼 당시 함수를 저장해야 한다.
    //그렇지 않으면 자식 컴포넌트가 부모의 함수가 계속 바뀐다고 간주해 불필요한 렌더링을 계속 진행할 가능성이 생기게 된다.
    useEffect(() => {
        for (let i = 0; i < winNumbers.length - 1; i++) {
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevState) => [...prevState, winNumbers[i]]);
            }, (i + 1) * 1000);
        }

        timeouts.current[6] = setTimeout(() => {
            setWinBalls(winNumbers[6]);
            setIsReset(true);
        }, 7000);

        return () => {
            timeouts.current.forEach((value) => {
                clearTimeout(value);
            })
        }
    }, [timeouts.current[6]]);

    const handleResetButton = () => {
        setWinNumber(createWinNumber());
        setWinBalls([]);
        setBonusBall(null);
        setIsReset(false);
        timeouts.current = [];
    };



    return (
        <>
            <div>당첨 숫자</div>
            <div id='resultWindow'>
                {winBalls.map((value) => <Ball key={value} number={value} />)}
            </div>
            <div>보너스 번호</div>
            {bonusBall && <Ball number={bonusBall} />}
            {gameReset && <button onClick={handleResetButton}>다시하기</button>}
        </>
    );
};

export default LotterygameWithHooks;