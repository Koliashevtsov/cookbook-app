import React from 'react';
import { Route } from 'react-router-dom';

import './app.scss';

import Header from '../header';

import ItemsListContainer from '../../containers/items-list-container';
import ViewPage from '../view-page';
import Footer from '../footer';

const App = (props) => {
    return (
        <div className="app">
            <Header/>
            <div className="app-container">
                <Route
                    exact path="/"
                    component={ItemsListContainer}/>
                <Route
                    path="/view-page/:itemId/:updatedDate"
                    component={ViewPage}/>
            </div>
            <Footer/>
        </div>
    );
}
export default App;
