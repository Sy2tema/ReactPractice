import React, {useCallback, useReducer, useMemo} from 'react';
import Table from './Table';
import From from './From';

//상태별로 숫자를 구별해 더 알아보기 쉽도록 만들었다.
export const objectList = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    MINE_CLICKED: -6,
    OPENED: 0
}

//괄호 안에는 초기값을 넣어줄 수 있다.
export const TableContext = createContext({
    tableData: [],
    dispatch: () => {}
});

const initState = {
    tableData: [],
    timer: 0,
    resultString: ''
};

export const START_GAME = 'START_GAME';

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME: {
            return {
                ...state,
                tableData: setMine(action.row, action.cell, action.mine);
            };
        }
        default:
            return state;
    }
};

//dispatch를 사용하지 않고 contextAPI를 활용해 자식 컴포넌트에 곧장 값들을 보낼 수 있도록 한다.
const MineSweeperGame = () => {
    const [state, dispatch] = useReducer(reducer, initState);

    //provider에 그대로 데이터를 넣어주면 렌더링이 새로 될 때마다 새 객체가 중복생성되기 때문에 효율이 떨어진다.
    //이를 해소하기 위해 useMemo를 통해 값에 변화가 있을 때에만 렌더링이 진행되도록 해주어야 한다.
    const value = useMemo(() => ({tableData: state.tableData, dispatch}), [state.tableData]);

    //데이터들을 접근하고싶은 컴포넌트들을 provider로 묶어주어야 정상적으로 contextAPI가 작동하게 된다.
    //이 때 value를 이용해 자식 컴포넌트에게 곧장 전달해주고자 할 데이터를 넣어줄 수 있다.
    return (
        <TableContext.Provider value={{tableData: state.tableData, dispatch}}>
            <Form />
            <div>{state.timer}</div>
            <Table />
            <div>{state.resultString}</div>
        </TableContext.Provider>
    );
};

export default MineSweeperGame;