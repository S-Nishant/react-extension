import React from 'react'
import { GoogleLogin } from 'react-google-login';

function SocialLoginComp(props) {
    const clientID = "818410186410-f4kr514s870aia65j2c1qbigkb4n7k9g.apps.googleusercontent.com";
    
    const handleSocialLogin = (user, err) => {
        console.log(user);
        console.log(err);
        localStorage.setItem('ext_encrypt_email',user.profileObj.email);
        localStorage.setItem('ext_encrypt_firstName',user.profileObj.givenName);
        localStorage.setItem('ext_encrypt_imageUrl',user.profileObj.imageUrl);
        localStorage.setItem('ext_encrypt_session',true);
        props.setUserLoggedIn(true);
      };
      const handleSocialLoginFailure = (err) =>{
        console.log('___ERR___FAIL',err)
      }
    return (
        <>
                         <GoogleLogin
    clientId={clientID}
    buttonText="AIT Login"
    onSuccess={handleSocialLogin}
    onFailure={handleSocialLoginFailure}
    cookiePolicy={'single_host_origin'}
    className="google__signin__button"
  />
  

        </>
    )
}

export default SocialLoginComp
