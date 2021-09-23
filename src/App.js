import logo from './logo.svg';
import './App.css';
import MainDashboard from './component/MainDashboard';
// import { db } from './firebase';
import { useEffect, useState } from 'react';
// import { collection,query, where, collectionGroup,getDocs } from 'firebase/firestore/lite';
import SocialLoginComp from './component/SocialLoginComp';
// import TestSocial from './component/TestSocial';
function App() {
  const [userLoggedIn,setUserLoggedIn] =useState(false)
  useEffect(() => {
    if((localStorage.getItem('ext_encrypt_session'))){
      setUserLoggedIn(true)
    }
    else{
      setUserLoggedIn(false)
    }
  }, []);
  return (
    <div className="App">
      {userLoggedIn ?
          <MainDashboard></MainDashboard>
          :
          <SocialLoginComp setUserLoggedIn={setUserLoggedIn}></SocialLoginComp>
      }
    </div>
  );
}

export default App;
