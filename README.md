CryptoWeather Nexus

Project Overview

CryptoWeather Nexus is a modern, multi-page dashboard that integrates real-time weather data, cryptocurrency information, and live notifications via WebSocket. The application is built using Next.js and Redux for efficient state management and is styled with Tailwind CSS for a responsive and modern UI.

Live Demo

🔗 Deployed Application: https://assignment-crypto-weather-nexus.vercel.app/

Features

🌦️ Weather Dashboard

Displays temperature, humidity, and conditions for three predefined cities: New York, London, Tokyo.

💰 Cryptocurrency Dashboard

Live price, 24-hour change, and market cap for:

Bitcoin (BTC)

Ethereum (ETH)

One additional cryptocurrency

📰 Crypto News

Displays top five crypto-related headlines.

📊 Detail Pages

City Details: Weather history with charts and tables.

Crypto Details: Historical pricing and extended metrics.

🔄 Real-time Updates

Live cryptocurrency price updates via CoinCap WebSocket.

Simulated weather alerts through in-app WebSocket events.

🗂️ State Management

Redux for global state management.

Persistent favorites feature for cities and cryptocurrencies.

🔔 Notifications

Price alerts for significant BTC/ETH changes.

Simulated weather alerts.

📱 Responsive UI

Fully responsive layout for both mobile and desktop.

Tailwind CSS for styling and interactive components.

🛠️ Tech Stack

Frontend: Next.js (v13+), React, Tailwind CSS

State Management: Redux Toolkit (with Redux Thunk for async middleware)

APIs:

🌤️ OpenWeatherMap (Weather Data)

💹 CoinGecko (Crypto Data)

📰 NewsData.io (Crypto News)

🔄 CoinCap WebSocket (Real-time price updates)

Deployment: Vercel / Netlify

📥 Installation & Setup

Clone the Repository:

git clone https://github.com/avansingh085/Assignment-CryptoWeather-Nexus.git
cd Assignment-CryptoWeather-Nexus

Install Dependencies:

npm install

Set Up Environment Variables:

Create a .env.local file in the root directory and add the following:

NEXT_PUBLIC_WEATHER_API_KEY=your_openweather_api_key
NEXT_PUBLIC_CRYPTO_API_KEY=your_coingecko_api_key
NEXT_PUBLIC_NEWS_API_KEY=your_newsdata_api_key

Run the Development Server:

npm run dev

🔗 Open http://localhost:3000 in your browser.

📂 Folder Structure

project/
├── public/          # Static assets
├── app/
│   ├── layout.js    # Layout component for consistent UI structure
│   ├── page.js      # Main page component for dashboard
├── components/      # Reusable UI components
├── city/[id]/page.js  # City details page
├── crypto/[id]/page.js # Crypto details page
├── redux/           # Redux state management
├── services/        # API service functions
├── styles/          # Tailwind CSS styles
├── .env             # Environment variables
├── package.json     # Dependencies and scripts
├── README.md        # Project documentation

🔗 API Integration

Weather API: Fetches weather data for predefined cities from OpenWeatherMap.

Crypto API: Fetches real-time cryptocurrency prices and market data from CoinGecko.

News API: Retrieves latest cryptocurrency news articles from NewsData.io.

WebSocket: Uses CoinCap WebSocket to fetch real-time BTC and ETH price updates.

🛠️ Challenges & Solutions

🚧 Issue: Handling API Rate Limits

✅ Solution: Implemented caching and reduced unnecessary API calls.

🔄 Issue: Managing WebSocket Connections Efficiently

✅ Solution: Used Redux middleware to manage connections and avoid excessive re-rendering.

⚠️ Issue: Partial API Failures

✅ Solution: Displaying fallback UI and retry mechanisms in case of API failure.

🔁 Issue: Fetch Failure Due to Network Issues

✅ Solution: Implemented a retry mechanism (up to 5 attempts) with a 1-second delay between retries for fetching weather, cryptocurrency, and news data.

🚀 Future Improvements

✅ Allow users to search and add custom cities/cryptos.
✅ Improve UI animations and loading states.
✅ Add user authentication for personalized dashboards.

👨‍💻 Author

Avan Singh

📜 License

This project is licensed under the MIT License.

