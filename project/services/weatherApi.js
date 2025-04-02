export async function fetchWeatherData(cities) {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    // console.log(process,"PKLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
    const promises = cities.map((city) =>
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      ).then((res) => res.json())
    );
    // console.log(Promise.all(promises))
    return Promise.all(promises);
  }