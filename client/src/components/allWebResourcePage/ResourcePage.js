import React, {Component} from 'react';
import {connect} from 'react-redux';
// import PropTypes from 'prop-types';
// import ResourceCard from './ResourceCard';
import {fetchAllWebResources} from '../../actions/allResourceActions';
import axios from 'axios';
// import Config from '../../utils/config';
import PropTypes from "prop-types";
import ResourceList from './ResourceList';

class ResourcePage extends Component {

    componentDidMount() {
        console.log("start");
        if (window.WebSocket) {
            console.log("ok");
        } else {
            console.log("no");
        }

        this.props.fetchAllWebResources();

        // make rest calls
        // this.getResourceInfo();
        // this.uploadResourceInfo();
    }

    uploadResourceInfo() {
        let resourceDetails = {};
        let param = {
            "$class": "org.demo.network.Resource",
            "resourceId": "1006",
            "headline": "headline_6",
            "readPrice": 16.5,
            "ownershipPrice": 170.5,
            "owner": "resource:org.demo.network.Customer#1",
            "readCount": 10,
            "liked": 5
        };
        let cURL = this.config.restServer.httpURL + '/Resource';
        axios.post(cURL, param)
            .then(res => {
                resourceDetails = res.data;
                console.log("存数据");
                console.log(resourceDetails);
            })

    }

    getResourceInfo() {
        let resourceDetails = {};
        console.log("hello world");
        let cURL = this.config.restServer.httpURL + '/Resource';
        axios.get(cURL)
            .then(res => {
                resourceDetails = res.data;
                console.log("取数据");
                console.log(resourceDetails);
            })
            .then(response => {
                this.setState({
                    resourceDetails: resourceDetails
                });
                console.log(resourceDetails);
            })
            .catch(error => {
                console.log(error);
            });
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
