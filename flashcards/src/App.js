import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import SignUp from './components/signUp';
import MainMenu from './components/MainMenu';
import Game from './components/Game';
import GameOver from './components/GameOver';
import ManageList from './components/ManageList';
import TopBanner from './components/TopBanner';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/login';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <AuthProvider>
      {/* <Container className="d-flex align-items-center justify-content-center" style={{minHeight: '100vh'}}> */}
        <TopBanner />
        
          <Container>
          <Router>
              <PrivateRoute exact path="/" component={MainMenu} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/main" component={MainMenu} />
              <PrivateRoute path="/game" component={Game} />
              <PrivateRoute path="/gameover" component={GameOver} />
              <PrivateRoute path="/list" component={ManageList} />
              </Router>
            </Container>
        
        {/* </Container> */}
        </AuthProvider> 
  );
}

export default App;
