import React, { useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleGuestLogin = async () => {
    try {
      setUsername("user1");
      setPassword("user1");
    } catch (err) {
      setError("Guest login failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await newRequest.post("/auth/login", { username, password });
      console.log(res);
      localStorage.setItem("currentUser", JSON.stringify(res.data));

      navigate("/");
    } catch (err) {
      setError("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? <ClipLoader color="white" /> : "Login"}
        </button>
        <button type="button" onClick={handleGuestLogin}>
          Guest Login
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default Login;
