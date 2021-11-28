import { Route, Switch } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
import { useEffect } from 'react';
import "./default.scss"
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentUser } from './redux/User/user.actions';

//Components
import AdminToolbar from './components/AdminToolbar/admintoolbar';

//High Ordered Components
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';
//Layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

// Pages
import Admin from './pages/Admin/admin';
import Homepage from './pages/Homepage/homepage';
import Login from './pages/Login/login';
import Recovery from './pages/Recovery/recovery';
import Registration from './pages/Registration/register';
import Dashboard from './pages/Dashboard/dashboard';


const App = props => {
  const dispatch = useDispatch();

  useEffect(() => {


    const authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          dispatch(setCurrentUser({
              id: snapshot.id,
              ...snapshot.data(),
          }));      
        })
      }

      dispatch(setCurrentUser(userAuth));
    });
    return () => {
      authListener();
    }
  }, [setCurrentUser])

    return (
      <div className="App">
        <div className="main">
          <AdminToolbar />
          <Switch>
            <Route exact path="/" render={() => (
              <HomepageLayout>
                <Homepage/>
              </HomepageLayout>
            )} />
            <Route path="/registration" 
              render={() => (
              <MainLayout>
                <Registration/>
              </MainLayout>
            )} />        
            <Route path="/login" 
              render={() => (
                <MainLayout>
                  <Login />
                </MainLayout>
            )} /> 
            <Route path="/recovery" 
              render={()=> (
              <MainLayout>
                <Recovery />
              </MainLayout>
            )} />
            <Route path="/dashboard" render={()=> (
              <WithAuth>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </WithAuth>
            )} />
            <Route path="/admin" 
              render={()=> (
              <WithAdminAuth>
                <MainLayout>
                  <Admin />
                </MainLayout>
              </WithAdminAuth>
            )} />       
          </Switch>
        </div>
      </div>
    );
}

export default App;
