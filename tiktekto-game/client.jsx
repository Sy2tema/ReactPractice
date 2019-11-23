import React from 'react';
import ReactDOM from 'react-dom';
import {hot} from 'react-hot-loader/root';
import TikTekToGame from './TikTekToGame';

const Hot = hot(TikTekToGame);

ReactDOM.render(<Hot/>, document.querySelector('#root'));