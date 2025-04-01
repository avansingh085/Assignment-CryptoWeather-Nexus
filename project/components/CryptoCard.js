import Link from 'next/link';
import FavoriteButton from './FavoriteButton';

export default function CryptoCard({ coin }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-center">
        <Link href={`/crypto/${coin.id}`}>
          <h3 className="text-xl font-semibold cursor-pointer hover:text-blue-400">
            {coin.name}
          </h3>
        </Link>
        <FavoriteButton type="crypto" id={coin.id} />
      </div>
      <p className="text-lg">${Number(coin.priceUsd).toFixed(2)}</p>
      <p className={`text-sm ${coin.changePercent24Hr > 0 ? 'text-green-400' : 'text-red-400'}`}>
        24h: {Number(coin.changePercent24Hr).toFixed(2)}%
      </p>
      <p className="text-sm text-gray-400">Market Cap: ${Number(coin.marketCapUsd).toFixed(2)}</p>
    </div>
  );
}