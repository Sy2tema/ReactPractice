import React, { useContext, memo } from 'react';
import Tr from './Tr';
import { TableContext } from './MineSweeperGame';

//useContext를 사용하면 계단식으로 자식관계를 따라 내려갈 필요 없이
//필요한 지점에 필요한 값을 공급해줄 수 있다.
//부모단계에서 memo를 적용하려 한다면 자식관계를 따라 최하단까지 전부 memo를 적용해주어야 정상적으로 변경이 완료된다.
const Table = memo(() => {
    const {tableData} = useContext(TableContext);
    return (
        <table>
            {Array(tableData.length).fill().map((tr, index) => <Tr rowIndex={index} />)}
        </table>
    );
});

export default Table;