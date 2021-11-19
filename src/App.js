import { Route, Switch, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
import { Component } from 'react';
import "./default.scss"
import {connect} from 'react-redux'
import { setCurrentuser } from './redux/User/user.actions';
//Layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

// Pages
import Homepage from './pages/Homepage/homepage';
import Login from './pages/Login/login';
import Recovery from './pages/Recovery/recovery';
import Registration from './pages/Registration/register';


class App extends Component {


  authListener = null;

  componentDidMount() {
    const { setCurrentuser } = this.props;

    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentuser({
              id: snapshot.id,
              ...snapshot.data(),
          });      
        })
      }

      setCurrentuser(userAuth);
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    const {currentUser} = this.props;

    return (
      <div className="App">
        <div className="main">
          <Switch>
            <Route exact path="/" render={() => (
              <HomepageLayout>
                <Homepage/>
              </HomepageLayout>
            )} />
            <Route path="/registration" 
              render={() => currentUser ? <Redirect to="/" /> : (
              <MainLayout>
                <Registration/>
              </MainLayout>
            )} />        
            <Route path="/login" 
              render={() => currentUser ? <Redirect to="/" /> : (
                <MainLayout>
                  <Login />
                </MainLayout>
            )} /> 
            <Route path="/recovery" render={()=>(
              <MainLayout>
                <Recovery />
              </MainLayout>
            )} />       
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentuser: user => dispatch(setCurrentuser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
