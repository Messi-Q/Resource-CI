import React, {Component} from 'react';
import SignupForm from './SignupForm';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {userSignupRequest, isUserExists, userSignupBlockchain} from '../../actions/SignupActions';
import {addFlashMessage} from '../../actions/flashMessage';

class SignupPage extends Component {
    static propTypes = {
        userSignupBlockchain: PropTypes.func.isRequired,
        userSignupRequest: PropTypes.func.isRequired,
        addFlashMessage: PropTypes.func.isRequired,
        isUserExists: PropTypes.func.isRequired
    };

    render() {
        console.dir(this.props);
        const {addFlashMessage, userSignupRequest, isUserExists, userSignupBlockchain} = this.props;
        return (
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <SignupForm isUserExists={isUserExists} addFlashMessage={addFlashMessage}
                                userSignupRequest={userSignupRequest} userSignupBlockchain={userSignupBlockchain}/>
                </div>
                <div className="col-md-3"></div>
            </div>
        );
    }
}

export default connect(null, {userSignupRequest, addFlashMessage, isUserExists, userSignupBlockchain})(SignupPage);