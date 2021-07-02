import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';

function App() {
  return (
    <Router>
      <div>

        <hr />

        <Switch>
          {/* <Route exact path="/">
            <LandingPage /> 
          </Route> */}
          {/* <Route path="/login">
            <LoginPage />
          </Route> */}
          {/* <Route path="/register">
            <RegisterPage />
          </Route> */}
          
          {/* 간략하게 한줄로 바꿔줄수있음   */}
          {/* exact 넣어주는 이유 : Router가 해당 컴포넌트를 올바르게 찾게 도와줌 */}
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
