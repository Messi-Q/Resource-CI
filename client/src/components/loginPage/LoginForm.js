import React, {Component} from 'react';
import classnames from 'classnames';
import validateInput from '../../utils/validations/validateLogin';
import {connect} from 'react-redux';
import {loginRequest} from '../../actions/loginActions';
import {userSignupBlockchain} from '../../actions/SignupActions';
import PropTypes from 'prop-types';
import './LoginForm.css';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            $class: "org.demo.network.Customer",
            website: 'A',  //获取网站名(未解决，如何获取站名)
            token: 0,
            identifier: '',
            password: '',
            errors: {},
            isLoading: false
        }
    }

    componentDidMount() {
        const {$class, website, token} = this.state;
        const userName = this.props.Customer.username;
        const userId = website + '-' + userName;
        console.log(userId, $class, website, token);
        console.log(this.props);
        this.props.userSignupBlockchain({
            $class, website, token, userId
        })
    }

    static propTypes = {
        loginRequest: PropTypes.func.isRequired
    };

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    isValid = () => {
        const {errors, isValid} = validateInput(this.state);

        if (!isValid) {
            this.setState({errors});
        }

        return isValid;
    };

    onSubmit = (e) => {
        e.preventDefault();

        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});
            this.props.loginRequest(this.state).then(
                (res) => this.context.router.history.push('/resources'),
                (err) => this.setState({errors: err.response.data.errors, isLoading: false})
            );
        }
    };

    render() {
        const {identifier, password, errors, isLoading} = this.state;
        // console.dir(this.state);

        return (
            <form onSubmit={this.onSubmit} className="loginform">
                <h1 className="login">Login</h1>

                {errors.form && <div className="alert alert-danger">{errors.form}</div>}

                <div className="form-group">
                    <label className="control-label">Username / Email</label>

                    <input
                        value={identifier}
                        onChange={this.onChange}
                        type="text"
                        name="identifier"
                        className={classnames('form-control', {'is-invalid': errors.identifier})}
                        placeholder="Enter username/email"
                    />
                    {errors.identifier && <span className="form-text text-muted">{errors.identifier}</span>}
                </div>

                <div className="form-group">
                    <label className="control-label">Password</label>

                    <input
                        value={password}
                        onChange={this.onChange}
                        type="password"
                        name="password"
                        className={classnames('form-control', {'is-invalid': errors.password})}
                        placeholder="Enter password"
                    />
                    {errors.password && <span className="form-text text-muted">{errors.password}</span>}
                </div>

                <div className="form-group">
                    <button disabled={isLoading} className="btn btn-outline-primary btn-lg btn-block btnlogin">
                        Login
                    </button>
                    <br/>
                </div>

                <div>
                    New to us? <a href="http://localhost:3001/signup">Sign Up</a>
                </div>

            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Customer: state.Customer,
    };
};

export default connect(mapStateToProps, {loginRequest, userSignupBlockchain})(LoginForm);