import React, { useState } from "react";
import Sidebar from "../../bots/sidebar.jsx";
import Dashboard from "../../bots/dashboard.jsx";
import TradingBots from "../../bots/trading-bots.jsx";
import CreateBot from "../../bots/create-bot.jsx";
import BotDetails from "../../bots/bot-details.jsx";
import Portfolio from "../../bots/portfolio.jsx";
import TradingHistory from "../../bots/trading-history.jsx";
import Settings from "../../bots/settings.jsx";
// import Docs from "../docs/Docs.jsx";

const mockBots = [
  {
    id: "1",
    name: "BTC Scalper Pro",
    strategy: "Scalping",
    pair: "BTC/USDT",
    status: "active",
    pnl: 2847.32,
    pnlPercent: 12.4,
    totalTrades: 1247,
    winRate: 68.5,
    balance: 25000,
    lastTrade: "2 мин назад",
    exchange: "Binance",
  },
  {
    id: "2",
    name: "ETH Grid Bot",
    strategy: "Grid Trading",
    pair: "ETH/USDT",
    status: "active",
    pnl: -156.78,
    pnlPercent: -0.8,
    totalTrades: 856,
    winRate: 72.3,
    balance: 20000,
    lastTrade: "5 мин назад",
    exchange: "Bybit",
  },
  {
    id: "3",
    name: "Altcoin DCA",
    strategy: "DCA",
    pair: "ADA/USDT",
    status: "paused",
    pnl: 1234.56,
    pnlPercent: 8.2,
    totalTrades: 432,
    winRate: 45.8,
    balance: 15000,
    lastTrade: "1 час назад",
    exchange: "OKX",
  },
  {
    id: "4",
    name: "SOL Momentum",
    strategy: "Momentum",
    pair: "SOL/USDT",
    status: "active",
    pnl: 3421.89,
    pnlPercent: 22.8,
    totalTrades: 234,
    winRate: 78.2,
    balance: 18000,
    lastTrade: "30 сек назад",
    exchange: "Binance",
  },
];

const Bots = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedBot, setSelectedBot] = useState(null);
  const [bots, setBots] = useState(mockBots);

  const renderPage = () => {
    if (selectedBot) {
      return (
        <BotDetails
          bot={selectedBot}
          onBack={() => setSelectedBot(null)}
          onUpdate={(updatedBot) => {
            setBots(bots.map((b) => (b.id === updatedBot.id ? updatedBot : b)));
            setSelectedBot(updatedBot);
          }}
        />
      );
    }

    switch (currentPage) {
      case "dashboard":
        return <Dashboard bots={bots} />;
      case "bots":
        return (
          <TradingBots
            bots={bots}
            onSelectBot={setSelectedBot}
            onUpdateBot={(updatedBot) => {
              setBots(bots.map((b) => (b.id === updatedBot.id ? updatedBot : b)));
            }}
            onCreateBot={() => setCurrentPage("create-bot")}
          />
        );
      case "create-bot":
        return (
          <CreateBot
            onBack={() => setCurrentPage("bots")}
            onSave={(newBot) => {
              setBots([...bots, { ...newBot, id: Date.now().toString() }]);
              setCurrentPage("bots");
            }}
          />
        );
      case "portfolio":
        return <Portfolio bots={bots} />;
      case "history":
        return <TradingHistory bots={bots} />;
      case "settings":
        return <Settings />;
      // case "docs":
      //   return <Docs />;
      default:
        return <Dashboard bots={bots} />;
    }
  };

  return (
    <div className="flex h-screen bg-surface text-text-base">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1 overflow-auto">{renderPage()}</main>
    </div>
  );
};

export default Bots;