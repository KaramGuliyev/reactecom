import Header from './components/Header/header'
import "./default.scss"
import Homepage from './pages/Homepage/homepage';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Homepage />
      </div>
    </div>
  );
}

export default App;
