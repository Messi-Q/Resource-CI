import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ResourceList from './ResourceList';
import {fetchResources, deleteResource} from '../../actions/myResourceActions';

class ResourcePage extends Component {
    componentDidMount() {
        const {user} = this.props.userLogin;
        this.props.fetchResources(user.id);
    }

    render() {
        return (
            <div>
                <div className="container mb-3">
                    <h1>My Resource</h1>
                    <ResourceList resources={this.props.resources} deleteResource={this.props.deleteResource}/>
                </div>
            </div>
        );
    }
}

ResourcePage.propTypes = {
    resources: PropTypes.array.isRequired,
    fetchResources: PropTypes.func.isRequired,
    deleteResource:PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        userLogin: state.userLogin,
        resources: state.resources
    };
};

export default connect(mapStateToProps, {fetchResources, deleteResource})(ResourcePage);
