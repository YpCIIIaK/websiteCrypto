import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar.jsx';
import Home from './pages/home/Home.jsx'
import Tokens from './pages/tokens/Tokens.jsx';
import CoinDetail from './pages/coin/CoinDetail.jsx';
import Backtest from './pages/backtest/Backtest.jsx';
import Bots from './pages/bots/Bots.jsx';
import Pricing from './pages/pricing/Pricing.jsx';
import Footer from "./components/footer/Footer.jsx";

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-brand dark:bg-gray-900">
                <Navbar />
                <main className="pt-16">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/tokens" element={<Tokens />} />
                        <Route path="/coin/:symbol" element={<CoinDetail />} />
                        <Route path="/backtest" element={<Backtest />} />
                        <Route path="/bots" element={<Bots />} />
                        <Route path="/pricing" element={<Pricing />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;