import React, {memo} from 'react';
import Td from './Td';

//반복문이 존재하는 컴포넌트에 주로 memo를 적용하면 효과를 볼 수 있다.
//React.memo로도 효과를 보지 못할 경우 useMemo를 활용해 특정 컴포넌트를 기억하도록 만들 수도 있다.
const Tr = memo(({rowData, rowIndex, dispatch}) => {
    return (
        <tr>
            {Array(rowData.length).fill().map((td, index) => (<Td dispatch={dispatch} rowIndex={rowIndex} cellIndex={index} cellData={rowData[index]}>{''}</Td>))}
        </tr>
    );
});

export default Tr;