"use client";

import CoinDetail from "@/components/CryptoDetail";
import { use, useState, useEffect } from "react";

export default function CoinPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(`/api/coinDetail/?coinId=${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch with status: ${response.status}`);
        }
        const data = await response.json();
        setCoinData(data);
      } catch (err) {
        console.error("Error fetching coin data:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!coinData) {
    return <p>No coin data available</p>;
  }

  return <CoinDetail data={coinData} />;
}
