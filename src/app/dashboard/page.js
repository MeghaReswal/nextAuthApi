"use client";

import "./style.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <section>
        <div className="container">
          <div className="login">
            <h1>Welcome to the Dashboard</h1>
          </div>
        </div>
      </section>
    </>
  );
}
