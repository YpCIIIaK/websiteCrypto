"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Play, Pause, Settings, Plus, Search, TrendingUp, TrendingDown, MoreVertical, Bot } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function TradingBots({ bots, onSelectBot, onUpdateBot, onCreateBot }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredBots = bots.filter((bot) => {
    const matchesSearch =
      bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bot.pair.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bot.strategy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || bot.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const toggleBotStatus = (bot) => {
    const newStatus = bot.status === "active" ? "paused" : "active"
    onUpdateBot({ ...bot, status: newStatus })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base flex items-center">
            <Bot className="h-8 w-8 mr-3 text-accent" />
            Торговые боты
          </h1>
          <p className="text-muted mt-2">Управление вашими криптотрейдинговыми ботами</p>
        </div>
        <Button onClick={onCreateBot} className="bg-accent hover:bg-accent-light">
          <Plus className="h-4 w-4 mr-2" />
          Создать бота
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
          <Input
            placeholder="Поиск ботов по названию, паре или стратегии..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-surface border-surface-alt text-base"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            onClick={() => setFilterStatus("all")}
            className="bg-surface border-surface-alt"
          >
            Все
          </Button>
          <Button
            variant={filterStatus === "active" ? "default" : "outline"}
            onClick={() => setFilterStatus("active")}
            className="bg-surface border-surface-alt"
          >
            Активные
          </Button>
          <Button
            variant={filterStatus === "paused" ? "default" : "outline"}
            onClick={() => setFilterStatus("paused")}
            className="bg-surface border-surface-alt"
          >
            На паузе
          </Button>
        </div>
      </div>

      {/* Bots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBots.map((bot) => (
          <Card key={bot.id} className="bg-surface-alt border-brand-dark hover:border-surface-alt transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base text-lg flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${
                        bot.status === "active"
                          ? "bg-green-500"
                          : bot.status === "paused"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                      }`}
                    />
                    {bot.name}
                  </CardTitle>
                  <p className="text-muted text-sm mt-1">{bot.strategy}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-surface border-surface-alt">
                    <DropdownMenuItem onClick={() => onSelectBot(bot)} className="text-base hover:bg-surface">
                      <Settings className="h-4 w-4 mr-2" />
                      Настройки
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <Badge variant="outline" className="text-accent border-accent">
                  {bot.pair}
                </Badge>
                <Badge variant="outline" className="text-muted">
                  {bot.exchange}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted text-sm">P&L:</span>
                  <div className="flex items-center">
                    {bot.pnl >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-success mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-danger mr-1" />
                    )}
                    <span className={`font-medium ${bot.pnl >= 0 ? "text-success" : "text-danger"}`}>
                      {bot.pnl >= 0 ? "+" : ""}${bot.pnl.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted text-sm">Процент:</span>
                  <span className={`font-medium ${bot.pnlPercent >= 0 ? "text-success" : "text-danger"}`}>
                    {bot.pnlPercent >= 0 ? "+" : ""}
                    {bot.pnlPercent.toFixed(1)}%
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted text-sm">Винрейт:</span>
                  <span className="text-base font-medium">{bot.winRate.toFixed(1)}%</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted text-sm">Сделок:</span>
                  <span className="text-base font-medium">{bot.totalTrades}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted text-sm">Баланс:</span>
                  <span className="text-base font-medium">${bot.balance.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted text-sm">Последняя сделка:</span>
                  <span className="text-base text-sm">{bot.lastTrade}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  onClick={() => toggleBotStatus(bot)}
                  className={bot.status === "active" ? "bg-warn hover:bg-yellow-700" : "bg-success hover:bg-green-700"}
                >
                  {bot.status === "active" ? (
                    <>
                      <Pause className="h-4 w-4 mr-1" />
                      Пауза
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-1" />
                      Запуск
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onSelectBot(bot)}
                  className="border-surface-alt text-gray-300 hover:bg-surface"
                >
                  <Settings className="h-4 w-4 mr-1" />
                  Настройки
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBots.length === 0 && (
        <div className="text-center py-12">
          <Bot className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <p className="text-muted text-lg">Боты не найдены</p>
          <p className="text-muted text-sm mt-2">Попробуйте изменить параметры поиска или создайте нового бота</p>
          <Button onClick={onCreateBot} className="mt-4 bg-accent hover:bg-accent-light">
            <Plus className="h-4 w-4 mr-2" />
            Создать первого бота
          </Button>
        </div>
      )}
    </div>
  )
}
