import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from './store';

import { CookbookServiceProvider } from './components/cookbook-service-context';
import CookbookService from './services/cookbook-service';

import App from './components/app';

const cookbookService = new CookbookService();

ReactDOM.render(
    <Provider store={store}>
        <CookbookServiceProvider value={cookbookService}>
            <Router>
                <App/>
            </Router>
        </CookbookServiceProvider>
    </Provider>,
    document.getElementById('root')
);
