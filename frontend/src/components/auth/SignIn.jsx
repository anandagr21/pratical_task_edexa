import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { signIn } from "../../actions/authActions";

const SignIn = ({ history }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const { user: isUserLoggedIn } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (isUserLoggedIn.token) {
      toast.success("Already logged in");
      history.push("/dashboard");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signIn(user));

    // empty the state
    setUser({
      email: "",
      password: "",
    });
  };
  return (
    <div className="row pt-5 text-center">
      <div className="col-md-6 offset-md-3">
        <h1 className="py-5">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter email address"
          />
          <input
            type="password"
            className="form-control"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter password"
            autoFocus
          />
          <button type="submit" className="btn btn-raised">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
