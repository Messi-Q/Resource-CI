import React, {Component} from 'react';
import classnames from 'classnames';

class AdminLoginForm extends Component {
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

    }

    render(){
        return(

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

            </form>
        )
    }
}

export default AdminLoginForm;