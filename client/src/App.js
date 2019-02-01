import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GameViewport from "./pages/GameViewport";

function App() {
  return (
    <Router>
      <div id="Viewport">
        <Switch>
          <Route exact path="/" component={GameViewport} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;