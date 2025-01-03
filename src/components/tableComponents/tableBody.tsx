"use client";
import React from "react";
import { TableBody } from "@mui/material";
import CryptoTableRow from "./tableRow";

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

interface CryptoTableBodyProps {
  data: Crypto[];
  isMobile: boolean;
  expandedRows: { [key: string]: boolean };
  toggleRowExpansion: (id: string) => void;
  onRowClick: (id: string) => void;
}

const CryptoTableBody: React.FC<CryptoTableBodyProps> = ({
  data,
  isMobile,
  expandedRows,
  toggleRowExpansion,
  onRowClick,
}) => {
  return (
    <TableBody>
      {data.map((coin, index) => (
        <CryptoTableRow
          key={coin.id}
          coin={coin}
          index={index}
          isMobile={isMobile}
          isExpanded={!!expandedRows[coin.id]}
          toggleRowExpansion={toggleRowExpansion}
          onRowClick={onRowClick}
        />
      ))}
    </TableBody>
  );
};

export default CryptoTableBody;
