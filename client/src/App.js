import React from 'react';
// import './styles/global.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import withContext from './Context';

// //Connect the Header component to context
// const HeaderWithContext = withContext(Header);
// //Connect the Courses component to context
// const CoursesWithContext = withContext(Courses);

export default () => (
  <Router>
    <div>
      <Header />
      <hr />

      <Switch>
        <Route exact path="/" component={Courses} />
        <Route path="/courses/:id" component={CourseDetail} />
        {/* <PrivateRoute path="/authenticated" component={AuthWithContext} />
        <PrivateRoute path="/settings" component={AuthWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route component={NotFound} /> */}
      </Switch>
    </div>
  </Router>
);

