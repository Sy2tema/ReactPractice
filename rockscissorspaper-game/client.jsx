import React from 'react';
import ReactDOM from 'react-dom';
import {hot} from 'react-hot-loader/root';
import RockScissorsPaperGame from './RockScissorsPaperGameWithHooks';

const Hot = hot(RockScissorsPaperGame);

ReactDOM.render(<Hot />, document.querySelector('#root'));