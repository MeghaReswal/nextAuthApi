"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
// import { useRouter } from "next/router";
import "./style.css";

export default function Login() {
  // const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      console.log("ResponseFe", response);
      alert(response.data.message);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      alert(error.response ? error.response.data.message : "An error occurred");
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
                class="btn btn-secondary"
                style={{ color: "white" }}
                // onClick={() => router.push("/login")}
              >
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button
                type="button"
                class="btn btn-secondary"
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
                <i class="fas fa-lock"></i>
              </div>
              <div className="rembar">
                <input id="rembar" type="checkbox" />
                <label for="rembar">remember me</label>
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
