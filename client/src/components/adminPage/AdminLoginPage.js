import React, {Component} from 'react';
import AdminLoginForm from './AdminLoginForm';

class adminLoginPage extends Component {
    render() {
        return(
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                    <AdminLoginForm />
                </div>
                <div className="col-sm-3"></div>
            </div>
        )
    }
}

export default adminLoginPage;