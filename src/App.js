import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./screens/Dashboard";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import LoginScreen from "./screens/login/LoginScreen";
// import { PrivateRoute } from "./utils/authRoute";
import { useSelector } from "react-redux";
const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={LoginScreen} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
