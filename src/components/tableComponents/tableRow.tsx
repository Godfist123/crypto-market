"use client";
import React from "react";
import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  Typography,
  Avatar,
  IconButton,
  Icon,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { PushPin } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addPin, coinInfo } from "@/store/slices/PinSlice";

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

interface CryptoTableRowProps {
  coin: Crypto;
  index: number;
  isMobile: boolean;
  isExpanded: boolean;
  toggleRowExpansion: (id: string) => void;
  onRowClick: (id: string) => void;
}

const CryptoTableRow: React.FC<CryptoTableRowProps> = ({
  coin,
  index,
  isMobile,
  isExpanded,
  toggleRowExpansion,
  onRowClick,
}) => {
  const dispatch = useDispatch();
  return (
    <>
      <TableRow
        onClick={() => onRowClick(coin.id)}
        sx={{
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        <TableCell>
          <Box display="flex" alignItems="center">
            <Icon
              onClick={(e) => {
                e.stopPropagation();
                dispatch(
                  addPin({
                    id: coin.id,
                    name: coin.name,
                    image: coin.image,
                  } as coinInfo)
                );
              }}
            >
              <PushPin />
            </Icon>
            {isMobile && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  toggleRowExpansion(coin.id);
                }}
              >
                {isExpanded ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            )}
            {index + 1}
          </Box>
        </TableCell>
        <TableCell>
          <Box display="flex" alignItems="center">
            <Avatar src={coin.image} alt={coin.name} sx={{ marginRight: 1 }} />
            <Typography variant="body2">
              {coin.name} ({coin.symbol.toUpperCase()})
            </Typography>
          </Box>
        </TableCell>
        {!isMobile && <TableCell>${coin.current_price ?? "N/A"}</TableCell>}
        {!isMobile && <TableCell>${coin.market_cap ?? "N/A"}</TableCell>}
        {!isMobile && <TableCell>${coin.high_24h ?? "N/A"}</TableCell>}

        <TableCell
          style={{
            color: coin.price_change_percentage_24h > 0 ? "green" : "red",
          }}
        >
          {coin.price_change_percentage_24h != null
            ? `${coin.price_change_percentage_24h.toFixed(2)}%`
            : "N/A"}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} style={{ padding: 0, border: "none" }}>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <Box padding={2}>
              <Typography variant="body2" gutterBottom>
                <strong>Current Price:</strong> ${coin.current_price ?? "N/A"}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Market Cap:</strong> ${coin.market_cap ?? "N/A"}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>High 24h:</strong> ${coin.high_24h ?? "N/A"}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Symbol:</strong> {coin.symbol.toUpperCase()}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CryptoTableRow;
