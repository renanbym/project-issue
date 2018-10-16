import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
    <App />,
    document.getElementById('content')
);

serviceWorker.unregister();
