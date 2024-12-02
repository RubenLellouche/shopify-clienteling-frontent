import logo from "./logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export function Home() {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const shopParam = query.get("shop");
  const accessToken = localStorage.getItem("accessToken");
  const isAccessTokenInUrl = query.get("access_token");
  const shop = query.get("shop");

  const [token, setToken] = useState("");

  if (isAccessTokenInUrl && !accessToken) {
    setToken(isAccessTokenInUrl);
    localStorage.setItem("accessToken", isAccessTokenInUrl);
    console.log(`Access token: ${isAccessTokenInUrl}`);
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>
            Hello {shopParam} !{token && ` Access token: ${token}`}
          </code>
        </p>
        <button
          onClick={() => {
            localStorage.removeItem("accessToken");
            navigate(`/login?shop=${shop}`);
          }}
        >
          Login
        </button>
      </header>
    </div>
  );
}
