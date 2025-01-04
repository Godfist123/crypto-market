import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CryptoTableBody from "@/components/tableComponents/tableBody";
import "@testing-library/jest-dom";

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

const mockToggleRowExpansion = jest.fn();
const mockOnRowClick = jest.fn();

describe("CryptoTableBody", () => {
  it("renders rows correctly", () => {
    render(
      <table>
        <CryptoTableBody
          data={mockData}
          isMobile={false}
          expandedRows={{}}
          toggleRowExpansion={mockToggleRowExpansion}
          onRowClick={mockOnRowClick}
        />
      </table>
    );

    expect(screen.getByText("Bitcoin (BTC)")).toBeInTheDocument();
  });

  it("calls onRowClick when a row is clicked", () => {
    render(
      <table>
        <CryptoTableBody
          data={mockData}
          isMobile={false}
          expandedRows={{}}
          toggleRowExpansion={mockToggleRowExpansion}
          onRowClick={mockOnRowClick}
        />
      </table>
    );

    const row = screen.getByText(/Bitcoin/i).closest("tr");
    expect(row).toBeInTheDocument();

    // Simulate a click
    fireEvent.click(row!);

    // Verify the callback was called with the correct ID
    expect(mockOnRowClick).toHaveBeenCalledWith("bitcoin");
  });
});
