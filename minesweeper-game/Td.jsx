import React, { useContext, useCallback, memo } from 'react';
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
            //근처에 지뢰가 없는 경우는 빈 칸을, 이외의 경우에는 근처 지뢰의 개수가 렌더링되도록 해준다.
            //or연산자를 이용했으며 ''은 false와 같은 의미를 가진다.
            return code || '';
    }
};

const Td = memo(({ rowIndex, cellIndex }) => {
    const { tableData, dispatch, isGameover } = useContext(TableContext);

    //클릭된 셀의 좌표를 dispatch를 활용해 라듀서로 보내준다.
    //isGameover플래그가 작동하지 않는 문제가 있었으나 확인 결과 useCallback의 변화 조건을 담은
    //배열의 밖에 해당 플래그를 배치해 인식하지 못했음을 발견했으며 배열 안에 넣어주어 문제를 해결했다.
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
        
    }, [tableData[rowIndex][cellIndex], isGameover]);

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

    }, [tableData[rowIndex][cellIndex], isGameover]);

    //onContextMenu속성을 활용해 우클릭시 이벤트를 설정해줄 수 있다.
    return (
        <td
            style={getTdStyle(tableData[rowIndex][cellIndex])}
            onClick={handleClickCell}
            onContextMenu={handleRightClick}
        >{getTdText(tableData[rowIndex][cellIndex])}</td>
    );
});

export default Td;