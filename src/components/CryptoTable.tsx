"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { useRouter } from "next/navigation";

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  high_24h: number;
  price_change_percentage_24h: number;
}

interface CryptoTableProps {
  data: Crypto[];
  sortBy: "market_cap" | "volume" | "id";
  sortOrder: "asc" | "desc";
  setSortBy: (value: "market_cap" | "volume" | "id") => void;
  setSortOrder: (value: "asc" | "desc") => void;
}

const CryptoTable: React.FC<CryptoTableProps> = ({
  data,
  setSortBy,
  setSortOrder,
  sortBy,
  sortOrder,
}) => {
  const router = useRouter();

  const [anchorElSortBy, setAnchorElSortBy] = useState<null | HTMLElement>(
    null
  );
  const [anchorElOrder, setAnchorElOrder] = useState<null | HTMLElement>(null);
  // Handlers for Sort By Dropdown
  const handleSortByClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElSortBy(event.currentTarget);
  };

  const handleSortByClose = (newSortBy?: "market_cap" | "volume" | "id") => {
    setAnchorElSortBy(null);
    if (newSortBy) setSortBy(newSortBy);
  };

  // Handlers for Order Dropdown
  const handleOrderClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElOrder(event.currentTarget);
  };

  const handleOrderClose = (newOrder?: "asc" | "desc") => {
    setAnchorElOrder(null);
    if (newOrder) setSortOrder(newOrder);
  };

  const handleRowClick = (id: string) => {
    router.push(`/coins/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
        {/* Sort By Dropdown */}
        <Button variant="outlined" onClick={handleSortByClick}>
          Sort By: {sortBy}
        </Button>
        <Menu
          anchorEl={anchorElSortBy}
          open={Boolean(anchorElSortBy)}
          onClose={() => handleSortByClose()}
        >
          <MenuItem onClick={() => handleSortByClose("market_cap")}>
            Market Cap
          </MenuItem>
          <MenuItem onClick={() => handleSortByClose("volume")}>
            Volume
          </MenuItem>
          <MenuItem onClick={() => handleSortByClose("id")}>ID</MenuItem>
        </Menu>

        {/* Sort Order Dropdown */}
        <Button
          variant="outlined"
          sx={{ marginLeft: 2 }}
          onClick={handleOrderClick}
        >
          Order: {sortOrder}
        </Button>
        <Menu
          anchorEl={anchorElOrder}
          open={Boolean(anchorElOrder)}
          onClose={() => handleOrderClose()}
        >
          <MenuItem onClick={() => handleOrderClose("asc")}>Ascending</MenuItem>
          <MenuItem onClick={() => handleOrderClose("desc")}>
            Descending
          </MenuItem>
        </Menu>
      </Toolbar>
      <Typography variant="h4" align="center" gutterBottom>
        Cryptocurrency Market
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Coin</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Market Cap</TableCell>
            <TableCell>High 24h</TableCell>
            <TableCell>Change 24h</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(
            (coin, index) => (
              console.log(coin),
              (
                <React.Fragment key={coin.id}>
                  <TableRow
                    onClick={() => handleRowClick(coin.id)}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar
                          src={coin.image}
                          alt={coin.name}
                          sx={{ marginRight: 1 }}
                        />
                        <strong>{coin.name}</strong> (
                        {coin.symbol.toUpperCase()})
                      </Box>
                    </TableCell>
                    <TableCell>
                      ${coin.current_price != null ? coin.current_price : "N/A"}
                    </TableCell>
                    <TableCell>
                      $ {coin.market_cap != null ? coin.market_cap : "N/A"}
                    </TableCell>
                    <TableCell>${coin.high_24h}</TableCell>
                    <TableCell
                      style={{
                        color:
                          coin.price_change_percentage_24h > 0
                            ? "green"
                            : "red",
                      }}
                    >
                      {coin.price_change_percentage_24h != null
                        ? `${coin.price_change_percentage_24h.toFixed(2)}%`
                        : "N/A"}
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              )
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CryptoTable;
