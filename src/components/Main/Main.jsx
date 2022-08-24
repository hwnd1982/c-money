import {useCurrencies} from '../../hooks/useCurrencies';
import {useFeed} from '../../hooks/useFeed';
import {Layout} from '../Layout/Layout';
import style from './Main.module.css';
import {useState} from 'react';
import {Table} from './Table/Table';
import {Select} from './Select/Select';
import {Loader} from '../UI/Loader/Loader';
import {List} from './List/List';
import {useDispatch} from 'react-redux';
import {currencieAccountsSlice} from '../../store/currencieAccounts/currencieAccountsSlice';
import {useEffect} from 'react';
import {ReactComponent as Swap} from './img/swap.svg';

export const Main = () => {
  const dispatch = useDispatch();
  const {header, table, active, isLoad} = useCurrencies();
  const [selected, setSelected] = useState({from: '', to: '', amount: ''});

  const input = ({target}) => setSelected({...selected, amount: target.value});
  const swap = () => setSelected({...selected, to: selected.from, from: selected.to});
  const send = event => {
    event.preventDefault();

    if (selected.from && selected.to && selected.amount > 0) {
      dispatch(currencieAccountsSlice.actions.buy(selected));
    }
  };

  useFeed();
  useEffect(() => {}, []);

  return (
    <main>
      <Layout>
        <div className={style.content}>
          <h1 className={style.title}>Обмен валюты</h1>
          <div className={style.info}>
            <div className={`${style.card} ${style['card_type_table']}`}>
              <h2 className={style['card__title']}>Изменение курса в режиме реального времени</h2>
              {isLoad ?
                <Table header={header} table={table} active={active} selected={selected} setSelected={setSelected} /> :
                <div className={style['card_type_table']}><Loader fill='#9C19CA' stroke='#9C19CA' /></div>
              }
            </div>
            <div className={`${style.card} ${style['card_type_form']}`}>
              <h2 className={style['card__title']}>Обмен валюты</h2>
              {isLoad ?
                <form className={style.exchange} onSubmit={send}>
                  <Select
                    name={'from'}
                    filter={'to'}
                    header={header}
                    label={'Откуда'}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <button className={style.swap} onClick={swap} type='button'>
                    <Swap className={style.svg} />
                  </button>
                  <Select
                    name={'to'}
                    filter={'from'}
                    header={header}
                    label={'Куда'}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <label className={style.label} htmlFor="amount">Сумма</label>
                  <input
                    className={style.input}
                    type="number"
                    id="amount"
                    name='amount'
                    value={selected.amount}
                    onInput={input}
                  />
                  <button className={style.button} type='submit'>Обменять</button>
                </form> : <div className={style['card_type_form']}><Loader fill='#9C19CA' stroke='#9C19CA' /></div>
              }
            </div>
            <List selected={selected} setSelected={setSelected} />
          </div>
        </div>
      </Layout>
    </main>
  );
};
