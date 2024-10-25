/* eslint-disable react/prop-types */
import { useState } from 'react';
import useStorage from '../../hooks/useStorage';
import AuthContext from '../AuthContext/AuthContext';

export default function AuthProvider(props) {
  const [token, setToken] = useStorage(localStorage, 'token');
  const [profile, setProfile] = useStorage(localStorage, 'profile', true);
  const [error, setError] = useState(null);
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(false);

  const errorHandler = (value) => setError(value);

  const newsHandler = (value) => setNews(value)

  const handleLogout = () => {
    setToken(null);
    setProfile(null);
    setNews(null);
  }

  const handleNewsList = async (token) => {
    const newsResponse = await fetch(process.env.REACT_APP_NEWS_URL, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!newsResponse.ok) {
      throw new Error('Ошибка запроса списка новостей');
    }
    const newsList = await newsResponse.json();
    
    return newsList;
  }

  const handleLogin = async (login, password) => {
    setLoading(true);
    try {
      const authResponse = await fetch(process.env.REACT_APP_AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password })
      });
      if (!authResponse.ok) {
        let answer;
        if (authResponse.status === 400) {
          answer = await authResponse.json();
        }
        throw new Error(answer ? answer.message : 'Ошибка авторизации');
      }
      const { token } = await authResponse.json();
      setToken(token);

      const tokenResponse = await fetch(process.env.REACT_APP_USER_URL, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!tokenResponse.ok) {
        throw new Error('Ошибка запроса пользовательских данных')
      }
      const user = await tokenResponse.json();
      setProfile(user);
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }



  return (
    <AuthContext.Provider value={{
      handleNewsList,
      loading,
      news,
      newsHandler,
      handleLogin,
      handleLogout,
      token,
      profile,
      error,
      errorHandler
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}