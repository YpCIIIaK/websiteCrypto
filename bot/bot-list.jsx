"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Play,
  Pause,
  Settings,
  Trash2,
  Search,
  MoreVertical,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function BotList({ bots, onSelectBot, onUpdateBot }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredBots = bots.filter((bot) => {
    const matchesSearch =
      bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bot.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bot.strategy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bot.pair?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || bot.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "paused":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const toggleBotStatus = (bot) => {
    const newStatus = bot.status === "active" ? "paused" : "active"
    onUpdateBot({ ...bot, status: newStatus })
  }

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Активен"
      case "paused":
        return "Приостановлен"
      case "error":
        return "Ошибка"
      default:
        return "Остановлен"
    }
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "active":
        return "bg-green-600 text-white"
      case "paused":
        return "bg-yellow-600 text-white"
      case "error":
        return "bg-red-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Поиск ботов..."
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
            Приостановленные
          </Button>
        </div>
      </div>

      {/* Bot Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBots.map((bot) => (
          <Card key={bot.id} className="bg-surface-alt border-brand-dark hover:border-surface-alt transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(bot.status)}
                  <CardTitle className="text-base text-lg">{bot.name}</CardTitle>
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
                    <DropdownMenuItem className="text-red-400 hover:bg-surface">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Удалить
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-muted text-sm">{bot.description || bot.strategy || "Торговый бот"}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <Badge variant="secondary" className={getStatusBadgeClass(bot.status)}>
                  {getStatusText(bot.status)}
                </Badge>
                <span className="text-xs text-muted">{bot.category || bot.pair || bot.exchange || "Crypto"}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Успешность:</span>
                  <span className="text-base">{bot.successRate || bot.winRate || 0}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Запусков:</span>
                  <span className="text-base">{bot.totalRuns || bot.totalTrades || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Последний запуск:</span>
                  <span className="text-base">{bot.lastRun || bot.lastTrade || "Никогда"}</span>
                </div>
                {bot.pnl !== undefined && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">P&L:</span>
                    <span className={`text-base ${bot.pnl >= 0 ? "text-success" : "text-danger"}`}>
                      {bot.pnl >= 0 ? "+" : ""}${bot.pnl.toFixed(2)}
                    </span>
                  </div>
                )}
                {bot.balance !== undefined && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Баланс:</span>
                    <span className="text-base">${bot.balance.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  onClick={() => toggleBotStatus(bot)}
                  className={
                    bot.status === "active" ? "bg-yellow-600 hover:bg-yellow-700" : "bg-green-600 hover:bg-green-700"
                  }
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
          <p className="text-muted text-lg">Боты не найдены</p>
          <p className="text-muted text-sm mt-2">Попробуйте изменить параметры поиска</p>
        </div>
      )}
    </div>
  )
}
