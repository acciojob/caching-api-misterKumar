// complete the js code
const fetchButton = document.getElementById("fetch-button");
const resultsDiv = document.getElementById("results");

const cache = new Map();
const cacheDuration = 60000; // 1 minute in milliseconds

const fetchData = async () => {
  const cacheKey = "cachedData";
  const cachedData = cache.get(cacheKey);

  if (cachedData && Date.now() - cachedData.timestamp < cacheDuration) {
    console.log("Serving data from cache");
    return cachedData.data;
  }

  console.log("Making API call");
  try {
    const response = await fetch("https://financialmarketdata.p.rapidapi.com/api/stock/v1/get-historical-data?ticker=AAPL&interval=1d&startDate=2023-03-20&endDate=2023-03-25", {
      headers: {
        "X-RapidAPI-Key": "c3a9a6b376msh528c0d78a1c317ap1759efjsn28df182c8b4f",
        "X-RapidAPI-Host": "financialmarketdata.p.rapidapi.com"
      }
    });
    const data = await response.json();

    cache.set(cacheKey, {
      timestamp: Date.now(),
      data: data,
    });

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const displayData = (data) => {
  // Display data as per your requirement, modify this accordingly
  resultsDiv.textContent = JSON.stringify(data);
};

fetchButton.addEventListener("click", async () => {
  const data = await fetchData();
  if (data) {
    displayData(data);
  }
});
