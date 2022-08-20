import PropTypes from 'prop-types';
import style from './Select.module.css';

export const Select = ({name, filter, header, label, selected, setSelected}) => {
  const onChange = ({target}) => setSelected({...selected, [name]: target.value});
  return (
    <>
      <label className={style.label} htmlFor={name}>{label}</label>
      <select
        className={style.input}
        name={name}
        id={name}
        value={selected[name]}
        onChange={onChange}
      >
        <option defaultValue=''>---</option>
        {header
          .filter(item => item !== selected[filter])
          .map(item => (<option key={`option-${name}-${item}`} value={item}>{item}</option>))}
      </select>
    </>
  );
};

Select.propTypes = {
  header: PropTypes.array,
  name: PropTypes.string,
  filter: PropTypes.string,
  label: PropTypes.string,
  active: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  selected: PropTypes.object,
  setSelected: PropTypes.func,
};
