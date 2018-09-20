import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchAllWebResources} from '../../actions/allResourceActions';
import PropTypes from "prop-types";
import ResourceList from './ResourceList';

class ResourcePage extends Component {

    componentDidMount() {
        if (window.WebSocket) {
            console.log("ok");
        } else {
            console.log("no");
        }

        this.props.fetchAllWebResources();
    }

    render() {
        // console.log(this.props.allWebResources);
        return (
            <div>
                <div className="container mb-3">
                    <h1>All Web Resource</h1>
                    <ResourceList allWebResources={this.props.allWebResources}/>
                </div>
            </div>
        );
    }
}

ResourcePage.propTypes = {
    allWebResources: PropTypes.array.isRequired,
    fetchAllWebResources: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        allWebResources: state.allWebResources
    };
};

export default connect(mapStateToProps, {fetchAllWebResources})(ResourcePage);
