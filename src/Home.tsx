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
              <button>
                <a
                  href={`https://admin.shopify.com/store/${shopName}/apps/${process.env.REACT_APP_SHOPIFY_CLIENT_ID}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Back to Shopify
                </a>
              </button>
            </code>
          </div>
        ) : (
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              navigate(`/login?shop=${shop}`);
            }}
          >
            Login
          </button>
        )}
      </header>
    </div>
  );
}
