import React from 'react';
import {BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import * as ChatActions from './store/actions/chatActions';
import Auth from './components/pages/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';

import Messenger from './components/pages/Messenger';

class App extends React.Component {

  componentDidMount() {
    this.props.setupSocket(this.props.auth.token, this.props.auth.user.id)
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>

            <Route
              path="/login"
              render={props => {
                if (this.props.auth.token) {
                  return (
                    <Redirect to="/" />
                  );
                } else {
                  return (
                    <Auth />
                  );
                }
              }}
            />

            <Route
              path="/signup"
              render={props => {
                if (this.props.auth.token) {
                  return (
                    <Redirect to="/" />
                  );
                } else {
                  return (
                    <Auth />
                  );
                }
              }}
            />



            <Route
              path="/:threadId"
              render={props => {
                if (!this.props.auth.token) {
                  return (
                    <Redirect to="/login" />
                  );
                } else {
                  return (
                    <Messenger />
                  );
                }
              }}
            />


            <Route
              path="/"
              render={props => {
                if (!this.props.auth.token) {
                  return (
                    <Redirect to="/login" />
                  );
                } else {
                  return (
                    <Messenger />
                  );
                }
              }}
            />

          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat
})

const mapDispatchToProps = dispatch => ({
  setupSocket: (token, userId) => {
    dispatch(ChatActions.setupSocket(token, userId))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
