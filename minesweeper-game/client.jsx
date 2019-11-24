import React from 'react';
import ReactDOM from 'react-dom';
import {hot} from 'react-hot-loader/root';
import MineSweeperGame from './MineSweeperGame';

const Hot = hot(MineSweeperGame);

ReactDOM.render(<Hot />, document.querySelector('#root'));