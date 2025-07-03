"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Bot, Plus, Wallet, History, Settings, TrendingUp, Zap } from "lucide-react"

export default function Sidebar({ currentPage, onPageChange }) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Дашборд",
      icon: BarChart3,
      badge: null,
    },
    {
      id: "bots",
      label: "Торговые боты",
      icon: Bot,
      badge: "4",
    },
    {
      id: "portfolio",
      label: "Портфолио",
      icon: Wallet,
      badge: null,
    },
    {
      id: "history",
      label: "История сделок",
      icon: History,
      badge: null,
    },
    {
      id: "settings",
      label: "Настройки",
      icon: Settings,
      badge: null,
    },
  ]

  return (
    <div className="w-64 bg-surface-alt border-r border-brand-dark flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-brand-dark">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 gradient-accent rounded-lg flex items-center justify-center">
            <Zap className="h-5 w-5 text-base" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-base">CryptoBot</h1>
            <p className="text-xs text-muted">Trading Platform</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-4 border-b border-brand-dark">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted">Общий P&L</span>
            <span className="text-sm font-medium text-success">+$6,346.99</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted">Активные боты</span>
            <span className="text-sm font-medium text-base">3</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted">Сегодня</span>
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-sm font-medium text-success">+2.4%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={currentPage === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start ${
                currentPage === item.id
                  ? "bg-brand text-base hover:bg-brand-light"
                  : "text-muted hover:text-base hover:bg-surface"
              }`}
              onClick={() => onPageChange(item.id)}
            >
              <item.icon className="h-4 w-4 mr-3" />
              {item.label}
              {item.badge && (
                <Badge variant="secondary" className="ml-auto bg-accent text-base">
                  {item.badge}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </nav>

      {/* Quick Actions */}
      <div className="p-4 border-t border-brand-dark">
        <Button onClick={() => onPageChange("create-bot")} className="w-full bg-accent hover:bg-accent-light text-base">
          <Plus className="h-4 w-4 mr-2" />
          Создать бота
        </Button>
      </div>

      {/* Status */}
      <div className="p-4 border-t border-brand-dark">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full pulse-success" />
          <span className="text-xs text-muted">Подключено к биржам</span>
        </div>
      </div>
    </div>
  )
}
