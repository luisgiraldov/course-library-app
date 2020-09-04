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
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import Authenticated from './components/Authenticated';
import PrivateRoute from './PrivateRoute';
import CreateCourse from './components/CreateCourse';

//Connect the Header component to context
const HeaderWithContext = withContext(Header);
//Connect the Courses component to context
const CoursesWithContext = withContext(Courses);
//Connect the CourseDetail component to context
const CourseDetailWithContext = withContext(CourseDetail);
//Connect the UserSignUp component to context
const UserSignUpWithContext = withContext(UserSignUp);
//Connect the UserSignIn component to context
const UserSignInWithContext = withContext(UserSignIn);
//Connect UserSignOut to context
const UserSignOutWithContext = withContext(UserSignOut);
//Connect Authenticated to context
const AuthWithContext = withContext(Authenticated);
//Connect CreateCourse to context
const CreateCourseWithContext = withContext(CreateCourse);

export default () => (
  <Router>
    <div>
      <HeaderWithContext />
      <hr />

      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <Route path="/api/courses/:id" component={CourseDetailWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        {/* <PrivateRoute path="/authenticated" component={AuthWithContext} /> */}
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route path="/api/courses" component={CreateCourseWithContext} />
        {/* <PrivateRoute path="/authenticated" component={AuthWithContext} />
        <PrivateRoute path="/settings" component={AuthWithContext} />
        <Route component={NotFound} /> */}
      </Switch>
    </div>
  </Router>
);

