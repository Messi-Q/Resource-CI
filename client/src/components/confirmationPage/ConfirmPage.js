import React, {Component} from 'react'
import classnames from 'classnames';
import {connect} from 'react-redux';
import {fileConfirm} from '../../actions/confirmActions';

class ConfirmPage extends Component {
    state = {
        filename: this.props.fileInfo ? this.props.fileInfo.originalname : '',
        filepath: this.props.fileInfo ? this.props.fileInfo.path : '',
        identity: '',
        succeed: false,
        loading: false,
        errors: {}
    };

    componentDidMount() {
        console.log('location', __dirname, __filename);
        console.log(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            filename: nextProps.fileInfo.originalname,
            filepath: nextProps.fileInfo.path,
        });
    }


    handleChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
                [e.target.name]: e.target.value,
                errors
            })
        } else {
            this.setState({[e.target.name]: e.target.value})
        }
    };

    handleSubmit1 = (e) => {
        e.preventDefault();

        let errors = {};
        if (this.state.filename === '') errors.filename = "Can't be empty";
        if (this.state.identity === '') errors.username = "Can't be empty";
        this.setState({errors});

        const isValid = Object.keys(errors).length === 0;  //Object.keys返回对象所有属性

        const input = '/home/jion1/nodejsworkspace/redux-login/' + this.state.filepath;
        const {identity} = this.state;
        const output = "/home/jion1/nodejsworkspace/redux-login/confirm/" +
            "out" +
            this.state.filename;

        if (isValid) {

            this.props.fileConfirm({
                input, identity, output
            }).then(
                () => {
                    this.props.history.push('/success')
                },
                (err) => err.response.json().then(({errors}) => {
                    this.setState({errors, loading: false})
                })
            );

        }
    };

    handleSubmit2 = (e) => {
        e.preventDefault();

        this.props.history.push('/resources')
    };

    render() {
        return (
            <div className="container upload-container">
                <form className={classnames('ui', 'form', {loading: this.state.loading})}>

                    <div align="center"><h1>Resource Confirmation</h1></div>

                    <div className={classnames('form-group', {error: !!this.state.errors.filename})}>
                        <label htmlFor="title" className="control-label">Resource Information</label>
                        <input
                            type="text"
                            name="filename"
                            value={this.state.filename}
                            onChange={this.handleChange}
                            disabled="true"
                        />
                    </div>

                    <div className={classnames('form-group', {error: !!this.state.errors.identity})}>
                        <label htmlFor="title" className="control-label">Input Your Identity</label>
                        <input
                            type="text"
                            name="identity"
                            value={this.state.identity}
                            onChange={this.handleChange}
                            placeholder="Please Enter Identity"
                        />
                        <span>{this.state.errors.identity}</span>
                    </div>

                    <div align="center">
                        <button className="btn btn-outline-primary btn-lg" onClick={this.handleSubmit1}>Confirm</button>
                        <button className="btn btn-outline-danger btn-lg" onClick={this.handleSubmit2}>Cancel</button>
                    </div>

                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        fileInfo: state.fileInfo
    }
};

export default connect(mapStateToProps, {fileConfirm})(ConfirmPage);