import React, {Component} from 'react';
import SignupForm from './SignupForm';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {userSignupRequest, isUserExists} from '../../actions/SignupActions';
import {addFlashMessage} from '../../actions/flashMessage';

class SignupPage extends Component {
    static propTypes = {
        userSignupRequest: PropTypes.func.isRequired,
        addFlashMessage:PropTypes.func.isRequired,
        isUserExists:PropTypes.func.isRequired
    };

    render() {
        console.dir(this.props);
        const {addFlashMessage, userSignupRequest, isUserExists} = this.props;
        return (
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <SignupForm isUserExists={isUserExists} addFlashMessage={addFlashMessage} userSignupRequest={userSignupRequest}/>
                </div>
                <div className="col-md-3"></div>
            </div>
        );
    }
}

export default connect(null, {userSignupRequest, addFlashMessage, isUserExists})(SignupPage);