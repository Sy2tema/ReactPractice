import React from 'react';
import Td from './Td';

const Tr = ({rowData, rowIndex, dispatch}) => {
    return (
        <tr>
            {Array(rowData.length).fill().map((td, index) => (<Td dispatch={dispatch} rowIndex={rowIndex} cellIndex={index} cellData={rowData[index]}>{''}</Td>))}
        </tr>
    );
};

export default Tr;