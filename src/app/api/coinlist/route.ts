import { NextRequest, NextResponse } from "next/server";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sortBy = searchParams.get("sortBy") || "market_cap";
  const sortOrder = searchParams.get("sortOrder") || "desc";
  const page = searchParams.get("page") || "1";
  const renderLess = searchParams.get("renderLess") || "false";

  try {
    console.log("renderLess:", renderLess);
    const data = await fetchWithAuth(
      `/coins/markets?vs_currency=usd&order=${sortBy}_${sortOrder}&per_page=${
        renderLess === "true" ? 20 : 50
      }&page=${page}&sparkline=false`
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from CoinGecko" },
      { status: 500 }
    );
  }
}
