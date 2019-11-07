const React = require('react');
const {useState, useRef} = React;

const WordChainGameWithHooks = () => {
    const [word, setWord] = useState('자동차');
    const [inputValue, setInput] = useState('');
    const [isCorrect, setResult] = useState('');
    const inputRef = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();

        if (inputValue === '')
            return;

        if (word[word.length - 1] === inputValue[0]) {
            setWord(inputValue);
            setInput('');
            setResult('형식에 잘 맞게 작성하셨습니다.');
        } else {
            setResult('제시된 글자의 가장 뒤 글자와 입력할 단어의 제일 앞 단어를 일치시켜주세요.');
            setInput('');
        }

        inputRef.current.focus();
    }

    const onChangeInput = (e) => {
        setInput(e.target.value);
    }

    //요즘에는 htmlFor과 className 대신에 원래의 for과 class도 지원해주고 있다.
    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <input type="text" ref={inputRef} value={inputValue} onChange={onChangeInput}/>
                <button>입력</button>
            </form>
            <div>{isCorrect}</div>
        </>
    );
};

module.exports = WordChainGameWithHooks;