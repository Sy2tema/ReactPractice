import React, { useContext } from 'react';
import Tr from './Tr';
import { TableContext } from './MineSweeperGame';

//useContext를 사용하면 계단식으로 자식관계를 따라 내려갈 필요 없이
//필요한 지점에 필요한 값을 공급해줄 수 있다.
const Table = () => {
    const {tableData} = useContext(TableContext);
    return (
        <table>
            {Array(tableData.length).fill().map((tr, index) => <Tr rowIndex={index} />)}
        </table>
    );
};

export default Table;