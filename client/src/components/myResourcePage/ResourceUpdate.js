import React, {Component} from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {fetchResource, updateResource, uploadRequest, updateAllWebResource} from '../../actions/myResourceActions';
import {Redirect} from "react-router-dom";
import './ResourceForm.css';

class ResourceForm extends Component {
    state = {
        $class: "org.demo.network.Resource",
        website: "A",
        id: this.props.resource ? this.props.resource.id : null,
        userId: this.props.userLogin.user.id,
        fileTitle: this.props.resource ? this.props.resource.fileTitle : '',
        fileImage: this.props.resource ? this.props.resource.fileImage : '',
        fileDescription: this.props.resource ? this.props.resource.fileDescription : '',
        fileReadPrice: this.props.resource ? this.props.resource.fileReadPrice : '',
        fileRightPrice: this.props.resource ? this.props.resource.fileRightPrice : '',
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
        });
    }

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
        this.setState({errors});

        const isValid = Object.keys(errors).length === 0;  //Object.keys返回对象所有属性

        if (isValid) {
            const {$class, id, userId, fileTitle, fileImage, fileDescription, fileReadPrice, fileRightPrice, website} = this.state;
            const userName = this.props.userLogin.user.username;
            const resourceId = website + '-' + fileTitle; //应改为站名+站内定位符
            const headline = fileTitle;
            const coverUrl = fileImage;
            const owner = "resource:org.demo.network.Customer#" + website + '-' + userName;
            const readPrice = fileReadPrice;
            const ownershipPrice = fileRightPrice;
            const readCount = 0;
            const liked = 0;
            const allWeb = 0;

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
                );

                //同步修改区块链上的内容
                this.props.updateAllWebResource({
                    $class, resourceId, headline, coverUrl, readPrice, ownershipPrice, owner, readCount, liked
                })

            }
        }
    };

    render() {
        const form = (

            <div className="container upload-container">
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

export default connect(mapStateToProps, {fetchResource, updateResource, uploadRequest, updateAllWebResource})(ResourceForm);