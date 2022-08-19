import {useCurrencies} from '../../hooks/useCurrencies';
import {useFeed} from '../../hooks/useFeed';
import {Layout} from '../Layout/Layout';
import {ReactComponent as Up} from './img/up.svg';
import {ReactComponent as Down} from './img/down.svg';
import style from './Main.module.css';
import {useState} from 'react';

export const Main = () => {
  const {header, table, active} = useCurrencies();
  const [highlighted, setHighlighted] = useState({from: '', to: ''});
  const [selected, setSelected] = useState({from: '', to: ''});

  const selectOn = ({target}) =>
    target.dataset.from !== target.dataset.to &&
      setSelected({from: target.dataset.from || '', to: target.dataset.to || ''});

  const highlightOn = ({target}) =>
    target.dataset.from !== target.dataset.to &&
      setHighlighted({from: target.dataset.from || '', to: target.dataset.to || ''});

  const highlightOff = () => setHighlighted({from: '', to: ''});

  useFeed();

  return (
    <main>
      <Layout>
        <div className={style.content}>
          <h1 className={style.title}>Обмен валюты</h1>
          <div className={style.info}>
            <div className={`${style.card} ${style['card_type_table']}`}>
              <h2 className={style['card__title']}>Изменение курса в режиме реального времени</h2>
              {
                (header && table) &&
                  <table
                    onMouseOver={highlightOn}
                    onMouseOut={highlightOff}
                    onClick={selectOn}
                  >
                    <thead>
                      <tr className={style.row}>
                        <th className={style.cell}>\</th>
                        {header.map(item => (<th
                          className={`${
                            style.cell
                          }${
                            highlighted.from === item ? ` ${style.highlight}` : ''
                          }${
                            selected.from === item ? ` ${style.selected}` : ''
                          }`}
                          id={`${item}/`}
                          data-from={item}
                          key={`${item}/to`}
                        >{item}</th>))}
                      </tr>
                    </thead>
                    <tbody>
                      {table.map((item, from) =>
                        (<tr className={style.row} key={`from/${header[from]}`}>
                          <th
                            data-to={header[from]}
                            className={`${
                              style.cell
                            }${
                              highlighted.to === header[from] ? ` ${style.highlight}` : ''
                            }${
                              selected.to === header[from] ? ` ${style.selected}` : ''
                            }`}
                          >
                            {header[from]}
                          </th>
                          {item.map((item, to) => (
                            <td
                              className={
                                `${
                                  style.cell
                                }${
                                  active.from === from && active.to === to ? ` ${style.active}` : ''
                                }${
                                  selected.from === header[to] && selected.to === header[from] ?
                                    ` ${style.selected}` : ''
                                }${
                                  highlighted.from === header[to] || highlighted.to === header[from] ?
                                    ` ${style.highlight}` : ''
                                }`
                              }
                              data-from={header[to]}
                              data-to={header[from]}
                              key={`${header[from]}/${header[to]}`}
                            >
                              {item.rate ? item.rate === 1 ? '' : `${item.rate} ` : '---'}
                              {item.change ? item.change > 0 ? <Up /> : <Down /> : ''}
                              {/* {item.change ? item.change > 0 ? `(+${item.gap})` : `(${item.gap})` : ''} */}
                            </td>
                          ))}
                        </tr>
                        ))}
                    </tbody>
                  </table>
              }
            </div>
            <div className={`${style.card} ${style['card_type_form']}`}>
              <h2 className={style['card__title']}>Обмен валюты</h2>
              {header &&
                <form className={style.exchange}>
                  <label className={style.label} htmlFor="from">Откуда</label>
                  <select
                    className={style.input}
                    name="from"
                    id="from"
                    value={selected.from}
                    onChange={({target}) => setSelected({...selected, from: target.value})}
                  >
                    <option defaultValue=''>---</option>
                    {header
                      .filter(item => item !== selected.to)
                      .map(item => (<option key={`option-from-${item}`} value={item}>{item}</option>))}
                  </select>
                  <label className={style.label} htmlFor="to">Куда</label>
                  <select
                    className={style.input}
                    name="to"
                    id="to"
                    value={selected.to}
                    onChange={({target}) => setSelected({...selected, to: target.value})}
                  >
                    <option defaultValue=''>---</option>
                    {header
                      .filter(item => item !== selected.from)
                      .map(item => (<option key={`option-to-${item}`} value={item}>{item}</option>))}
                  </select>
                  <label className={style.label} htmlFor="amount">Сумма</label>
                  <input className={style.input} type="number" id="amount" name='amount' />
                  <button className={style.button} type='submit'>Обменять</button>
                </form>
              }
            </div>
          </div>
        </div>
      </Layout>
    </main>
  );
};
