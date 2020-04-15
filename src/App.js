import React from "react";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import "./App.css";
import Home from "./Pages/Home/Home";
import Book from "./Pages/Book/Book";
import Header from "./shared/Header/Header";

const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
});
function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Header />
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/works/:id">
          <Book />
        </Route>
      </Router>
    </div>
  );
}

export default App;
