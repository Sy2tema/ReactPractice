const React = require('react');
const {useState, useRef} = React;

const GugudanGame = () => {
    const [firstNumber, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [secondNumber, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [inputValue, setValue] = useState('');
    const [resultString, setResult] = useState('');
    const inputRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();

        if (inputValue === '')
            return;

        if (parseInt(inputValue) === firstNumber * secondNumber) {
            setResult('입력한 숫자인 ' + inputValue + '은(는) 정답입니다!');
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
        } else {
            setResult("입력한 숫자는 답이 아닙니다. 다시 입력해주세요.");
            setValue('');
        }

        inputRef.current.focus();
    };

    return (
        <>
            <div>{firstNumber}곱하기 {secondNumber}의 답은 무엇입니까?</div>
            <form onSubmit={onSubmit}>
                <input 
                    ref={inputRef}
                    type="number"
                        value={inputValue}
                    onChange={(e) => {setValue(e.target.value);}}
                />
                <button>입력</button>
            </form>
            <div id='resultString'>{resultString}</div>
        </>
    );
}

module.exports = GugudanGame;