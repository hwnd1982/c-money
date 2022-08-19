import style from './Nav.module.css';

export const Nav = () => {
  console.log(style);
  return (
    <nav>
      <ul className={style.list}>
        <li className={style.item}>
          <a className={style.link} href="#">Счета</a>
        </li>
        <li className={style.item}>
          <a className={style.link} href="#">Обмен</a>
        </li>
      </ul>
    </nav>
  );
};
