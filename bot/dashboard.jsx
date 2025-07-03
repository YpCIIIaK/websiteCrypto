"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Activity, Bot, Target, BarChart3, Zap } from "lucide-react"

export default function Dashboard({ bots }) {
  const totalPnL = bots.reduce((sum, bot) => sum + bot.pnl, 0)
  const totalBalance = bots.reduce((sum, bot) => sum + bot.balance, 0)
  const activeBots = bots.filter((bot) => bot.status === "active").length
  const totalTrades = bots.reduce((sum, bot) => sum + bot.totalTrades, 0)
  const avgWinRate = bots.reduce((sum, bot) => sum + bot.winRate, 0) / bots.length

  const topPerformers = [...bots].sort((a, b) => b.pnlPercent - a.pnlPercent).slice(0, 3)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-base">Торговый дашборд</h1>
        <p className="text-muted mt-2">Обзор ваших криптотрейдинговых ботов</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              ${totalPnL.toFixed(2)}
            </div>
            <p className="text-xs text-muted">{((totalPnL / totalBalance) * 100).toFixed(2)}% от баланса</p>
          </CardContent>
        </Card>

        <Card className="bg-surface-alt border-brand-dark">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted">Общий баланс</CardTitle>
            <DollarSign className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-base">${totalBalance.toLocaleString()}</div>
            <p className="text-xs text-muted">Распределен по {bots.length} ботам</p>
          </CardContent>
        </Card>

        <Card className="bg-surface-alt border-brand-dark">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted">Активные боты</CardTitle>
            <Bot className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-base">{activeBots}</div>
            <p className="text-xs text-muted">из {bots.length} всего</p>
          </CardContent>
        </Card>

        <Card className="bg-surface-alt border-brand-dark">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted">Винрейт</CardTitle>
            <Target className="h-4 w-4 text-brand-light" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-base">{avgWinRate.toFixed(1)}%</div>
            <p className="text-xs text-muted">{totalTrades} сделок всего</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <Card className="bg-surface-alt border-brand-dark">
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Лучшие боты
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((bot, index) => (
                <div key={bot.id} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 gradient-accent rounded-full flex items-center justify-center text-base text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-base">{bot.name}</p>
                      <p className="text-sm text-muted">{bot.pair}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${bot.pnl >= 0 ? "text-success" : "text-danger"}`}>
                      {bot.pnlPercent >= 0 ? "+" : ""}
                      {bot.pnlPercent.toFixed(1)}%
                    </p>
                    <p className="text-sm text-muted">${bot.pnl.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Bots Status */}
        <Card className="bg-surface-alt border-brand-dark">
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Статус ботов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bots.slice(0, 4).map((bot) => (
                <div key={bot.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        bot.status === "active" ? "bg-success" : bot.status === "paused" ? "bg-warn" : "bg-muted"
                      }`}
                    />
                    <div>
                      <p className="text-base font-medium">{bot.name}</p>
                      <p className="text-sm text-muted">{bot.lastTrade}</p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      bot.status === "active"
                        ? "bg-success text-surface"
                        : bot.status === "paused"
                          ? "bg-warn text-surface"
                          : "bg-muted text-surface"
                    }
                  >
                    {bot.status === "active" ? "Активен" : bot.status === "paused" ? "Пауза" : "Остановлен"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card className="bg-surface-alt border-brand-dark">
        <CardHeader>
          <CardTitle className="text-base flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Производительность ботов
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bots.map((bot) => (
              <div key={bot.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <span className="text-base font-medium">{bot.name}</span>
                    <Badge variant="outline" className="text-xs border-accent text-accent">
                      {bot.pair}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted">{bot.winRate.toFixed(1)}%</span>
                    <span className={`text-sm font-medium ${bot.pnl >= 0 ? "text-success" : "text-danger"}`}>
                      {bot.pnl >= 0 ? "+" : ""}${bot.pnl.toFixed(2)}
                    </span>
                  </div>
                </div>
                <Progress value={bot.winRate} className="h-2 bg-surface" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
