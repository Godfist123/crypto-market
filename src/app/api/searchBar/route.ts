import { NextRequest, NextResponse } from "next/server";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";

  try {
    const data = await fetchWithAuth(`/search?query=${query}`);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from CoinGecko" },
      { status: 500 }
    );
  }
}
