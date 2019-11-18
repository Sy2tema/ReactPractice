import React, {useState, useRef, useEffect} from 'react';
import RSPCoords from './RSPCoords';
import scores from './scores'; 
import computerChoice from './computerChoice';

const RockScissorPaperGameWithHooks = () => {
    const [resultString, setResult] = useState('');
    const [totalScore, setScore] = useState(0);
    const [imgCoord, setImgCoord] = useState(RSPCoords.rock);
    const interval = useRef();
    const timeout = useRef();

    //Hooks구조에서는 componentDidMount등의 메소드를 사용하기 위해서 useEffect를 활용해야 한다.
    //class컴포넌트와는 완전히 일치하는 기능을 제공하지 않지만 거의 비슷한 역할을 한다고 이해해두자.
    //useEffect를 여러번 선언함으로써 state별로 변화했을 경우 다른 결과가 나타나도록 만들 수 있다.
    useEffect(() => { //componentDidMount, componentDidUpdate의 기능을 한다.
        interval.current = setInterval(changeHand, 100);

        return () => { //componentWillUnmount의 기능을 한다.
            clearInterval(interval.current);
        }
    //배열부분을 이용하면 closer문제를 해결할 수 있게 된다. 해당 배열에 넣은 변수값이 변할 때 useEffect가 실행된다.
    //이 부분에는 꼭 useEffect를 다시 실행시킬 state만 연결해주어야 하며 그렇지 않을 경우 얘기치 못한 부작용이 발생할 수 있다.
    }, [imgCoord]); 

    //useEffect를 대신해서 종종 쓰이는 대안이 useLayoutEffect다. 이는 useEffect와는 달리 화면이 재구성되기 전에 먼저 호출된다.

    const onClickButton = (choice) => () => {
        clearTimeout(timeout.current);
        clearInterval(interval.current);
        const myScore = scores[choice];
        const cpuChoice = scores[computerChoice(imgCoord)];
        const result = myScore - cpuChoice;

        if (result === 0) {
            setResult('비겼습니다.');
        } else if ([-1, 2].includes(result)) {
            setResult('승리하셨습니다!');
            setScore((prevState) => prevState + 1);
        } else {
            setResult('패배하셨습니다...');
            setScore((prevState) => prevState - 1);
        }

        timeout.current = setTimeout(() => {
            interval.current = setInterval(changeHand, 100);
        }, 1000);
    };

    const changeHand = () => {
        if (imgCoord === RSPCoords.rock) {
            setImgCoord(RSPCoords.scissor);
        } else if (imgCoord === RSPCoords.scissor) {
            setImgCoord(RSPCoords.paper);
        } else {
            setImgCoord(RSPCoords.rock);
        }
    };

    return (
        <>
            <div id='computer' style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
            <div>
                <button id='scissor' className='button' onClick={onClickButton('scissor')}>가위</button>
                <button id='rock' className='button' onClick={onClickButton('rock')}>바위</button>
                <button id='paper' className='button' onClick={onClickButton('paper')}>보</button>
            </div>
            <div>{resultString}</div>
            <div>현재 점수는 {totalScore}점 입니다.</div>
        </>
    );
};

export default RockScissorPaperGameWithHooks;