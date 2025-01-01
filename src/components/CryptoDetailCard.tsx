import React from "react";
import { Paper, Typography } from "@mui/material";

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

interface CryptoDetailCardProps {
  crypto: Crypto;
}

const CryptoDetailCard: React.FC<CryptoDetailCardProps> = ({ crypto }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        {crypto.name} ({crypto.symbol.toUpperCase()})
      </Typography>
      <Typography>
        <strong>Current Price:</strong> ${crypto.current_price.toLocaleString()}
      </Typography>
      <Typography>
        <strong>Market Cap:</strong> ${crypto.market_cap.toLocaleString()}
      </Typography>
      <Typography
        style={{
          color: crypto.price_change_percentage_24h > 0 ? "green" : "red",
        }}
      >
        <strong>24h Change:</strong>{" "}
        {crypto.price_change_percentage_24h.toFixed(2)}%
      </Typography>
    </Paper>
  );
};

export default CryptoDetailCard;
