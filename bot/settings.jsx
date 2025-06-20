"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
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

      <Tabs defaultValue="exchanges" className="space-y-6">
        <TabsList className="bg-surface-alt border-brand-dark">
          <TabsTrigger value="exchanges" className="data-[state=active]:bg-surface">
            <Key className="h-4 w-4 mr-2" />
            Биржи
          </TabsTrigger>
          <TabsTrigger value="risk" className="data-[state=active]:bg-surface">
            <Shield className="h-4 w-4 mr-2" />
            Риск-менеджмент
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-surface">
            <Bell className="h-4 w-4 mr-2" />
            Уведомления
          </TabsTrigger>
          <TabsTrigger value="general" className="data-[state=active]:bg-surface">
            <Globe className="h-4 w-4 mr-2" />
            Общие
          </TabsTrigger>
        </TabsList>

        {/* Exchange Settings */}
        <TabsContent value="exchanges" className="space-y-6">
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
                    <Button size="sm" className="bg-accent hover:bg-accent-light">
                      <Save className="h-4 w-4 mr-1" />
                      Сохранить
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Management */}
        <TabsContent value="risk" className="space-y-6">
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
                    onCheckedChange={(checked) => setRiskSettings({ ...riskSettings, autoStopLoss: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
                  <div>
                    <h3 className="text-base font-medium">Экстренная остановка</h3>
                    <p className="text-muted text-sm">Остановить все боты при критических убытках</p>
                  </div>
                  <Switch
                    checked={riskSettings.emergencyStop}
                    onCheckedChange={(checked) => setRiskSettings({ ...riskSettings, emergencyStop: checked })}
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
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
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
                    onCheckedChange={(checked) => setNotifications({ ...notifications, tradeAlerts: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
                  <div>
                    <h4 className="text-base font-medium">P&L уведомления</h4>
                    <p className="text-muted text-sm">Уведомления о прибылях и убытках</p>
                  </div>
                  <Switch
                    checked={notifications.profitLoss}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, profitLoss: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
                  <div>
                    <h4 className="text-base font-medium">Статус ботов</h4>
                    <p className="text-muted text-sm">Уведомления о запуске/остановке ботов</p>
                  </div>
                  <Switch
                    checked={notifications.botStatus}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, botStatus: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
                  <div>
                    <h4 className="text-base font-medium">Системные уведомления</h4>
                    <p className="text-muted text-sm">Ошибки, обновления, технические сообщения</p>
                  </div>
                  <Switch
                    checked={notifications.systemAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, systemAlerts: checked })}
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
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
                  <div>
                    <h4 className="text-base font-medium">Telegram бот</h4>
                    <p className="text-muted text-sm">Уведомления в Telegram</p>
                  </div>
                  <Switch
                    checked={notifications.telegram}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, telegram: checked })}
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
        </TabsContent>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
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
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-surface border-surface-alt">
                      <SelectItem value="dark">Темная</SelectItem>
                      <SelectItem value="light">Светлая</SelectItem>
                      <SelectItem value="auto">Автоматически</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-base">Язык</Label>
                  <Select
                    value={generalSettings.language}
                    onValueChange={(value) => setGeneralSettings({ ...generalSettings, language: value })}
                  >
                    <SelectTrigger className="bg-surface border-surface-alt text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-surface border-surface-alt">
                      <SelectItem value="ru">Русский</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-base">Часовой пояс</Label>
                  <Select
                    value={generalSettings.timezone}
                    onValueChange={(value) => setGeneralSettings({ ...generalSettings, timezone: value })}
                  >
                    <SelectTrigger className="bg-surface border-surface-alt text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-surface border-surface-alt">
                      <SelectItem value="UTC+3">UTC+3 (Москва)</SelectItem>
                      <SelectItem value="UTC+0">UTC+0 (Лондон)</SelectItem>
                      <SelectItem value="UTC-5">UTC-5 (Нью-Йорк)</SelectItem>
                      <SelectItem value="UTC+8">UTC+8 (Сингапур)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-base">Валюта отображения</Label>
                  <Select
                    value={generalSettings.currency}
                    onValueChange={(value) => setGeneralSettings({ ...generalSettings, currency: value })}
                  >
                    <SelectTrigger className="bg-surface border-surface-alt text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-surface border-surface-alt">
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="RUB">RUB (₽)</SelectItem>
                      <SelectItem value="BTC">BTC (₿)</SelectItem>
                    </SelectContent>
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
                    onCheckedChange={(checked) => setGeneralSettings({ ...generalSettings, autoBackup: checked })}
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
