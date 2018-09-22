import React, {Component} from 'react';
// import classnames from 'classnames';
import {connect} from 'react-redux';
import {fetchBuyResources} from '../../actions/buyResourceAction';
import {fileDownloads} from '../../actions/buyResourceAction';
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
        const {user} = this.props.userLogin;
        console.log("userId", user);
        //获取购买者的余额
        //this.props.fetchBalance(user.id);
        //获取资源所有者的余额
        //this.props.fetchOwnerBalance(testResources.userId);
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

    //阅读权的交易
    handleSubmit = (e) => {
        e.preventDefault();

        console.log('Transaction_1');
        // const userBalance = this.props.user.balance;
        // const readPrice = this.state.fileReadPrice >> 0;
        // const userBuyId = this.props.userLogin.user.id;
        // const userId = this.state.userId;
        const {buyResource} = this.props;
        console.log(buyResource);

        this.props.fileDownloads(buyResource.id);

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
                                                <i className="shop icon"></i>Downloads</button>
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
            buyResource: state.buyResources.find(item => item.id.toString() === match.params.id.toString())
        };
    }

    return {
        user: state.user,
        owner: state.owner,
        userLogin: state.userLogin,
        buyResource: null
    };
};

export default connect(mapStateToProps, {fetchBuyResources, fileDownloads})(ResourceForm);