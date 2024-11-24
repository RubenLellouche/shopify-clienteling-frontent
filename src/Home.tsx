import React from "react";
import logo from "./logo.svg";
import { useLocation } from "react-router-dom";

export function Home() {
  const location = useLocation();
  const access_token = new URLSearchParams(location.search).get("access_token");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>{access_token}</code>
        </p>
      </header>
    </div>
  );
}
