import PropTypes from 'prop-types';
import {useCurrencieAccounts} from '../../../hooks/useCurrencieAccounts';
import {Loader} from '../../UI/Loader/Loader';
import style from './List.module.css';
import {ReactComponent as From} from '../img/from.svg';
import {ReactComponent as To} from '../img/to.svg';
import {useEffect} from 'react';

export const List = ({selected, setSelected}) => {
  const {accounts, loading, isLoad, buy} = useCurrencieAccounts();

  const click = ({currentTarget}) => {
    if (currentTarget.dataset.account) {
      setSelected({
        ...selected,
        from: currentTarget.dataset.account,
        to: currentTarget.dataset.account === selected.to ? '' : selected.to
      });
    }
  };

  useEffect(() => {
    if (loading) return;

    setSelected({from: '', to: '', amount: ''});
  }, [loading]);

  return (
    <div className={style.wrap}>
      <h2 className={style.title}>Мои валюты</h2>
      {isLoad ?
        <ul className={style.list}>
          {Object.keys(accounts).map(item => (
            <li
              key={`account-${item}`}
              data-account={item}
              onClick={click}
              className={`
              ${style.item
              }${selected.to === item || selected.from === item || buy.to === item || buy.from === item ?
                ` ${style.selected}` : ''}`}
            >
              <span className={style.currencie}>
                {item}
                {selected.from === item && <From className={style.svg} />}
                {selected.to === item && <To className={style.svg} />}
              </span>
              {loading && (selected.to === item || selected.from === item || buy.to === item || buy.from === item) ?
                <Loader fill='#4B00CA' stroke='#4B00CA' /> :
                <span className={`
                ${style.amount}`}>
                  {(+accounts[item].amount).toFixed(2)}
                </span>
              }
            </li>
          ))}
        </ul> :
        <div className={style.loader}>
          <Loader fill='#9C19CA' stroke='#9C19CA' />
        </div>
      }
    </div>
  );
};

List.propTypes = {
  selected: PropTypes.object,
  setSelected: PropTypes.func,
};
