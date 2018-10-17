import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchBalance} from '../../actions/rechargeAction'

class MyWalletPage extends Component {
    state = {
        id: this.props.userLogin ? this.props.userLogin.id : '',
        balance: this.props.localUser ? this.props.localUser.balance : '',
    };

    componentDidMount() {
        const {user} = this.props.userLogin;
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
        this.props.history.push('/userRecharge');
    };

    render() {
        return (
            <div className="container" align="center">
                <form onSubmit={this.handleSubmit}>
                    <p>余额：{this.props.localUser.balance}$</p>
                    <button className="btn btn-primary">充值</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userLogin: state.userLogin,
        localUser: state.localUser
    };
};

export default connect(mapStateToProps, {fetchBalance})(MyWalletPage);