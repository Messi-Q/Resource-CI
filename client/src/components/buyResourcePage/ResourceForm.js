import React, {Component} from 'react';
// import classnames from 'classnames';
import {connect} from 'react-redux';
import {fetchBuyResources} from '../../actions/buyResourceAction';
import {picDownloads, vidDownloads, fileDownloads} from '../../actions/buyResourceAction';
import {fileConfirm} from '../../actions/confirmActions';
import {Redirect} from "react-router-dom";
import './ResourceForm.css';

class ResourceForm extends Component {
    state = {
        id: this.props.buyResource ? this.props.buyResource.id : '',
        userId: this.props.buyResource ? this.props.buyResource.userId : '',
        fileTitle: this.props.buyResource ? this.props.buyResource.fileTitle : '',
        fileImage: this.props.buyResource ? this.props.buyResource.fileImage : '',
        fileDescription: this.props.buyResource ? this.props.buyResource.fileDescription : '',
        fileReadPrice: this.props.buyResource ? this.props.buyResource.fileReadPrice : '',
        fileRightPrice: this.props.buyResource ? this.props.buyResource.fileRightPrice : '',
        fileName: this.props.buyResource ? this.props.buyResource.fileName : '',
        file: this.props.buyResource ? this.props.buyResource.file : '',
        balance: this.props.user ? this.props.user.balance : '',
        errors: {},
        loading: false,
        done: false
    };

    componentDidMount() {
        const {match} = this.props;
        if (match.params.id) {  //所有路由的id参数
            this.props.fetchBuyResources(match.params.id);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.buyResource.id,
            userId: nextProps.buyResource.userId,
            fileTitle: nextProps.buyResource.fileTitle,
            fileImage: nextProps.buyResource.fileImage,
            fileDescription: nextProps.buyResource.fileDescription,
            fileReadPrice: nextProps.buyResource.fileReadPrice,
            fileRightPrice: nextProps.buyResource.fileRightPrice,
            fileName: nextProps.buyResource.fileName,
            file: nextProps.buyResource.file,
            balance: nextProps.balance
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

    //下载
    handleSubmit = (e) => {
        e.preventDefault();

        console.log('DownLoad');
        const {fileName} = this.state;

        const index = fileName.indexOf("."); //得到"."在第几位
        const name = fileName.substring(index); //截断"."之前的，得到后缀

        if (name === ".bmp" || name === ".png" || name === ".gif" || name === ".jpg" || name === ".jpeg") {
            this.props.picDownloads({fileName})
                .then(
                    () => {
                        console.log('下载成功');
                        const input = this.props.picDownload.downloadPath;
                        const identity = this.props.userLogin.user.username;
                        const output = this.props.picDownload.confirmPath + 'confirm-' + this.props.picDownload.downloadName;

                        this.props.fileConfirm({
                            input, identity, output
                        }).then(
                            () => {
                                this.props.history.push('/success')
                            },
                            (err) => err.response.json().then(({errors}) => {
                                this.setState({errors, loading: false})
                            })
                        );

                    },
                    (err) => err.response.json().then(({errors}) => {
                        this.setState({errors, loading: false})
                    })
                )
        } else if (name === ".mp4" || name === ".rmvb" || name === ".avi" || name === ".ts") {
            this.props.vidDownloads({fileName})
                .then(
                    () => {
                        console.log('下载成功')
                    },
                    () => {
                        console.log('下载失败')
                    }
                )
        } else {
            this.props.fileDownloads({fileName})
                .then(
                    () => {
                        console.log('下载成功')
                    },
                    () => {
                        console.log('下载失败')
                    }
                )
        }

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
                                            <button className="ui teal right floated basic button buy-button"
                                                    onClick={this.handleSubmit}>
                                                <i className="shop icon"></i>Download</button>
                                        </span>
                                    <br/><br/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        return (
            <div>
                {this.state.done ? <Redirect to="/buyResources"/> : form}
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    const {match} = props;
    if (match.params.id) {
        return {
            user: state.user,
            owner: state.owner,
            userLogin: state.userLogin,
            picDownload: state.picDownload,
            buyResource: state.buyResources.find(item => item.id.toString() === match.params.id.toString())
        };
    }

    return {
        user: state.user,
        owner: state.owner,
        userLogin: state.userLogin,
        picDownload: state.picDownload,
        buyResource: null
    };
};

export default connect(mapStateToProps, {
    fetchBuyResources,
    picDownloads,
    vidDownloads,
    fileDownloads,
    fileConfirm
})(ResourceForm);