export async function fetchWeatherData(cities) {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  async function fetchWithRetry(city, retries = 5) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        
        return await response.json();
      } catch (error) {
        if (attempt === retries) throw error;
        console.warn(`Retrying ${city} (${attempt}/${retries})...`);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay
      }
    }
  }

  const promises = cities.map((city) => fetchWithRetry(city));
  return Promise.all(promises);
}
