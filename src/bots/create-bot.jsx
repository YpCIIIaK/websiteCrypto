"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { ArrowLeft, Save, TrendingUp, Settings, Code } from "lucide-react"

// Реализация рабочих вкладок
function Tabs({ defaultValue, children, className = "" }) {
  const [active, setActive] = useState(defaultValue)
  // Передаём active и setActive через контекст
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}
const TabsContext = React.createContext({ active: "", setActive: () => {} })
function TabsList({ children, className = "" }) {
  return <div className={`flex gap-2 bg-surface-alt border-brand-dark rounded-t-xl p-1 mb-4 ${className}`}>{children}</div>
}
function TabsTrigger({ value, children, className = "", ...props }) {
  const { active, setActive } = React.useContext(TabsContext)
  return (
    <button
      type="button"
      className={`px-6 py-2 rounded-xl font-medium text-base focus:outline-none transition-colors duration-150 ${active === value ? "bg-surface text-accent shadow" : "text-muted hover:text-accent hover:bg-surface/40"} ${className}`}
      onClick={() => setActive(value)}
      {...props}
    >
      <span className="flex items-center justify-center">
        {children}
      </span>
    </button>
  )
}
function TabsContent({ value, children, className = "" }) {
  const { active } = React.useContext(TabsContext)
  if (active !== value) return null
  return <div className={className}>{children}</div>
}

