import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {currencieAccountsSlice} from '../store/currencieAccounts/currencieAccountsSlice';

export const useCurrencieAccounts = () => {
  const dispatch = useDispatch();
  const token = useSelector(store => store.token.token);
  const {accounts, loading, isLoad, buy} = useSelector(store => store['currencie-accounts']);

  useEffect(() => {
    dispatch(currencieAccountsSlice.actions.request());
  }, [token]);

  return {accounts, loading, isLoad, buy};
};
