import React from 'react';
import {Switch, Route} from "react-router-dom";
import ContactForm from './pages/AddForms/Contact';
import CourseForm from './pages/AddForms/Course';
import FeedbackForm from './pages/AddForms/Feedback';
import UserForm from './pages/AddForms/Registration';
import NavigationBar from "./components/NavigationBar";
import User from "./pages/ViewData/User";
import './App.css';

function App() {
  return (
    <div>
      <NavigationBar />
      <Switch>
        <Route path="/user/new" component={UserForm} />
        <Route path="/contact/new" component={ContactForm} />
        <Route path="/course/new" component={CourseForm} />
        <Route path="/feedback/new" component={FeedbackForm} />
        {/*<Route path="/user" component={User} />*/}
        <Route path="/:table" component={User} />
      </Switch>
    </div>
  );
}

export default App;
