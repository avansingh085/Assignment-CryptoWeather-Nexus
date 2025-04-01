export async function fetchNewsData() {
    const apiKey=process.env.CRYPTO_NEWS_API_KEY;
    const response = await fetch(
      `https://newsdata.io/api/1/news?apikey=${apiKey}&q=crypto%20coin%20news&country=in&language=hi&category=education `
    );
    const data = await response.json();
    return data.results;
  }