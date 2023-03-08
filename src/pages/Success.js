import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';

const REST_API_KEY = "311fb3ea771b93ae290e7a324e26d92e";

function Success() {
  const [errorLog, setErrorLog] = useState("");
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);
  const location = useLocation();
  const REDIRECT_URI = `http://${window.location.host}`;

  const handleLogout = () => {  
    const API_LOGOUT_PATH =`https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${REDIRECT_URI}`;
    window.location.href = API_LOGOUT_PATH;
    // window.close();
  }

  const getUserInfo = () => {
    axios.post("https://kapi.kakao.com/v2/user/me", null, {
      headers: {
        Authorization: `Bearer ${token.access_token}`
      }
    })
    .then((response) => {
      setData(response.data);
    })
  }

  const getKakaoToken = () => {
    const CODE = location.search.split("=")[1];

    const data = {
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: `${REDIRECT_URI}/success`,
      code: CODE
    }
    axios.post("https://kauth.kakao.com/oauth/token", data, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then((response) => {
      setToken(response.data);
    }).catch((error) => {
      console.log('error', error);
      // window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}/success&response_type=code`
    })
  }

  useEffect(() => {
    if (location) {
      if (location.search.includes("error")) {
        const PATH = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}/success&response_type=code`;
        window.location.href = PATH;
      } else {
        getKakaoToken();
      }
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
      <hr />
      <div>
      <pre style={{ wordBreak: 'break-word', whiteSpace: 'break-spaces'}}>
          {JSON.stringify(errorLog)}
        </pre>
      </div>
      <div>
        <pre style={{ wordBreak: 'break-word', whiteSpace: 'break-spaces'}}>
          {JSON.stringify(data)}
        </pre>
        <p>{REDIRECT_URI}</p>
      </div>
    </div>
  )
}

export default Success