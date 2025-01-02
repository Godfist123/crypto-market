interface chartParams {
  from: number | null;
  to: number | null;
  coinId: string | null;
}

export async function fetchChartDataWithAuth(params: chartParams) {
  const baseUrl =
    process.env.COINGECKO_BASE_URL || "https://api.coingecko.com/api/v3";
  const authToken =
    process.env.COINGECKE_AUTH_TOKEN || "CG-o5nKWJFNA83cwnMpetpXbDzk";

  try {
    const { coinId, from, to } = params;
    const fullUrl = `${baseUrl}/coins/${coinId}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`;
    console.log("fullUrl:", fullUrl);
    console.log("Headers:", {
      accept: "application/json",
      "x-cg-pro-api-key": authToken,
    });
    const response = await fetch(fullUrl, {
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": authToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in fetchChartDataWithAuth:", error);
    throw error;
  }
}
