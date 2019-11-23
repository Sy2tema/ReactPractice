import React, {useCallback, memo} from 'react';
import {CELL_CLICK} from './TikTekToGame';

//td에서 쓰고자 하는 dispatch를 table -> tr -> td의 순서로 받아와야 하기 때문에 실제로 
//사용하지 않는 컴포넌트에서도 참조받아야 하는 문제가 있다. 이를 해결하기 위해 contextAPI를 사용하게 된다.
//렌더링이 한칸을 눌렀을 때 나머지 칸들도 함께 되는 문제가 있었다. 이를 해결하기 위해서 React.memo를 적용해 데이터의 변화가 없을 경우
//해당 컴포넌트는 렌더링을 다시 진행하지 않도록 만들어주었다.
const Td = memo(({rowIndex, cellIndex, dispatch, cellData}) => {
    //처음 테이블 등의 컴포넌트를 만들었을 때는 렌더링의 효율성이 떨어지게 된다. 이를 파악하기 위해서
    //useEffect와 useRef를 사용할 수 있다.
    const handleTdClick = useCallback(() => {
        if (cellData)
            return;
        
        dispatch({type: CELL_CLICK, row: rowIndex, cell: cellIndex});
    }, [cellData]);

    return (
        <td onClick={handleTdClick}>{cellData}</td>
    );
});

export default Td;