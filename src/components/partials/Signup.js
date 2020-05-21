import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

class Signup extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      passwordAgain: '',
      name: '',
      username: '',
      error: '',
      errors: {}
    };
  }

  render() {
    return (
      <>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="form-wrapper">
                <h1>Signup</h1>
                <form
                  onSubmit={e =>{
                    e.preventDefault()
                    if (this.props.chat.socket) {

                      let empty = 0;
                      this.setState({error: ''})

                      Object.keys(this.state).map(ref => {
                        if (ref === 'error')
                          return;
                        this.state.errors[ref] = []
                        if (this.state[ref] === '') {
                          this.state.errors[ref].push('Required');
                          empty += 1;
                        } else {
                          this.state.errors[ref] = []
                        }
                      });

                      //console.log(this.state.errors)

                      if (empty > 0) {
                        return this.setState({error: 'All fields required'});
                      } else {
                        if (!this.state.email.match(/\w+@\w+\.\w+/)) {
                          this.state.errors.email.push('Invalid email');
                          return this.setState({error: 'Invalid email'});
                        } 

                        if (this.state.password !== this.state.passwordAgain) {
                          this.state.errors.passwordAgain.push('No match');
                          return this.setState({error: 'Passwords must match'});
                        }
                      }

                      this.props.chat.socket.send(JSON.stringify(
                        {
                          type: 'SIGNUP',
                          data: {
                            email: this.state.email,
                            password: this.state.password,
                            name: this.state.name,
                            username: this.state.username
                          }
                        }
                      ))
                    }
                  }}
                >

                  <p>Already have an account? <Link to="/login">Log in</Link></p>

                  <div className="form-status">
                    {
                      this.state.error ?
                        <p>{this.state.error}</p>
                      : null
                    }
                  </div>

                  <div className="row">

                    <div className="col-md-6">

                      <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input 
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          value={this.state.email}
                          onChange={e => this.setState({email: e.target.value})}
                        />
                      </div>

                      {
                        this.state.errors['email'] && this.state.errors['email'].length ?
                          <p className="status-error">{this.state.errors['email']}</p>
                        : null
                      }

                    </div>

                    <div className="col-md-6">

                      <div className="form-group">
                        <label htmlFor="">Name</label>
                        <input 
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          value={this.state.name}
                          onChange={e => this.setState({name: e.target.value})}
                        />
                      </div>

                      {
                        this.state.errors['name'] && this.state.errors['name'].length ?
                          <p className="status-error">{this.state.errors['name']}</p>
                        : null
                      }
                    </div>

                  </div>

                  <div className="row">

                    <div className="col-md-6">

                      <div className="form-group">
                        <label htmlFor="">Password</label>
                        <input 
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          value={this.state.password}
                          onChange={e => this.setState({password: e.target.value})}
                        />
                      </div>

                      {
                        this.state.errors['password'] && this.state.errors['password'].length ?
                          <p className="status-error">{this.state.errors['password']}</p>
                        : null
                      }

                    </div>

                    <div className="col-md-6">

                      <div className="form-group">
                        <label htmlFor="">Confirm Password</label>
                        <input 
                          type="password"
                          className="form-control"
                          placeholder="Confirm password"
                          value={this.state.passwordAgain}
                          onChange={e => this.setState({passwordAgain: e.target.value})}
                        />
                      </div>

                      {
                        this.state.errors['passwordAgain'] && this.state.errors['passwordAgain'].length ?
                          <p className="status-error">{this.state.errors['passwordAgain']}</p>
                        : null
                      }

                    </div>

                  </div>

                  <div className="row">
                    <div className="col-md-12">

                      <div className="form-group">
                        <label htmlFor="">Username</label>
                        <input 
                          type="text"
                          className="form-control"
                          placeholder="Username"
                          value={this.state.username}
                          onChange={e => this.setState({username: e.target.value})}
                        />
                      </div>

                      {
                        this.state.errors['username'] && this.state.errors['username'].length ?
                          <p className="status-error">{this.state.errors['username']}</p>
                        : null
                      }

                    </div>
                  </div>


                  <div className="row">
                    <div className="col-md-12">
                      <button className="btn btn-primary" type="submit">
                        Sign up
                      </button>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
