'use client'; // Client component for hooks

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCrypto } from '@/redux/cryptoSlice';
import { useParams } from 'next/navigation';

export default function CryptoDetail() {
  const dispatch = useDispatch();
  const { crypto } = useSelector((state) => state);
  const { id } = useParams(); // Replaces useRouter for App Router

  

  const coin = crypto.data.find((c) => c.id === id);

  if (!coin) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 tracking-tight">{coin.name} Details</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        <p className="text-lg mb-2">
          <span className="font-semibold">Price:</span> ${Number(coin.priceUsd).toFixed(2)}
        </p>
        <p className="text-lg mb-2">
          <span className="font-semibold">24h Change:</span>{' '}
          <span className={coin.changePercent24Hr > 0 ? 'text-green-400' : 'text-red-400'}>
            {Number(coin.changePercent24Hr).toFixed(2)}%
          </span>
        </p>
        <p className="text-lg mb-2">
          <span className="font-semibold">Market Cap:</span> ${Number(coin.marketCapUsd).toFixed(2)}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Volume (24h):</span> $
          {Number(coin.volumeUsd24Hr).toFixed(2)}
        </p>
      </div>
    </div>
  );
}