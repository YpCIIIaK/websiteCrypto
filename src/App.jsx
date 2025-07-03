import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import Navbar from './components/navbar/Navbar.jsx';
import Home from './pages/home/Home.jsx';
import Backtest from './pages/backtest/Backtest.jsx';
import Bots from './pages/bots/Bots.jsx';
import Pricing from './pages/pricing/Pricing.jsx';
import Footer from "./components/footer/Footer.jsx";
import Tickers from "./pages/tickers/Tickers.jsx";
import CoinDetailPage from "./components/coin-detail-page";
import { ThemeProvider } from "./components/theme-provider";

const App = () => {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Router>
                <div className="min-h-screen">
                    <Navbar />
                    <main className="pt-16">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/tickers" element={<Tickers />} />
                            <Route path="/coin/:coinId" element={<CoinDetailPage />} />
                            <Route path="/backtest" element={<Backtest />} />
                            <Route path="/bots" element={<Bots />} />
                            <Route path="/pricing" element={<Pricing />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </ThemeProvider>
    );
};

export default App;
