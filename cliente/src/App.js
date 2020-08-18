import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';  
import Projects from './components/projects/Projects.jsx';

import PrivateRoute from './components/routes/PrivateRoute.jsx';

import ProjectSate from './context/projects/ProjectState.jsx';
import TaskState from './context/tasks/TaskState.jsx';
import AlertState from './context/alert/AlertState.jsx';
import AuthState from './context/auth/AuthState.jsx';

import tokenAuth from './config/authToken.js';

// Revisar si tenemos un token
 const token = localStorage.getItem('token');
 if (token) tokenAuth(token);

function App() {
  return (
    <ProjectSate>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/projects" component={Projects} />
              </Switch>
            </Router>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectSate>
  );
}

export default App;
