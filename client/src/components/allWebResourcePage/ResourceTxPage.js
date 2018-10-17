import React, {Component} from 'react';
// import classnames from 'classnames';
import {connect} from 'react-redux';
import {
    fetchAllWebResource,
    fetchBlockUser,
    updateBlockOwnerToken,
    updateBlockReadToken,
    fetchOwnerId
} from '../../actions/allResourceActions';
import {updateBuyer, fetchBuyerResource} from '../../actions/buyResourceAction';
import {
    fetchBalance,
    userAddBalance,
    userSubBalance,
    updateResourceInfo,
} from '../../actions/rechargeAction';
import {Redirect} from "react-router-dom";

class ResourceTxPage extends Component {
    state = {
        resourceId: this.props.allWebResource ? this.props.allWebResource.resourceId : '',
        headline: this.props.allWebResource ? this.props.allWebResource.headline : '',
        coverUrl: this.props.allWebResource ? this.props.allWebResource.coverUrl : '',
        readPrice: this.props.allWebResource ? this.props.allWebResource.readPrice : '',
        owner: this.props.allWebResource ? this.props.allWebResource.owner : '',
        ownershipPrice: this.props.allWebResource ? this.props.allWebResource.ownershipPrice : '',
        readCount: this.props.allWebResource ? this.props.allWebResource.readCount : '',
        liked: this.props.allWebResource ? this.props.allWebResource.liked : '',
        file: this.props.allWebResource ? this.props.allWebResource.file : '',
        balance: this.props.localUser ? this.props.localUser.balance : '',
        errors: {},
        succeed: false,
        succeed_1: false,
        succeed_2: false,
        loading: false,
        done: false
    };

    componentDidMount() {
        setTimeout(() => {
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
        }, 200);

        const {match} = this.props;
        console.log(this.props);
        console.log(match.params.id);
        if (match.params.id) {  //所有路由的id参数
            this.props.fetchAllWebResource(match.params.id);
        }

        //获取购买者已购买的资源
        const {user} = this.props.userLogin;
        this.props.fetchBuyerResource(user.id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            resourceId: nextProps.allWebResource.resourceId,
            headline: nextProps.allWebResource.headline,
            coverUrl: nextProps.allWebResource.coverUrl,
            readPrice: nextProps.allWebResource.readPrice,
            owner: nextProps.allWebResource.owner,
            ownershipPrice: nextProps.allWebResource.ownershipPrice,
            readCount: nextProps.allWebResource.readCount,
            liked: nextProps.allWebResource.liked,
            file: nextProps.allWebResource.file
        });
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

