import React, {Component} from 'react';
import {connect} from 'react-redux'

import {withRouter, Link} from 'react-router-dom';


class ChatInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ''
    }
  }
  render() {
    return (
      <div className="input-view">
        <input 
          value={this.state.content}
          onChange={e => this.setState({content: e.target.value})}
          type="text" 
          placeholder="Write some" 
          className="form-control" 
        />
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
)(ChatInput)
