import React, {Component} from 'react';
import {connect} from 'react-redux'

import {withRouter, Link} from 'react-router-dom';


class ThreadView extends Component {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreadView)
