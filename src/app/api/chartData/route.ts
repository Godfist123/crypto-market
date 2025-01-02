import { NextRequest, NextResponse } from "next/server";
import { fetchChartDataWithAuth } from "@/lib/fetchChartDataWithAuth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const coinId = searchParams.get("coinId");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const obj = {
    coinId,
    from: from ? Number(from) : null,
    to: to ? Number(to) : null,
  };

  try {
    const data = await fetchChartDataWithAuth(obj);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from CoinGecko" },
      { status: 500 }
    );
  }
}
