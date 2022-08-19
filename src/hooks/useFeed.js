import {useCallback, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {API_WS} from '../api/const';
import {currenciesSlice} from '../store/currencies/currenciesSlice';

export const useFeed = () => {
  const ws = useRef(null);
  const dispatch = useDispatch();
  const isLoad = useSelector(store => store.currencies.isLoad);
  const gettingData = useCallback(() => {
    if (!ws.current) return;

    ws.current.onmessage = ({data}) =>
      dispatch(currenciesSlice.actions.update(JSON.parse(data)));
  });

  useEffect(() => {
    if (!isLoad) return;

    ws.current = new WebSocket(API_WS);
    gettingData();

    return () => ws.current.close();
  }, [ws, isLoad]);
};
