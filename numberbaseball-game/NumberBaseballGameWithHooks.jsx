import React, {useState, createRef} from 'react';
import Attempt from './AttemptWithhooks'

const createQuestion = () => {
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const list = [];

    for (let i = 0; i < 4; i++) {
        const choice = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        list.push(choice);
    }

    return list;
}

const NumberBaseballGameWithHooks = () => {
    const [questionNumber, setQuestion] = useState(createQuestion());
    const [resultString, setResult] = useState('숫자야구 게임입니다. 10번 내에 정답을 맞춰주세요.');
    const [inputValue, setValue] = useState('');
    const [attempts, setList] = useState([]);
    const inputRef = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();

        if (inputValue === '')
            return;

        if (inputValue === questionNumber.join('')) {
            setList(prevState => (
                [...prevState, {attempt: inputValue, result: '홈런!'}]
            ));
            setResult(`입력한 숫자인 ${inputValue}는 정답입니다!`);

            alert('게임을 다시 시작합니다.');

            setValue('');
            setList([]);
            setQuestion(createQuestion());
        } else {
            const inputArray = inputValue.split('').map((value) => parseInt(value));
            let strike = 0;
            let ball = 0;

            if (attempts.length >= 9) {
                setResult(`10번 틀리셨습니다. 정답은 ${questionNumber.join('')}입니다.`);

                alert('게임을 다시 시작합니다.');

                setValue('');
                setList([]);
                setQuestion(createQuestion());
            } else {
                for (let i = 0; i < 4; i++) {
                    if (inputArray[i] === questionNumber[i])
                        strike++;
                    else if (questionNumber.includes(inputArray[i]))
                        ball++;
                }

                setList((prevState) => (
                    [...prevState, {attempt: inputValue, result: `${strike}스트라이크 ${ball}볼 입니다.`}]
                ));
                setValue('');
            }
        }

        inputRef.current.focus();
    }

    return (
        <>
            <h1>{resultString}</h1>
            <form onSubmit={onSubmitForm}>
                <input 
                    ref={inputRef} 
                    type="number" 
                    minLength={4} 
                    maxLength={4} 
                    value={inputValue} 
                    onChange={(e) => setValue(e.target.value)}
                />
            </form>
            <div>시도 수 : {attempts.length}</div>
            <ul>
                {attempts.map(function (value, index) {
                    return (
                        <Attempt key={`${index + 1}차 시도 : `} attemptInfo={value}/>
                    );
                })}
            </ul>
        </>
    );
}

export default NumberBaseballGameWithHooks;