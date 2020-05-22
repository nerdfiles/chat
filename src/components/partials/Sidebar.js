import React, {Component} from 'react';
import {connect} from 'react-redux'

import {withRouter, Link} from 'react-router-dom';

import * as AuthActions from '../../store/actions/authActions';


class Sidebar extends Component {
  state = {
    search: ''
  }

  search = () => {
    this.props.chat.socket.send(JSON.stringify({
      type: 'SEARCH',
      data: this.state.search
    }));
  }

  findOrCreateThread = (id) => {
    console.log(this.props)
    this.props.chat.socket.send(JSON.stringify(
      {
        type: 'FIND_THREAD',
        data: [
          this.props.auth.user.id,
          id
        ]
      }
    ));
  }

  render() {
    return (
      <>
        <div className="sidebar">

          <div className="control-section">

            <button className="logout-button" onClick={e => {
              this.props.logout()
            }}>Log out</button>

          </div>

          <div className="search-container">
            <input 
              className="form-control" 
              placeholder="Search..." 
              value={this.state.search} 
              onChange={e => {
                //this.props.chat.users = [];
                this.setState({ search: e.target.value})
              }}
            />

            <button 
              className="btn btn-primary" 
              onClick={e => this.search(this.state.search)}
            >Search</button>

          </div>

          {this.state.search && this.props.chat.users.length ?

            <ul className="thread-list">

              <label>Results</label>

              {this.props.chat.users.length ? 
                this.props.chat.users
                  .filter(u => u.id !== this.props.auth.user.id)
                  .filter(a => a.email.includes(this.state.search))
                  .map((userRef, index) => {
                    return (
                      <li key={index}>
                        <a onClick={e => {
                          e.preventDefault()
                          this.findOrCreateThread(userRef.id)
                        }}>
                          <i className="zmdi zmdi-account-circle" />
                          <div>
                            <h5>{userRef.name}</h5>
                            <p>{userRef.email}</p>
                          </div>
                        </a>
                      </li>
                    );
                  }) 
                : null
              }
            </ul>
            :
            <ul className="thread-list">

              <label>Messages</label>

              {this.props.chat.threads.length ? 
                this.props.chat.threads
                  .filter(t => t.users.indexOf(this.props.auth.user.id) > -1)
                  .map((threadRef, index) => {
                    return (
                      <li key={index}>
                        <Link to={`/${threadRef.id}`}>
                          <i className="zmdi zmdi-account-circle" />
                          <div>
                            <h5>{threadRef.id}</h5>
                            <p>Some other thread</p>
                          </div>
                        </Link>
                      </li>
                    );
                  })
                : null
              }
            </ul>

          }

        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat
});

const mapDispatchToProps = dispatch => ({

  logout: () => {
    dispatch(AuthActions.logout())
  }

});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
