import React, { useContext } from 'react';
import Td from './Td';
import { TableContext } from './MineSweeperGame';

const Tr = ({ rowIndex }) => {
    const { tableData } = useContext(TableContext);

    //tableData가 비어있는 경우도 있기 때문에 테이블 데이터가 생성된 후에
    //테이블이 렌더링 될 수 있도록 해준다.
    return (
        <tr>
            {tableData[0] && Array(tableData[0].length).fill().map((td, index) => <Td rowIndex={rowIndex} cellIndex={index} />)}
        </tr>
    );
};

export default Tr;