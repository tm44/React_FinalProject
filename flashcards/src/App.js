import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp';
import MainMenu from './components/MainMenu';
import Game from './components/Game/Game';
import GameOver from './components/Game/GameOver';
import ManageList from './components/ListManagement/ManageList';
import TopBanner from './components/TopBanner/TopBanner';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <AuthProvider>
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
  </AuthProvider> 
  );
}

export default App;
