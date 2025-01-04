import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CryptoTableRow from "@/components/tableComponents/tableRow";

const mockCoin = {
  id: "bitcoin",
  name: "Bitcoin",
  symbol: "BTC",
  image: "https://assets.coingecko.com/bitcoin.png",
  current_price: 30000,
  market_cap: 600000000,
  high_24h: 32000,
  price_change_percentage_24h: -2.5,
};

const mockToggleRowExpansion = jest.fn();
const mockOnRowClick = jest.fn();

describe("CryptoTableRow", () => {
  it("renders a row with the correct data", () => {
    render(
      <table>
        <tbody>
          <CryptoTableRow
            coin={mockCoin}
            index={0}
            isMobile={false}
            isExpanded={false}
            toggleRowExpansion={mockToggleRowExpansion}
            onRowClick={mockOnRowClick}
          />
        </tbody>
      </table>
    );

    expect(screen.getByText("Bitcoin (BTC)")).toBeInTheDocument();
  });

  it("calls onRowClick when the row is clicked", () => {
    render(
      <table>
        <tbody>
          <CryptoTableRow
            coin={mockCoin}
            index={0}
            isMobile={false}
            isExpanded={false}
            toggleRowExpansion={mockToggleRowExpansion}
            onRowClick={mockOnRowClick}
          />
        </tbody>
      </table>
    );

    fireEvent.click(
      screen
        .getByText(/Bitcoin/i) //ignore case
        .closest("tr")!
    );
    expect(mockOnRowClick).toHaveBeenCalledWith("bitcoin");
  });

  it("calls toggleRowExpansion in mobile mode when the toggle button is clicked", () => {
    render(
      <table>
        <tbody>
          <CryptoTableRow
            coin={mockCoin}
            index={0}
            isMobile={true}
            isExpanded={false}
            toggleRowExpansion={mockToggleRowExpansion}
            onRowClick={mockOnRowClick}
          />
        </tbody>
      </table>
    );

    fireEvent.click(screen.getByRole("button"));
    expect(mockToggleRowExpansion).toHaveBeenCalledWith("bitcoin");
  });
});
