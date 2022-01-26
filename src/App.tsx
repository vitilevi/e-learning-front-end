import React from 'react';
import {Switch, Route} from "react-router-dom";
import Contact from './pages/Contact';
import Course from './pages/Course';
import Feedback from './pages/Feedback';
import Registration from './pages/Registration';
import NavigationBar from "./components/NavigationBar";
import './App.css';

function App() {
  return (
    <div>
      <NavigationBar />
      <Switch>
        <Route exact path="/" component={Registration} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/course" component={Course} />
        <Route exact path="/feedback" component={Feedback} />
      </Switch>
    </div>
  );
}

export default App;
