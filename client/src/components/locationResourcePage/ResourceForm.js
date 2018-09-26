import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchLocationResource} from '../../actions/locationResourceActions';
import {updateBuyer, fetchBuyerResource} from '../../actions/buyResourceAction';
import {
    fetchBalance,
    userAddBalance,
    userSubBalance,
    fetchOwnerBalance,
    updateResourceInfo
} from "../../actions/rechargeAction";
import {Redirect} from "react-router-dom";
import './ResourceForm.css';

class ResourceForm extends Component {
    succeed = false;
    state = {
        id: this.props.localResource ? this.props.localResource.id : '',
        userId: this.props.localResource ? this.props.localResource.userId : '',
        fileTitle: this.props.localResource ? this.props.localResource.fileTitle : '',
        fileImage: this.props.localResource ? this.props.localResource.fileImage : '',
        fileDescription: this.props.localResource ? this.props.localResource.fileDescription : '',
        fileReadPrice: this.props.localResource ? this.props.localResource.fileReadPrice : '',
        fileRightPrice: this.props.localResource ? this.props.localResource.fileRightPrice : '',
        file: this.props.localResource ? this.props.localResource.file : '',
        balance: this.props.localUser ? this.props.localUser.balance : '',
        succeed_1: false,
        succeed_2: false,
        errors: {},
        loading: false,
        done: false
    };

