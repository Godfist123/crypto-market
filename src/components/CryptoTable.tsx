import React, { useEffect, useState } from "react";
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
  Button,
  Menu,
  MenuItem,
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
  setRenderLess: (value: boolean) => void;
}

const CryptoTable: React.FC<CryptoTableProps> = ({
  data,
  setSortBy,
  setSortOrder,
  sortBy,
  sortOrder,
  setRenderLess,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [anchorElSortBy, setAnchorElSortBy] = useState<null | HTMLElement>(
    null
  );
  const [anchorElOrder, setAnchorElOrder] = useState<null | HTMLElement>(null);

  const toggleRenderLess = () => {
    console.log("window.innerWidth", window.innerWidth);
    setRenderLess(window.innerWidth < 960);
  };

  useEffect(() => {
    toggleRenderLess();
    window.addEventListener("resize", toggleRenderLess);
    return () => window.removeEventListener("resize", toggleRenderLess);
  }, []);

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
      <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
        {/* <Button variant="outlined">Toggle pin/all</Button> */}

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
            <TableCell>Pin</TableCell>
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
