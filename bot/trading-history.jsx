"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { History, Search, Filter, TrendingUp, TrendingDown } from "lucide-react"

const mockHistory = [
  {
    id: 1,
    bot: "BTC Scalper Pro",
    pair: "BTC/USDT",
    type: "BUY",
    amount: "0.1 BTC",
    price: "$43,250.00",
    total: "$4,325.00",
    pnl: "+$125.50",
    time: "2024-01-15 14:30:25",
    status: "filled",
  },
  {
    id: 2,
    bot: "ETH Grid Bot",
    pair: "ETH/USDT",
    type: "SELL",
    amount: "2.5 ETH",
    price: "$2,580.00",
    total: "$6,450.00",
    pnl: "-$45.20",
    time: "2024-01-15 14:28:15",
    status: "filled",
  },
  {
    id: 3,
    bot: "BTC Scalper Pro",
    pair: "BTC/USDT",
    type: "BUY",
    amount: "0.1 BTC",
    price: "$43,170.00",
    total: "$4,317.00",
    pnl: "+$89.30",
    time: "2024-01-15 14:25:10",
    status: "filled",
  },
  {
    id: 4,
    bot: "SOL Momentum",
    pair: "SOL/USDT",
    type: "SELL",
    amount: "50 SOL",
    price: "$98.50",
    total: "$4,925.00",
    pnl: "+$156.80",
    time: "2024-01-15 14:22:05",
    status: "filled",
  },
  {
    id: 5,
    bot: "Altcoin DCA",
    pair: "ADA/USDT",
    type: "BUY",
    amount: "1000 ADA",
    price: "$0.485",
    total: "$485.00",
    pnl: "+$12.40",
    time: "2024-01-15 14:20:30",
    status: "filled",
  },
]

export default function TradingHistory({ bots }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBot, setFilterBot] = useState("all")
  const [filterType, setFilterType] = useState("all")

  const filteredHistory = mockHistory.filter((trade) => {
    const matchesSearch =
      trade.bot.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trade.pair.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBot = filterBot === "all" || trade.bot === filterBot
    const matchesType = filterType === "all" || trade.type === filterType
    return matchesSearch && matchesBot && matchesType
  })

  const totalPnL = filteredHistory.reduce((sum, trade) => {
    const pnl = Number.parseFloat(trade.pnl.replace(/[+$,]/g, ""))
    return sum + pnl
  }, 0)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-base flex items-center">
          <History className="h-8 w-8 mr-3 text-accent" />
          История сделок
        </h1>
        <p className="text-muted mt-2">Полная история торговых операций ваших ботов</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-surface-alt border-brand-dark">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted">Всего сделок</CardTitle>
            <History className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-base">{filteredHistory.length}</div>
            <p className="text-xs text-muted">за период</p>
          </CardContent>
        </Card>

        <Card className="bg-surface-alt border-brand-dark">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted">Общий P&L</CardTitle>
            {totalPnL >= 0 ? (
              <TrendingUp className="h-4 w-4 text-success" />
            ) : (
              <TrendingDown className="h-4 w-4 text-danger" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalPnL >= 0 ? "text-success" : "text-danger"}`}>
              {totalPnL >= 0 ? "+" : ""}${totalPnL.toFixed(2)}
            </div>
            <p className="text-xs text-muted">по выбранным сделкам</p>
          </CardContent>
        </Card>

        <Card className="bg-surface-alt border-brand-dark">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted">Прибыльных</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {filteredHistory.filter((trade) => trade.pnl.startsWith("+")).length}
            </div>
            <p className="text-xs text-muted">
              {(
                (filteredHistory.filter((trade) => trade.pnl.startsWith("+")).length / filteredHistory.length) *
                100
              ).toFixed(1)}
              %
            </p>
          </CardContent>
        </Card>

        <Card className="bg-surface-alt border-brand-dark">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted">Убыточных</CardTitle>
            <TrendingDown className="h-4 w-4 text-danger" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger">
              {filteredHistory.filter((trade) => trade.pnl.startsWith("-")).length}
            </div>
            <p className="text-xs text-muted">
              {(
                (filteredHistory.filter((trade) => trade.pnl.startsWith("-")).length / filteredHistory.length) *
                100
              ).toFixed(1)}
              %
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-surface-alt border-brand-dark">
        <CardHeader>
          <CardTitle className="text-base flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Фильтры
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
              <Input
                placeholder="Поиск по боту или паре..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-surface border-surface-alt text-base"
              />
            </div>
            <Select value={filterBot} onValueChange={setFilterBot}>
              <SelectTrigger className="bg-surface border-surface-alt text-base w-48">
                <SelectValue placeholder="Выберите бота" />
              </SelectTrigger>
              <SelectContent className="bg-surface border-surface-alt">
                <SelectItem value="all">Все боты</SelectItem>
                {bots.map((bot) => (
                  <SelectItem key={bot.id} value={bot.name}>
                    {bot.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="bg-surface border-surface-alt text-base w-32">
                <SelectValue placeholder="Тип" />
              </SelectTrigger>
              <SelectContent className="bg-surface border-surface-alt">
                <SelectItem value="all">Все</SelectItem>
                <SelectItem value="BUY">Покупка</SelectItem>
                <SelectItem value="SELL">Продажа</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Trading History Table */}
      <Card className="bg-surface-alt border-brand-dark">
        <CardHeader>
          <CardTitle className="text-base">Сделки</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredHistory.map((trade) => (
              <div
                key={trade.id}
                className="flex items-center justify-between p-4 bg-surface rounded-lg hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Badge
                    variant="outline"
                    className={trade.type === "BUY" ? "text-success border-green-400" : "text-danger border-red-400"}
                  >
                    {trade.type}
                  </Badge>
                  <div>
                    <p className="text-base font-medium">{trade.bot}</p>
                    <p className="text-muted text-sm">{trade.pair}</p>
                  </div>
                  <div>
                    <p className="text-base">{trade.amount}</p>
                    <p className="text-muted text-sm">@ {trade.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-base font-medium">{trade.total}</p>
                    <p className="text-muted text-sm">{trade.time}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${trade.pnl.startsWith("+") ? "text-success" : "text-danger"}`}>
                      {trade.pnl}
                    </p>
                    <Badge variant="outline" className="text-xs text-success border-green-400">
                      {trade.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredHistory.length === 0 && (
            <div className="text-center py-12">
              <History className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <p className="text-muted text-lg">Сделки не найдены</p>
              <p className="text-muted text-sm mt-2">Попробуйте изменить параметры фильтрации</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
