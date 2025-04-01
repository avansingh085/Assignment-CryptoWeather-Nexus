export async function fetchCryptoData(ids) {
    const response = await fetch(
      `https://api.coincap.io/v2/assets`);
    const data = await response.json();
    return data.data;
  }