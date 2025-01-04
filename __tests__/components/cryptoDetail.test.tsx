import React from "react";
import { render, screen, act } from "@testing-library/react";
import CryptoDetail from "@/components/CryptoDetail";

// eslint-disable-next-line react/display-name
jest.mock("@/components/PriceChart", () => () => (
  <div data-testid="price-chart">Mocked Price Chart</div>
));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    statusText: "OK",
    headers: new Headers(),
    redirected: false,
    json: () =>
      Promise.resolve({
        prices: [
          [1639000000000, 60000],
          [1639003600000, 60500],
        ],
      }),
  } as Response)
);

const mockCoinData = {
  id: "bitcoin",
  name: "Bitcoin",
  symbol: "BTC",
  image: { large: "https://assets.coingecko.com/bitcoin.png" },
  hashing_algorithm: "SHA-256",
  categories: ["Cryptocurrency"],
  description: { en: "Bitcoin is a decentralized cryptocurrency." },
  market_data: {
    current_price: { usd: 30000 },
    market_cap: { usd: 600000000 },
    total_volume: { usd: 1000000 },
    high_24h: { usd: 32000 },
    low_24h: { usd: 28000 },
    price_change_percentage_24h: 2.5,
    circulating_supply: 18000000,
    total_supply: 21000000,
    max_supply: 21000000,
  },
  links: {
    homepage: ["https://bitcoin.org"],
    blockchain_site: ["https://blockchain.com"],
    whitepaper: "https://bitcoin.org/bitcoin.pdf",
  },
};

describe("CryptoDetail Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders coin details correctly", async () => {
    await act(async () => {
      render(<CryptoDetail data={mockCoinData} />);
    });

    // Assert specific elements
    expect(
      screen.getByRole("heading", { name: /Bitcoin/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/SHA-256/i)).toBeInTheDocument();
  });

  it("adjusts visible hours on window resize", async () => {
    await act(async () => {
      render(<CryptoDetail data={mockCoinData} />);
    });

    act(() => {
      global.innerWidth = 500;
      global.dispatchEvent(new Event("resize"));
    });

    expect(
      await screen.findByText(/Price Chart \(Last 2 Hours\)/i)
    ).toBeInTheDocument();
  });
});
