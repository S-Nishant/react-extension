import React from 'react'

import { OldSocialLogin as SocialLogin } from "react-social-login";

function SocialLoginComp() {
    const handleSocialLogin = (user, err) => {
        console.log(user);
        console.log(err);
      };
    return (
        <div>
         <SocialLogin
      provider="google"
      appId="YOUR_APP_ID"
      callback={handleSocialLogin}
    >
      <button>Login with Google</button>
    </SocialLogin>
  </div>
    )
}

export default SocialLoginComp
