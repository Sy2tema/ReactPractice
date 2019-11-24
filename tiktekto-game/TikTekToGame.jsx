import React, {useReducer, useCallback, useEffect} from 'react';
import Table from './Table';

const initState = {
    winner: '',
    turn: 'O',
    tableData: [['', '', ''], ['', '', ''], ['', '', '']],
    recentCell: [-1, -1]
};

//action의 이름들은 대문자로 하는 것이 일반적이다.
//자식 컴포넌트에서도 사용할 수 있기 때문에 export를 붙여 모듈화시켜주는 것이 좋다.
export const SET_WINNER = 'SET_WINNER';
export const CELL_CLICK = 'CELL_CLICK';
export const CHANGE_TURN = 'CHANGE_TURN';
const RESET_TABLE = 'RESET_TABLE';
const DRAW_GAME = 'DRAW_GAME';

//reducer에서 state를 바꾸고자 할 때는 직접적으로 바꾸면 안된다. 이 대신 얕은 복사를 통해
//기존 상태를 참조한 후 해당 값을 바꿔 다시 원래의 state와 교체하는 방식을 취해야 한다.
const reducer = (state, action) => {
    switch (action.type) {
        case SET_WINNER:
            return {
                ...state,
                winner: action.winner
            };
        case DRAW_GAME:
            return {
                ...state,
                winner: '무승부입니다.'
            }
        case CELL_CLICK: {
            const tableData = [...state.tableData];
            //immer라이브러리를 활용하면 객체를 얕은 복사하며 발생하는 가독성 문제를 해결할 수 있다.
            tableData[action.row] = [...tableData[action.row]];
            tableData[action.row][action.cell] = state.turn;

            //return부분이 setState와 같은 역할을 수행한다.
            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell],
            };
        }
        case CHANGE_TURN:
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O'
            };
        case RESET_TABLE:
            return {
                ...state,
                turn: 'O',
                tableData: [['', '', ''], ['', '', ''], ['', '', '']],
                recentCell: [-1, -1]
            };
        default:
            return state;
    }
};
    
//useReducer는 사용시 딱 하나의 state와 setSTate로 압축해주어 state자체의 개수를 줄여주는 역할을 한다.
const TikTekToGame = () => {
    //useReducer에는 3번째 매개변수로 지연 초기화가 있으나 프로젝트가 복잡해지지 않는 이상 거의 쓰이지 않는다.
    //dispatch가 호출되면 reducer메소드가 호출되며 이를 통해 어떤 state를 불러오고 싶어하는지 식별하게 된다.
    const [state, dispatch] = useReducer(reducer, initState);
    const {tableData, winner, recentCell, turn} = state;

    //reducer을 통해 모아놓은 state들은 useCallback으로 이벤트를 적용할 수 있다.
    const handleTableClick = useCallback(() => {
        dispatch({type: 'SET_WINNER', winner: '나'});
    }, []);

    useEffect(() => {
        const [row, cell] = recentCell;
        let win = false;
        //첫 렌더링시에는 아무 칸도 선택된 상태가 아니기 때문에 그냥 종료시킨다.
        if (row < 0)
            return

        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true;
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true;
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true;
        }
        if (tableData[2][0] === turn && tableData[1][1] === turn && tableData[0][2] === turn) {
            win = true;
        }

        if (win) {
            dispatch({type: SET_WINNER, winner: turn === 'O' ? '나의 승리' : '컴퓨터의 승리'});
            dispatch({type: RESET_TABLE});
        } else {
            //무승부를 검사하는 부분으로 승부가 나지 않은 상태에서 모든 셀이 다 차있으면 무승부로 처리한다.
            let isFull = true;
            tableData.forEach((row) => {
                row.forEach((cell) => {
                    if (!cell) 
                        isFull = false;
                });
            });

            if (isFull) {
                dispatch({type: DRAW_GAME});
                dispatch({type: RESET_TABLE});
            } else {
                //Td에서 셀을 클릭한 후 승부가 나지 않았을 때 턴이 바뀌는 것이 아닌 승자를 계산하는 중에 턴이 바뀌는 비동기 문제가 발생했다.
                dispatch({type: CHANGE_TURN});
            }
        }
    }, [recentCell]);

    return (
        <>
            <Table onClick={handleTableClick} tableData={tableData} dispatch={dispatch}/>
            {winner && <div>{winner}</div>}
        </>
    );
}

export default TikTekToGame;