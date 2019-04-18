import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {logoutRequest} from '../../actions/loginActions';
import './Navbar.css';

class NavigationBar extends Component {
    static propTypes = {
        userLogin: PropTypes.object.isRequired,
        logoutRequest: PropTypes.func.isRequired
    };

    logoutRequest = (e) => {
        e.preventDefault();
        this.props.logoutRequest();
    };

    render() {
        const {isAuthenticated, user} = this.props.userLogin;

        const userLinks = (
            <div className="container">
                <Link className="navbar-brand" to="/">A站</Link>

                <ul className="navbar-nav mr-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                            上传资源
                        </a>
                        <ul className="dropdown-menu">
                            <li>
                                <Link className="nav-link dropdown-item"
                                      to="/allWebResources/upload">全网上传</Link>
                            </li>
                            <li>
                                <Link className="nav-link dropdown-item" to="/resources/upload">本站上传</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/myWallet">我的钱包</Link>
                    </li>
                </ul>
                <ul className="navbar-nav mt-md-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="">Welcome {user.username}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="" onClick={this.logoutRequest}>退出</Link>
                    </li>
                </ul>
            </div>
        );

        const guestLinks = (
            <div className="container">
                <Link className="navbar-brand" to="/">A站</Link>

                <ul className="navbar-nav mr-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                            上传资源
                        </a>
                        <ul className="dropdown-menu">
                            <li>
                                <Link className="nav-link dropdown-item"
                                      to="/allWebResources/upload">全网上传</Link>
                            </li>
                            <li>
                                <Link className="nav-link dropdown-item" to="/resources/upload">本站上传</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul className="navbar-nav mt-md-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">登录</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup">注册</Link>
                    </li>
                </ul>
            </div>
        );

        return (
            <nav className="navbar navbar-expand-lg mb-3">
                {isAuthenticated ? userLinks : guestLinks}
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userLogin: state.userLogin
    }
};

export default connect(mapStateToProps, {logoutRequest})(NavigationBar);