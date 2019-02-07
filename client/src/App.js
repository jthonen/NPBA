import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LogInPage from "./pages/LogInPage";

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={LogInPage} />
        </Switch>
    </Router>
  );
}

export default App;