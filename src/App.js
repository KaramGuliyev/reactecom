import { Route, Switch } from 'react-router-dom';
import "./default.scss"
import Homepage from './pages/Homepage/homepage';
import Registration from './pages/Registration/register';

//Layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/homepageLayout';

function App() {
  return (
    <div className="App">
      <div className="main">
        <Switch>
          <Route exact path="/" render={() => (
            <HomepageLayout>
              <Homepage/>
            </HomepageLayout>
          )} />
          <Route path="/registration" render={() => (
            <MainLayout>
              <Registration/>
            </MainLayout>
          )} />        
        </Switch>
      </div>
    </div>
  );
}

export default App;
