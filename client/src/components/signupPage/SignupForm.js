import React, {Component} from 'react';
// import axios from 'axios';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {withRouter} from 'react-router-dom';
import './SignupForm.css';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
            errors: {},
            isLoading: false,
            invalid:false
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.setState({errors: {}, isLoading: true});
        //axios.post('/api/users',{user:this.state});
        this.props.userSignupRequest(this.state).then(
            () => {
                console.log(this.props);
                this.props.addFlashMessage({
                    type:"success",
                    text:"You signed up successfully welcome"
                });
                this.props.history.push('/login');
            },
            ({response}) => {
                this.setState({errors: response.data, isLoading: false})
            }
        );
    };

    checkUserExists =(e) => {
        const field = e.target.name;
        const val = e.target.value;
        if(val !== ''){
            this.props.isUserExists(val).then(res => {
                let errors = this.state.errors;
                let invalid;
                if(res.data.user){
                    errors[field] = "There is user with such " + field;
                    invalid = true;
                } else {
                    errors[field] = '';
                    invalid = false;
                }
                this.setState({ errors, invalid });
            })
        }
    };

    render() {
        const {errors} = this.state;
        return (
            <form onSubmit={this.onSubmit} className="signupform">
                <h1 className="signup">Sign up</h1>

                <div className="form-group">
                    <label className="control-label">Username</label>

                    <input
                        value={this.state.username}
                        onChange={this.onChange}
                        type="text"
                        name="username"
                        onBlur={this.checkUserExists}
                        className={classnames('form-control', {'is-invalid': errors.username})}
                        placeholder="Enter username"
                    />
                    {errors.username && <span className="form-text text-muted">{errors.username}</span>}
                </div>

                <div className="form-group">
                    <label className="control-label">Email</label>

                    <input
                        value={this.state.email}
                        onChange={this.onChange}
                        type="email"
                        name="email"
                        onBlur={this.checkUserExists}
                        className={classnames('form-control', {'is-invalid': errors.email})}
                        placeholder="Enter email"
                    />
                    {errors.email && <span className="form-text text-muted">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label className="control-label">Password</label>

                    <input
                        value={this.state.password}
                        onChange={this.onChange}
                        type="password"
                        name="password"
                        className={classnames('form-control', {'is-invalid': errors.password})}
                        placeholder="Enter password"
                    />
                    {errors.password && <span className="form-text text-muted">{errors.password}</span>}
                </div>

                <div className="form-group">
                    <label className="control-label">Password confirm</label>

                    <input
                        value={this.state.passwordConfirm}
                        onChange={this.onChange}
                        type="password"
                        name="passwordConfirm"
                        className={classnames('form-control', {'is-invalid': errors.passwordConfirm})}
                        placeholder="Confirm password"
                    />
                    {errors.passwordConfirm && <span className="form-text text-muted">{errors.passwordConfirm}</span>}
                </div>

                <div className="form-group">
                    <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-outline-primary btn-lg btn-block btnsignup">
                        Sign up
                    </button>
                </div>

                <div>
                    <a href="http://localhost:3001/login">已有账号</a>
                </div>
            </form>
        )
    }
}

SignupForm.propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage:PropTypes.func.isRequired,
    isUserExists:PropTypes.func.isRequired
};


export default withRouter(SignupForm);