    componentDidMount() {
        this.succeed = true;
        const {match} = this.props;
        console.log(this.props);
        if (match.params.id) {  //所有路由的id参数
            this.props.fetchLocationResource(match.params.id);
        }
        const {user} = this.props.userLogin;
        console.log("userId", user);
        //获取购买者的余额
        this.props.fetchBalance(user.id)
            .then(
                () => {
                },
                (err) => err.response.json().then(({errors}) => {
                    this.setState({errors, loading: false})
                })
            );
        //获取资源所有者的余额
        // this.props.fetchOwnerBalance(localResource.userId);
        //获取购买者已购买的资源
        this.props.fetchBuyerResource(user.id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.localResource.id,
            userId: nextProps.localResource.userId,
            fileTitle: nextProps.localResource.fileTitle,
            fileImage: nextProps.localResource.fileImage,
            fileDescription: nextProps.localResource.fileDescription,
            fileReadPrice: nextProps.localResource.fileReadPrice,
            fileRightPrice: nextProps.localResource.fileRightPrice,
            file: nextProps.localResource.file,
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
    handleSubmit_1 = (e) => {
        e.preventDefault();

        console.log('Transaction_1');
        const userBalance = this.props.localUser.balance;
        const readPrice = this.state.fileReadPrice >> 0;
        const userBuyId = this.props.userLogin.user.id;
        const userId = this.state.userId;
        const {user} = this.props.userLogin;
        const buyerId = user.id;
        const {id, fileTitle, fileImage, fileDescription, fileReadPrice, fileRightPrice} = this.state;
        const {localResource} = this.props;
        this.props.fetchOwnerBalance(localResource.userId);

        const resourceId = this.state.id;
        console.log('buyer', this.props.buyerResources);
        const length = this.props.buyerResources.length;
        var flag = true;

        for (var i = 0; i < length; i++) {
            // console.log(this.props.buyerResources[i].fileId);
            if (resourceId === this.props.buyerResources[i].fileId) {
                flag = false;
                window.alert("您已购买过该资源，无需重复购买！")
            }
        }

        if (flag) {
            setTimeout(() => {
                if (userBuyId !== userId) {
                    if (userBalance > readPrice) {
                        console.log("账户余额充足");
                        const restBalance = userBalance - readPrice;
                        console.log(restBalance, userBuyId, userId);

                        //购买用户减去相应的金额
                        this.props.userSubBalance({
                            userBuyId,
                            restBalance
                        }).then(
                            () => {
                                if (this.succeed) {
                                    this.setState({succeed_1: true})
                                }
                            },
                            (err) => err.response.json().then(({errors}) => {
                                this.setState({errors, loading: false})
                            })
                        );

                        const ownerBalance = this.props.owner.balance;
                        console.log(userBalance, readPrice, ownerBalance);
                        const totalBalance = ownerBalance + readPrice;
                        console.log(totalBalance);
                        //资源拥有者增加相应的金额
                        this.props.userAddBalance({
                            userId,
                            totalBalance
                        }).then(
                            () => {
                                if (this.succeed) {
                                    this.setState({succeed_2: true})
                                }
                            },
                            (err) => err.response.json().then(({errors}) => {
                                this.setState({errors, loading: false})
                            })
                        );

                        setTimeout(() => {
                            if (this.state.succeed_1 && this.state.succeed_2) {
                                this.props.updateBuyer({
                                    buyerId,
                                    id,
                                    fileTitle,
                                    fileImage,
                                    fileDescription,
                                    fileReadPrice,
                                    fileRightPrice
                                }).then(
                                    () => {
                                        this.props.history.push('/resources')
                                    },
                                    (err) => err.response.json().then(({errors}) => {
                                        this.setState({errors, loading: false})
                                    })
                                )
                            }
                        }, 500);

                    } else {
                        window.alert("账户余额不足，请充值！");
                        this.props.history.push('/myWallet');
                    }

                } else {
                    window.alert("这是您自己上传的资源，无需购买！");
                }
            }, 500);
        }

    };

    //所有权交易
    handleSubmit_2 = (e) => {
        e.preventDefault();

        console.log('Transaction_2');
        const userBalance = this.props.localUser.balance;
        const ownerPrice = this.state.fileRightPrice >> 0;
        const userBuyId = this.props.userLogin.user.id;
        const userId = this.state.userId;

        const {localResource} = this.props;
        this.props.fetchOwnerBalance(localResource.userId);

        setTimeout(() => {
            if (userBuyId !== userId) {
                if (userBalance > ownerPrice) {
                    console.log("账户余额充足");
                    const restBalance = userBalance - ownerPrice;
                    console.log(restBalance, userBuyId, userId);

                    //购买用户减去相应的金额
                    this.props.userSubBalance({
                        userBuyId,
                        restBalance
                    }).then(
                        () => {
                        },
                        (err) => err.response.json().then(({errors}) => {
                            this.setState({errors, loading: false})
                        })
                    );

                    const ownerBalance = this.props.owner.balance;
                    console.log(userBalance, ownerPrice, ownerBalance);
                    const totalBalance = ownerBalance + ownerPrice;
                    console.log(totalBalance);
                    //资源拥有者增加相应的金额
                    this.props.userAddBalance({
                        userId,
                        totalBalance
                    });

                    //修改资源所属id
                    const {id, fileTitle} = this.state;
                    this.props.updateResourceInfo({
                        id,
                        userId,
                        fileTitle,
                        userBuyId
                    });

                    this.props.history.push('/resources')

                } else {
                    window.alert("账户余额不足，请充值！");
                    this.props.history.push('/myWallet');
                }

            } else {
                window.alert("这是您自己上传的资源，无需购买！");
            }
        }, 1000)

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
                                                    onClick={this.handleSubmit_1}>
                                                <i className="shop icon"></i>Buy</button>
                                        </span>
                                    <br/><br/>
                                    <span className="pricetag">
                                            RightPrice：{this.state.fileRightPrice}
                                        <button className="ui teal right floated basic button buy-button"
                                                onClick={this.handleSubmit_2}>
                                                <i className="shop icon"></i>Buy</button>
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
            localUser: state.localUser,
            owner: state.owner,
            userLogin: state.userLogin,
            buyerResources: state.buyerResources,
            localResource: state.localResources.find(item => item.id.toString() === match.params.id.toString())
        };
    }

    return {
        localUser: state.localUser,
        owner: state.owner,
        userLogin: state.userLogin,
        buyerResources: null,
        localResource: null
    };
};

export default connect(mapStateToProps, {
    fetchLocationResource,
    fetchBalance,
    userSubBalance,
    userAddBalance,
    fetchOwnerBalance,
    updateResourceInfo,
    updateBuyer,
    fetchBuyerResource
})(ResourceForm);