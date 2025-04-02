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
import { useWebSocket } from '@/services/websocket';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { weather, crypto, news } = useSelector((state) => state);

  
    useWebSocket();
 
  const [citySearch, setCitySearch] = useState('');
  const [cryptoSearch, setCryptoSearch] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [cities, setCities] = useState([
    'London', 'Tokyo', 'Paris', 'Berlin', 'Sydney', 'Mumbai', 'Toronto', 'Los Angeles', 'Chicago'
  ]);
  const [activeView, setActiveView] = useState('weather');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); 
    };
    
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchWeather(cities)).unwrap();
      } catch (error) {
        console.error('Weather fetch failed:', error);
      }
      try {
        await dispatch(fetchCrypto()).unwrap();
      } catch (error) {
        console.error('Crypto fetch failed:', error);
      }
      try {
        await dispatch(fetchNews()).unwrap();
      } catch (error) {
        console.error('News fetch failed:', error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      dispatch(fetchCrypto()).catch((error) => {
        console.error('Crypto refresh failed:', error);
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch, cities]);

  const handleAddCity = () => {
    const trimmedInput = cityInput.trim();
    if (trimmedInput && !cities.includes(trimmedInput)) {
      setCities([...cities, trimmedInput]);
      setCityInput('');
    }
  };

  const filteredCities = weather.data?.filter((city) =>
    city.name.toLowerCase().includes(citySearch.toLowerCase())
  );

  const filteredCrypto = crypto.data?.filter((coin) =>
    coin.name.toLowerCase().includes(cryptoSearch.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(cryptoSearch.toLowerCase())
  );

  const renderWeatherSection = () => (
    <section>
      <h2 className="text-2xl font-bold">Weather</h2>
      <input
        type="text"
        value={citySearch}
        onChange={(e) => setCitySearch(e.target.value)}
        placeholder="Search cities..."
        className="p-2 rounded bg-gray-800 text-white border border-gray-700 w-full"
      />
      <div className="flex mt-2">
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Add a city..."
          className="p-2 rounded bg-gray-800 text-white border border-gray-700 w-full"
        />
        <button
          onClick={handleAddCity}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Add City
        </button>
      </div>
      {weather.loading && <p>Loading weather data...</p>}
      {weather.error && (
        <div>
          <p className="text-red-400">Failed to load weather data.</p>
          <button onClick={() => dispatch(fetchWeather(cities))} className="text-blue-500">Retry</button>
        </div>
      )}
      {filteredCities?.length ? (
        filteredCities.map((city, index) =>
          city.main ? <WeatherCard key={city.id || index} city={city} /> : null
        )
      ) : (
        <p>No weather data available.</p>
      )}
    </section>
  );

  const renderCryptoSection = () => (
    <section>
      <h2 className="text-2xl font-bold">Cryptocurrency</h2>
      <input
        type="text"
        value={cryptoSearch}
        onChange={(e) => setCryptoSearch(e.target.value)}
        placeholder="Search coins..."
        className="p-2 rounded bg-gray-800 text-white border border-gray-700 w-full"
      />
      {crypto.loading && <p>Loading crypto data...</p>}
      {crypto.error && (
        <div>
          <p className="text-red-400">Failed to load cryptocurrency data.</p>
          <button onClick={() => dispatch(fetchCrypto())} className="text-blue-500">Retry</button>
        </div>
      )}
      {filteredCrypto?.length ? (
        filteredCrypto.map((coin) => <CryptoCard key={coin.id} coin={coin} />)
      ) : (
        <p>No crypto data available.</p>
      )}
    </section>
  );

  const renderNewsSection = () => (
    <section>
      <h2 className="text-2xl font-bold">Crypto News</h2>
      {news.loading && <p>Loading news...</p>}
      {news.error && (
        <div>
          <p className="text-red-400">Failed to load news.</p>
          <button onClick={() => dispatch(fetchNews())} className="text-blue-500">Retry</button>
        </div>
      )}
      {news.data?.length ? (
        news.data.slice(0, 5).map((article, idx) => <NewsCard key={article.id || idx} article={article} />)
      ) : (
        <p>No news available.</p>
      )}
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto p-4">
        {isMobile ? (
          <>
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => setActiveView('weather')}
                className={`px-4 py-2 rounded ${activeView === 'weather' ? 'bg-blue-500' : 'bg-gray-700'}`}
              >
                Weather
              </button>
              <button
                onClick={() => setActiveView('crypto')}
                className={`px-4 py-2 rounded ${activeView === 'crypto' ? 'bg-blue-500' : 'bg-gray-700'}`}
              >
                Crypto
              </button>
              <button
                onClick={() => setActiveView('news')}
                className={`px-4 py-2 rounded ${activeView === 'news' ? 'bg-blue-500' : 'bg-gray-700'}`}
              >
                News
              </button>
            </div>
            <div>
              {activeView === 'weather' && renderWeatherSection()}
              {activeView === 'crypto' && renderCryptoSection()}
              {activeView === 'news' && renderNewsSection()}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderWeatherSection()}
            {renderCryptoSection()}
            {renderNewsSection()}
          </div>
        )}
      </main>
      <NotificationToast />
    </div>
  );
}