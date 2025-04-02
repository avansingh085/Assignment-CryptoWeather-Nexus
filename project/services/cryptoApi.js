export async function fetchCryptoData(ids,retries = 5) {
  const url = `https://api.coincap.io/v2/assets`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      if (attempt === retries) throw error;
      console.warn(`Retrying fetchCryptoData (${attempt}/${retries})...`);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay
    }
  }
}
