import React, { Component } from 'react';
import './Jumbotron.css';
import {NavLink} from "react-router-dom";

class Jumbotron extends Component {
  render() {
    return (
        <div className="top">
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-3">{this.props.title}</h1>
                    <p className="lead">{this.props.subtitle}</p>
                </div>
            </div>
            <div className="ui container">
                <div className="ui tabular menu">
                    <NavLink exact activeClassName="active" to="/1" className="item">本站资源</NavLink>
                    <NavLink exact activeClassName="active" to="/2" className="item">全网资源</NavLink>
                    <NavLink exact activeClassName="active" to="/resources" className="item">我的资源</NavLink>
                    {/*<div className="right menu">*/}
                        {/*<NavLink to="/4" className="ui item" exact activeClassName="active">Logout</NavLink>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
  }
}

export default Jumbotron;
