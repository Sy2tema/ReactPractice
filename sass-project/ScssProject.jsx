import React from 'react';
import './css/style.scss';
import Button from './Button';

const ScssProject = () => {
    const handleClickButton = () => {
        console.log('버튼 클릭됨');
    };

    return (
        <>
            <div className='app'>
                <div className="buttons" onClick={handleClickButton}>
                    <Button size='large'>버튼1</Button>
                    <Button>버튼2</Button>
                    <Button size='small'>버튼3</Button>
                </div>
                <div className="buttons" onClick={handleClickButton}>
                    <Button size='large' color='grape'>버튼1</Button>
                    <Button color='grape'>버튼2</Button>
                    <Button size='small' color='grape'>버튼3</Button>
                </div>
                <div className="buttons" onClick={handleClickButton}>
                    <Button size='large' color='teal'>버튼1</Button>
                    <Button color='teal'>버튼2</Button>
                    <Button size='small' color='teal'>버튼3</Button>
                </div>
                <div className="buttons" onClick={handleClickButton}>
                    <Button size='large' color='grape' outline>버튼1</Button>
                    <Button outline>버튼2</Button>
                    <Button size='small' color='teal' outline>버튼3</Button>
                </div>
                <div className="buttons" onClick={handleClickButton}>
                    <Button size='large' color='grape' fullWidth>버튼1</Button>
                    <Button fullWidth>버튼2</Button>
                    <Button size='small' color='teal' fullWidth>버튼3</Button>
                </div>
            </div>
        </>
    );
};

export default ScssProject;