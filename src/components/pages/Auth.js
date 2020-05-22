import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import Login from '../partials/Login';
import Signup from '../partials/Signup';
import * as AuthActions from '../../store/actions/authActions';

class Auth extends Component {
  render() {
    return (
      <div className="wrapper">
        {this.props.match.path === '/signup' ?
          <Signup />
        :
          <Login />
        }
      </div>

    );
  }
}

const mapStateToProps = state => ({ 
  ...state.auth,
});

const mapDispatchToProps = dispatch => ({ 
});

export default withRouter(connect(
  mapStateToProps, 
  mapDispatchToProps 
)(Auth));
