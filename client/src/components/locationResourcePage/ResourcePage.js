import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ResourceList from './ResourceList';
import {fetchAllResources} from '../../actions/locationResourceActions';

class ResourcePage extends Component {
    componentDidMount() {
        this.props.fetchAllResources();
    }

    render() {
        console.log(this.props.localResources);
        return (
            <div>
                <div className="container mb-3">
                    <h1>Location Resource</h1>
                    <ResourceList localResources={this.props.localResources}/>
                </div>
            </div>
        );
    }
}

ResourcePage.propTypes = {
    localResources: PropTypes.array.isRequired,
    fetchAllResources: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        localResources: state.localResources
    };
};

export default connect(mapStateToProps, {fetchAllResources})(ResourcePage);
