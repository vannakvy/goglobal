import { Route, Redirect } from "react-router-dom";

// const fakeAuth = {
//   isAuthenticated: false,
//   authenticate(cb) {
//     this.isAuthenticated = true;
//     setTimeout(cb, 100); // fake async
//   },
//   signout(cb) {
//     this.isAuthenticated = false;
//     setTimeout(cb, 100); // fake async
//   },
// };

const userInfo = localStorage.getItem("userInfo") ? true : false;
export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      userInfo === true ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);
