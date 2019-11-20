//코드를 진행하는 과정에서 bonusNumber를 설정할 때 numberList의 길이 - 1의 길이를 설정하지 않아 오류가 발생했다.
//또한 로또 번호를 공에 등록하는 과정에서 length - 1번 반복하지 않고 length번 반복하게 해 보너스 공에는 숫자가 등록되지 않은 문제도 발생했었다.
//Encountered two children with the same key문제를 발견했다. 첫 실행시 3개씩 중복되어 공이 렌더링되었다.
const createWinNumber = () => {
    const numberGroup = Array(45).fill().map((value, index) => index + 1);
    const numberList = [];

    //후보 숫자들 중 한개를 뽑으며 후보 리스트에서 하나씩 줄인다.
    while (numberGroup.length > 0) {
        numberList.push(numberGroup.splice(Math.floor(Math.random() * numberGroup.length), 1)[0]);
    }

    const bonusNumber = numberList[numberList.length - 1];
    const winNumber = numberList.slice(0, 6).sort((number1, number2) => number1 - number2);
    return [...winNumber, bonusNumber];
};

export default createWinNumber;