import React from 'react';

import {Route} from 'react-router-dom';
import HomePage from "./components/homePage/Home";
import SignPage from './components/signupPage/SignupPage';
import LoginPage from './components/loginPage/LoginPage';
import ResourcePage from './components/resourcePage/ResourcePage';
import ResourceForm from './components/resourcePage/ResourceForm';
import requireLogin from './utils/requireLogin';

export default (
    <div className="container">
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/signup" component={SignPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/resources" component={requireLogin(ResourcePage)}/>
        <Route path="/resources/upload" component={requireLogin(ResourceForm)}/>
        <Route path="/resource/" component={requireLogin(ResourceForm)}/>
    </div>
)