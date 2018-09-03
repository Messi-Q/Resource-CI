import React,{Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addFlashMessage} from '../actions/flashMessage';

//高阶组件
export default function (ComposedComponent) {
    class Authernticate extends Component {
        componentWillMount(){
            if(!this.props.isAuthenticated){
                this.props.addFlashMessage({
                    type:'danger',
                    text:'You need to login to access this page'
                });
                this.context.router.history.push('/login');
            }
        }

        componentWillUpdate(nextProps){
            if(!nextProps.isAuthenticated){
                console.log(nextProps.isAuthenticated);
                this.context.router.history.push('/');
            }
        }

        render(){
            return (
                <ComposedComponent {...this.props} />
            );
        }
    }

    Authernticate.propTypes = {
        isAuthenticated:PropTypes.bool.isRequired,
        addFlashMessage:PropTypes.func.isRequired
    };

    Authernticate.contextTypes = {
        router:PropTypes.object.isRequired
    };

    const mapStateToProps = (state) => {
        return {
            isAuthenticated:state.userLogin.isAuthenticated
        };
    };

    return connect(mapStateToProps, {addFlashMessage})(Authernticate);
}

