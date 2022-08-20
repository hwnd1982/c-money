import PropTypes from 'prop-types';
import {useState} from 'react';
import {ReactComponent as Up} from './img/up.svg';
import {ReactComponent as Down} from './img/down.svg';
import style from './Table.module.css';

export const Table = ({header, table, active, selected, setSelected}) => {
  const [highlighted, setHighlighted] = useState({from: '', to: ''});

  const selectOn = ({target}) =>
    target.dataset.from !== target.dataset.to &&
      setSelected({from: target.dataset.from || '', to: target.dataset.to || ''});

  const highlightOn = ({target}) =>
    target.dataset.from !== target.dataset.to &&
      setHighlighted({from: target.dataset.from || '', to: target.dataset.to || ''});

  const highlightOff = () => setHighlighted({from: '', to: ''});

  return (
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
  );
};

Table.propTypes = {
  header: PropTypes.array,
  table: PropTypes.array,
  active: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  selected: PropTypes.object,
  setSelected: PropTypes.func,
};
