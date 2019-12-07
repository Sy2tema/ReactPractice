import React from 'react';
import './css/Button.scss';

//return을 기입해주지 않아 컴포넌트가 부모 컴포넌트로 반환되지 않은 기초적인 실수 발생
const Button = ({ children }) => {
    return <button className='btn'>{children}</button>
};

export default Button;