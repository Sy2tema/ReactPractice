import React from 'react';
import ReactDOM from 'react-dom';
import {hot} from 'react-hot-loader/root';
import LotteryGame from './LotteryGame';

const Hot = hot(LotteryGame);

ReactDOM.render(<Hot />, document.querySelector('#root'));