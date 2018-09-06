import React, {Component} from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {saveResource, fetchResource, updateResource, uploadRequest} from '../../actions/myResourceActions';
import {Redirect} from "react-router-dom";
import './ResourceForm.css';

class ResourceForm extends Component {
    state = {
        id: this.props.resource ? this.props.resource.id : null,
        userId: this.props.userLogin.user.id,
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
        console.log('userId', this.state.userId);
        if (match.params.id) {  //所有路由的id参数
            console.log("id", match.params.id);
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
        });
    }


    changeFiles = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        this.setState({file: file})
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

        let errors = {};
        if (this.state.fileTitle === '') errors.fileTitle = "Can't be empty";
        if (this.state.fileImage === '') errors.fileImage = "Can't be empty";
        if (this.state.fileDescription === '') errors.fileDescription = "Can't be empty";
        if (this.state.fileReadPrice === '') errors.fileReadPrice = "Can't be empty";
        if (this.state.fileRightPrice === '') errors.fileRightPrice = "Can't be empty";
        //if (this.state.file === '') errors.file = "Can't be empty";
        this.setState({errors});

        const isValid = Object.keys(errors).length === 0;  //Object.keys返回对象所有属性

        if (isValid) {
            const {id, userId, fileTitle, fileImage, fileDescription, fileReadPrice, fileRightPrice, file} = this.state;
            console.log(this.state);
            console.log(file);
            console.log(userId);

            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                this.props.uploadRequest(formData).then(  //then接收两个函数参数，第一个是成功之后执行，第二个是错误之后执行
                    () => {
                    },
                    (err) => err.response.json().then(({errors}) => {
                        this.setState({errors, loading: false})
                    })
                );
            } else {
                console.log('No files fetched');
                return
            }

            this.setState({loading: true});
            if (id) {
                this.props.updateResource({
                    id,
                    userId,
                    fileTitle,
                    fileImage,
                    fileDescription,
                    fileReadPrice,
                    fileRightPrice,
                }).then(  //then接收两个函数参数，第一个是成功之后执行，第二个是错误之后执行
                    () => {
                        this.setState({done: true})
                    },
                    (err) => err.response.json().then(({errors}) => {
                        this.setState({errors, loading: false})
                    })
                )
            } else {
                this.props.saveResource({
                    userId,
                    fileTitle,
                    fileImage,
                    fileDescription,
                    fileReadPrice,
                    fileRightPrice,
                }).then(  //then接收两个函数参数，第一个是成功之后执行，第二个是错误之后执行
                    () => {
                        this.setState({done: true})
                    },
                    (err) => err.response.json().then(({errors}) => {
                        this.setState({errors, loading: false})
                    })
                )
            }
        }
    };

    render() {
        const form = (

            <div className=" upload-container">
                <form className={classnames('ui', 'form', {loading: this.state.loading})}
                      onSubmit={this.handleSubmit}>
                    <h1 className="upload">Add New Resource(Location)</h1>

                    {!!this.state.errors.global &&
                    <div className="ui negative message">{this.state.errors.global}</div>}

                    <div className={classnames('form-group', {error: !!this.state.errors.fileTitle})}>
                        <label htmlFor="title" className="control-label">Title</label>
                        <input
                            type="text"
                            name="fileTitle"
                            value={this.state.fileTitle}
                            onChange={this.handleChange}
                            className="uploadinput"
                            placeholder="Enter title"
                        />
                        <span>{this.state.errors.fileTitle}</span>
                    </div>

                    <div className={classnames('form-group', {error: !!this.state.errors.fileImage})}>
                        <label htmlFor="title" className="control-label">Cover url</label>
                        <input
                            type="text"
                            name="fileImage"
                            value={this.state.fileImage}
                            onChange={this.handleChange}
                            className="uploadinput"
                            placeholder="Enter url"
                        />
                        <span>{this.state.errors.fileImage}</span>
                    </div>

                    <div className="form-group">
                        {this.state.fileImage !== '' &&
                        <img src={this.state.fileImage} alt="fileImage" className="ui small bordered image"/>}
                    </div>

                    <div className={classnames('form-group', {error: !!this.state.errors.fileDescription})}>
                        <label htmlFor="title" className="control-label">Description</label>
                        <textarea
                            className="form-control uploadinput"
                            rows="5"
                            name="fileDescription"
                            value={this.state.fileDescription}
                            onChange={this.handleChange}
                            placeholder="No more than 100 words"
                        />
                        <span>{this.state.errors.fileDescription}</span>
                    </div>

                    <div className={classnames('form-group', {error: !!this.state.errors.fileReadPrice})}>
                        <label htmlFor="title" className="control-label">ReadPrice</label>
                        <input
                            type="text"
                            name="fileReadPrice"
                            value={this.state.fileReadPrice}
                            onChange={this.handleChange}
                            className="uploadinput"
                            placeholder="Enter read-price"
                        />
                        <span>{this.state.errors.fileReadPrice}</span>
                    </div>

                    <div className={classnames('form-group', {error: !!this.state.errors.fileRightPrice})}>
                        <label htmlFor="title" className="control-label">RightPrice</label>
                        <input
                            type="text"
                            name="fileRightPrice"
                            value={this.state.fileRightPrice}
                            onChange={this.handleChange}
                            className="uploadinput"
                            placeholder="Enter right-price"
                        />
                        <span>{this.state.errors.fileRightPrice}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="title" className="control-label">FileSelect</label>
                        <br/>

                        <span className="btn btn-primary fileinput-btn">
                                选择文件
                            <input
                                type="file"
                                ref="file"
                                name="file"
                                required
                                onChange={this.changeFiles}
                                className="fileinput"
                            />
                            </span>
                        <input
                            type="text"
                            name="fileName"
                            value={this.state.file ? this.state.file.name : ""}
                            onChange={this.handleChange}
                            className="uploadinput"
                        />

                        <span>{this.state.errors.file}</span>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-outline-primary btn-lg btn-block">Upload</button>
                    </div>
                </form>
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
            userLogin: state.userLogin,
            resource: state.resources.find(item => item.id.toString() === match.params.id.toString())
        };
    }

    return {
        userLogin: state.userLogin,
        resource: null
    };
};

export default connect(mapStateToProps, {saveResource, fetchResource, updateResource, uploadRequest})(ResourceForm);