import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {currenciesSlice} from '../store/currencies/currenciesSlice';

export const useCurrencies = () => {
  const dispatch = useDispatch();
  const header = useSelector(store => store.currencies.header);
  const table = useSelector(store => store.currencies.table);
  const active = useSelector(store => store.currencies.active);

  useEffect(() => {
    dispatch(currenciesSlice.actions.request());
  }, []);

  return {header, table, active};
};
