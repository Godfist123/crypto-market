import React from "react";
import { render, screen } from "@testing-library/react";
import CryptoTable from "@/components/CryptoTable";
import { ThemeProvider, createTheme } from "@mui/material/styles";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

const mockData = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    image: "https://assets.coingecko.com/bitcoin.png",
    current_price: 30000,
    market_cap: 600000000,
    high_24h: 32000,
    price_change_percentage_24h: -2.5,
  },
];

const theme = createTheme();

describe("CryptoTable", () => {
  it("renders the table with correct headers", () => {
    render(
      <ThemeProvider theme={theme}>
        <CryptoTable
          data={mockData}
          sortBy="market_cap"
          sortOrder="asc"
          setSortBy={jest.fn()}
          setSortOrder={jest.fn()}
          setRenderLess={jest.fn()}
        />
      </ThemeProvider>
    );

    // Assert header texts are present
    expect(screen.getByText("#")).toBeInTheDocument();
    expect(screen.getByText("Coin")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Market Cap")).toBeInTheDocument();
    expect(screen.getByText("High 24h")).toBeInTheDocument();
    expect(screen.getByText("Change 24h")).toBeInTheDocument();
  });

  it("renders the data rows correctly", () => {
    render(
      <ThemeProvider theme={theme}>
        <CryptoTable
          data={mockData}
          sortBy="market_cap"
          sortOrder="asc"
          setSortBy={jest.fn()}
          setSortOrder={jest.fn()}
          setRenderLess={jest.fn()}
        />
      </ThemeProvider>
    );

    // Use getByRole to target the correct row containing Bitcoin
    const row = screen.getByText(/Bitcoin/i).closest("tr");
    expect(row).toBeInTheDocument();

    if (row) {
      const cells = row.children;
      // Assert the data in the row is correct
      expect(cells[0]).toHaveTextContent("1");
      expect(cells[1]).toHaveTextContent("Bitcoin");
      expect(cells[2]).toHaveTextContent("$30000");
      expect(cells[3]).toHaveTextContent("$600000000");
      expect(cells[4]).toHaveTextContent("$32000");
      expect(cells[5]).toHaveTextContent("-2.50%");
    } else {
      throw new Error("Row containing Bitcoin not found");
    }
  });
});
