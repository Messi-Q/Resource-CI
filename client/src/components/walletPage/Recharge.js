import React, {Component} from 'react';
import classnames from "classnames";

class Recharge extends Component {
    state = {
        id: '',
        accountRecharge: '',
        amountRecharge: '',
        errors: {},
        loading: false,
        done: false
    };

    handleChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);  //clone
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
            <div className=" upload-container">
                <form className={classnames('ui', 'form', {loading: this.state.loading})}
                      onSubmit={this.handleSubmit}>
                    <h1 className="upload">Recharge</h1>

                    {!!this.state.errors.global &&
                    <div className="ui negative message">{this.state.errors.global}</div>}

                    <div>
                        <label htmlFor="title" className="control-label">Recharge Product:</label>
                        <label
                            className="control-label">&nbsp;&nbsp;&nbsp;Education Coin</label>
                    </div>

                    <div className={classnames('form-group', {error: !!this.state.errors.accountRecharge})}>
                        <label htmlFor="title" className="control-label">Recharge Account:</label>
                        <input
                            type="text"
                            name="fileReadPrice"
                            value={this.state.accountRecharge}
                            onChange={this.handleChange}
                            className="uploadinput"
                            placeholder="Enter accountRecharge"
                        />
                        <span>{this.state.errors.accountRecharge}</span>
                    </div>

                    <div className={classnames('form-group', {error: !!this.state.errors.amountRecharge})}>
                        <label htmlFor="title" className="control-label">Recharge Amount:</label>
                        <input
                            type="text"
                            name="fileRightPrice"
                            value={this.state.amountRecharge}
                            onChange={this.handleChange}
                            className="uploadinput"
                            placeholder="Enter amountRecharge"
                        />
                        <span>{this.state.errors.amountRecharge}</span>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-outline-primary btn-lg btn-block">Recharge</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Recharge;