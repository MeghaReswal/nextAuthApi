"use client";

import { useState } from "react";
import Link from "next/link";
import { handleLogin } from "../api/auth/login/route";
import "./style.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    const result = await handleLogin({
      email,
      password,
    });

    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  return (
    <>
      <section>
        <div className="container navigation">
          <div className="login">
            <Link href="/">
              <button
                type="button"
                className="btn btn-secondary"
                style={{ color: "white" }}
              >
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button
                type="button"
                className="btn btn-secondary"
                style={{ color: "white" }}
              >
                SignUp
              </button>
            </Link>
          </div>
        </div>
        <div className="container">
          <div className="login">
            <h1>Login Form</h1>
            <form onSubmit={handleSubmit} action="">
              <div className="input-box">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i className="fa fa-envelope"></i>
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i className="fas fa-lock"></i>
              </div>
              <div className="rembar">
                <input id="rembar" type="checkbox" />
                <label htmlFor="rembar">remember me</label>
              </div>
              <button type="submit">LOGIN</button>
              <div className="links">
                <Link href="/signup">Register here</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
