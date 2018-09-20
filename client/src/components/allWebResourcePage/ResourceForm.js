import React, {Component} from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {saveResource, uploadRequest, saveResourceToMysql} from '../../actions/allResourceActions';
import {Redirect} from "react-router-dom";
import './ResourceForm.css';

class ResourceForm extends Component {
    state = {
        $class: "org.demo.network.Resource",
        website: 'A',
        headline: '',
        coverUrl: '',
        fileDescription: '',
        readPrice: '',
        ownershipPrice: '',
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
        if (this.state.headline === '') errors.headline = "Can't be empty";
        if (this.state.coverUrl === '') errors.coverUrl = "Can't be empty";
        if (this.state.fileDescription === '') errors.fileDescription = "Can't be empty";
        if (this.state.readPrice === '') errors.readPrice = "Can't be empty";
        if (this.state.ownershipPrice === '') errors.ownershipPrice = "Can't be empty";
        this.setState({errors});

        const isValid = Object.keys(errors).length === 0;  //Object.keys返回对象所有属性

        if (isValid) {
            const {$class, headline, coverUrl, fileDescription, readPrice, ownershipPrice, file, website} = this.state;
            // owner/resourceId/readCount/liked is automatically added
            const userName = this.props.userLogin.user.username;
            const userId = this.props.userLogin.user.id;
            const owner = "resource:org.demo.network.Customer#" + website + '-' + userName;
            const readCount = 0;
            const liked = 0;

            const fileTitle = headline;
            const fileImage = coverUrl;
            const fileReadPrice = readPrice;
            const fileRightPrice = ownershipPrice;
            const resourceId = website + '-' + headline; //应改为站名+站内定位符
            const allWeb = 1;
            console.log('this is my test:',this.props.userLogin.user.username);

            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                this.props.uploadRequest(formData).then(  //then接收两个函数参数，第一个是成功之后执行，第二个是错误之后执行
                    () => {
                        console.log('上传成功');
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

            //save to local mysql, return fileId
            this.props.saveResourceToMysql({
                userId,
                fileTitle,
                fileImage,
                fileDescription,
                fileReadPrice,
                fileRightPrice
            });

            //save to blockchain
            this.props.saveResource({
                $class, resourceId, headline, coverUrl, readPrice, ownershipPrice, owner, readCount, liked
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

                    <div className={classnames('form-group', {error: !!this.state.errors.coverUrl})}>
                        <label htmlFor="title" className="control-label">coverUrl</label>
                        <input
                            type="text"
                            name="coverUrl"
                            value={this.state.coverUrl}
                            onChange={this.handleChange}
                            className="uploadinput"
                            placeholder="Enter coverUrl"
                        />
                        <span>{this.state.errors.coverUrl}</span>
                    </div>

                    <div className="form-group">
                        {this.state.coverUrl !== '' &&
                        <img src={this.state.coverUrl} alt="coverUrl" className="ui small bordered image"/>}
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

const mapStateToProps = (state) => {
    return {
        userLogin: state.userLogin,
        user: state.user
    };
};
export default connect(mapStateToProps, {saveResource, uploadRequest, saveResourceToMysql})(ResourceForm);
