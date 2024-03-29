import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import './SocialLoginComp.css';

function SocialLoginComp(props) {
  const {setUserLoggedIn} = props;
  const [symbol, setSymbol] = useState("<");
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
    setUserLoggedIn(true);
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
    localStorage.setItem(
      "ext_encrypt_email",
      btoa(unescape(encodeURIComponent(email)))
    );
    localStorage.setItem(
      "ext_encrypt_firstName",
      btoa(unescape(encodeURIComponent(email.substr(0,email.indexOf('@')))))
    );
    localStorage.setItem(
      "ext_encrypt_imageUrl",
      btoa(unescape(encodeURIComponent("")))
    );
    localStorage.setItem("ext_encrypt_session", true);
   
    setUserLoggedIn(true);
  }
  const [widthByPassFrame, setwidthByPassFrame] = useState("0px"); 
  const showByPass = (e) =>{
    if(widthByPassFrame === "0px"){
      setwidthByPassFrame("240px");
      setSymbol(">");
    }
    else{
      setwidthByPassFrame("0px");
      setSymbol("<");
    }
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
      <div className="bypass__login__frame" style={{width:widthByPassFrame}}>
        <input type="email" className="login__email__field form-control" onChange={handleChange}/>
        <button type="button" className="login__bypass__button btn btn-warning mt-4" onClick={onClick}>Login</button>  
      </div>
      <button type="button" className="btn btn-secondary" onClick={showByPass} style={{position: "absolute",bottom: "18px",right: "4px", opacity: 0.5}}>{symbol}</button>
    </>
  );
}

export default SocialLoginComp;
