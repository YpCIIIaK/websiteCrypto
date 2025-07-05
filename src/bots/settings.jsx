"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Badge } from "../components/ui/badge"
import {
  SettingsIcon,
  Shield,
  Bell,
  Key,
  Database,
  Globe,
  Save,
  TestTube,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react"

const Switch = ({checked, onChange}) => <input type="checkbox" checked={checked} onChange={onChange} />;
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
const Tabs = ({children}) => <div>{children}</div>;
const TabsContent = ({children}) => <div>{children}</div>;
const TabsList = ({children}) => <div>{children}</div>;
const TabsTrigger = ({children, ...props}) => <button {...props}>{children}</button>;

export default function Settings() {
  const [apiKeys, setApiKeys] = useState({
    binance: { key: "••••••••••••••••", secret: "••••••••••••••••", connected: true },
    bybit: { key: "••••••••••••••••", secret: "••••••••••••••••", connected: true },
    okx: { key: "", secret: "", connected: false },
    kucoin: { key: "", secret: "", connected: false },
  })

  const [notifications, setNotifications] = useState({
    tradeAlerts: true,
    profitLoss: true,
    botStatus: true,
    systemAlerts: true,
    email: true,
    telegram: false,
  })

  const [riskSettings, setRiskSettings] = useState({
    maxDailyLoss: "1000",
    maxDrawdown: "5",
    autoStopLoss: true,
    emergencyStop: true,
    maxBotsActive: "10",
  })

  const [generalSettings, setGeneralSettings] = useState({
    theme: "dark",
    language: "ru",
    timezone: "UTC+3",
    currency: "USD",
    autoBackup: true,
    dataRetention: "90",
  })

  const [activeTab, setActiveTab] = useState("exchanges")

  const testConnection = (exchange) => {
    console.log(`Testing ${exchange} connection...`)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-base flex items-center">
          <SettingsIcon className="h-8 w-8 mr-3 text-accent" />
          Настройки
        </h1>
        <p className="text-muted mt-2">Конфигурация системы и торговых параметров</p>
      </div>

      {/* Вкладки */}
      <div className="bg-surface-alt border-brand-dark rounded-t-xl flex">
        <button
          className={`flex items-center gap-2 px-6 py-3 font-medium text-base focus:outline-none transition-colors ${activeTab === "exchanges" ? "bg-surface text-accent" : "text-muted hover:text-accent"}`}
          onClick={() => setActiveTab("exchanges")}
        >
          <Key className="h-4 w-4" /> Биржи
        </button>
        <button
          className={`flex items-center gap-2 px-6 py-3 font-medium text-base focus:outline-none transition-colors ${activeTab === "risk" ? "bg-surface text-accent" : "text-muted hover:text-accent"}`}
          onClick={() => setActiveTab("risk")}
        >
          <Shield className="h-4 w-4" /> Риск-менеджмент
        </button>
        <button
          className={`flex items-center gap-2 px-6 py-3 font-medium text-base focus:outline-none transition-colors ${activeTab === "notifications" ? "bg-surface text-accent" : "text-muted hover:text-accent"}`}
          onClick={() => setActiveTab("notifications")}
        >
          <Bell className="h-4 w-4" /> Уведомления
        </button>
        <button
          className={`flex items-center gap-2 px-6 py-3 font-medium text-base focus:outline-none transition-colors ${activeTab === "general" ? "bg-surface text-accent" : "text-muted hover:text-accent"}`}
          onClick={() => setActiveTab("general")}
        >
          <Globe className="h-4 w-4" /> Общие
        </button>
      </div>

      {/* Контент вкладок */}
      {activeTab === "exchanges" && (
        <div className="space-y-6">
          <Card className="bg-surface-alt border-brand-dark">
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Key className="h-5 w-5 mr-2" />
                API ключи бирж
              </CardTitle>
              <p className="text-muted text-sm">
                Настройте подключения к криптовалютным биржам для автоматической торговли
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(apiKeys).map(([exchange, config]) => (
                <div key={exchange} className="p-4 bg-surface rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 gradient-accent rounded-lg flex items-center justify-center text-base text-sm font-bold">
                        {exchange.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-base font-medium capitalize">{exchange}</h3>
                        <p className="text-muted text-sm">
                          {exchange === "binance" && "Крупнейшая криптобиржа"}
                          {exchange === "bybit" && "Деривативы и спот торговля"}
                          {exchange === "okx" && "Глобальная криптобиржа"}
                          {exchange === "kucoin" && "Народная биржа"}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={config.connected ? "text-success border-green-400" : "text-muted border-gray-400"}
                    >
                      {config.connected ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Подключено
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3 mr-1" />
                          Не подключено
                        </>
                      )}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-base">API Key</Label>
                      <Input
                        type="password"
                        value={config.key}
                        onChange={(e) =>
                          setApiKeys({
                            ...apiKeys,
                            [exchange]: { ...config, key: e.target.value },
                          })
                        }
                        className="bg-surface border-surface-alt text-base"
                        placeholder="Введите API ключ"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base">Secret Key</Label>
                      <Input
                        type="password"
                        value={config.secret}
                        onChange={(e) =>
                          setApiKeys({
                            ...apiKeys,
                            [exchange]: { ...config, secret: e.target.value },
                          })
                        }
                        className="bg-surface border-surface-alt text-base"
                        placeholder="Введите секретный ключ"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => testConnection(exchange)}
                      variant="outline"
                      size="sm"
                      className="border-surface-alt text-muted"
                    >
                      <TestTube className="h-4 w-4 mr-1" />
                      Тест подключения
                    </Button>
                    <Button size="sm">
                      <Save className="h-4 w-4 mr-1" />
                      Сохранить
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
      {activeTab === "risk" && (
        <div className="space-y-6">
          <Card className="bg-surface-alt border-brand-dark">
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Управление рисками
              </CardTitle>
              <p className="text-muted text-sm">Настройте параметры безопасности для защиты вашего капитала</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-base">Максимальный дневной убыток ($)</Label>
                  <Input
                    type="number"
                    value={riskSettings.maxDailyLoss}
                    onChange={(e) => setRiskSettings({ ...riskSettings, maxDailyLoss: e.target.value })}
                    className="bg-surface border-surface-alt text-base"
                  />
                  <p className="text-muted text-xs">При достижении лимита все боты будут остановлены</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-base">Максимальная просадка (%)</Label>
                  <Input
                    type="number"
                    value={riskSettings.maxDrawdown}
                    onChange={(e) => setRiskSettings({ ...riskSettings, maxDrawdown: e.target.value })}
                    className="bg-surface border-surface-alt text-base"
                  />
                  <p className="text-muted text-xs">Процент от начального баланса</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-base">Максимум активных ботов</Label>
                  <Input
                    type="number"
                    value={riskSettings.maxBotsActive}
                    onChange={(e) => setRiskSettings({ ...riskSettings, maxBotsActive: e.target.value })}
                    className="bg-surface border-surface-alt text-base"
                  />
                  <p className="text-muted text-xs">Ограничение одновременно работающих ботов</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
                  <div>
                    <h3 className="text-base font-medium">Автоматический стоп-лосс</h3>
                    <p className="text-muted text-sm">Автоматически закрывать убыточные позиции</p>
                  </div>
                  <Switch
                    checked={riskSettings.autoStopLoss}
                    onChange={(e) => setRiskSettings({ ...riskSettings, autoStopLoss: e.target.checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
                  <div>
                    <h3 className="text-base font-medium">Экстренная остановка</h3>
                    <p className="text-muted text-sm">Остановить все боты при критических убытках</p>
                  </div>
                  <Switch
                    checked={riskSettings.emergencyStop}
                    onChange={(e) => setRiskSettings({ ...riskSettings, emergencyStop: e.target.checked })}
                  />
                </div>
              </div>

              <div className="p-4 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <h3 className="text-yellow-400 font-medium">Важно</h3>
                </div>
                <p className="text-yellow-300 text-sm mt-2">
                  Настройки риск-менеджмента критически важны для сохранения капитала. Рекомендуется не превышать 2-5%
                  риска на сделку.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {activeTab === "notifications" && (
        <div className="space-y-6">
          <Card className="bg-surface-alt border-brand-dark">
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Уведомления
              </CardTitle>
              <p className="text-muted text-sm">Настройте способы получения уведомлений о торговых событиях</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-base font-medium">Типы уведомлений</h3>

                <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
                  <div>
                    <h4 className="text-base font-medium">Торговые сигналы</h4>
                    <p className="text-muted text-sm">Уведомления о входе и выходе из позиций</p>
                  </div>
                  <Switch
                    checked={notifications.tradeAlerts}
                    onChange={(e) => setNotifications({ ...notifications, tradeAlerts: e.target.checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
                  <div>
                    <h4 className="text-base font-medium">P&L уведомления</h4>
                    <p className="text-muted text-sm">Уведомления о прибылях и убытках</p>
                  </div>
                  <Switch
                    checked={notifications.profitLoss}
                    onChange={(e) => setNotifications({ ...notifications, profitLoss: e.target.checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
                  <div>
                    <h4 className="text-base font-medium">Статус ботов</h4>
                    <p className="text-muted text-sm">Уведомления о запуске/остановке ботов</p>
                  </div>
                  <Switch
                    checked={notifications.botStatus}
                    onChange={(e) => setNotifications({ ...notifications, botStatus: e.target.checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
                  <div>
                    <h4 className="text-base font-medium">Системные уведомления</h4>
                    <p className="text-muted text-sm">Ошибки, обновления, технические сообщения</p>
                  </div>
                  <Switch
                    checked={notifications.systemAlerts}
                    onChange={(e) => setNotifications({ ...notifications, systemAlerts: e.target.checked })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-medium">Способы доставки</h3>

                <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
                  <div>
                    <h4 className="text-base font-medium">Email уведомления</h4>
                    <p className="text-muted text-sm">Отправка на email адрес</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
                  <div>
                    <h4 className="text-base font-medium">Telegram бот</h4>
                    <p className="text-muted text-sm">Уведомления в Telegram</p>
                  </div>
                  <Switch
                    checked={notifications.telegram}
                    onChange={(e) => setNotifications({ ...notifications, telegram: e.target.checked })}
                  />
                </div>
              </div>

              {notifications.telegram && (
                <div className="p-4 bg-surface rounded-lg space-y-2">
                  <Label className="text-base">Telegram Bot Token</Label>
                  <Input
                    placeholder="Введите токен Telegram бота"
                    className="bg-surface-alt border-surface-alt text-base"
                  />
                  <Label className="text-base">Chat ID</Label>
                  <Input placeholder="Введите Chat ID" className="bg-surface-alt border-surface-alt text-base" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
      {activeTab === "general" && (
        <div className="space-y-6">
          <Card className="bg-surface-alt border-brand-dark">
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Общие настройки
              </CardTitle>
              <p className="text-muted text-sm">Основные параметры интерфейса и системы</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-base">Тема интерфейса</Label>
                  <Select
                    value={generalSettings.theme}
                    onValueChange={(value) => setGeneralSettings({ ...generalSettings, theme: value })}
                  >
                    <SelectTrigger className="bg-surface border-surface-alt text-base">
                      <SelectValue>
                        <option value="dark">Темная</option>
                        <option value="light">Светлая</option>
                        <option value="auto">Автоматически</option>
                      </SelectValue>
                    </SelectTrigger>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-base">Язык</Label>
                  <Select
                    value={generalSettings.language}
                    onValueChange={(value) => setGeneralSettings({ ...generalSettings, language: value })}
                  >
                    <SelectTrigger className="bg-surface border-surface-alt text-base">
                      <SelectValue>
                        <option value="ru">Русский</option>
                        <option value="en">English</option>
                        <option value="zh">中文</option>
                      </SelectValue>
                    </SelectTrigger>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-base">Часовой пояс</Label>
                  <Select
                    value={generalSettings.timezone}
                    onValueChange={(value) => setGeneralSettings({ ...generalSettings, timezone: value })}
                  >
                    <SelectTrigger className="bg-surface border-surface-alt text-base">
                      <SelectValue>
                        <option value="UTC+3">UTC+3 (Москва)</option>
                        <option value="UTC+0">UTC+0 (Лондон)</option>
                        <option value="UTC-5">UTC-5 (Нью-Йорк)</option>
                        <option value="UTC+8">UTC+8 (Сингапур)</option>
                      </SelectValue>
                    </SelectTrigger>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-base">Валюта отображения</Label>
                  <Select
                    value={generalSettings.currency}
                    onValueChange={(value) => setGeneralSettings({ ...generalSettings, currency: value })}
                  >
                    <SelectTrigger className="bg-surface border-surface-alt text-base">
                      <SelectValue>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="RUB">RUB (₽)</option>
                        <option value="BTC">BTC (₿)</option>
                      </SelectValue>
                    </SelectTrigger>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-base">Период хранения данных (дни)</Label>
                  <Input
                    type="number"
                    value={generalSettings.dataRetention}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, dataRetention: e.target.value })}
                    className="bg-surface border-surface-alt text-base"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
                  <div>
                    <h4 className="text-base font-medium">Автоматическое резервное копирование</h4>
                    <p className="text-muted text-sm">Ежедневное сохранение настроек и данных</p>
                  </div>
                  <Switch
                    checked={generalSettings.autoBackup}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, autoBackup: e.target.checked })}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="bg-accent hover:bg-accent-light">
                  <Save className="h-4 w-4 mr-2" />
                  Сохранить настройки
                </Button>
                <Button variant="outline" className="border-surface-alt text-muted">
                  <Database className="h-4 w-4 mr-2" />
                  Экспорт настроек
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
