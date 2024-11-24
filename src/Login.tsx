import logo from "./logo.svg";
import "./App.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export function Login() {
  const location = useLocation();
  const code = new URLSearchParams(location.search).get("code");
  const state = Math.random().toString(36).substring(7);
  const BASE_URI = "https://shopify-clienteling-frontent.vercel.app/login";

  const [accessToken, setAccessToken] = useState("");
  const [userInformation, setUserInformation] = useState({} as any);

  const url = `https://balink-demo-shop.myshopify.com/admin/oauth/authorize?client_id=${process.env.REACT_APP_SHOPIFY_CLIENT_ID}&scope=write_products&redirect_uri=${BASE_URI}&state=${state}&grant_options[]=per-user`;
  let data;
  if (!code) {
    window.location.href = url;
  } else {
    axios
      .post(
        "https://shopify-clienteling-backend-1f4b633c8cf5.herokuapp.com/shopify/oauth/access_token",
        {
          client_id: process.env.REACT_APP_SHOPIFY_CLIENT_ID,
          client_secret: process.env.REACT_APP_SHOPIFY_CLIENT_SECRET,
          code,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        setAccessToken(res.data.access_token);
        setUserInformation(res.data.associated_user);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>code: {code}</code>
          <code>token: {accessToken}</code>

          <code>
            user: {userInformation.first_name} {userInformation.last_name}
          </code>
          <code>email: {userInformation.email}</code>
        </p>
      </header>
    </div>
  );
}
