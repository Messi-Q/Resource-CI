import React, {Component} from 'react';
// import classnames from 'classnames';
import {connect} from 'react-redux';
import {fetchAllWebResource} from '../../actions/allResourceActions';
import {Redirect} from "react-router-dom";
import imgSrc from '../../images/react.png';

class ResourceTxPage extends Component {
    state = {
        resourceId: this.props.allWebResource ? this.props.allWebResource.resourceId : '',
        headline: this.props.allWebResource ? this.props.allWebResource.fileTitle : '',
        readPrice: this.props.allWebResource ? this.props.allWebResource.readPrice : '',
        ownershipPrice: this.props.allWebResource ? this.props.allWebResource.ownershipPrice : '',
        readCount: this.props.allWebResource ? this.props.allWebResource.readCount : '',
        liked: this.props.allWebResource ? this.props.allWebResource.liked : '',
        file: this.props.allWebResource ? this.props.allWebResource.file : '',
        errors: {},
        loading: false,
        done: false
    };

    componentDidMount() {
        const {match} = this.props;
        console.log(this.props);
        console.log(match.params.id);
        if (match.params.id) {  //所有路由的id参
            this.props.fetchAllWebResource(match.params.id);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            resourceId: nextProps.allWebResource.resourceId,
            headline: nextProps.allWebResource.headline,
            readPrice: nextProps.allWebResource.readPrice,
            ownershipPrice: nextProps.allWebResource.ownershipPrice,
            readCount: nextProps.allWebResource.readCount,
            liked: nextProps.allWebResource.liked,
            file: nextProps.allWebResource.file
        })
    }

    changeFiles = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        this.setState({file: file});
    };

    handleChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);  //clone
            delete errors[e.target.name];
            this.setState({
                [e.target.name]: e.target.value,
                errors
            })
        } else {
            this.setState({[e.target.name]: e.target.value})
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
    };

    render() {
        const form = (
            <div className="resouceform-container">
                <div className="header">
                    <h1 className="filetitle">{this.state.headline}</h1>
                </div>

                <div className="ui items">
                    <div className="item">
                        <div className="ui large image resource-image">
                            <img src={imgSrc} alt="resource Cover"/>
                        </div>
                        <br/>
                        <div className="content">
                            <br/> <br/>
                            <div className="body-content">
                                <div className="description">
                                    <h3>Description:This is the fileDescription</h3>
                                </div>
                                <br/> <br/>
                                <div className="extra">
                                <span className="pricetag">
                                    ReadPrice：{this.state.readPrice}
                                    <button onSubmit={this.handleSubmit}
                                            className="ui teal right floated basic button buy-button"><i
                                        className="shop icon"></i>Buy</button>
                                </span>
                                    <br/><br/>
                                    <span className="pricetag">
                                    RightPrice：{this.state.ownershipPrice}
                                        <button onSubmit={this.handleSubmit}
                                                className="ui teal right floated basic button buy-button"><i
                                            className="shop icon"></i>Buy</button>
                                </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );

        return (
            <div>
                {this.state.done ? <Redirect to="/allWebResources"/> : form}
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    const {match} = props;
    if (match.params.id) {
        return {
            allWebResource: state.allWebResources.find(item => item.resourceId === match.params.id)
        };
    }

    return {allWebResource: null};
};

export default connect(mapStateToProps, {fetchAllWebResource})(ResourceTxPage);