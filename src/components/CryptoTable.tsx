import React, { useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import CryptoTableBody from "./tableComponents/tableBody";

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

const CryptoTable: React.FC<CryptoTableProps> = ({ data }) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleRowExpansion = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleRowClick = (id: string) => {
    router.push(`/coins/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Toolbar>{/* Sort Dropdown Logic */}</Toolbar>
      <Typography variant="h4" align="center" gutterBottom>
        Cryptocurrency Market
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Coin</TableCell>
            {!isMobile && <TableCell>Price</TableCell>}
            {!isMobile && <TableCell>Market Cap</TableCell>}
            {!isMobile && <TableCell>High 24h</TableCell>}
            <TableCell>Change 24h</TableCell>
          </TableRow>
        </TableHead>
        <CryptoTableBody
          data={data}
          isMobile={isMobile}
          expandedRows={expandedRows}
          toggleRowExpansion={toggleRowExpansion}
          onRowClick={handleRowClick}
        />
      </Table>
    </TableContainer>
  );
};

export default CryptoTable;
