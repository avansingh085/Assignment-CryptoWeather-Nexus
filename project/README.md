# CryptoWeather Nexus

A modern, multi-page dashboard combining real-time weather data, cryptocurrency prices, and crypto-related news, built with Next.js, React, Redux, Tailwind CSS, and WebSocket integration.

## Overview

CryptoWeather Nexus provides users with:
- **Weather**: Real-time temperature, humidity, and conditions for a customizable list of cities.
- **Cryptocurrency**: Live prices, 24-hour changes, and market caps for top cryptocurrencies.
- **News**: Latest cryptocurrency headlines.
- **Real-Time Notifications**: WebSocket-powered price updates and simulated weather alerts.

The app is deployed publicly and features a responsive UI, search functionality, and a favorites system persisted via local storage.

## Live URL

[https://crypto-weather-nexus.vercel.app](https://crypto-weather-nexus.vercel.app) *(Update with your actual deployment URL after deploying)*

## Features

- **Dashboard**: Three-section grid layout displaying weather, crypto, and news.
- **Detail Pages**: Deep-linked routes for city weather (`/city/[id]`) and crypto details (`/crypto/[id]`).
- **Search**: Filter cities and cryptocurrencies by name or symbol.
- **Add Cities**: Dynamically add new cities to the weather list.
- **Favorites**: Mark cities and cryptos as favorites, persisted in local storage.
- **Real-Time Updates**: WebSocket for crypto price changes; periodic refresh for other data.
- **Responsive Design**: Adapts seamlessly from mobile to desktop using Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Frontend**: React (hooks), Redux (with Toolkit for state management)
- **Styling**: Tailwind CSS
- **APIs**:
  - Weather: OpenWeatherMap
  - Crypto: CoinCap (REST + WebSocket)
  - News: NewsData.io
- **Deployment**: Vercel

## Setup Instructions

### Prerequisites
- Node.js (>= 18.x)
- npm or yarn
- API keys for:
  - [OpenWeatherMap](https://openweathermap.org/api)
  - [NewsData.io](https://newsdata.io/)

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/crypto-weather-nexus.git
   cd crypto-weather-nexus