const Label = ({children, ...props}) => <label {...props}>{children}</label>;
const Textarea = (props) => <textarea {...props} />;
const Select = ({ value, onValueChange, children, ...props }) => (
  <select
    value={value}
    onChange={e => onValueChange(e.target.value)}
    className="bg-surface border-surface-alt text-base px-3 py-2 rounded-xl focus:outline-none"
    {...props}
  >
    {children}
  </select>
);
const SelectContent = ({ children }) => <>{children}</>;
const SelectItem = ({ value, children, ...props }) => <option value={value} {...props}>{children}</option>;
const SelectTrigger = ({ children, ...props }) => <>{children}</>;
const SelectValue = ({ children }) => <>{children}</>;

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
    limitOrders: [{ price: "", amount: "" }],
    onlyLimit: false,
    comment: "",
    dcaLevels: [{ price: "", amount: "" }],
    autoDCA: false,
    minAmount: "",
    maxAmount: "",
    limitOrderTtl: "",
  })
  const [scriptEdit, setScriptEdit] = useState(false);

  // Автоматическая генерация скрипта по настройкам
  useEffect(() => {
    if (!scriptEdit) {
      setFormData(f => ({
        ...f,
        script: generateScript(f)
      }))
    }
  }, [formData.name, formData.strategy, formData.pair, formData.exchange, formData.limitOrders, formData.dcaLevels, formData.onlyLimit, formData.autoDCA, formData.minAmount, formData.maxAmount, formData.limitOrderTtl, scriptEdit])

  function generateScript(f) {
    // Пример генерации скрипта на основе настроек (можно расширить)
    let script = `// Автоматически сгенерированный скрипт\n`;
    if (f.onlyLimit && f.limitOrders.length) {
      script += f.limitOrders.map((o, i) =>
        `if (await getPrice('${f.pair}') <= ${o.price}) { await buy(${o.amount}); // Лимитная покупка №${i+1} }`
      ).join("\n");
    } else if (f.dcaLevels.length > 0 && f.autoDCA) {
      script += f.dcaLevels.map((l, i) =>
        `if (await getPrice('${f.pair}') <= ${l.price}) { await buy(${l.amount}); // DCA уровень ${i+1} }`
      ).join("\n");
    } else {
      script += `// Здесь будет ваша стратегия\n`;
    }
    return script;
  }

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

  // Хелперы для динамических массивов
  const addLimitOrder = () => setFormData(f => ({ ...f, limitOrders: [...f.limitOrders, { price: "", amount: "" }] }))
  const removeLimitOrder = (i) => setFormData(f => ({ ...f, limitOrders: f.limitOrders.filter((_, idx) => idx !== i) }))
  const updateLimitOrder = (i, field, value) => setFormData(f => ({ ...f, limitOrders: f.limitOrders.map((o, idx) => idx === i ? { ...o, [field]: value } : o) }))

  const addDcaLevel = () => setFormData(f => ({ ...f, dcaLevels: [...f.dcaLevels, { price: "", amount: "" }] }))
  const removeDcaLevel = (i) => setFormData(f => ({ ...f, dcaLevels: f.dcaLevels.filter((_, idx) => idx !== i) }))
  const updateDcaLevel = (i, field, value) => setFormData(f => ({ ...f, dcaLevels: f.dcaLevels.map((o, idx) => idx === i ? { ...o, [field]: value } : o) }))

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
            <TabsTrigger value="docs" className="data-[state=active]:bg-surface-alt">
              <Settings className="h-4 w-4 mr-2" />
              Документация
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

                <div className="space-y-2">
                  <Label className="text-base">Лимитные заявки на покупку</Label>
                  {formData.limitOrders.map((order, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <Input
                        type="number"
                        placeholder="Цена"
                        value={order.price}
                        onChange={e => updateLimitOrder(i, "price", e.target.value)}
                        className="bg-surface border-surface-alt text-base w-32"
                      />
                      <Input
                        type="number"
                        placeholder="Объём"
                        value={order.amount}
                        onChange={e => updateLimitOrder(i, "amount", e.target.value)}
                        className="bg-surface border-surface-alt text-base w-32"
                      />
                      <Button type="button" variant="outline" onClick={() => removeLimitOrder(i)} className="border-surface-alt text-muted px-2">–</Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addLimitOrder} className="border-surface-alt text-muted mt-1">Добавить заявку</Button>
                  <div className="flex items-center gap-2 mt-2">
                    <input type="checkbox" id="onlyLimit" checked={formData.onlyLimit} onChange={e => setFormData(f => ({ ...f, onlyLimit: e.target.checked }))} className="accent-accent w-5 h-5" />
                    <Label htmlFor="onlyLimit" className="text-base">Только лимитные покупки</Label>
                  </div>
                  <Label htmlFor="comment" className="text-base mt-2">Комментарий</Label>
                  <Textarea
                    id="comment"
                    value={formData.comment}
                    onChange={e => setFormData({ ...formData, comment: e.target.value })}
                    placeholder="Заметка для себя или команды"
                    className="bg-surface border-surface-alt text-base min-h-[60px]"
                  />
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

                <div className="space-y-2">
                  <Label className="text-base">Уровни закупа (DCA/усреднение)</Label>
                  {formData.dcaLevels.map((level, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <Input
                        type="number"
                        placeholder="Цена"
                        value={level.price}
                        onChange={e => updateDcaLevel(i, "price", e.target.value)}
                        className="bg-surface border-surface-alt text-base w-32"
                      />
                      <Input
                        type="number"
                        placeholder="Объём"
                        value={level.amount}
                        onChange={e => updateDcaLevel(i, "amount", e.target.value)}
                        className="bg-surface border-surface-alt text-base w-32"
                      />
                      <Button type="button" variant="outline" onClick={() => removeDcaLevel(i)} className="border-surface-alt text-muted px-2">–</Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addDcaLevel} className="border-surface-alt text-muted mt-1">Добавить уровень</Button>
                  <div className="flex items-center gap-2 mt-2">
                    <input type="checkbox" id="autoDCA" checked={formData.autoDCA} onChange={e => setFormData(f => ({ ...f, autoDCA: e.target.checked }))} className="accent-accent w-5 h-5" />
                    <Label htmlFor="autoDCA" className="text-base">Автоматически усреднять при падении цены</Label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
                    <div className="space-y-2">
                      <Label htmlFor="minAmount" className="text-base">Мин. объём сделки</Label>
                      <Input
                        id="minAmount"
                        type="number"
                        value={formData.minAmount}
                        onChange={e => setFormData({ ...formData, minAmount: e.target.value })}
                        placeholder="0.01"
                        className="bg-surface border-surface-alt text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxAmount" className="text-base">Макс. объём сделки</Label>
                      <Input
                        id="maxAmount"
                        type="number"
                        value={formData.maxAmount}
                        onChange={e => setFormData({ ...formData, maxAmount: e.target.value })}
                        placeholder="1.0"
                        className="bg-surface border-surface-alt text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="limitOrderTtl" className="text-base">Время жизни лимитного ордера (мин)</Label>
                      <Input
                        id="limitOrderTtl"
                        type="number"
                        value={formData.limitOrderTtl}
                        onChange={e => setFormData({ ...formData, limitOrderTtl: e.target.value })}
                        placeholder="60"
                        className="bg-surface border-surface-alt text-base"
                      />
                    </div>
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
                {!scriptEdit ? (
                  <div className="space-y-4">
                    <div className="bg-surface border-surface-alt rounded p-4 font-mono text-sm whitespace-pre-wrap min-h-[120px]">
                      {formData.script || '// Скрипт будет сгенерирован автоматически'}
                    </div>
                    <Button type="button" variant="outline" className="border-surface-alt text-accent" onClick={() => setScriptEdit(true)}>
                      Изменить скрипт вручную
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="script" className="text-base">JavaScript код стратегии</Label>
                    <Textarea
                      id="script"
                      value={formData.script}
                      onChange={e => setFormData({ ...formData, script: e.target.value })}
                      className="bg-surface border-surface-alt text-base font-mono text-sm min-h-[300px]"
                    />
                    <Button type="button" variant="outline" className="border-surface-alt text-muted mt-2" onClick={() => setScriptEdit(false)}>
                      Вернуться к автогенерации
                    </Button>
                  </div>
                )}
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

          <TabsContent value="docs">
            <Card className="bg-surface-alt border-brand-dark">
              <CardHeader>
                <CardTitle className="text-base">Документация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-base text-muted space-y-6">
                  <div>
                    <b>О платформе</b><br/>
                    Vortan — это платформа для создания и управления торговыми ботами на криптовалютных биржах. Вы можете настраивать параметры, использовать автогенерацию скрипта или писать собственные стратегии.<br/>
                  </div>
                  <div>
                    <b>Автоматическая генерация скрипта</b><br/>
                    При изменении параметров бота скрипт формируется автоматически. Вы можете вручную изменить его, если обладаете опытом программирования.<br/>
                  </div>
                  <div>
                    <b>Доступные функции API</b><br/>
                    <ul className="list-disc pl-6">
                      <li><code>getPrice(pair)</code> — получить текущую цену пары (например, <code>BTC/USDT</code>).</li>
                      <li><code>buy(amount)</code> — купить указанное количество актива.</li>
                      <li><code>sell(amount)</code> — продать указанное количество актива.</li>
                      <li><code>getSMA(period)</code> — получить значение скользящей средней за период.</li>
                      <li><code>getRSI(period)</code> — получить значение индикатора RSI за период.</li>
                    </ul>
                  </div>
                  <div>
                    <b>Пример базовой стратегии</b><br/>
                    <pre className="bg-surface p-3 rounded text-sm overflow-x-auto"><code>{`// Покупка при падении цены и продажа при росте RSI\nconst price = await getPrice('BTC/USDT');\nconst rsi = await getRSI(14);\nif (price < 40000 && rsi < 30) {\n  await buy(0.1);\n}\nif (rsi > 70) {\n  await sell(0.1);\n}`}</code></pre>
                  </div>
                  <div>
                    <b>Советы по безопасности</b><br/>
                    <ul className="list-disc pl-6">
                      <li>Используйте API-ключи только с необходимыми правами.</li>
                      <li>Не храните ключи в открытом виде.</li>
                      <li>Тестируйте стратегии на демо-счёте или с минимальными объёмами.</li>
                    </ul>
                  </div>
                  <div>
                    <b>Поддержка</b><br/>
                    Если у вас возникли вопросы, обратитесь в поддержку через чат или по email: <a href="mailto:support@vortan.ai" className="text-accent underline">support@vortan.ai</a>
                  </div>
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
