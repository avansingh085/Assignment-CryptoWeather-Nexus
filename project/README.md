CryptoWeather Nexus

Project Overview

CryptoWeather Nexus is a modern, multi-page dashboard that integrates real-time weather data, cryptocurrency information, and live notifications via WebSocket. The application is built using Next.js and Redux for efficient state management and is styled with Tailwind CSS for a responsive and modern UI.

Live Demo

Deployed Application https://assignment-crypto-weather-nexus.vercel.app/

Features

Weather Dashboard: Displays temperature, humidity, and conditions for three predefined cities (New York, London, Tokyo).

Cryptocurrency Dashboard: Live price, 24-hour change, and market cap for Bitcoin, Ethereum, and one other cryptocurrency.

Crypto News: Displays top five crypto-related headlines.

Detail Pages:

City Weather History (charts and tables)

Crypto Historical Data (extended metrics)

Real-time Updates:

Live cryptocurrency price updates via CoinCap WebSocket.

Simulated weather alerts through in-app WebSocket events.

State Management:

Redux for global state.

Persistent favorites feature for cities and cryptocurrencies.

Notifications:

Price alerts for significant BTC/ETH changes.

Simulated weather alerts.

Responsive UI:

Fully responsive layout for mobile and desktop.

Tailwind CSS for styling and interactive components.

Tech Stack

Frontend: Next.js (v13+), React, Tailwind CSS

State Management: Redux Toolkit (with Redux Thunk for async middleware)

APIs:

OpenWeatherMap (Weather Data)

CoinGecko (Crypto Data)

NewsData.io (Crypto News)

CoinCap WebSocket (Real-time price updates)

Deployment: Vercel / Netlify

Installation & Setup

Clone the Repository:https://github.com/avansingh085/Assignment-CryptoWeather-Nexus.git
cd project

Install Dependencies:

npm install

Set Up Environment Variables:
Create a .env.local file in the root directory and add the following:

NEXT_PUBLIC_WEATHER_API_KEY=your_openweather_api_key
NEXT_PUBLIC_CRYPTO_API_KEY=your_coingecko_api_key
NEXT_PUBLIC_NEWS_API_KEY=your_newsdata_api_key

Run the Development Server:

npm run dev

Open http://localhost:3000 in your browser.

Folder Structure

project/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable UI components
│   ├── pages/       # Next.js pages (Routing)
│   ├── layout.js    # Layout component for consistent UI structure
│   ├── page.js      # Main page component for dashboard
│   ├── redux/       # Redux state management
│   ├── services/       # service functions
│   ├── styles/      # Tailwind CSS styles
├── .env.local       # Environment variables
├── package.json     # Dependencies and scripts
├── README.md        # Project documentation

API Integration

Weather API: Fetches weather data for predefined cities from OpenWeatherMap.

Crypto API: Fetches real-time cryptocurrency prices and market data from CoinGecko.

News API: Retrieves latest cryptocurrency news articles from NewsData.io.

WebSocket: Uses CoinCap WebSocket to fetch real-time BTC and ETH price updates.

Challenges & Solutions

Issue: Handling API Rate Limits

Implemented caching and reduced unnecessary API calls.

Issue: Managing WebSocket Connections Efficiently

Used Redux middleware to manage connections and avoid excessive re-rendering.

Issue: Partial API Failures

Displaying fallback UI and retry mechanisms in case of API failure.

Future Improvements

Allow users to search and add custom cities/cryptos.

Improve UI animations and loading states.

Add user authentication for personalized dashboards.

Author

Avan Singh 

License

This project is licensed under the MIT License.

