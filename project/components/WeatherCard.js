import Link from 'next/link';
import FavoriteButton from './FavoriteButton';

export default function WeatherCard({ city }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-center">
        <Link href={`/city/${city?.name?.toLowerCase()}`}>
          <h3 className="text-xl font-semibold cursor-pointer hover:text-blue-400">
            {city.name}
          </h3>
        </Link>
        <FavoriteButton type="city" id={city.name} />
      </div>
      <p className="text-lg">{Math.round(city.main.temp)}°C</p>
      <p className="text-sm text-gray-400">Humidity: {city.main.humidity}%</p>
      <p className="text-sm capitalize">{city.weather[0].description}</p>
    </div>
  );
}