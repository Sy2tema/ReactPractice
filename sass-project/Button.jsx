import React from 'react';
import classNames from 'classnames';
import './css/Button.scss';

//return을 기입해주지 않아 컴포넌트가 부모 컴포넌트로 반환되지 않은 기초적인 실수 발생
//현재 사용한 방법은 classNames라이브러리를 이용해 처리하는 방식이다.
//css클래스 이름을 동적으로 처리해줄 때 ['클래스명', size].join(' ') or [`클래스명 ${size}]의 방식을 쓸 수도 있다.
//rest문법을 활용하게 되면 props를 통해 이벤트들을 자식 컴포넌트로 불러올 때 더 수월하게 진행할 수 있다.
const Button = ({ children, size, color, outline, fullWidth, ...rest }) => {
    return (
        <button 
            className={classNames('Button', size, color, { outline, fullWidth })} 
            {...rest}
        >
                {children}
        </button>
    );
};

//Button컴포넌트를 선언하기 전에 등록하면 읽어들이지 못하는 오류가 발생한다.
Button.defaultProps = {
    size: 'medium',
    color: 'blue'
};

export default Button;