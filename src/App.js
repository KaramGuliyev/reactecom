import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import "./default.scss"
import { useDispatch } from 'react-redux'
import { checkUserSession } from './redux/User/user.actions';

//Components
import AdminToolbar from './components/AdminToolbar/admintoolbar';

//High Ordered Components
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';

//Layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';
import AdminLayout from './layouts/AdminLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Admin from './pages/Admin/admin';
import Homepage from './pages/Homepage/homepage';
import Login from './pages/Login/login';
import Recovery from './pages/Recovery/recovery';
import Registration from './pages/Registration/register';
import Dashboard from './pages/Dashboard/dashboard';
import Search from './pages/Search/search';
import ProductDetails from './pages/ProductDetails/productdetails';

const App = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

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
            <Route exact path="/search" render={()=> (
              <MainLayout>
                <Search />
              </MainLayout>
            )} />
            
            <Route path="/search/:filterType" render={()=> (
              <MainLayout>
                <Search />
              </MainLayout>
            )} />

            <Route path="/product/:productID" render={()=> (
              <MainLayout>
                <ProductDetails />
              </MainLayout>
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
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </WithAuth>
            )} />
            <Route path="/admin" 
              render={()=> (
              <WithAdminAuth>
                <AdminLayout>
                  <Admin />
                </AdminLayout>
              </WithAdminAuth>
            )} />       
          </Switch>
        </div>
      </div>
    );
}

export default App;
