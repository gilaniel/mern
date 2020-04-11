import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from './routes';
import {useAuth} from './hooks/auth.hook';
import {AuthContext} from './context/auth';
import {NavBar} from './components/navBar';
import 'materialize-css';

function App() {
  const {token, login, logout, userId} = useAuth();
  
  const isAuth = !!token;
  const routes = useRoutes(isAuth);
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuth
    }}>
      <Router>
        {isAuth && <NavBar/>}
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