    handleSubmit_1 = (e) => {
        e.preventDefault();

        //获取购买者信息
        console.log('Transaction_1');
        const userBalance = this.props.localUser.balance;
        const readPrice = this.state.readPrice;
        const userBuyId_1 = 'A' + '-' + this.props.userLogin.user.username;  //资源购买者ID
        const {user} = this.props.userLogin;
        const buyerId = user.id;

        //同步获取区块链
        const owner = this.props.allWebResource.owner;  //资源所有者ID
        const ownerId = owner.slice(35);  //截取到用户ID

        //更新区块链上购买信息
        const $class = "org.demo.network.BuyReadRightTransaction";
        const resource = "resource:org.demo.network.Resource#" + this.state.resourceId;
        const buyer = "resource:org.demo.network.Customer#" + userBuyId_1;
        const resourceId = this.props.allWebResource.resourceId;
        const id = parseInt(resourceId.slice(2));

        //获取资源所有者的id
        this.props.fetchOwnerId(id);

        this.props.fetchBlockUser(ownerId).then(
            () => {
                this.setState({succeed: true})
            },
            (err) => err.response.json().then(({errors}) => {
                this.setState({errors, loading: false})
            })
        );

        console.log('buyer', this.props.buyerResources);
        var length = 0;
        if (this.props.buyerResources !== null) {
            length = this.props.buyerResources.length;
        }
        var flag = true;

        for (var i = 0; i < length; i++) {
            // console.log(this.props.buyerResources[i].fileId);
            if (resourceId === this.props.buyerResources[i].fileId) {
                flag = false;
                window.alert("您已购买该资源，无需重复购买！")
            }
        }

        if (flag) {
            setTimeout(() => {
                if (userBuyId_1 !== ownerId) {
                    if (userBalance > readPrice) {
                        console.log("账户余额充足");

                        //区块链上的阅读权交易
                        this.props.updateBlockReadToken({
                            $class, resource, buyer
                        }).then(
                            () => {
                                this.props.history.push('/resources')
                            },
                            (err) => err.response.json().then(({errors}) => {
                                this.setState({errors, loading: false})
                            })
                        );

                        const userBuyId = this.props.userLogin.user.id;
                        const restBalance = userBalance - readPrice;
                        console.log(restBalance, userBuyId_1, ownerId, userBuyId);
                        //购买用户减去相应的金额
                        this.props.userSubBalance({
                            userBuyId,
                            restBalance
                        }).then(
                            () => {
                                this.setState({succeed_1: true})
                            },
                            (err) => err.response.json().then(({errors}) => {
                                this.setState({errors, loading: false})
                            })
                        );

                        const ownerBalance = this.props.blockUser.token;
                        const totalBalance = ownerBalance + readPrice;
                        const userId = this.props.owner1.userId;
                        //资源拥有者增加相应的金额
                        this.props.userAddBalance({
                            userId,
                            totalBalance
                        }).then(
                            () => {
                                this.setState({succeed_2: true})
                            },
                            (err) => err.response.json().then(({errors}) => {
                                this.setState({errors, loading: false})
                            })
                        );

                        setTimeout(() => {
                            //更新Buy表
                            const fileTitle = this.state.headline;
                            const fileImage = this.state.coverUrl;
                            const fileDescription = "There are the description of resources";
                            const fileReadPrice = this.state.readPrice;
                            const fileRightPrice = this.state.ownershipPrice;

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
                    window.alert("您已购买该资源，无需重复购买！");
                }
            }, 500);
        }
    };

    handleSubmit_2 = (e) => {
        e.preventDefault();
        console.log(this.state);

        //获取购买者信息
        console.log('Transaction_2');
        const userBalance = this.props.localUser.balance;
        const ownerPrice = this.state.ownershipPrice;
        const userBuyId_1 = 'A' + '-' + this.props.userLogin.user.username;  //资源购买者ID

        //同步获取区块链用户信息
        const owner = this.props.allWebResource.owner;  //资源所有者ID
        const ownerId = owner.slice(35);  //截取到用户ID

        //更新区块链上购买信息
        const $class = "org.demo.network.BuyOwnershipTransaction";
        const resource = "resource:org.demo.network.Resource#" + this.state.resourceId;
        const buyer = "resource:org.demo.network.Customer#" + userBuyId_1;
        const resourceId = this.props.allWebResource.resourceId;
        const id = resourceId.slice(2);  //数据库中的资源id;

        //获取资源所有者的id
        this.props.fetchOwnerId(id);

        this.props.fetchBlockUser(ownerId).then(
            () => {
                this.setState({succeed: true})
            },
            (err) => err.response.json().then(({errors}) => {
                this.setState({errors, loading: false})
            })
        );

        setTimeout(() => {
            if (this.state.succeed) {
                //获取资源原所有者的余额
                console.log('token', this.props.blockUser.token);

                if (userBuyId_1 !== ownerId) {
                    if (userBalance > ownerPrice) {
                        console.log('余额充足');
                        //区块链上的所有权交易
                        this.props.updateBlockOwnerToken({
                            $class, resource, buyer
                        }).then(
                            () => {
                                this.props.history.push('/resources')
                            },
                            (err) => err.response.json().then(({errors}) => {
                                this.setState({errors, loading: false})
                            })
                        );

                        //本地数据库同步更新
                        const restBalance = userBalance - ownerPrice;
                        const userBuyId = this.props.userLogin.user.id;

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

                        const ownerBalance = this.props.blockUser.token;
                        const totalBalance = ownerBalance + ownerPrice;
                        const userId = this.props.owner1.userId;

                        //资源拥有者增加相应的金额
                        this.props.userAddBalance({
                            userId,
                            totalBalance
                        });

                        //修改资源所属id
                        const fileTitle = this.state.headline;
                        this.props.updateResourceInfo({
                            id,
                            userId,
                            fileTitle,
                            userBuyId
                        });

                    } else {
                        window.alert("账户余额不足，请充值！");
                        this.props.history.push('/myWallet');
                    }
                } else {
                    window.alert("这是您自己的资源，无需购买！");
                }
            }

        }, 500);

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
                            <img src={this.state.coverUrl} alt="resource Cover"/>
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
                                    <button onClick={this.handleSubmit_1}
                                            className="ui teal right floated basic button buy-button"><i
                                        className="shop icon"></i>Buy</button>
                                </span>
                                    <br/><br/>
                                    <span className="pricetag">
                                    RightPrice：{this.state.ownershipPrice}
                                        <button onClick={this.handleSubmit_2}
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
        console.log('match', match);
        return {
            allWebResource: state.allWebResources.find(item => item.resourceId.toString() === match.params.id),
            userLogin: state.userLogin,
            blockUser: state.blockUser,
            localUser: state.localUser,
            owner1: state.owner1,
            buyerResources: null
        };
    }

    return {
        userLogin: state.userLogin,
        blockUser: state.blockUser,
        localUser: state.localUser,
        owner1: state.owner1,
        allWebResource: null,
        buyerResources: null
    };
};

export default connect(mapStateToProps, {
    fetchAllWebResource,
    fetchBlockUser,
    fetchBalance,
    updateBlockOwnerToken,
    updateBlockReadToken,
    userAddBalance,
    userSubBalance,
    updateResourceInfo,
    fetchOwnerId,
    updateBuyer,
    fetchBuyerResource
})(ResourceTxPage);