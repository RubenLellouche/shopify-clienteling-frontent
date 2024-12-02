import logo from "./logo.svg";
import "./App.css";
import { useLocation } from "react-router-dom";

export function Login() {
  localStorage.removeItem("accessToken");
  const state = Math.random().toString(36).substring(7);
  const shop = new URLSearchParams(useLocation().search).get("shop");
  const REDIRECT_BASE_URI =
    "https://shopify-clienteling-backend-1f4b633c8cf5.herokuapp.com/shopify/oauth/access_token";

  const url = `https://${shop}/admin/oauth/authorize?client_id=${process.env.REACT_APP_SHOPIFY_CLIENT_ID}&scope=write_products&redirect_uri=${REDIRECT_BASE_URI}&state=${state}&grant_options[]=per-user`;

  if (window.top) window.top.location.href = url;
  window.location.href = url;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}
