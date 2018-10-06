import React, {Component} from 'react'
import classnames from 'classnames';

class ConfirmPage extends Component {

    state = {
        fileInfo:'',
        username:'',
        errors:{}
    };

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            fileInfo:'',
            username:'',
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

    render() {
        return (
            <div className="container upload-container">
                <form className={classnames('ui', 'form', {loading: this.state.loading})}
                      onSubmit={this.handleSubmit}>

                    <h1>Resource Confirmation</h1>

                    <div className={classnames('form-group', {error: !!this.state.errors.fileInfo})}>
                        <label htmlFor="title" className="control-label">Resource Information</label>
                        <input
                            type="text"
                            name="fileInfo"
                            value={this.state.fileInfo}
                            onChange={this.handleChange}
                            className="uploadinput"
                            disabled="true"
                        />
                    </div>

                    <div className={classnames('form-group', {error: !!this.state.errors.username})}>
                        <label htmlFor="title" className="control-label">Input Your Username</label>
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            className="uploadinput"
                            placeholder="Please Enter Username"
                        />
                        <span>{this.state.errors.username}</span>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-outline-primary btn-lg btn-block">Confirm</button>
                    </div>

                </form>
            </div>
        )
    }
}

export default ConfirmPage;