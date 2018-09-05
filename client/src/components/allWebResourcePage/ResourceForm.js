import React, {Component} from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {saveResource, uploadRequest} from '../../actions/allResourceActions';
import {Redirect} from "react-router-dom";
import './ResourceForm.css';

class ResourceForm extends Component {
    state = {
        $class: "org.demo.network.Resource",
        resourceId: '',
        headline: '',
        readPrice: '',
        ownershipPrice: '',
        owner: "resource:org.demo.network.Customer#1",
        readCount: '',
        liked: '',
        file: '',
        errors: {},
        loading: false,
        done: false
    };

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
        if (this.state.resourceId === '') errors.resourceId = "Can't be empty";
        if (this.state.headline === '') errors.headline = "Can't be empty";
        if (this.state.readPrice === '') errors.readPrice = "Can't be empty";
        if (this.state.ownershipPrice === '') errors.ownershipPrice = "Can't be empty";
        if (this.state.readCount === '') errors.readCount = "Can't be empty";
        if (this.state.liked === '') errors.liked = "Can't be empty";
        this.setState({errors});

        const isValid = Object.keys(errors).length === 0;  //Object.keys返回对象所有属性

        if (isValid) {
            const {$class, resourceId, headline, readPrice, ownershipPrice, owner, readCount, liked, file} = this.state;
            console.log(this.state);
            console.log(file);

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

            this.props.saveResource({
                $class, resourceId, headline, readPrice, ownershipPrice, owner, readCount, liked
            }).then(  //then接收两个函数参数，第一个是成功之后执行，第二个是错误之后执行
                () => {
                    this.setState({done: true})
                },
                (err) => err.response.json().then(({errors}) => {
                    this.setState({errors, loading: false})
                })
            )
        }
    };

    render() {
        const form = (
            <div className="container upload-container">
                <form className={classnames('ui', 'form', {loading: this.state.loading})}
                      onSubmit={this.handleSubmit}>
                    <h1 className="upload">Add New Resource(All Web)</h1>

                    {!!this.state.errors.global &&
                    <div className="ui negative message">{this.state.errors.global}</div>}

                    <div className={classnames('form-group', {error: !!this.state.errors.resourceId})}>
                        <label htmlFor="title" className="control-label">resourceId</label>
                        <input
                            type="text"
                            name="resourceId"
                            value={this.state.resourceId}
                            onChange={this.handleChange}
                            className="uploadinput"
                            placeholder="Enter resource id"
                        />
                        <span>{this.state.errors.resourceId}</span>
                    </div>

                    <div className={classnames('form-group', {error: !!this.state.errors.headline})}>
                        <label htmlFor="title" className="control-label">headline</label>
                        <input
                            type="text"
                            name="headline"
                            value={this.state.headline}
                            onChange={this.handleChange}
                            className="uploadinput"
                            placeholder="Enter headline"
                        />
                        <span>{this.state.errors.headline}</span>
                    </div>

                    <div className={classnames('form-group', {error: !!this.state.errors.readPrice})}>
                        <label htmlFor="title" className="control-label">readPrice</label>
                        <input
                            type="text"
                            name="readPrice"
                            value={this.state.readPrice}
                            onChange={this.handleChange}
                            className="uploadinput"
                            placeholder="Enter read-price"
                        />
                        <span>{this.state.errors.readPrice}</span>
                    </div>

                    <div className={classnames('form-group', {error: !!this.state.errors.ownershipPrice})}>
                        <label htmlFor="title" className="control-label">ownershipPrice</label>
                        <input
                            type="text"
                            name="ownershipPrice"
                            value={this.state.ownershipPrice}
                            onChange={this.handleChange}
                            className="uploadinput"
                            placeholder="Enter ownership-price"
                        />
                        <span>{this.state.errors.ownershipPrice}</span>
                    </div>

                    <div className={classnames('form-group', {error: !!this.state.errors.readCount})}>
                        <label htmlFor="title" className="control-label">readCount</label>
                        <input
                            type="text"
                            name="readCount"
                            value={this.state.readCount}
                            onChange={this.handleChange}
                            className="uploadinput"
                            placeholder="Enter read-count"
                        />
                        <span>{this.state.errors.readCount}</span>
                    </div>

                    <div className={classnames('form-group', {error: !!this.state.errors.liked})}>
                        <label htmlFor="title" className="control-label">liked</label>
                        <input
                            type="text"
                            name="liked"
                            value={this.state.liked}
                            onChange={this.handleChange}
                            className="uploadinput"
                            placeholder="Enter liked-count"
                        />
                        <span>{this.state.errors.liked}</span>
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
                {this.state.done ? <Redirect to="/allWebResources"/> : form}
            </div>
        );
    }
}


export default connect(null, {saveResource, uploadRequest})(ResourceForm);