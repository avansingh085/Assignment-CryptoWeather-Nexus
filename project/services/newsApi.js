export async function fetchNewsData() {
    const apiKey = 'pub_7734247e961aeaedb11cb89a298774cc21299';
    const response = await fetch(
      `https://newsdata.io/api/1/news?apikey=pub_7734247e961aeaedb11cb89a298774cc21299&q=crypto%20coin%20news&country=in&language=hi&category=education `
    );
    const data = await response.json();
    return data.results;
  }