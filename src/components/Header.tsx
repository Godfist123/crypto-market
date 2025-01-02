"use client";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, MenuItem } from "@mui/material";
import Image from "next/image";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(1),
  width: "300px",
  height: "40px",
  [theme.breakpoints.up("sm")]: {
    width: "400px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  height: "100%",
  fontFamily: "Arial, sans-serif",
  fontSize: "1.2rem",
  fontWeight: "bold",
  textAlign: "center",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    height: "100%",
  },
}));

export default function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [suggestions, setSuggestions] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuWidth, setMenuWidth] = useState<number | null>(null);

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim() === "") {
        setSuggestions([]);
        return;
      }

      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL || window.location.origin;
        const response = await fetch(
          `${baseUrl}/api/searchBar/?query=${query}`
        );
        if (!response.ok) {
          throw new Error(`Error fetching suggestions: ${response.status}`);
        }

        const data = await response.json();
        setSuggestions(data.coins);
      } catch (error) {
        console.error(error);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300); // Debounce
    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    if (searchRef.current) {
      setMenuWidth(searchRef.current.offsetWidth);
    }
  }, [searchRef.current]);

  const handleSuggestionClick = (id: string) => {
    router.push(`/coins/${id}`);
    setQuery("");
    setSuggestions([]);
    setAnchorEl(null);
  };

  const handleMenuClose = () => {
    setSuggestions([]);
    setAnchorEl(null); // Close the menu
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ height: 60, backgroundColor: "#333" }}>
        <Toolbar>
          <CurrencyBitcoinIcon
            sx={{ color: "#E2C4C4", marginRight: 2, fontSize: 40 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="div"
            color="#EEE4E4"
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                sm: "block",
                fontFamily: "Arial, sans-serif",
                fontSize: "1.5rem",
                fontWeight: "bold",
              },
            }}
          >
            CRYPTO-MARKET
          </Typography>
          <Search ref={searchRef}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Invest Your Dreams "
              value={query}
              onChange={handleInputChange}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          {suggestions.length > 0 && (
            <Menu
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleMenuClose}
              PaperProps={{
                style: {
                  maxHeight: 48 * 4.5, // Limit the height
                  width: menuWidth ? `${menuWidth}px` : "300px",
                },
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              disableAutoFocus
              disableEnforceFocus
            >
              {suggestions.map((coin) => (
                <MenuItem
                  key={coin.id}
                  onClick={() => handleSuggestionClick(coin.id)}
                >
                  <Box display="flex" alignItems="center">
                    <Image
                      src={coin.thumb}
                      alt={coin.name}
                      width={24}
                      height={24}
                      style={{ marginRight: 8 }}
                    />
                    <Typography>{coin.name}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
