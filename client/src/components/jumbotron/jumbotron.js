import React, {Component} from 'react';
import './Jumbotron.css';
import {NavLink} from "react-router-dom";
import NavigationBar from '../navPage/NavigationBar.js';

class Jumbotron extends Component {

    state = {
        fileTitle: ''
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = () => {

    };

    render() {
        return (
            <div className="top-container">
                <div className="jumbotron jumbotron-fluid">
                    <NavigationBar/>
                    <div className="container">
                        <div className="top">
                            <h1 className="display-3">{this.props.title}</h1>
                            <p className="lead">{this.props.subtitle}</p>
                        </div>
                    </div>
                </div>
                <div className="ui container ui-container">
                    <div className="ui secondary pointing menu">
                        <NavLink exact activeClassName="active" to="/locationResources" className="link item">本站资源</NavLink>
                        <NavLink exact activeClassName="active" to="/allWebResources" className="link item">全网资源</NavLink>
                        <NavLink exact activeClassName="active" to="/resources" className="link item">我的资源</NavLink>
                        {/*<NavLink exact activeClassName="active" to="/testResources" className="item">资源</NavLink>*/}

                        <div className="right menu">
                            <form className="form-inline mt-2 mt-md-0">
                                <input className="form-control mr-sm-2" type="text" placeholder="Search"
                                       aria-label="Search"/>
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </form>
                            <form className="form-inline mt-2 mt-md-0">
                                <button className="btn my-2 my-sm-0" type="submit">other websites</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Jumbotron;