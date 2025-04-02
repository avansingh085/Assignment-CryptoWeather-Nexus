export async function fetchNewsData(retries = 5) {
  const apiKey = process.env.NEXT_PUBLIC_CRYPTO_NEWS_API_KEY;
  const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=crypto%20coin%20news&country=in&language=hi&category=education`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      
      const data = await response.json();
      return data.results;
    } catch (error) {
      if (attempt === retries) throw error;
      console.warn(`Retrying fetchNewsData (${attempt}/${retries})...`);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay
    }
  }
}
