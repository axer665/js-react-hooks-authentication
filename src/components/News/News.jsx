import './News.scss';
import { useContext, useEffect } from 'react';
import AuthContext from '../AuthContext/AuthContext';
import NewsItem from './NewsItem/NewsItem';

export default function News() {
  const { news, error, token, newsHandler, handleNewsList, profile } = useContext(AuthContext);
 
  useEffect(() => {
    const createRequest = async () => {
      const newsList = token && await handleNewsList(token);
      await newsHandler(newsList);
    }
    createRequest().then();
  }, [profile, handleNewsList, newsHandler, token]);

  if (!news || error) return null;

  return (
    <main className="app__body body container">
      {profile && news.map((el) => <NewsItem key={el.id} item={el} />)}
    </main>
  )
}