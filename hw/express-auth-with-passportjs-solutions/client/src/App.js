// Packages and Libraries
import React from 'react';
import { Route, Link } from 'react-router-dom';
//Components
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
//helper functions
import { login, signup, getProfile } from './services/apiService'
//CSS
import './App.css';
import authService from './services/authService';
import SignUpForm from './components/SignUpForm';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSignedIn: false,
      isSignedUp: false,
      user: {}
    }
  }

  async componentDidMount() {
    try {
      const fetchUser = await getProfile()

      this.setState(state => {
        return {
          isSignedIn: authService.isAuthenticated(),
          user: fetchUser
        }
      })
    } 
    catch (e) {
      throw e
    }
  }

loginUser = async (credentials) => {
  try {
    const user = await login(credentials)
    console.log(credentials)
    this.setState(state => {
      return {
        isSignedIn: true,
        user: user
      }
    })
  }
  catch (e) {
    throw e
  }
}

  signOutUser = () => {
    authService.signOut()

    this.setState(state => {
      return {
        isSignedIn: false,
        user: {}
      }
    })
  }

  signUpUser = async (credentials) => {
    try {
      await signup(credentials)
      console.log(credentials)
      const newUser = {email:credentials.email, password:credentials.password}
      this.loginUser(newUser)
    }
    catch (error) {
      throw error
    }

  }

  render() {
    const { isSignedIn, isSignedUp, user } = this.state
    
    return (
      <div className="App">
        <nav>
          <div><Link to="/">Home</Link></div>

          {
            isSignedIn && 
            isSignedUp &&
            <div><Link to="/dashboard">Dashboard</Link></div>
          }

          {
           !isSignedIn ? (
           <div><Link to="/login">Login</Link></div>
           ) : (
           <button onClick={this.signOutUser}>Sign Out</button>
           ) 
          }
          {
            !isSignedUp ? (
              <div><Link to="/signup">Sign Up</Link></div>
            ) : (
              <button onClick={this.signUpUser}>Sign Up</button>
            )
          }
        </nav>
  
        <main>
          <Route exact path="/" component={Home} />
          <ProtectedRoute path="/dashboard" user={user} component={Dashboard} />
          <Route path="/login" 
            render={(props) => <Login {...props} handleLogin={this.loginUser} isSignedIn={isSignedIn} />}
            />
        </main>
        <main>
          <Route path="/signup" render={props => ( <SignUpForm {...props} signUp={this.signUpUser} isSignedUp={isSignedUp} isSignedIn={isSignedIn}/>)} />
        </main>
      </div>
    );
  }
}

export default App;
