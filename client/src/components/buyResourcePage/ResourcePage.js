import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ResourceList from './ResourceList';
import {fetchResources} from '../../actions/buyResourceAction';
import {NavLink} from "react-router-dom";

class ResourcePage extends Component {
    componentDidMount() {
        const {user} = this.props.userLogin;
        this.props.fetchResources(user.id);
    }

    render() {
        return (
            <div>
                <div className="ui secondary menu">
                    <NavLink exact activeClassName="active" to="/resources"
                             className="link item">所有权下资源</NavLink>
                    <NavLink exact activeClassName="active" to="/buyResources"
                             className="link active item">阅读权下资源</NavLink>
                </div>
                <div className="container mb-3">
                    <h1>Readable Resources</h1>
                    <ResourceList buyResources={this.props.buyResources}/>
                </div>
            </div>
        );
    }
}

ResourcePage.propTypes = {
    buyResources: PropTypes.array.isRequired,
    fetchResources: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        userLogin: state.userLogin,
        buyResources: state.buyResources
    };
};

export default connect(mapStateToProps, {fetchResources})(ResourcePage);
