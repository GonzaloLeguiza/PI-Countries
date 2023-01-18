import './App.css';
import{BrowserRouter , Route , Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import ActivityCreate from './components/ActivityCreate';
import Detail from './components/Detail';
import Componente404 from './components/404.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route path='/home' component={Home}/>
          <Route path='/country' component={ActivityCreate}/>
          <Route path='/detail' component={Detail}/>
          <Route path='*' component={Componente404}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
