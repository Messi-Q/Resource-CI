import React from 'react';
import {Route} from 'react-router-dom';
import HomePage from "./components/homePage/Home";
import SignPage from './components/signupPage/SignupPage';
import LoginPage from './components/loginPage/LoginPage';
import MyResourcePage from './components/myResourcePage/ResourcePage';
import MyResourceForm from './components/myResourcePage/ResourceForm';
import MyResourceUpdate from './components/myResourcePage/ResourceUpdate';
import LocationResourcePage from './components/locationResourcePage/ResourcePage';
import LocationResourceForm from './components/locationResourcePage/ResourceForm';
import AllWebResourceForm from './components/allWebResourcePage/ResourceForm';
import AllWebResourcePage from './components/allWebResourcePage/ResourcePage';
import AllWebResourceTxPage from './components/allWebResourcePage/ResourceTxPage';
import BuyResourcePage from './components/buyResourcePage/ResourcePage';
import BuyResource from './components/buyResourcePage/ResourceForm';
import MyWalletPage from './components/walletPage/MyWalletPage';
import RechargePage from './components/walletPage/RechargeForm';
import requireLogin from './utils/requireLogin';
import ConfirmPage from './components/confirmationPage/ConfirmPage';

export default (
    <div className="container">
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/signup" component={SignPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/buyResources" component={requireLogin(BuyResourcePage)}/>
        <Route exact path="/buyResources/:id" component={requireLogin(BuyResource)}/>
        <Route exact path="/resources" component={requireLogin(MyResourcePage)}/>
        <Route path="/resources/upload" component={requireLogin(MyResourceForm)}/>
        <Route path="/resource/:id" component={requireLogin(MyResourceUpdate)}/>
        <Route exact path="/locationResources" component={LocationResourcePage}/>
        <Route path="/locationResource/:id" component={requireLogin(LocationResourceForm)}/>
        <Route path="/allWebResources/upload" component={requireLogin(AllWebResourceForm)}/>
        <Route exact path="/allWebResources" component={requireLogin(AllWebResourcePage)}/>
        <Route path="/allWebResource/:id" component={requireLogin(AllWebResourceTxPage)}/>
        <Route path="/myWallet" component={requireLogin(MyWalletPage)}/>
        <Route path="/userRecharge" component={requireLogin(RechargePage)}/>
        <Route path="/confirm" component={requireLogin(ConfirmPage)}/>
    </div>
)