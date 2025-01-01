export async function fetchWithAuth(endpoint: string, options?: RequestInit) {
  const baseUrl =
    process.env.COINGECKO_BASE_URL || "https://api.coingecko.com/api/v3";
  const authToken =
    process.env.COINGECKE_AUTH_TOKEN || "CG-o5nKWJFNA83cwnMpetpXbDzk";

  try {
    console.log("fetchWithAuth:", endpoint);

    const fullUrl = `${baseUrl}${endpoint}`;
    console.log("fullUrl:", fullUrl);
    console.log("Headers:", {
      accept: "application/json",
      "x-cg-pro-api-key": authToken,
    });
    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": authToken,
        ...(options?.headers || {}),
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in fetchWithAuth:", error);
    throw error;
  }
}
