import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import SassProject from './ScssProject';

const Hot = hot(SassProject);

ReactDOM.render(<Hot/>, document.querySelector('#root'));