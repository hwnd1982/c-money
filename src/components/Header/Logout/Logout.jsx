import style from './Logout.module.css';
import {ReactComponent as Exit} from './img/exit.svg';

export const Logout = () => {
  console.log(style);
  return (
    <button className={style.exit}>Выйти<Exit /></button>
  );
};
