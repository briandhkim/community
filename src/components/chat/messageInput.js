import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

class MessageInput extends Component {

    renderTextarea({input, id, label, meta:{touched, error}}) {
        return (
            <div className="input-field my-0">
                <textarea {...input} id={id} className="materialize-textarea" ></textarea>
                <label htmlFor={id} className="">{label}</label>
            </div>
        );
    }

    send(value) {

        const {message} = value;
        console.log(message);
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <div className="row mb-1r white px-r2 pt-r105 pb-1">
                <form onSubmit={handleSubmit((val)=>{this.send(val)})} className="sendMessageForm">
                    <Field name='message' id='chatMessageInput' label='Message' component={this.renderTextarea} />
                    <button className="btn waves-effect right">
                        Send
                    </button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

MessageInput = reduxForm({
    form: 'messageInput'
})(MessageInput);

export default connect(mapStateToProps, {})(MessageInput);