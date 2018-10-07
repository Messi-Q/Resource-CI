import React, {Component} from 'react'

class SuccessPage extends Component {

    handleSubmit = (e) => {
        this.props.history.push('/resources')
    };

    render() {
        return (
            <div className="container upload-container">
                <form onSubmit={this.handleSubmit}>
                    <h1 align="center">确权成功</h1>
                    <div className="form-group">
                        <button className="btn btn-outline-primary btn-lg btn-block">返回</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SuccessPage;