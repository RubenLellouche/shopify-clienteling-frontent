import logo from "./logo.svg";
import "./App.css";
import { useLocation } from "react-router-dom";
import * as axios from "axios";

export async function Login() {
  const location = useLocation();
  const code = new URLSearchParams(location.search).get("code");

  const state = Math.random().toString(36).substring(7);
  const BASE_URI = "https://shopify-clienteling-frontent.vercel.app/login";

  const url = `https://balink-demo-shop.myshopify.com/admin/oauth/authorize?client_id=${process.env.REACT_APP_SHOPIFY_CLIENT_ID}&scope=write_products&redirect_uri=${BASE_URI}&state=${state}&grant_options[]=per-user`;

  if (!code) {
    window.location.href = url;
  } else {
    const body = {
      client_id: process.env.REACT_APP_SHOPIFY_CLIENT_ID,
      client_secret: process.env.REACT_APP_SHOPIFY_CLIENT_SECRET,
      code,
    };
    const { data } = await axios.post(
      "https://balink-demo-shop.myshopify.com/admin/oauth/access_token",
      body
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>${code}</code>
          <code>${data.access_token}</code>
        </p>
      </header>
    </div>
  );
}
