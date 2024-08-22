"use client";

import { useState } from "react";
import { handleSignup } from "../api/auth/signup/route";
import Link from "next/link";
import "./style.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");

  const handleSubmit = async (event) => {
    const result = await handleSignup({
      email,
      password,
      fullname,
    });

    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  return (
    <section>
      <div className="container">
        <div className="login">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Full Name"
                required
              />
              <i className="fas fa-user"></i>
            </div>
            <div className="input-box">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
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
              <i className="fas fa-lock"></i>
            </div>
            <button type="submit">REGISTER</button>
            <div className="links">
              <Link href="/login">login here</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
