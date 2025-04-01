'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '@/redux/weatherSlice';
import { fetchCrypto } from '@/redux/cryptoSlice';
import { fetchNews } from '@/redux/newsSlice';
import WeatherCard from '@/components/WeatherCard';
import CryptoCard from '@/components/CryptoCard';
import NewsCard from '@/components/NewsCard';
import NotificationToast from '@/components/NotificationToast';
import Navbar from '@/components/Navbar';
import { useWebSocket } from '@/services/websocket';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { weather, crypto, news } = useSelector((state) => state);
  useWebSocket();

  // Local state for search and city management
  const [citySearch, setCitySearch] = useState('');
  const [cryptoSearch, setCryptoSearch] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [cities, setCities] = useState([
    'London', 'Tokyo', 'Paris', 'Berlin', 'Sydney', 'Moscow', 'Beijing', 'Mumbai', 'Toronto',
    'Los Angeles', 'Chicago', 'Houston', 'Miami', 'Seattle', 'San Francisco', 'Boston', 'Denver', 'Phoenix', 'Atlanta',
    'Madrid', 'Rome', 'Amsterdam', 'Stockholm', 'Oslo', 'Helsinki', 'Vienna', 'Prague', 'Warsaw', 'Budapest',
    'Singapore', 'Seoul', 'Bangkok', 'Jakarta', 'Manila', 'Kuala Lumpur', 'Dubai', 'Cairo', 'Istanbul', 'Athens',
    'Mexico City', 'Buenos Aires', 'Sao Paulo', 'Rio de Janeiro', 'Lima', 'Bogota', 'Santiago', 'Cape Town', 'Nairobi',
  ]);

  // Fetch data on mount and when cities change
  useEffect(() => {
    // Fetch weather for all cities
    dispatch(fetchWeather(cities)).catch((error) => {
      console.error('Weather fetch failed:', error);
    });

    // Fetch all available cryptocurrencies (no specific IDs passed)
    dispatch(fetchCrypto()).catch((error) => {
      console.error('Crypto fetch failed:', error);
    });

    // Fetch news
    dispatch(fetchNews()).catch((error) => {
      console.error('News fetch failed:', error);
    });

    // Refresh crypto data every 60 seconds
    const interval = setInterval(() => {
      dispatch(fetchCrypto()).catch((error) => {
        console.error('Crypto refresh failed:', error);
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch, cities]);

  // Handle adding a new city
  const handleAddCity = () => {
    const trimmedInput = cityInput.trim();
    if (trimmedInput && !cities.includes(trimmedInput)) {
      setCities((prevCities) => [...prevCities, trimmedInput]);
      setCityInput(''); // Clear input after adding
    }
  };

  // Filter cities based on search input
  const filteredCities = Array.isArray(weather.data)
    ? weather.data.filter((city) =>
        city.name.toLowerCase().includes(citySearch.toLowerCase())
      )
    : [];

  // Filter crypto coins based on search input
  const filteredCrypto = Array.isArray(crypto.data)
    ? crypto.data.filter(
        (coin) =>
          coin.name.toLowerCase().includes(cryptoSearch.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(cryptoSearch.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
   
      <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Weather Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Weather</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              placeholder="Add a city..."
              className="p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <button
              onClick={handleAddCity}
              className="p-2 bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>
          <input
            type="text"
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
            placeholder="Search cities..."
            className="p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          {weather.loading ? (
            <p className="text-gray-400">Loading weather data...</p>
          ) : weather.error ? (
            <p className="text-red-400">Error: {weather.error}</p>
          ) : filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <WeatherCard key={city.name} city={city} />
            ))
          ) : (
            <p className="text-gray-400">
              {citySearch ? 'No cities match your search' : 'No weather data available'}
            </p>
          )}
        </section>

        {/* Crypto Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Cryptocurrency</h2>
          <input
            type="text"
            value={cryptoSearch}
            onChange={(e) => setCryptoSearch(e.target.value)}
            placeholder="Search coins..."
            className="p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          {crypto.loading ? (
            <p className="text-gray-400">Loading crypto data...</p>
          ) : crypto.error ? (
            <p className="text-red-400">Error: {crypto.error}</p>
          ) : filteredCrypto.length > 0 ? (
            filteredCrypto.map((coin) => (
              <CryptoCard key={coin.id} coin={coin} />
            ))
          ) : (
            <p className="text-gray-400">
              {cryptoSearch ? 'No coins match your search' : 'No crypto data available'}
            </p>
          )}
        </section>

        {/* News Section */}
        <section className="space-y-4">
          3<h2 className="text-2xl font-bold tracking-tight">Crypto News</h2>
          {news.loading ? (
            <p className="text-gray-400">Loading news...</p>
          ) : news.error ? (
            <p className="text-red-400">Error: {news.error}</p>
          ) : Array.isArray(news.data) && news.data.length > 0 ? (
            news.data.slice(0, 5).map((article, idx) => (
              <NewsCard key={idx} article={article} />
            ))
          ) : (
            <p className="text-gray-400">No news available</p>
          )}
        </section>
      </main>
      <NotificationToast />
    </div>
  );
}