import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar.jsx';
import Home from './pages/home/Home.jsx'
import Tickers from './pages/tickers/Tickers.jsx';
import Backtest from './pages/backtest/Backtest.jsx';
import Bots from './pages/bots/Bots.jsx';
import Pricing from './pages/pricing/Pricing.jsx';
import Footer from "./components/footer/Footer.jsx";

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-brand dark:bg-gray-900">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tickers" element={<Tickers />} />
                    <Route path="/backtest" element={<Backtest />} />
                    <Route path="/bots" element={<Bots />} />
                    <Route path="/pricing" element={<Pricing />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;