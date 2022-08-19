import {ReactComponent as Logo} from './img/logo.svg';
import style from './Header.module.css';
import {Nav} from './Nav/Nav';
import {Logout} from './Logout/Logout';
import {Layout} from '../Layout/Layout';

export const Header = () => {
  console.log(style);
  return (
    <header className={style.header}>
      <Layout>
        <div className={style.content}>
          <a href='/'><Logo /></a>
          <div className={style.controls}>
            <Nav />
            <Logout />
          </div>
        </div>
      </Layout>
    </header>
  );
};
