import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import LoginForm from "components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import FacultyDashboard from "./components/FacultyDashboard";
import StudentDashboard from "./components/StudentDashboard";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Fetch user data using the token
      fetch("http://localhost:5000/api/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              user ? (
                <Redirect to="/dashboard" />
              ) : (
                <LoginForm setUser={setUser} />
              )
            }
          />
          <Route
            path="/register"
            render={() =>
              user ? (
                <Redirect to="/dashboard" />
              ) : (
                <RegisterForm setUser={setUser} />
              )
            }
          />
          <Route
            path="/dashboard"
            render={() => {
              if (!user) return <Redirect to="/" />;
              return user.role === "faculty" ? (
                <FacultyDashboard user={user} />
              ) : (
                <StudentDashboard user={user} />
              );
            }}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
