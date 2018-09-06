import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class MyWalletPage extends Component {
    state = {
        balance: this.props.userLogin ? this.props.userLogin.user.balance : ''
    };

    componentDidMount() {
        const {user} = this.props.userLogin;
        console.log(user);
        console.log("money", user.id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            balance: nextProps.balance,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('充值');
        this.props.history.push('/recharge');
    };

    render() {
        return (
            <div className="container" align="center">
                <form onSubmit={this.handleSubmit}>
                    <p>余额：{this.state.balance}$</p>
                    <button className="btn btn-primary">充值</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userLogin: state.userLogin,
        testResources: state.testResources
    };
};

export default connect(mapStateToProps, {})(MyWalletPage);