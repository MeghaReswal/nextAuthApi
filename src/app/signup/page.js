"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import "./style.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/auth/signup", {
        email,
        password,
        fullname,
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
    <section>
      <div className="container">
        <div className="login">
          <h1>Sign Up</h1>

          <form onSubmit={handleSubmit} action="">
            <div className="input-box">
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="fullname"
              />
              <i class="fas fa-lock"></i>
            </div>
            <div className="input-box">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
              />
              <i className="fa fa-envelope"></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i class="fas fa-lock"></i>
            </div>
            <button type="submit">REGISTER</button>
            <div className="links">
              <Link href="/login">Go to Home</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
