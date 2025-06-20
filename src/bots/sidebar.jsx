"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { BarChart3, Bot, Plus, Wallet, History, Settings, TrendingUp, Zap, Menu, X } from "lucide-react"

export default function Sidebar({ currentPage, onPageChange }) {
  const [open, setOpen] = useState(false)
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
    {
      id: "docs",
      label: "Документация",
      icon: Zap,
      badge: null,
    },
  ]

  // Мобильная кнопка-гамбургер
  return (
    <>
      <Button onClick={() => setOpen(true)} className="fixed top-20 left-3 z-50 md:hidden bg-surface-alt/80 border border-brand-dark shadow-lg p-2 w-10 h-10 flex items-center justify-center">
        <Menu className="h-6 w-6 text-accent" />
      </Button>
      {/* Overlay для клика вне сайдбара */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={() => setOpen(false)} />
      )}
      <div className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-surface-alt border-r border-brand-dark flex flex-col transition-transform duration-300 md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}> 
        {/* Кнопка закрытия на мобилке */}
        <div className="flex md:hidden justify-end p-2">
          <Button onClick={() => setOpen(false)} className="bg-transparent border-none shadow-none p-2 w-10 h-10 flex items-center justify-center">
            <X className="h-6 w-6 text-accent" />
          </Button>
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
                onClick={() => { onPageChange(item.id); setOpen(false); }}
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
          <Button onClick={() => { onPageChange("create-bot"); setOpen(false); }} className="w-full bg-accent hover:bg-accent-light text-base">
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
    </>
  )
}
