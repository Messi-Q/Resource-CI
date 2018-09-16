import React, {Component} from 'react';
import classnames from "classnames";
import {connect} from 'react-redux';
import {userRecharge, rechargeBlockchain} from '../../actions/rechargeAction';
import {Redirect} from "react-router-dom";

class RechargeForm extends Component {
    state = {
        $class: "org.demo.network.RechargeTransaction",
        website: 'A',  //获取网站名(未解决，如何获取站名)
        id: '',
        username: '',
        balance: '',
        errors: {},
        loading: false,
        done: false
    };

    componentDidMount() {
        const {user} = this.props.userLogin;
        console.log(user);
        console.log("userId", user.id);
        console.log(this.props.user.balance);
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
        if (this.state.username === '') errors.username = "Can't be empty";
        if (this.state.balance === '') errors.balance = "Can't be empty";
        this.setState({errors});

        const isValid = Object.keys(errors).length === 0;  //Object.keys返回对象所有属性

        if (isValid) {
            const {username, balance} = this.state;
            console.log(this.state);
            const restBalance = this.props.user.balance;
            console.log(restBalance, balance);
            const recharge = balance >> 0;
            const totalBalance = restBalance + recharge;
            console.log(username, totalBalance);

            this.setState({loading: true});

            this.props.userRecharge({
                username,
                totalBalance
            }).then(
                () => {
                    this.setState({done: true})
                },
                (err) => err.response.json().then(({errors}) => {
                    this.setState({errors, loading: false})
                })
            );

            //recharge on blockchain
            const {$class, website} = this.state;
            const rechargeToken = recharge;
            const userId = website + '-' + username;
            const customer = "resource:org.demo.network.Customer#" + userId;
            console.log(userId, rechargeToken);
            this.props.rechargeBlockchain({
                $class, customer, rechargeToken
            })
        }

    };

    render() {
        console.log(this.props.user.balance);
        const form = (

            <div className=" upload-container">
                <form className={classnames('ui', 'form', {loading: this.state.loading})}
                      onSubmit={this.handleSubmit}>
                    <h1 className="upload">Recharge</h1>

                    {!!this.state.errors.global &&
                    <div className="ui negative message">{this.state.errors.global}</div>}

                    <div>
                        <label htmlFor="title" className="control-label">Recharge Product:</label>
                        <label
                            className="control-label">&nbsp;&nbsp;&nbsp;Education Coin</label>
                    </div>

                    <div className={classnames('form-group', {error: !!this.state.errors.username})}>
                        <label htmlFor="title" className="control-label">Recharge Account:</label>
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            className="uploadinput"
                            placeholder="Enter username"
                        />
                        <span>{this.state.errors.username}</span>
                    </div>

                    <div className={classnames('form-group', {error: !!this.state.errors.balance})}>
                        <label htmlFor="title" className="control-label">Recharge Amount:</label>
                        <input
                            type="text"
                            name="balance"
                            value={this.state.balance}
                            onChange={this.handleChange}
                            className="uploadinput"
                            placeholder="Enter balance"
                        />
                        <span>{this.state.errors.balance}</span>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-outline-primary btn-lg btn-block">Recharge</button>
                    </div>
                </form>
            </div>
        );

        return (
            <div>
                {this.state.done ? <Redirect to="/myWallet"/> : form}
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

export default connect(mapStateToProps, {userRecharge, rechargeBlockchain})(RechargeForm);