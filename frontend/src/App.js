// src/App.js
import React from 'react';
import FullScreenSections from './components/FullScreenSections';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SingleBlog from './components/SingleBlog';

const App = () => {
  return (
    <Router>
      <FullScreenSections />
      <Switch>
        <Route path="/blog/:id" component={SingleBlog} />
      </Switch>
    </Router>
  );
}

export default App;
