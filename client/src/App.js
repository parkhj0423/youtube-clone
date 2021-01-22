import './App.css';
import React from 'react';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import NavBar from "./components/views/NavBar/NavBar";
import Footer from "./components/views/Footer/Footer";
import Auth from './hoc/auth';
import VideoUploadPage from './components/views/VideoUploadPage/VideoUploadPage';
import VideoDetailPage from './components/views/VideoDetailPage/VideoDetailPage';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {



  return (
    <Router>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage,null)}/>
          <Route exact path="/login" component={Auth(LoginPage,false)}/>
          <Route exact path="/register" component={Auth(RegisterPage,false)}/>
          <Route exact path="/video/upload" component={Auth(VideoUploadPage,true)}/>
          <Route exact path="/video/:videoId" component={Auth(VideoDetailPage,null)}/>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}


export default App;
