import React, { Component } from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";

import About from "./views/about";
import Home from "./views/home";

const App = () => (
  <Router>
    <div>
      <Route path="/" component={Home} />
    </div>
  </Router>
);
export default App;
