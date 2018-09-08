import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchBalance} from '../../actions/rechargeAction'

class MyWalletPage extends Component {
    state = {
        id: this.props.userLogin ? this.props.userLogin.id : '',
        balance: this.props.user ? this.props.user.balance : '',
    };

    componentDidMount() {
        const {user} = this.props.userLogin;
        console.log("userId", user);
        console.log(this.props);
        this.props.fetchBalance(user.id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            balance: nextProps.balance,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('充值');
        this.props.history.push('/user');
    };

    render() {
        console.log(this.props.user);
        return (
            <div className="container" align="center">
                <form onSubmit={this.handleSubmit}>
                    <p>余额：{this.props.user.balance}$</p>
                    <button className="btn btn-primary">充值</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userLogin: state.userLogin,
        user: state.user
    };
};

export default connect(mapStateToProps, {fetchBalance})(MyWalletPage);