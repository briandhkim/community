import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reset, reduxForm} from 'redux-form';
import M from 'materialize-css/dist/js/materialize.min';

import {loadChatData, sendMessage} from '../../actions/index';

class MessageInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageLengthLimit: 200
        };

        this.renderTextarea = this.renderTextarea.bind(this);
    }

    componentDidMount() {
        const elem = document.querySelector(".materialize-textarea");
        M.CharacterCounter.init(elem);
    }

    componentDidUpdate() {
        const {chat, insertedMessage} = this.props;

        if (insertedMessage) {
            this.props.loadChatData(chat.uid);
        }
    }

    renderTextarea({input, id, label, meta:{touched, error}}) {
        return (
            <div className="input-field mt-0 mb-2r">
                <textarea {...input} id={id} className="materialize-textarea chat-input font-primary" data-length={this.state.messageLengthLimit}></textarea>
                <label htmlFor={id} className="font-tertiary">{label}</label>
            </div>
        );
    }

    send(value) {

        const {message} = value;
        const {messageLengthLimit} = this.state;
        if (message === undefined) return;

        const msgLength = message.trim().length;
        if (!msgLength || msgLength > messageLengthLimit) return;

        const {chat, user} = this.props;
        this.props.sendMessage(chat.uid, user.uid, message);
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <div className="row mb-1r white px-r2 pt-r105 pb-1">
                <form onSubmit={handleSubmit((val)=>{this.send(val)})} className="sendMessageForm">
                    <Field name='message' id='chatMessageInput' label='Message' component={this.renderTextarea} />
                    <button className="btn waves-effect right btn-primary" onClick={handleSubmit((val)=>{this.send(val)})}>
                        Send
                    </button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {chat, user} = state;

    return {
        chat            : chat.activeChat,
        insertedMessage : chat.insertedMessage,
        user            : user.user
    };
}

const afterSendingMessage = (result, dispatch) => 
    dispatch(reset('messageInput'));

MessageInput = reduxForm({
    form: 'messageInput',
    onSubmitSuccess: afterSendingMessage
})(MessageInput);

export default connect(mapStateToProps, {loadChatData, sendMessage})(MessageInput);