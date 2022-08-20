import {useCurrencies} from '../../hooks/useCurrencies';
import {useFeed} from '../../hooks/useFeed';
import {Layout} from '../Layout/Layout';
import style from './Main.module.css';
import {useState} from 'react';
import {Table} from './Table/Table';
import {Select} from './Select/Select';
import {Loader} from '../UI/Loader/Loader';

export const Main = () => {
  const {header, table, active, isLoad} = useCurrencies();
  const [selected, setSelected] = useState({from: '', to: ''});

  useFeed();

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
                <Loader fill='#9C19CA' stroke='#9C19CA' />
              }
            </div>
            <div className={`${style.card} ${style['card_type_form']}`}>
              <h2 className={style['card__title']}>Обмен валюты</h2>
              {isLoad ?
                <form className={style.exchange}>
                  <Select
                    name={'from'}
                    filter={'to'}
                    header={header}
                    label={'Откуда'}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Select
                    name={'to'}
                    filter={'from'}
                    header={header}
                    label={'Куда'}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <label className={style.label} htmlFor="amount">Сумма</label>
                  <input className={style.input} type="number" id="amount" name='amount' />
                  <button className={style.button} type='submit'>Обменять</button>
                </form> : <Loader fill='#9C19CA' stroke='#9C19CA' />
              }
            </div>
          </div>
        </div>
      </Layout>
    </main>
  );
};
