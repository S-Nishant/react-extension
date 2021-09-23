import React from 'react'

import { OldSocialLogin as SocialLogin } from "react-social-login";
// import SocialButton from "./SocialButton";
function SocialLoginComp() {
    const handleSocialLogin = (user, err) => {
        console.log(user);
        console.log(err);
        localStorage.setItem('ext_encrypt_email',user._profile.email);
        localStorage.setItem('ext_encrypt_firstName',user._profile.firstName);
        localStorage.setItem('ext_encrypt_session',true);
      };
      const handleSocialLoginFailure = (err) =>{
        console.log('___ERR___FAIL',err)
      }
    return (
        <div>
         <SocialLogin
      provider="google"
      appId="818410186410-f4kr514s870aia65j2c1qbigkb4n7k9g.apps.googleusercontent.com"
      callback={handleSocialLogin}
    >
      <button className="google__signin__button"><img width="20px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
       | Login with Google
      </button>
      <button type="button">Logout ????</button>
    </SocialLogin>
     {/* <SocialButton
      provider="facebook"
      appId="YOUR_APP_ID"
      onLoginSuccess={handleSocialLogin}
      onLoginFailure={handleSocialLoginFailure}
    >
      Login with Facebook
    </SocialButton> */}
  </div>
    )
}

export default SocialLoginComp
