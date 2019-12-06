import React, { useEffect, createContext, useReducer, useMemo } from 'react';
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
    data: {
        row: 0,
        cell: 0,
        mine: 0
    },
    timer: 0,
    resultString: '',
    isGameover: true,
    openedCellCount: 0
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const CONTINUE_TIME = 'CONTINUE_TIME';

//각 액션들에 대한 실제적인 동작을 작성하는 부분이다.
const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                data: {
                    row: action.row,
                    cell: action.cell,
                    mine: action.mine
                },
                openedCellCount: 0,
                tableData: setMine(action.row, action.cell, action.mine),
                isGameover: false,
                timer: 0
            };
        //OPEN_CELL액션 내에서 재귀적으로 해결해야 렌더링을 줄일 수 있다.
        //코드를 진행하면서 오류가 나오면 대부분 괄호관계의 오류나 조건문의 설정 오류, 배열 요소 설정 오류였다. 이를 명심하고 주의해야된다는 생각을 했다.
        case OPEN_CELL: {
            //불변성을 유지하는 부분을 전체 칸으로 확대해 콜스택이 넘치지 않도록 대비해준다.
            const tableData = [...state.tableData];
            tableData.forEach((row, i) => {
                tableData[i] = [...row];
            });

            //반복해서 서로를 체크하지 못하도록 캐싱해준다.
            const alreadyChecked = [];
            let count = 0;
            const checkAround = (row, cell) => {
                //미확인된 칸을 제외한 경우들은 재귀에서 빼준다.
                if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])) {
                    return;
                }
                //게임 밖의 화면일 경우를 제거해준다. 
                if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) {
                    return;
                }
                //체크했는지의 여부를 기록한다.
                if (alreadyChecked.includes(row + '|' + cell)) {
                    return;
                } else {
                    alreadyChecked.push(row + '|' + cell);
                }

                let aroundCell = [
                    tableData[row][cell - 1],
                    tableData[row][cell + 1]
                ];
                //클릭한 셀의 윗줄이 존재하는 경우
                if (tableData[row - 1]) {
                    aroundCell = aroundCell.concat([
                        tableData[row - 1][cell - 1],
                        tableData[row - 1][cell],
                        tableData[row - 1][cell + 1]
                    ]);
                }
                //클릭한 셀의 아랫줄이 존재할 경우
                if (tableData[row + 1]) {
                    aroundCell = aroundCell.concat([
                        tableData[row + 1][cell - 1],
                        tableData[row + 1][cell],
                        tableData[row + 1][cell + 1]
                    ]);
                }
    
                //셀 주위를 확인하며 해당하는 코드명의 수를 기록한다.
                const mineCount = aroundCell.filter(function (value) {
                    return [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE].includes(value);
                }).length;

                //주변에 지뢰가 없는 경우 근처를 계속 비교하며 지뢰가 발견될때까지 연쇄적으로 클릭작용이 가능하도록 만든다.
                if (mineCount === 0) {
                    if (row > -1) {
                        const nearCell = [
                            [row, cell - 1],
                            [row, cell + 1]
                        ];
                        if (row - 1 > -1) {
                            nearCell.push([row - 1, cell - 1]);
                            nearCell.push([row - 1, cell]);
                            nearCell.push([row - 1, cell + 1]);
                        }
                        if (row + 1 < tableData.length) {
                            nearCell.push([row + 1, cell - 1]);
                            nearCell.push([row + 1, cell]);
                            nearCell.push([row + 1, cell + 1]);
                        }

                        //좌우측 끝의 undefined들을 filter()메소드로 제거해준다.
                        nearCell.forEach((element) => {
                            if (tableData[element[0]][element[1]] !== CODE.OPENED) {
                                checkAround(element[0], element[1]);
                            }
                        });
                    }
                }

                if (tableData[row][cell] === CODE.NORMAL) {
                    count++;
                }

                tableData[row][cell] = mineCount;
            };

            checkAround(action.row, action.cell);

            let isGameover = false;
            let resultString = '';

            //승리 조건 확인
            //data state의 속성들이기 때문에 이를 기입하지 않으면 NaN이 뜨게 되었다.
            //미리 숫자가 있는 칸을 클릭한 상태에서 빈 칸을 통해 다시 해당칸을 포함사는 범위를 열게 되면 이미 클릭한 칸도 count에 포함하는 문제 발견
            //count의 위치를 조정해야 할 필요를 느꼈다. 이를 해결하기 위해 normal코드, 즉 열리지 않은 셀이 열렸을 때에만 카운트가 증가하도록 조치했다.
            if (state.data.row * state.data.cell - state.data.mine === state.openedCellCount + count) {
                isGameover = true;
                resultString = `${state.timer}초만에 승리하셨습니다!`;
            }

            return {
                ...state,
                tableData,
                openedCellCount: state.openedCellCount + count,
                isGameover,
                resultString
            };
        }
        case CLICK_MINE: {
            //불변성을 지키기 위해 번거롭더라도 추가적인 작업을 거쳐야 한다.
            //아래의 과정을 거치면 클릭한 셀이 열림으로 바뀌게 된다.
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
        case CONTINUE_TIME: {
            return {
                ...state,
                timer: state.timer + 1
            }
        }
        default:
            return state;
    }
};

//테이블에 대한 전체적인 데이터(지뢰 포함) 생성
const setMine = (row, cell, mine) => {
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
    const value = useMemo(() => ({ tableData, isGameover, dispatch }), [tableData, isGameover]);

    useEffect(() => {
        let interval
        if (!isGameover) {
            interval = setInterval(() => {
                dispatch({ type: CONTINUE_TIME });
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        }
    }, [isGameover]);

    //데이터들을 접근하고싶은 컴포넌트들을 provider로 묶어주어야 정상적으로 contextAPI가 작동하게 된다.
    //이 때 value를 이용해 자식 컴포넌트에게 곧장 전달해주고자 할 데이터를 넣어줄 수 있다.
    return (
        <TableContext.Provider value={value}>
            <Form />
            <div>{timer}초</div>
            <Table />
            <div>{resultString}</div>
        </TableContext.Provider>
    );
};

export default MineSweeperGame;