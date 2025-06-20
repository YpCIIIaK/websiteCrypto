"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Wallet, TrendingUp, TrendingDown, DollarSign, PieChart } from "lucide-react"

const mockBalances = [
  { symbol: "USDT", amount: 15420.5, value: 15420.5, change: 0 },
  { symbol: "BTC", amount: 0.2847, value: 12300.45, change: 2.4 },
  { symbol: "ETH", amount: 3.156, value: 7890.23, change: -1.2 },
  { symbol: "BNB", amount: 12.45, value: 3456.78, change: 1.8 },
  { symbol: "ADA", amount: 2450.0, value: 1234.56, change: -0.5 },
]

export default function Portfolio({ bots }) {
  const totalBalance = bots.reduce((sum, bot) => sum + bot.balance, 0)
  const totalPnL = bots.reduce((sum, bot) => sum + bot.pnl, 0)
  const totalValue = mockBalances.reduce((sum, balance) => sum + balance.value, 0)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-base flex items-center">
          <Wallet className="h-8 w-8 mr-3 text-accent" />
          Портфолио
        </h1>
        <p className="text-muted mt-2">Обзор ваших активов и балансов</p>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-surface-alt border-brand-dark">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted">Общая стоимость</CardTitle>
            <DollarSign className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-base">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted">Все активы</p>
          </CardContent>
        </Card>

        <Card className="bg-surface-alt border-brand-dark">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted">P&L ботов</CardTitle>
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
            <p className="text-xs text-muted">{((totalPnL / totalBalance) * 100).toFixed(2)}%</p>
          </CardContent>
        </Card>

        <Card className="bg-surface-alt border-brand-dark">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted">Активных ботов</CardTitle>
            <PieChart className="h-4 w-4 text-brand-light" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-base">{bots.filter((bot) => bot.status === "active").length}</div>
            <p className="text-xs text-muted">из {bots.length} всего</p>
          </CardContent>
        </Card>

        <Card className="bg-surface-alt border-brand-dark">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted">Дневное изменение</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">+2.4%</div>
            <p className="text-xs text-muted">+$987.65</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Balances */}
        <Card className="bg-surface-alt border-brand-dark">
          <CardHeader>
            <CardTitle className="text-base">Балансы активов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockBalances.map((balance) => (
                <div key={balance.symbol} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 gradient-accent rounded-full flex items-center justify-center text-base text-sm font-bold">
                      {balance.symbol.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-base">{balance.symbol}</p>
                      <p className="text-sm text-muted">{balance.amount.toFixed(4)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-base">${balance.value.toFixed(2)}</p>
                    <p className={`text-sm ${balance.change >= 0 ? "text-success" : "text-danger"}`}>
                      {balance.change >= 0 ? "+" : ""}
                      {balance.change.toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bot Allocation */}
        <Card className="bg-surface-alt border-brand-dark">
          <CardHeader>
            <CardTitle className="text-base">Распределение по ботам</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bots.map((bot) => {
                const percentage = (bot.balance / totalBalance) * 100
                return (
                  <div key={bot.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-base font-medium">{bot.name}</span>
                        <Badge variant="outline" className="text-xs border-accent text-accent">
                          {bot.pair}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-medium">${bot.balance.toLocaleString()}</span>
                        <span className="text-muted text-sm ml-2">({percentage.toFixed(1)}%)</span>
                      </div>
                    </div>
                    <Progress value={percentage} className="h-2 bg-surface" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
