# Crypto-Market

**Crypto-Market** is a web application that provides real-time cryptocurrency information, including price charts, detailed pages for each coin, and the ability to sort and filter by various attributes.

## Technologies Used

- **Next.js 15**
- **React**
- **Material-UI**
- **Chart.js**
- **Docker**
- **GitHub Actions**
- **Jest** (for testing)

## Key Features

1. **Real-Time Cryptocurrency Data**
  
  - Displays up-to-date information for multiple cryptocurrencies.
  - Includes attributes like price, market cap, and 24-hour price change.
2. **Detailed Coin Pages**
  
  - Provides in-depth information about individual cryptocurrencies.
  - Displays price charts for customizable time intervals.
  - Additional details include hashing algorithm, circulating supply, and links to the official website, whitepaper, and blockchain explorers.
3. **Sorting and Filtering**
  
  - Sort by market cap, volume, or ID.
  - Supports ascending and descending order.
4. **Search Functionality**
  
  - Instant search with suggestions for cryptocurrencies.
  - Redirects to the detailed page upon selection.
5. **Pagination**
  
  - Navigate through pages of cryptocurrencies.
  - Smooth scrolling to the top on page change.
6. **Responsive Design**
  
  - Optimized for both mobile and desktop devices.
  - Adjusts chart data display and additional details based on screen size.
7. **Interactive Price Charts**
  
  - Visualize price changes over time using interactive charts.
  - Charts auto-refresh every 5 minutes for real-time updates.

## Setup Instructions

### Development Environment

1. **Clone the Repository**:
  
  ```bash
  git clone https://github.com/your-username/crypto-market.git
  cd crypto-market
  ```
  
2. **Install Dependencies**:
  
  ```bash
  npm install
  ```
  
3. **Run Locally**:
  
  ```bash
  npm run dev
  ```
  
  Visit `http://localhost:3000` in your browser.
  

### Production Environment

1. **Build the Project**:
  
  ```bash
  npm run build
  ```
  
2. **Start the Server**:
  
  ```bash
  npm start
  ```
  

### Docker Setup

1. **Build the Docker Image**:
  
  ```bash
  docker build -t crypto-market .
  ```
  
2. **Run the Docker Container**:
  
  ```bash
  docker run -p 3000:3000 crypto-market
  ```
  
  Visit `http://localhost:3000` in your browser.
  

## API Usage

The application uses custom API endpoints for fetching cryptocurrency data. Below are the key API routes:

1. `/api/coinlist`
  
  - **Description**: Retrieves a paginated list of cryptocurrencies sorted by the specified criteria.
  - **Query Parameters**:
    - `sortBy` (string): Attribute to sort by (e.g., `market_cap`, `volume`, `id`).
    - `sortOrder` (string): Order of sorting (`asc` or `desc`).
    - `page` (number): Page number.
    - `renderLess` (boolean): Adjusts the number of items per page (mobile optimization).
2. `/api/coinDetail`
  
  - **Description**: Retrieves detailed information for a specific cryptocurrency.
  - **Query Parameters**:
    - `coinId` (string): The ID of the cryptocurrency.
3. `/api/chartData`
  
  - **Description**: Retrieves chart data for a specific cryptocurrency over a given time range.
  - **Query Parameters**:
    - `coinId` (string): The ID of the cryptocurrency.
    - `from` (timestamp): Start time.
    - `to` (timestamp): End time.
4. `/api/searchBar`
  
  - **Description**: Provides search suggestions for cryptocurrencies.
  - **Query Parameters**:
    - `query` (string): Search term.

## Deployment

- The project is deployed on **Vercel** for production.
- **Docker** is used to containerize the application for consistent deployment across environments.

## Testing

The application includes comprehensive unit and integration tests written using **Jest** and **React Testing Library**. Below are the key components tested:

- **CryptoDetail Component**:
  
  - Verifies the proper rendering of cryptocurrency details.
  - Tests responsiveness and data fetching.
- **CryptoTable Component**:
  
  - Checks that headers and data rows render correctly.
  - Ensures pagination and sorting functionality.
- **API Calls**:
  
  - Mocked responses test the integration of API endpoints with components.
- **Utilities**:
  
  - Authentication and data fetching utilities are validated for proper error handling and API integration.

### Run Tests

1. **Run All Tests**:
  
  ```bash
  npm run test
  ```
  
2. **Run a Specific Test**:
  
  ```bash
  npm test -- --testNamePattern="<test name>"
  ```
  
3. **Watch Mode**:
  
  ```bash
  npm test -- --watch
  ```
  

## Contact

- **Author**: Ryan Ren
- **Email**: penghaoren7@gmail.com
- **GitHub**: github.com/Godfist123