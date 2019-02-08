import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import GameViewport from "./pages/GameViewport";

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={LogInPage} />
          <Route exact path="/play" component={GameViewport} />
        </Switch>
    </Router>
  );
}

export default App;