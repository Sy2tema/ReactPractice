import React, {createContext, useReducer, useMemo} from 'react';
import Table from './Table';
import Form from './Form';

//상태별로 숫자를 구별해 더 알아보기 쉽도록 만들었다.
export const CODE = {
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
    dispatch: () => {},
    isGameover: true
});

const initState = {
    tableData: [],
    timer: 0,
    resultString: '',
    isGameover: true
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';

//각 액션들에 대한 실제적인 동작을 작성하는 부분이다.
const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                tableData: setMine(action.row, action.cell, action.mine),
                isGameover: false
            };
        //OPEN_CELL액션 내에서 재귀적으로 해결해야 렌더링을 줄일 수 있다.
        case OPEN_CELL: {
            //불변성을 지키기 위해 번거롭더라도 추가적인 작업을 거쳐야 한다.
            //아래의 과정을 거치면 클릭한 셀이 열림으로 바뀌게 된다.
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.OPENED;

            let aroundCell = [];
            //클릭한 셀의 윗줄이 존재하는 경우
            if (tableData[action.row - 1]) {
                aroundCell = aroundCell.concat(
                    tableData[action.row - 1][action.cell - 1],
                    tableData[action.row - 1][action.cell],
                    tableData[action.row - 1][action.cell + 1]
                );
            }
            aroundCell = aroundCell.concat(
                tableData[action.row][action.cell - 1],
                tableData[action.row][action.cell + 1]
            );
            //클릭한 셀의 아랫줄이 존재할 경우
            if (tableData[action.row + 1]) {
                aroundCell = aroundCell.concat(
                    tableData[action.row + 1][action.cell - 1],
                    tableData[action.row + 1][action.cell],
                    tableData[action.row + 1][action.cell + 1]
                );
            }

            //셀 주위를 확인하며 해당하는 코드명의 수를 기록한다.
            const mineCount = aroundCell.filter
                ((value) => [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE].includes(value)).length;
            tableData[action.row][action.cell] = mineCount;

            console.log(mineCount, aroundCell);

            return {
                ...state,
                tableData
            };
        }
        case CLICK_MINE: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.MINE_CLICKED;
            return {
                ...state,
                tableData,
                isGameover: true
            }
        }
        case FLAG_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.MINE) {
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return {
                ...state,
                tableData
            }
        }
        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData
            }
        }
        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
                tableData[action.row][action.cell] = CODE.MINE;
            } else {
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData
            }
        }
        default:
            return state;
    }
};

//테이블에 대한 전체적인 데이터(지뢰 포함) 생성
const setMine = (row, cell, mine) => {
    console.log('setMine실행', row, cell, mine);
    const numberList = Array(row * cell).fill().map((arr, index) => {
        return index;
    });

    const pickList = [];

    while (numberList.length > row * cell - mine) {
        const pick = numberList.splice(Math.floor(Math.random() * numberList.length), 1)[0];
        pickList.push(pick);
    }

    //이차원 배열을 이용해 테이블 데이터를 만든다.
    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    for (let i = 0; i < pickList.length; i++) {
        const vertical = Math.floor(pickList[i] / cell);
        const horizontal = pickList[i] % cell;
        data[vertical][horizontal] = CODE.MINE;
    }

    return data;
}

//dispatch를 사용하지 않고 contextAPI를 활용해 자식 컴포넌트에 곧장 값들을 보낼 수 있도록 한다.
const MineSweeperGame = () => {
    const [state, dispatch] = useReducer(reducer, initState);
    const { isGameover, tableData, timer, resultString } = state;

    //provider에 그대로 데이터를 넣어주면 렌더링이 새로 될 때마다 새 객체가 중복생성되기 때문에 효율이 떨어진다.
    //이를 해소하기 위해 useMemo를 통해 값에 변화가 있을 때에만 렌더링이 진행되도록 해주어야 한다.
    const value = useMemo(() => ({ tableData: tableData, isGameover, dispatch }), [tableData, isGameover]);

    //데이터들을 접근하고싶은 컴포넌트들을 provider로 묶어주어야 정상적으로 contextAPI가 작동하게 된다.
    //이 때 value를 이용해 자식 컴포넌트에게 곧장 전달해주고자 할 데이터를 넣어줄 수 있다.
    return (
        <TableContext.Provider value={value}>
            <Form />
            <div>{timer}</div>
            <Table />
            <div>{resultString}</div>
        </TableContext.Provider>
    );
};

export default MineSweeperGame;