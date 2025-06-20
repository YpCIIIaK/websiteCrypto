"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export default function BotDetails({ bot, onBack, onUpdate }) {
  const [activeTab, setActiveTab] = useState("overview")

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
          <Button variant="outline" className="border-brand-dark text-gray-300">
            <Settings className="h-4 w-4 mr-2" />
            Настройки
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

        <TabsContent value="overview" className="space-y-6">
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

        <TabsContent value="trades">
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

        <TabsContent value="logs">
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

        <TabsContent value="settings">
          <Card className="bg-surface-alt border-brand-dark">
            <CardHeader>
              <CardTitle className="text-base">Настройки бота</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-base font-medium mb-4">Торговые параметры</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted">Стоп-лосс:</span>
                        <span className="text-base">2.0%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Тейк-профит:</span>
                        <span className="text-base">3.0%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Макс. сделок в день:</span>
                        <span className="text-base">50</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Размер позиции:</span>
                        <span className="text-base">10% от баланса</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-medium mb-4">Риск-менеджмент</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted">Максимальная просадка:</span>
                        <span className="text-base">5.0%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Дневной лимит убытков:</span>
                        <span className="text-base">$500</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Автостоп при убытке:</span>
                        <span className="text-success">Включен</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
