import React from 'react';
import './css/style.scss';
import Button from './Button';

const ScssProject = () => {
    const buttonName = '버튼';
    return (
        <>
            <div className='app'>
                <div className="buttons">
                    <Button>버튼</Button>
                </div>
            </div>
        </>
    );
};

export default ScssProject;