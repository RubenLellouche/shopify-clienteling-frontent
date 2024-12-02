import logo from "./logo.svg";
import { useLocation, useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const shopParam = query.get("shop");
  const [shopName] = shopParam?.split(".myshopify.com") || [];
  const accessToken = localStorage.getItem("accessToken");
  const isAccessTokenInUrl = query.get("access_token");
  const shop = query.get("shop");

  if (isAccessTokenInUrl && !accessToken) {
    localStorage.setItem("accessToken", isAccessTokenInUrl);
    console.log(`Access token: ${isAccessTokenInUrl}`);
  }
  localStorage.setItem("shop__name", shopName);
  if (accessToken) {
    window.location.href = `https://admin.shopify.com/store/${shopName}/apps/${process.env.REACT_APP_SHOPIFY_CLIENT_ID}?loggedIn=true`;
  }
  const isLoggedIntoShopify =
    localStorage.getItem("isLoggedIntoShopify") === "true" ||
    query.get("loggedIn") === "true";
  localStorage.setItem("isLoggedIntoShopify", `${isLoggedIntoShopify}`);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>Hello {shopParam}!</code>
        </p>
        {accessToken ? (
          <div>
            <code>
              <p>Succesfully authenticated</p>
              <small>Access token: {accessToken}</small>
              <br />
              <button
                style={{
                  marginTop: "10px",
                  padding: "5px",
                  color: "white",
                  backgroundColor: "black",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              ></button>
            </code>
          </div>
        ) : (
          <div>
            {isLoggedIntoShopify ? (
              <code>
                <p>Succesfully authenticated</p>
              </code>
            ) : (
              <button
                style={{
                  marginTop: "10px",
                  padding: "5px",
                  color: "white",
                  backgroundColor: "black",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
                onClick={() => {
                  navigate(`/login?shop=${shop}`);
                }}
              >
                Authenticate with Shopify
              </button>
            )}
          </div>
        )}
      </header>
    </div>
  );
}
