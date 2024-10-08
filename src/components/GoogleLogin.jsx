import { ReactComponent as GoogleLogo } from "../img/Google.svg";

const GoogleLogin = () => {
  const link = `https://ttoon.site/oauth2/authorization/google`;

  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <button
      type="button"
      onClick={loginHandler}
      style={{ border: "none", padding: "0", marginBottom: "3%" }}
    >
      <GoogleLogo />
    </button>
  );
};

export default GoogleLogin;
