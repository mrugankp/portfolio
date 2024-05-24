import React from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Blog from './components/Blog';
import SingleBlog from './components/SingleBlog';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Navbar />
      <main>
        <About />
        <Experience />
        <Projects />
        <Blog />
        <Switch>
          <Route path="/blog/:id" component={SingleBlog} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
