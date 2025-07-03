"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
import {
  ArrowLeft,
  Play,
  Pause,
  Settings,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Activity,
  BarChart3,
  Terminal,
} from "lucide-react"

const mockTrades = [
  { id: 1, time: "14:30:25", type: "BUY", amount: "0.1 BTC", price: "$43,250", pnl: "+$125.50", status: "filled" },
  { id: 2, time: "14:28:15", type: "SELL", amount: "0.1 BTC", price: "$43,125", pnl: "-$45.20", status: "filled" },
  { id: 3, time: "14:25:10", type: "BUY", amount: "0.1 BTC", price: "$43,170", pnl: "+$89.30", status: "filled" },
  { id: 4, time: "14:22:05", type: "SELL", amount: "0.1 BTC", price: "$43,080", pnl: "+$156.80", status: "filled" },
]

const mockLogs = [
  { id: 1, time: "14:30:25", level: "info", message: "RSI: 28.5, SMA20: $43,200 - Сигнал на покупку" },
  { id: 2, time: "14:30:26", level: "success", message: "Ордер на покупку 0.1 BTC по $43,250 исполнен" },
  { id: 3, time: "14:28:15", level: "info", message: "RSI: 72.3 - Сигнал на продажу" },
  { id: 4, time: "14:28:16", level: "success", message: "Ордер на продажу 0.1 BTC по $43,125 исполнен" },
  { id: 5, time: "14:25:10", level: "warning", message: "Высокая волатильность обнаружена" },
]

const Tabs = ({ value, onValueChange, children, className = "" }) => {
  const [active, setActive] = useState(value || "overview");
  const handleChange = (val) => {
    setActive(val);
    if (onValueChange) onValueChange(val);
  };
  return (
    <div className={className}>
      {React.Children.map(children, (child) =>
        child && child.type && child.type.displayName === "TabsList"
          ? React.cloneElement(child, { active, onChange: handleChange })
          : child
      )}
    </div>
  );
};
Tabs.displayName = "Tabs";

const TabsList = ({ children, active, onChange, className = "" }) => (
  <div className={`flex gap-2 bg-surface-alt border-brand-dark rounded-xl p-1 mb-4 ${className}`}>
    {React.Children.map(children, (child) =>
      child && child.type && child.type.displayName === "TabsTrigger"
        ? React.cloneElement(child, { active, onChange })
        : child
    )}
  </div>
);
TabsList.displayName = "TabsList";

const TabsTrigger = ({ value, active, onChange, children, className = "", ...props }) => (
  <button
    type="button"
    className={`flex items-center px-6 py-2 rounded-xl font-medium text-base focus:outline-none transition-colors duration-150 ${active === value ? "bg-surface text-accent shadow" : "text-muted hover:text-accent hover:bg-surface/40"} ${className}`}
    onClick={() => onChange && onChange(value)}
    {...props}
  >
    {children}
  </button>
);
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = ({ value, children, active, className = "" }) => {
  if (active !== value) return null;
  return <div className={className}>{children}</div>;
};
TabsContent.displayName = "TabsContent";

