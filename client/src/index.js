import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';
import logger from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
// import NavigationBar from './components/navPage/NavigationBar';
import FooterPage from './components/footerPage/Footer';
import {BrowserRouter as Router} from 'react-router-dom';
import routes from './routers';
import FlashMessageFlash from './components/flashPage/FlashMessageList';
import setAuthorizationToken from './utils/setAuthorizationToken';
import {setCurrentUser} from "./actions/loginActions";
import jwtDecode from 'jwt-decode';
import Jumbotron from "./components/jumbotron/jumbotron";

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk, logger)
    )
);

if (localStorage.jwtToken){
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
}

ReactDOM.render(
    <Provider store={ store }>
        <Router routes={ routes }>
            <div>
                {/*<NavigationBar/>*/}
                <Jumbotron title="Welcome Here!" subtitle="please contact me for messi.qp711@gmail.com"/>
                <FlashMessageFlash/>
                {routes}
                <FooterPage/>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
