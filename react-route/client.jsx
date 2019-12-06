import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import Games from './Games';

const Hot = hot(Games);

//<BrowserRouter><Hot/><BrowserRouter/>와 같은 방식으로 묶어줘도 같은 효과를 기대할 수 있다.
ReactDOM.render(<Hot/>, document.querySelector('#root'));