export default function BotDetails({ bot, onBack, onUpdate }) {
  const [activeTab, setActiveTab] = useState("overview")

  const [form, setForm] = useState({
    stopLoss: bot.stopLoss ?? 2.0,
    takeProfit: bot.takeProfit ?? 3.0,
    maxTrades: bot.maxTrades ?? 50,
    positionSize: bot.positionSize ?? 10,
    maxDrawdown: bot.maxDrawdown ?? 5.0,
    dailyLossLimit: bot.dailyLossLimit ?? 500,
    autoStop: bot.autoStop ?? true,
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setForm({
      stopLoss: bot.stopLoss ?? 2.0,
      takeProfit: bot.takeProfit ?? 3.0,
      maxTrades: bot.maxTrades ?? 50,
      positionSize: bot.positionSize ?? 10,
      maxDrawdown: bot.maxDrawdown ?? 5.0,
      dailyLossLimit: bot.dailyLossLimit ?? 500,
      autoStop: bot.autoStop ?? true,
    });
    setEditing(false);
  }, [bot]);

  const toggleBotStatus = () => {
    const newStatus = bot.status === "active" ? "paused" : "active"
    onUpdate({ ...bot, status: newStatus })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-success"
      case "paused":
        return "bg-warn"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="text-gray-400 hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к ботам
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-base flex items-center gap-3">
              {bot.name}
              <Badge className={getStatusColor(bot.status)}>
                {bot.status === "active" ? "Активен" : bot.status === "paused" ? "Пауза" : "Остановлен"}
              </Badge>
            </h1>
            <p className="text-muted">
              {bot.strategy} • {bot.pair} • {bot.exchange}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={toggleBotStatus}
            className={bot.status === "active" ? "bg-warn hover:bg-yellow-700" : "bg-success hover:bg-green-700"}
          >
            {bot.status === "active" ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Приостановить
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Запустить
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-surface-alt border-brand-dark">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted">P&L</CardTitle>
            {bot.pnl >= 0 ? (
              <TrendingUp className="h-4 w-4 text-success" />
            ) : (
              <TrendingDown className="h-4 w-4 text-danger" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${bot.pnl >= 0 ? "text-success" : "text-danger"}`}>
              {bot.pnl >= 0 ? "+" : ""}${bot.pnl.toFixed(2)}
            </div>
            <p className="text-xs text-muted">
              {bot.pnlPercent >= 0 ? "+" : ""}
              {bot.pnlPercent.toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card className="bg-surface-alt border-brand-dark">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted">Баланс</CardTitle>
            <DollarSign className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-base">${bot.balance.toLocaleString()}</div>
            <p className="text-xs text-muted">USDT</p>
          </CardContent>
        </Card>

        <Card className="bg-surface-alt border-brand-dark">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted">Винрейт</CardTitle>
            <Target className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-base">{bot.winRate.toFixed(1)}%</div>
            <p className="text-xs text-muted">{bot.totalTrades} сделок</p>
          </CardContent>
        </Card>

        <Card className="bg-surface-alt border-brand-dark">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted">Последняя сделка</CardTitle>
            <Activity className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-base">{bot.lastTrade}</div>
            <p className="text-xs text-muted">статус: исполнена</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-surface-alt border-brand-dark">
          <TabsTrigger value="overview" className="data-[state=active]:bg-surface">
            <BarChart3 className="h-4 w-4 mr-2" />
            Обзор
          </TabsTrigger>
          <TabsTrigger value="trades" className="data-[state=active]:bg-surface">
            <Activity className="h-4 w-4 mr-2" />
            Сделки
          </TabsTrigger>
          <TabsTrigger value="logs" className="data-[state=active]:bg-surface">
            <Terminal className="h-4 w-4 mr-2" />
            Логи
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-surface">
            <Settings className="h-4 w-4 mr-2" />
            Настройки
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" active={activeTab} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-surface-alt border-brand-dark">
              <CardHeader>
                <CardTitle className="text-base">Производительность</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-base">Прибыльные сделки</span>
                      <span className="text-muted">{Math.round((bot.winRate / 100) * bot.totalTrades)}</span>
                    </div>
                    <Progress value={bot.winRate} className="h-2 bg-gray-800" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                      <p className="text-muted text-sm">Всего сделок</p>
                      <p className="text-base font-bold text-lg">{bot.totalTrades}</p>
                    </div>
                    <div>
                      <p className="text-muted text-sm">Средняя прибыль</p>
                      <p className="text-success font-bold text-lg">${(bot.pnl / bot.totalTrades).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-surface-alt border-brand-dark">
              <CardHeader>
                <CardTitle className="text-base">Последние сделки</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockTrades.slice(0, 4).map((trade) => (
                    <div key={trade.id} className="flex items-center justify-between p-2 bg-surface rounded">
                      <div className="flex items-center space-x-3">
                        <Badge
                          variant="outline"
                          className={
                            trade.type === "BUY" ? "text-success border-green-400" : "text-danger border-red-400"
                          }
                        >
                          {trade.type}
                        </Badge>
                        <div>
                          <p className="text-base text-sm">{trade.amount}</p>
                          <p className="text-muted text-xs">{trade.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-base text-sm">{trade.price}</p>
                        <p className={`text-xs ${trade.pnl.startsWith("+") ? "text-success" : "text-danger"}`}>
                          {trade.pnl}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trades" active={activeTab}>
          <Card className="bg-surface-alt border-brand-dark">
            <CardHeader>
              <CardTitle className="text-base">История сделок</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockTrades.map((trade) => (
                  <div key={trade.id} className="flex items-center justify-between p-4 bg-surface rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Badge
                        variant="outline"
                        className={
                          trade.type === "BUY" ? "text-success border-green-400" : "text-danger border-red-400"
                        }
                      >
                        {trade.type}
                      </Badge>
                      <div>
                        <p className="text-base font-medium">{trade.amount}</p>
                        <p className="text-muted text-sm">{trade.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-medium">{trade.price}</p>
                      <p className={`text-sm ${trade.pnl.startsWith("+") ? "text-success" : "text-danger"}`}>
                        {trade.pnl}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" active={activeTab}>
          <Card className="bg-surface-alt border-brand-dark">
            <CardHeader>
              <CardTitle className="text-base">Логи торговли</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-surface rounded-lg p-4 font-mono text-sm max-h-96 overflow-y-auto">
                {mockLogs.map((log) => (
                  <div key={log.id} className="mb-2 flex">
                    <span className="text-muted mr-4">{log.time}</span>
                    <span
                      className={`mr-4 uppercase text-xs font-bold ${
                        log.level === "success"
                          ? "text-success"
                          : log.level === "warning"
                            ? "text-yellow-400"
                            : "text-blue-400"
                      }`}
                    >
                      [{log.level}]
                    </span>
                    <span className="text-gray-300">{log.message}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" active={activeTab}>
          <Card className="bg-surface-alt border-brand-dark">
            <CardHeader>
              <CardTitle className="text-base">Настройки бота</CardTitle>
            </CardHeader>
            <CardContent>
              <BotSettingsForm bot={bot} onUpdate={onUpdate} form={form} setForm={setForm} editing={editing} setEditing={setEditing} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function BotSettingsForm({ bot, onUpdate, form, setForm, editing, setEditing }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setEditing(true);
  };

  const handleSave = () => {
    onUpdate({ ...bot, ...form });
    setEditing(false);
  };

  const handleCancel = () => {
    setForm({
      stopLoss: bot.stopLoss ?? 2.0,
      takeProfit: bot.takeProfit ?? 3.0,
      maxTrades: bot.maxTrades ?? 50,
      positionSize: bot.positionSize ?? 10,
      maxDrawdown: bot.maxDrawdown ?? 5.0,
      dailyLossLimit: bot.dailyLossLimit ?? 500,
      autoStop: bot.autoStop ?? true,
    });
    setEditing(false);
  };

  return (
    <form className="space-y-6" onSubmit={e => { e.preventDefault(); handleSave(); }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-base font-medium mb-4">Торговые параметры</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <label className="text-muted min-w-[160px]">Стоп-лосс:</label>
              <input
                type="number"
                step="0.1"
                name="stopLoss"
                value={form.stopLoss}
                onChange={handleChange}
                className="bg-surface border-surface-alt text-base rounded px-2 py-1 w-24 text-right"
              />
              <span className="text-base min-w-[24px] text-right">%</span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-muted min-w-[160px]">Тейк-профит:</label>
              <input
                type="number"
                step="0.1"
                name="takeProfit"
                value={form.takeProfit}
                onChange={handleChange}
                className="bg-surface border-surface-alt text-base rounded px-2 py-1 w-24 text-right"
              />
              <span className="text-base min-w-[24px] text-right">%</span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-muted min-w-[160px]">Макс. сделок в день:</label>
              <input
                type="number"
                name="maxTrades"
                value={form.maxTrades}
                onChange={handleChange}
                className="bg-surface border-surface-alt text-base rounded px-2 py-1 w-24 text-right"
              />
              <span className="text-base min-w-[24px] text-right"></span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-muted min-w-[160px]">Размер позиции:</label>
              <input
                type="number"
                name="positionSize"
                value={form.positionSize}
                onChange={handleChange}
                className="bg-surface border-surface-alt text-base rounded px-2 py-1 w-24 text-right"
              />
              <span className="text-base min-w-[80px] text-right">% от баланса</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-base font-medium mb-4">Риск-менеджмент</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <label className="text-muted min-w-[160px]">Максимальная просадка:</label>
              <input
                type="number"
                step="0.1"
                name="maxDrawdown"
                value={form.maxDrawdown}
                onChange={handleChange}
                className="bg-surface border-surface-alt text-base rounded px-2 py-1 w-24 text-right"
              />
              <span className="text-base min-w-[24px] text-right">%</span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-muted min-w-[160px]">Дневной лимит убытков:</label>
              <input
                type="number"
                name="dailyLossLimit"
                value={form.dailyLossLimit}
                onChange={handleChange}
                className="bg-surface border-surface-alt text-base rounded px-2 py-1 w-24 text-right"
              />
              <span className="text-base min-w-[24px] text-right">$</span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-muted min-w-[160px]">Автостоп при убытке:</label>
              <input
                type="checkbox"
                name="autoStop"
                checked={form.autoStop}
                onChange={handleChange}
                className="accent-accent w-5 h-5"
              />
              <span className="text-base min-w-[24px] text-right"></span>
            </div>
          </div>
        </div>
      </div>
      {editing && (
        <div className="flex gap-4 justify-end pt-4">
          <Button type="button" variant="outline" onClick={handleCancel} className="border-surface-alt text-muted">
            Отмена
          </Button>
          <Button type="submit" className="bg-accent hover:bg-accent-light">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
}
