import React, {Component} from 'react';
import {connect} from 'react-redux'

import {withRouter, Link} from 'react-router-dom';


class ThreadView extends Component {

  constructor(props) {
    super(props)
    console.log({props})
  }

  componentDidMount () {
    this.init();
  }

  componentDidUpdate(props) {
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

    //console.log('current chat', this.props.chat)
    //console.log('current props', this.props)
    //console.log('current thread', currentThread)
    if (currentThread && this.props.chat.socket.readyState && this.props.chat.socket.send) {
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
        hello
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat
})

const mapDispatchToProps = dispatch => ({

})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreadView))
