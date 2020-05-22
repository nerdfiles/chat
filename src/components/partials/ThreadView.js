import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom';
import Message from './Message';


class ThreadView extends Component {

  componentDidMount(props) {
    this.init();

  }

  componentDidUpdate(props) {

    if (props.match.params.threadId !== this.props.match.params.threadId) {
      const mainView = document.querySelector('.main-view')
      mainView.scrollTop = mainView.scrollHeight
    }

    try {
      if (props.match.params.threadId !== this.props.match.params.threadId) {
        this.init();
      }
    } catch (e) {
      console.log({e})
    }
  }

  init = () => {
    let currentThread
    try {
      currentThread = this.props.chat.threads.filter(t => t.id === this.props.match.params.threadId)[0]
    } catch (e) {
      console.log({e})
    }

    if (
      currentThread && 
      this.props.chat.socket.readyState && 
      this.props.chat.socket.send
    ) {
      let skip = currentThread.messages || 0
      this.props.chat.socket.send(JSON.stringify({
        type: 'THREAD_LOAD',
        data: {
          threadId: this.props.match.params.threadId,
          skip: skip
        }
      }))
    }

  }

  render() {
    return (
      <div className="main-view">
      {this.props.chat.threads.filter(thread => thread.id === this.props.match.params.threadId).map((thread, i) => {
        return (
          <div className="message-container" key={i}>
            {thread.Messages.map((msg, mi) => {
              return (
                <Message 
                  msg={msg} 
                  key={mi} 
                  profile={thread.profiles.filter(p => p.id === msg.userId)[0]}
                />
              );
            })}
            
          </div>
        );
      })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat
});

const mapDispatchToProps = dispatch => ({

});


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreadView));
