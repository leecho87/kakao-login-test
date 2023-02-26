import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';

const TOKEN_PATH = "https://kauth.kakao.com/oauth/token"
const REST_API_KEY = "311fb3ea771b93ae290e7a324e26d92e";
const REDIRECT_URI = "http://localhost:3000/success"

const API_LOGOUT_PATH =`https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=http://localhost:3000`;

function Success() {
  const [token, setToken] = useState(null);
  const location = useLocation();

  const handleLogout = () => {
    window.location.href = API_LOGOUT_PATH;
  }

  const getUserInfo = () => {
    axios.post("https://kapi.kakao.com/v2/user/me", null, {
      headers: {
        Authorization: `Bearer ${token.access_token}`
      }
    })
    .then((response) => {
      console.log('response ', response);
    })
  }

  const getKakaoToken = () => {
    const CODE = location.search.split("=")[1];

    const data = {
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: CODE
    }

    axios.post(TOKEN_PATH, data, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then((response) => {
      setToken(response.data);
    }).catch((error) => {
      console.log('error', error)
    })
  }

  useEffect(() => {
    if (location) {      
      getKakaoToken();
    }
  }, [location])

  useEffect(() => {
    if (token !== null) {
      getUserInfo();
    }
  }, [token])

  return (
    <div>
      <h1>Success</h1>
      <hr />
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  )
}

export default Success