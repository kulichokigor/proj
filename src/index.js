import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';

const playDots = (
   <Router>
        <App />
   </Router>
)

ReactDOM.render(playDots, document.getElementById('root'));

