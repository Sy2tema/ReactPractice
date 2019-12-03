import React, { useContext, useCallback } from 'react';
import { CODE, OPEN_CELL, CLICK_MINE, NORMALIZE_CELL, QUESTION_CELL, FLAG_CELL, TableContext } from './MineSweeperGame';

//데이터 타입별로 다른 테이블 스타일을 가지도록 만들어준다.
const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#494444'
            };
        case CODE.CLICK_MINE:
        case CODE.OPENED:
            return {
                background: 'white'
            };
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return {
                background: 'yellowgreen'
            };
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return {
                background: 'crimson'
            };
        default:
            return {
                background: 'white'
            };
    }
};

const getTdText = (code) => {
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return '?';
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return '!';
        case CODE.MINE_CLICKED:
            return '꽝';
        default:
            return '';
    }
};

const Td = ({ rowIndex, cellIndex }) => {
    const { tableData, dispatch, isGameover } = useContext(TableContext);

    //클릭된 셀의 좌표를 dispatch를 활용해 라듀서로 보내준다.
    const handleClickCell = useCallback(() => {
        if (isGameover) {
            return;
        }

        switch (tableData[rowIndex][cellIndex]) {
            case CODE.OPENED:
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
            case CODE.FLAG:
            case CODE.FLAG_MINE:
                return;
            case CODE.NORMAL:
                dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.MINE:
                dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex});
                return;
            default:
                return;
        }
        
    }, [tableData[rowIndex][cellIndex]], isGameover);

    const handleRightClick = useCallback((event) => {
        event.preventDefault();
        if (isGameover) {
            return;
        }

        switch (tableData[rowIndex][cellIndex]) {
            case CODE.FLAG:
            case CODE.FLAG_MINE:
                dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.MINE:
            case CODE.NORMAL:
                dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
                return;
            default:
                return;
        }

    }, [tableData[rowIndex][cellIndex]], isGameover);

    //onContextMenu속성을 활용해 우클릭시 이벤트를 설정해줄 수 있다.
    return (
        <td
            style={getTdStyle(tableData[rowIndex][cellIndex])}
            onClick={handleClickCell}
            onContextMenu={handleRightClick}
        >{getTdText(tableData[rowIndex][cellIndex])}</td>
    );
};

export default Td;