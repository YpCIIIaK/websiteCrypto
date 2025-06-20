"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Code, Settings, Zap } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CreateBotForm({ onBack, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    script: "",
    schedule: "",
    timeout: "300",
    retries: "3",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const newBot = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      status: "stopped",
      lastRun: "Никогда",
      successRate: 0,
      totalRuns: 0,
    }
    onSave(newBot)
  }

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <div className="min-h-screen bg-surface text-base p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="text-muted hover:text-base">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Создание нового бота</h1>
            <p className="text-muted">Настройте параметры автоматизации</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="bg-surface-alt border-brand-dark">
              <TabsTrigger value="basic" className="data-[state=active]:bg-surface">
                <Settings className="h-4 w-4 mr-2" />
                Основные
              </TabsTrigger>
              <TabsTrigger value="script" className="data-[state=active]:bg-surface">
                <Code className="h-4 w-4 mr-2" />
                Скрипт
              </TabsTrigger>
              <TabsTrigger value="advanced" className="data-[state=active]:bg-surface">
                <Zap className="h-4 w-4 mr-2" />
                Расширенные
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
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Введите название бота"
                        className="bg-surface border-surface-alt text-base"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-base">
                        Категория
                      </Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="bg-surface border-surface-alt text-base">
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent className="bg-surface border-surface-alt">
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="data">Data</SelectItem>
                          <SelectItem value="social">Social</SelectItem>
                          <SelectItem value="analytics">Analytics</SelectItem>
                          <SelectItem value="automation">Automation</SelectItem>
                          <SelectItem value="trading">Trading</SelectItem>
                          <SelectItem value="crypto">Crypto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-base">
                      Описание
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Опишите функциональность бота"
                      className="bg-surface border-surface-alt text-base min-h-[100px]"
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="script">
              <Card className="bg-surface-alt border-brand-dark">
                <CardHeader>
                  <CardTitle className="text-base">Код скрипта</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="script" className="text-base">
                      JavaScript код
                    </Label>
                    <Textarea
                      id="script"
                      value={formData.script}
                      onChange={(e) => handleInputChange("script", e.target.value)}
                      placeholder={`// Пример скрипта
async function main() {
  console.log('Бот запущен');
  
  // Ваш код здесь
  
  return { success: true, message: 'Выполнено успешно' };
}

main();`}
                      className="bg-surface border-surface-alt text-base font-mono text-sm min-h-[300px]"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" className="border-surface-alt text-muted">
                      Проверить синтаксис
                    </Button>
                    <Button type="button" variant="outline" className="border-surface-alt text-muted">
                      Тестовый запуск
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced">
              <Card className="bg-surface-alt border-brand-dark">
                <CardHeader>
                  <CardTitle className="text-base">Расширенные настройки</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="schedule" className="text-base">
                        Расписание (cron)
                      </Label>
                      <Input
                        id="schedule"
                        value={formData.schedule}
                        onChange={(e) => handleInputChange("schedule", e.target.value)}
                        placeholder="0 */6 * * * (каждые 6 часов)"
                        className="bg-surface border-surface-alt text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeout" className="text-base">
                        Таймаут (секунды)
                      </Label>
                      <Input
                        id="timeout"
                        type="number"
                        value={formData.timeout}
                        onChange={(e) => handleInputChange("timeout", e.target.value)}
                        className="bg-surface border-surface-alt text-base"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retries" className="text-base">
                      Количество повторов при ошибке
                    </Label>
                    <Input
                      id="retries"
                      type="number"
                      value={formData.retries}
                      onChange={(e) => handleInputChange("retries", e.target.value)}
                      className="bg-surface border-surface-alt text-base"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 mt-6">
            <Button type="button" variant="outline" onClick={onBack} className="border-surface-alt text-muted">
              Отмена
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              Создать бота
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
