import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';  
import Projects from './components/projects/Projects.jsx';

import ProjectSate from './context/projects/ProjectState.jsx';
import TaskState from './context/tasks/TaskState.jsx';

function App() {
  return (
    <ProjectSate>
      <TaskState>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/projects" component={Projects} />
          </Switch>
        </Router>
      </TaskState>
    </ProjectSate>
  );
}

export default App;
