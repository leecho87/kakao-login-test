import React from 'react'

const REST_API_KEY = "311fb3ea771b93ae290e7a324e26d92e";
const REDIRECT_URI = "http://localhost:3000/success"

const API_LOGIN_PATH =`https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

function Home() {
  const handleClick = () => {
    window.location.href = API_LOGIN_PATH;
  };

  return (
    <div>
      <button onClick={handleClick}>로그인</button>
    </div>
  )
}

export default Home