import './Header.scss'
import FormAuth from './FormAuth/FormAuth';
import FormProfile from './FormProfile/FormProfile';
import { useContext } from 'react'
import AuthContext from '../AuthContext/AuthContext';
import Error from '../Error/Error';
import Loading from '../Loading/Loading';

export default function Header() {
  const { loading, handleLogin, profile, handleLogout, error, errorHandler } = useContext(AuthContext);

  return (
    <>
      {(loading && !error) && <Loading />}
      {error && <Error error={error} errorHandler={errorHandler} />}
      <header className="app__header header">
        <div className="header__logo">Neto Social</div>
        <div className="header__form form">
          {(!error && profile)
            ? <FormProfile handleLogout={handleLogout} profile={profile} />
            : <FormAuth handleLogin={handleLogin} error={error} />}
        </div>
      </header>
      {(!profile || error) && <div className='app__baner baner container'>
        <h1 className="baner__title">Neto Social</h1>
        <div className="baner__descript">Facebook and VK killer</div>
      </div>}
    </>
  )
}