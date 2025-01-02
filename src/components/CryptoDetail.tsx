import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Paper,
  Avatar,
  Chip,
  Link,
  List,
  ListItem,
} from "@mui/material";
import PriceChart from "@/components/PriceChart"; // Assuming a reusable chart component

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: { large: string };
  hashing_algorithm: string | null;
  categories: string[];
  description: { en: string };
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    total_volume: { usd: number };
    high_24h: { usd: number };
    low_24h: { usd: number };
    price_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number | null;
    max_supply: number | null;
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
    whitepaper: string;
  };
}

const CoinDetail: React.FC<{ data: CoinData }> = ({ data }) => {
  const {
    name,
    symbol,
    image,
    hashing_algorithm,
    categories,
    description,
    market_data,
    links,
  } = data;

  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const [visibleHours, setVisibleHours] = useState(6);

  // Fetch chart data for the given coin and calculate the time range
  const fetchChartData = async () => {
    const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds
    const hoursAgo = visibleHours * 60 * 60;
    const startTime = now - hoursAgo;

    try {
      const response = await fetch(
        `/api/chartData?from=${startTime}&to=${now}&coinId=${data.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch chart data");
      }
      const responseData = await response.json();
      const labels = responseData.prices.map(
        ([timestamp]: [number, number]) => {
          const date = new Date(timestamp);
          return `${date.getHours()}:${date
            .getMinutes()
            .toString()
            .padStart(2, "0")}`; // Add leading zero to minutes
        }
      );
      const prices = responseData.prices.map(
        ([, price]: [number, number]) => price
      );
      setChartData({ labels, data: prices });
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  const adjustVisibleHours = () => {
    const width = window.innerWidth;
    if (width < 400) {
      setVisibleHours(1);
    } else if (width < 600) {
      setVisibleHours(2);
    } else if (width < 960) {
      setVisibleHours(4);
    } else {
      setVisibleHours(6);
    }
  };

  // Adjust visible hours on window resize
  useEffect(() => {
    adjustVisibleHours();
    window.addEventListener("resize", adjustVisibleHours);
    return () => window.removeEventListener("resize", adjustVisibleHours);
  }, []);

  // Fetch chart data every 5 minutes
  useEffect(() => {
    fetchChartData();

    const intervalId = setInterval(() => {
      fetchChartData();
    }, 300000);
    return () => clearInterval(intervalId);
  }, [data.id, visibleHours]);

  return (
    <Box padding={3}>
      {/* Header Section */}
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Box display="flex" alignItems="center">
          <Avatar src={image.large} alt={name} sx={{ width: 60, height: 60 }} />
          <Box marginLeft={2}>
            <Typography variant="h4">{name}</Typography>
            <Typography variant="subtitle1">
              ({symbol.toUpperCase()})
            </Typography>
          </Box>
        </Box>
        <Box marginTop={2} display="flex" alignItems="center">
          <Typography variant="h5">
            ${market_data.current_price.usd.toLocaleString()}
          </Typography>
          <Chip
            label={`${market_data.price_change_percentage_24h.toFixed(2)}%`}
            color={
              market_data.price_change_percentage_24h > 0 ? "success" : "error"
            }
            size="small"
            sx={{ marginLeft: 2 }}
          />
        </Box>
        <Typography variant="subtitle2" color="textSecondary">
          24h Range: ${market_data.low_24h.usd.toLocaleString()} - $
          {market_data.high_24h.usd.toLocaleString()}
        </Typography>
      </Paper>

      {/* Stats Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        gap={2}
        flexWrap="wrap"
      >
        <Paper elevation={3} sx={{ flex: "1", padding: 2 }}>
          <Typography variant="h6">Market Cap</Typography>
          <Typography>
            ${market_data.market_cap.usd.toLocaleString()}
          </Typography>
        </Paper>
        <Paper elevation={3} sx={{ flex: "1", padding: 2 }}>
          <Typography variant="h6">24h Trading Volume</Typography>
          <Typography>
            ${market_data.total_volume.usd.toLocaleString()}
          </Typography>
        </Paper>
        <Paper elevation={3} sx={{ flex: "1", padding: 2 }}>
          <Typography variant="h6">Circulating Supply</Typography>
          <Typography>
            {market_data.circulating_supply.toLocaleString()}
          </Typography>
        </Paper>
        <Paper elevation={3} sx={{ flex: "1", padding: 2 }}>
          <Typography variant="h6">Max Supply</Typography>
          <Typography>
            {market_data.max_supply
              ? market_data.max_supply.toLocaleString()
              : "N/A"}
          </Typography>
        </Paper>
      </Box>

      {/* Additional Info Section */}
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h6">Additional Information</Typography>
        <Typography>
          <strong>Hashing Algorithm:</strong> {hashing_algorithm || "N/A"}
        </Typography>
        <Typography>
          <strong>Categories:</strong> {categories.join(", ")}
        </Typography>
        <Typography sx={{ marginTop: 2 }}>
          <strong>Description:</strong> {description.en || "N/A"}
        </Typography>
      </Paper>

      {/* Links Section */}
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h6">Links</Typography>
        <List>
          <ListItem>
            <Link href={links.homepage[0]} target="_blank" rel="noopener">
              Official Website
            </Link>
          </ListItem>
          <ListItem>
            <Link href={links.whitepaper} target="_blank" rel="noopener">
              Whitepaper
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href={links.blockchain_site[0]}
              target="_blank"
              rel="noopener"
            >
              Blockchain Explorer
            </Link>
          </ListItem>
        </List>
      </Paper>

      {/* Chart Section */}
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h6">
          Price Chart (Last {visibleHours} Hours)
        </Typography>
        {chartData.labels.length > 0 ? (
          <PriceChart
            labels={chartData.labels}
            data={chartData.data}
            visibleHours={visibleHours}
          />
        ) : (
          <Typography>Loading chart data...</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default CoinDetail;
