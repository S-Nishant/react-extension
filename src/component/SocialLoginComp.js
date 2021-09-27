import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import './SocialLoginComp.css';

function SocialLoginComp(props) {
  const clientID =
    "818410186410-f4kr514s870aia65j2c1qbigkb4n7k9g.apps.googleusercontent.com";

  const handleSocialLogin = (user, err) => {
    console.log(user);
    console.log(err);
    localStorage.setItem(
      "ext_encrypt_email",
      btoa(unescape(encodeURIComponent(user.profileObj.email)))
    );
    localStorage.setItem(
      "ext_encrypt_firstName",
      btoa(unescape(encodeURIComponent(user.profileObj.givenName.trim())))
    );
    localStorage.setItem(
      "ext_encrypt_imageUrl",
      btoa(unescape(encodeURIComponent(user.profileObj.imageUrl)))
    );
    localStorage.setItem("ext_encrypt_session", true);
    props.setUserLoggedIn(true);
  };
  const handleSocialLoginFailure = (err) => {
    console.log("___ERR___FAIL", err);
  };
  const [email, setemail] = useState("");
  const handleChange = (e) =>{
    console.log('Hi')
    setemail(e.target.value);
  }
  const onClick = (e) => {
    alert();
    props.setUserLoggedIn(true);
  }
  return (
    <>
      <GoogleLogin
        clientId={clientID}
        buttonText="AIT Login"
        onSuccess={handleSocialLogin}
        onFailure={handleSocialLoginFailure}
        cookiePolicy={"single_host_origin"}
        className="google__signin__button"
      />
      <div className="bypass__login__frame">
        <input type="email" className="login__email__field fomr-control" onChange={handleChange}/>
        <button type="button" className="login__bypass__button btn btn-warning mt-4" onClick={onClick}>Login</button>  
      </div>
    </>
  );
}

export default SocialLoginComp;
