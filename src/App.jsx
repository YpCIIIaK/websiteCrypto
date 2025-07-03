import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import CoinGeckoPage from "./components/coingecko-page";
import CoinDetailPage from "./components/coin-detail-page";
import { ThemeProvider } from "./components/theme-provider";

function CoinDetailPageWrapper() {
  const { symbol } = useParams();
  return <CoinDetailPage symbol={symbol} />;
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Router>
        <Routes>
          <Route path="/" element={<CoinGeckoPage />} />
          <Route path="/coin/:symbol" element={<CoinDetailPageWrapper />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 