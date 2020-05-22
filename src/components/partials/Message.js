import React, {Component} from 'react';
import {connect} from 'react-redux';

class Message extends Component {
  render() {
    return (
      <div className={`message-item ${this.props.msg.userId === this.props.auth.user.id ? 'msg-right': 'msg-left'}`}>
        <div className="message-item-inner">
          <i title={this.props.profile.name} className="zmdi zmdi-account-circle" />
          <div className="chat-bubble">
            {this.props.msg.content}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({ 
  auth: state.auth,
  chat: state.chat
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);
