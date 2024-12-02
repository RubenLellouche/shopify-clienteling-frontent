import React from "react";
import logo from "./logo.svg";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export function Home() {
  const query = new URLSearchParams(useLocation().search);
  const shopParam = query.get("shop");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>Hello ${shopParam}!</code>
        </p>
      </header>
    </div>
  );
}
