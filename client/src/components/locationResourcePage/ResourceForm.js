import React, {Component} from 'react';
// import classnames from 'classnames';
import {connect} from 'react-redux';
import {saveResource, fetchResource, updateResource, uploadRequest} from '../../actions/myResourceActions';
import {Redirect} from "react-router-dom";
// import './index.css';

class ResourceForm extends Component {
    state = {
        id: this.props.resource ? this.props.resource.id : '',
        fileTitle: this.props.resource ? this.props.resource.fileTitle : '',
        fileImage: this.props.resource ? this.props.resource.fileImage : '',
        fileDescription: this.props.resource ? this.props.resource.fileDescription : '',
        fileReadPrice: this.props.resource ? this.props.resource.fileReadPrice : '',
        fileRightPrice: this.props.resource ? this.props.resource.fileRightPrice : '',
        file: this.props.resource ? this.props.resource.file : '',
        errors: {},
        loading: false,
        done: false
    };

    componentDidMount() {
        const {match} = this.props;
        if (match.params.id) {  //所有路由的id参数
            this.props.fetchResource(match.params.id);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.resource.id,
            fileTitle: nextProps.resource.fileTitle,
            fileImage: nextProps.resource.fileImage,
            fileDescription: nextProps.resource.fileDescription,
            fileReadPrice: nextProps.resource.fileReadPrice,
            fileRightPrice: nextProps.resource.fileRightPrice,
            file: nextProps.resource.file
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
            <div className="container">
                <h1>资源信息</h1>
                <div className="item">
                    <div className="item-pic">
                        <img src={this.state.fileImage} alt="resource Cover" x="0" y="0" width="60%" height="60%"/>
                    </div>
                    <div className="item-details">
                        <ul>
                            <li>Title：<span className="text-danger">{this.state.fileTitle}</span></li>
                            <li>ReadPrice：<span className="text-danger">{this.state.fileReadPrice}</span></li>
                            <button onSubmit={this.handleSubmit}>Buy</button>
                            <li>RightPrice：<span className="text-danger">{this.state.fileRightPrice}</span></li>
                            <button onSubmit={this.handleSubmit}>Buy</button>
                        </ul>
                    </div>
                </div>
            </div>
        );

        return (
            <div>
                {this.state.done ? <Redirect to="/resources"/> : form}
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    const {match} = props;
    if (match.params.id) {
        return {
            resource: state.resources.find(item => item.id.toString() === match.params.id.toString())
        };
    }

    return {resource: null};
};

export default connect(mapStateToProps, {saveResource, fetchResource, updateResource, uploadRequest})(ResourceForm);