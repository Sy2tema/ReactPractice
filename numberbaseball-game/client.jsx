import React from 'react';
import ReactDOM from 'react-dom';
import {hot} from 'react-hot-loader/root';
import NumberBaseballGame from './NumberBaseballGame';

const Hot = hot(NumberBaseballGame);

ReactDOM.render(<Hot />, document.querySelector('#root'));