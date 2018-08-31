import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ResourceList from './ResourceList';
import {fetchResources, deleteResource} from '../../actions/testResourceAction';

class ResourcePage extends Component {
    componentDidMount() {
        const {user} = this.props.userLogin;
        this.props.fetchResources(user.id);
    }

    render() {
        return (
            <div>
                <div className="container mb-3">
                    <h1>Test Resource</h1>
                    <ResourceList testResources={this.props.testResources} deleteResource={this.props.deleteResource}/>
                </div>
            </div>
        );
    }
}

ResourcePage.propTypes = {
    testResources: PropTypes.array.isRequired,
    fetchResources: PropTypes.func.isRequired,
    deleteResource:PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        userLogin: state.userLogin,
        testResources: state.testResources
    };
};

export default connect(mapStateToProps, {fetchResources, deleteResource})(ResourcePage);
