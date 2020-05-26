import React from 'react';
import { Route } from 'react-router-dom';

import './app.scss';

import Header from '../header';

import ItemsListContainer from '../../containers/items-list-container';
import ViewPage from '../view-page';
import AddItemContainer from '../../containers/add-item-container';
import EditItemContainer from '../../containers/edit-item-container';
import AuthenticationContainer from '../../containers/authentication-container';
import Footer from '../footer';


const App = (props) => {
    return (
        <div className="app">
            <Header/>
            <div className="app-container">
                <div className="main">
                    <Route
                        exact path="/"
                        component={ItemsListContainer}/>
                    <Route
                        path="/view-page/:recipeId/:versionId"
                        component={ViewPage}/>
                    <Route
                        path="/add-item"
                        component={AddItemContainer}/>
                    <Route
                        path="/edit-item/:recipeId/:versionId"
                        component={EditItemContainer}/>
                </div>
                <Route
                    path="/sign-up"
                    component={AuthenticationContainer}/>
                <Route
                    path="/sign-in"
                    component={AuthenticationContainer}/>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
