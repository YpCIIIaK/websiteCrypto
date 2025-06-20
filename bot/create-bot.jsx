"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, TrendingUp, Settings, Code } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CreateBot({ onBack, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    strategy: "",
    pair: "",
    exchange: "",
    balance: "",
    stopLoss: "",
    takeProfit: "",
    maxTrades: "",
    script: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const newBot = {
      name: formData.name,
      strategy: formData.strategy,
      pair: formData.pair,
      exchange: formData.exchange,
      status: "stopped",
      pnl: 0,
      pnlPercent: 0,
      totalTrades: 0,
      winRate: 0,
      balance: Number.parseFloat(formData.balance) || 0,
      lastTrade: "Никогда",
    }
    onSave(newBot)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="text-muted hover:text-base">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-base">Создание торгового бота</h1>
          <p className="text-muted">Настройте параметры автоматической торговли</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="bg-surface-alt border-brand-dark">
            <TabsTrigger value="basic" className="data-[state=active]:bg-surface-alt">
              <Settings className="h-4 w-4 mr-2" />
              Основные
            </TabsTrigger>
            <TabsTrigger value="strategy" className="data-[state=active]:bg-surface-alt">
              <TrendingUp className="h-4 w-4 mr-2" />
              Стратегия
            </TabsTrigger>
            <TabsTrigger value="script" className="data-[state=active]:bg-surface-alt">
              <Code className="h-4 w-4 mr-2" />
              Скрипт
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card className="bg-surface-alt border-brand-dark">
              <CardHeader>
                <CardTitle className="text-base">Основная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base">
                      Название бота
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Например: BTC Scalper Pro"
                      className="bg-surface border-surface-alt text-base"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="exchange" className="text-base">
                      Биржа
                    </Label>
                    <Select
                      value={formData.exchange}
                      onValueChange={(value) => setFormData({ ...formData, exchange: value })}
                    >
                      <SelectTrigger className="bg-surface border-surface-alt text-base">
                        <SelectValue placeholder="Выберите биржу" />
                      </SelectTrigger>
                      <SelectContent className="bg-surface border-surface-alt">
                        <SelectItem value="binance">Binance</SelectItem>
                        <SelectItem value="bybit">Bybit</SelectItem>
                        <SelectItem value="okx">OKX</SelectItem>
                        <SelectItem value="kucoin">KuCoin</SelectItem>
                        <SelectItem value="gate">Gate.io</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="pair" className="text-base">
                      Торговая пара
                    </Label>
                    <Select value={formData.pair} onValueChange={(value) => setFormData({ ...formData, pair: value })}>
                      <SelectTrigger className="bg-surface border-surface-alt text-base">
                        <SelectValue placeholder="Выберите пару" />
                      </SelectTrigger>
                      <SelectContent className="bg-surface border-surface-alt">
                        <SelectItem value="BTC/USDT">BTC/USDT</SelectItem>
                        <SelectItem value="ETH/USDT">ETH/USDT</SelectItem>
                        <SelectItem value="BNB/USDT">BNB/USDT</SelectItem>
                        <SelectItem value="ADA/USDT">ADA/USDT</SelectItem>
                        <SelectItem value="SOL/USDT">SOL/USDT</SelectItem>
                        <SelectItem value="MATIC/USDT">MATIC/USDT</SelectItem>
                        <SelectItem value="DOT/USDT">DOT/USDT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="balance" className="text-base">
                      Начальный баланс (USDT)
                    </Label>
                    <Input
                      id="balance"
                      type="number"
                      value={formData.balance}
                      onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                      placeholder="10000"
                      className="bg-surface border-surface-alt text-base"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategy">
            <Card className="bg-surface-alt border-brand-dark">
              <CardHeader>
                <CardTitle className="text-base">Торговая стратегия</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="strategy" className="text-base">
                    Тип стратегии
                  </Label>
                  <Select
                    value={formData.strategy}
                    onValueChange={(value) => setFormData({ ...formData, strategy: value })}
                  >
                    <SelectTrigger className="bg-surface border-surface-alt text-base">
                      <SelectValue placeholder="Выберите стратегию" />
                    </SelectTrigger>
                    <SelectContent className="bg-surface border-surface-alt">
                      <SelectItem value="Scalping">Скальпинг</SelectItem>
                      <SelectItem value="Grid Trading">Сеточная торговля</SelectItem>
                      <SelectItem value="DCA">DCA (Dollar Cost Averaging)</SelectItem>
                      <SelectItem value="Momentum">Моментум</SelectItem>
                      <SelectItem value="Mean Reversion">Возврат к среднему</SelectItem>
                      <SelectItem value="Arbitrage">Арбитраж</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="stopLoss" className="text-base">
                      Стоп-лосс (%)
                    </Label>
                    <Input
                      id="stopLoss"
                      type="number"
                      step="0.1"
                      value={formData.stopLoss}
                      onChange={(e) => setFormData({ ...formData, stopLoss: e.target.value })}
                      placeholder="2.0"
                      className="bg-surface border-surface-alt text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="takeProfit" className="text-base">
                      Тейк-профит (%)
                    </Label>
                    <Input
                      id="takeProfit"
                      type="number"
                      step="0.1"
                      value={formData.takeProfit}
                      onChange={(e) => setFormData({ ...formData, takeProfit: e.target.value })}
                      placeholder="3.0"
                      className="bg-surface border-surface-alt text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxTrades" className="text-base">
                      Макс. сделок в день
                    </Label>
                    <Input
                      id="maxTrades"
                      type="number"
                      value={formData.maxTrades}
                      onChange={(e) => setFormData({ ...formData, maxTrades: e.target.value })}
                      placeholder="50"
                      className="bg-surface border-surface-alt text-base"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="script">
            <Card className="bg-surface-alt border-brand-dark">
              <CardHeader>
                <CardTitle className="text-base">Торговый скрипт</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="script" className="text-base">
                    JavaScript код стратегии
                  </Label>
                  <Textarea
                    id="script"
                    value={formData.script}
                    onChange={(e) => setFormData({ ...formData, script: e.target.value })}
                    placeholder={`// Пример торгового скрипта
async function tradingStrategy() {
  // Получение данных о цене
  const price = await getPrice('${formData.pair || "BTC/USDT"}');
  const sma20 = await getSMA(20);
  const rsi = await getRSI(14);
  
  // Логика входа в позицию
  if (rsi < 30 && price > sma20) {
    await buy(0.1); // Покупка 0.1 BTC
    console.log('Сигнал на покупку');
  }
  
  // Логика выхода из позиции
  if (rsi > 70) {
    await sell(0.1); // Продажа 0.1 BTC
    console.log('Сигнал на продажу');
  }
  
  return { success: true };
}

tradingStrategy();`}
                    className="bg-surface border-surface-alt text-base font-mono text-sm min-h-[300px]"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" className="border-surface-alt text-muted">
                    Проверить синтаксис
                  </Button>
                  <Button type="button" variant="outline" className="border-surface-alt text-muted">
                    Бэктест
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 mt-6">
          <Button type="button" variant="outline" onClick={onBack} className="border-surface-alt text-muted">
            Отмена
          </Button>
          <Button type="submit" className="bg-accent hover:bg-accent-light">
            <Save className="h-4 w-4 mr-2" />
            Создать бота
          </Button>
        </div>
      </form>
    </div>
  )
}
