import React from 'react';
import ReactDOM from 'react-dom';
import {hot} from 'react-hot-loader/root';
import NumberBaseballGame from './NumberBaseballGameWithHooks';

const Hot = hot(NumberBaseballGame);

ReactDOM.render(<Hot />, document.querySelector('#root'));