import React from 'react';
import Navigation from './components/Navigation'
import Home from './components/Home'
import Courses from './components/Courses'
import Resources from './components/Resources'
import Footer from './components/Footer'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';



function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/resources" component={Resources} />
        <Route path="/courses" component={Courses} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
