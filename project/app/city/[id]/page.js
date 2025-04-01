'use client'; // Client component for hooks

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '@/redux/weatherSlice';
import { useParams } from 'next/navigation';

export default function CityDetail() {
  const dispatch = useDispatch();
  const { weather } = useSelector((state) => state);
  const { id } = useParams(); // Replaces useRouter

  useEffect(() => {
    if (id) dispatch(fetchWeather([id]));
  }, [id, dispatch]);

  const city = weather.data.find((c) => c.name.toLowerCase() === id);

  if (!city) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 tracking-tight">{city.name} Weather</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        <p className="text-lg mb-2">
          <span className="font-semibold">Temperature:</span> {Math.round(city.main.temp)}°C
        </p>
        <p className="text-lg mb-2">
          <span className="font-semibold">Humidity:</span> {city.main.humidity}%
        </p>
        <p className="text-lg mb-2">
          <span className="font-semibold">Conditions:</span>{' '}
          <span className="capitalize">{city.weather[0].description}</span>
        </p>
        <p className="text-lg">
          <span className="font-semibold">Wind Speed:</span> {city.wind.speed} m/s
        </p>
      </div>
    </div>
  );
}