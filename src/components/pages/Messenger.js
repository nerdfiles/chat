import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom';

import ThreadView from '../partials/ThreadView'
import ChatInput from '../partials/ChatInput'
import Sidebar from '../partials/Sidebar'


class Messenger extends Component {
  render() {
    return (
      <>
        
        <div className="messenger-container">
          <Sidebar />
          <ThreadView />
          <ChatInput />
        </div>
      </>
    );
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
)(Messenger)
