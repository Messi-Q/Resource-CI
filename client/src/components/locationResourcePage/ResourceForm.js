import React, {Component} from 'react';
// import classnames from 'classnames';
import {connect} from 'react-redux';
import {fetchLocationResource} from '../../actions/locationResourceActions';
import {Redirect} from "react-router-dom";
import './index.css';

class ResourceForm extends Component {
    state = {
        id: this.props.localResource ? this.props.localResource.id : '',
        fileTitle: this.props.localResource ? this.props.localResource.fileTitle : '',
        fileImage: this.props.localResource ? this.props.localResource.fileImage : '',
        fileDescription: this.props.localResource ? this.props.localResource.fileDescription : '',
        fileReadPrice: this.props.localResource ? this.props.localResource.fileReadPrice : '',
        fileRightPrice: this.props.localResource ? this.props.localResource.fileRightPrice : '',
        file: this.props.localResource ? this.props.localResource.file : '',
        errors: {},
        loading: false,
        done: false
    };

    componentDidMount() {
        const {match} = this.props;
        if (match.params.id) {  //所有路由的id参数
            this.props.fetchLocationResource(match.params.id);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.localResource.id,
            fileTitle: nextProps.localResource.fileTitle,
            fileImage: nextProps.localResource.fileImage,
            fileDescription: nextProps.localResource.fileDescription,
            fileReadPrice: nextProps.localResource.fileReadPrice,
            fileRightPrice: nextProps.localResource.fileRightPrice,
            file: nextProps.localResource.file
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
                    <h1 className="filetitle">{this.state.fileTitle}</h1>
                </div>

                <div className="ui items">
                    <div className="item">
                        <div className="ui large image resource-image">
                            <img src={this.state.fileImage} alt="resource Cover"/>
                        </div>
                        <br/>
                        <div className="content">
                            <br/> <br/>
                            <div className="body-content">
                                <div className="description">
                                    <h3>Description:{this.state.fileDescription}</h3>
                                </div>
                                <br/> <br/>
                                <div className="extra">
                                <span className="pricetag">
                                    ReadPrice：{this.state.fileReadPrice}
                                    <button onSubmit={this.handleSubmit}
                                            className="ui teal right floated basic button buy-button"><i
                                        className="shop icon"></i>Buy</button>
                                </span>
                                    <br/><br/>
                                    <span className="pricetag">
                                    RightPrice：{this.state.fileRightPrice}
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
                {this.state.done ? <Redirect to="/locationResources"/> : form}
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    const {match} = props;
    if (match.params.id) {
        return {
            localResource: state.localResources.find(item => item.id.toString() === match.params.id.toString())
        };
    }

    return {localResource: null};
};

export default connect(mapStateToProps, {fetchLocationResource})(ResourceForm);