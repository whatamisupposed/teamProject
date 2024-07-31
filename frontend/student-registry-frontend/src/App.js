import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import AdminDashboard from './components/AdminDashboard';
import CourseList from './components/CourseList';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <ProtectedRoute path="/profile" component={Profile} />
      <ProtectedRoute path="/admin" component={AdminDashboard} />
      <ProtectedRoute path="/courses" component={CourseList} />
    </Switch>
  );
}

export default App;
