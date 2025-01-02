"use client";
import CryptoTable from "@/components/CryptoTable";
import { useEffect, useState } from "react";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"market_cap" | "volume" | "id">(
    "market_cap"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  useEffect(() => {
    const fetchCoinList = async () => {
      try {
        const response = await fetch(
          `/api/coinList/?sortBy=${sortBy}&sortOrder=${sortOrder}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch with status: ${response.status}`);
        }
        const data = await response.json();
        setCoins(data);
      } catch (err) {
        console.error("Error fetching coins:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchCoinList();
  }, [sortBy, sortOrder]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <main>
      <CryptoTable
        data={coins}
        sortBy={sortBy}
        sortOrder={sortOrder}
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
      />
    </main>
  );
}
