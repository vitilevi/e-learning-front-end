import React from 'react';
import {Switch, Route} from "react-router-dom";
import ContactForm from './pages/AddForms/Contact';
import CourseForm from './pages/AddForms/Course';
import FeedbackForm from './pages/AddForms/Feedback';
import UserForm from './pages/AddForms/User';
import NavigationBar from "./components/NavigationBar";
import User from "./pages/ViewData/ViewData";
import './App.css';

function App() {
  return (
    <>
      <NavigationBar />
      <Switch>
        <Route path="/user/new" component={UserForm} />
        <Route path="/contact/new" component={ContactForm} />
        <Route path="/course/new" component={CourseForm} />
        <Route path="/feedback/new" component={FeedbackForm} />
        <Route path="/user/edit/:id" component={UserForm} />
        <Route path="/contact/edit/:id" component={ContactForm} />
        <Route path="/course/edit/:id" component={CourseForm} />
        <Route path="/feedback/edit/:id" component={FeedbackForm} />
        <Route path="/:table" component={User} />
      </Switch>
    </>
  );
}

export default App;
