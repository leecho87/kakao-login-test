import React, { useState, useEffect } from 'react'

function Home() {
  const [passUrl, setPassUrl] = useState(null);
  const userAgent = window.navigator.userAgent;

  const REDIRECT_URI = `http://${window.location.host}/success`;
  const REST_API_KEY = "311fb3ea771b93ae290e7a324e26d92e";
  const PATH = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleClick = () => {
    window.location.href = PATH;
  };

  
  useEffect(() => {    
    if (userAgent.includes("KAKAOTALK")) {
      window.location.href = `${PATH}&prompt=none`;
    }
  }, [userAgent])

  return (
    <div>
      <button onClick={handleClick}>로그인</button>
      <p>카카오인앱: {String(userAgent.includes("KAKAOTALK"))}</p>
      <p>{userAgent}</p>
    </div>
  )
}

export default Home