export async function fetchWeatherData(cities) {
    const apiKey = process.env.WHEATHER_API_KEY;
    const promises = cities.map((city) =>
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      ).then((res) => res.json())
    );
    // console.log(Promise.all(promises))
    return Promise.all(promises);
  }