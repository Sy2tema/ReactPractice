import React, { useState, useCallback, useContext, memo } from 'react';
import { TableContext, START_GAME } from './MineSweeperGame';

//부모 컴포넌트에서 contextAPI를 통해 지정한 데이터들은 자식 컴포넌트에서 useContext를 통해 불러올 수 있다.
const Form = memo(() => {
    const [row, setRow] = useState(10);
    const [cell, setCell] = useState(10);
    const [mine, setMine] = useState(10);
    //value.dispatch를 통해 context를 불러올 수 있다.
    const { dispatch } = useContext(TableContext);

    //불필요한 렌더링을 막기 위해 useCallback으로 겉을 감싸주는 것이 좋다.
    //자주자주 사용해서 습관을 들이자.
    const handleChangeRow = useCallback((event) => {
        setRow(event.target.value);
    }, [row]);
    const handleChangeCell = useCallback((event) => {
        setCell(event.target.value);
    }, [cell]);
    const handleChangeMine = useCallback((event) => {
        setMine(event.target.value);
    }, [mine]);

    const handleClickButton = useCallback(() => {
        dispatch({ type: START_GAME, row, cell, mine });
    }, [row, cell, mine]);

    return (
        <div>
            <input type="number" placeholder='세로' value={row} onChange={handleChangeRow}/>
            <input type="number" placeholder='가로' value={cell} onChange={handleChangeCell}/>
            <input type="number" placeholder='지뢰' value={mine} onChange={handleChangeMine}/>
            <button onClick={ handleClickButton }>게임 시작</button>
        </div>
    );
});

export default Form;