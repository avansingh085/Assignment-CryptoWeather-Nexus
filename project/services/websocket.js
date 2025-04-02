"use client"; 
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateCrypto } from '@/redux/cryptoSlice';
export function useWebSocket() {
  const dispatch = useDispatch();
  useEffect(() => {
    const ws = new WebSocket('wss://ws.coincap.io/prices?assets=ALL');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      Object.keys(data).forEach((coin) => {
        dispatch(
          updateCrypto({
            id: coin,
            priceUsd: data[coin],
            type: 'price_alert',
          })
        );
      });
    };
    return () => ws.close();
  }, [dispatch]);
}