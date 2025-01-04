"use client";
import CryptoTable from "@/components/CryptoTable";
import { Box, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"market_cap" | "volume" | "id">(
    "market_cap"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState<number>(1);
  const pageSize = 100;
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const fetchCoinList = async () => {
      try {
        const response = await fetch(
          `/api/coinlist/?sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch with status: ${response.status}`);
        }
        const data = await response.json();
        setCoins(data);
        if (data.length < pageSize) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } catch (err) {
        console.error("Error fetching coins:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCoinList();
  }, [sortBy, sortOrder, page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (value === page) return;
    setPage(value);
  };

  return (
    <>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Typography>Loading...</Typography>
        </Box>
      ) : error ? (
        <Typography align="center">Error: {error}</Typography>
      ) : (
        <main>
          <CryptoTable
            data={coins}
            sortBy={sortBy}
            sortOrder={sortOrder}
            setSortBy={setSortBy}
            setSortOrder={setSortOrder}
          />
          <Box
            display="flex"
            justifyContent="center"
            padding={2}
            bgcolor="white"
          >
            <Pagination
              count={hasMore ? page + 2 : page}
              page={page}
              onChange={handlePageChange}
              color="primary"
              siblingCount={1}
              boundaryCount={1}
            />
          </Box>
        </main>
      )}
    </>
  );
}
