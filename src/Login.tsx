import logo from "./logo.svg";
import "./App.css";
import { useLocation } from "react-router-dom";

export function Login() {
  const location = useLocation();
  const code = new URLSearchParams(location.search).get("code");

  const state = Math.random().toString(36).substring(7);
  const BASE_URI = "http://localhost:3000/login";

  const url = `https://balink-demo-shop.myshopify.com/admin/oauth/authorize?client_id=${process.env.REACT_APP_SHOPIFY_CLIENT_ID}&scope=write_products&redirect_uri=${BASE_URI}&state=${state}&grant_options[]=per-user`;

  console.log(url);

  if (!code) {
    window.location.href = url;
  } else {
    console.log(code);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>${code}</code>
        </p>
      </header>
    </div>
  );
}
