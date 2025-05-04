
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SettingsAppProps {
  // В реальном приложении здесь мы бы получали и обновляли глобальные настройки
}

const SettingsApp: React.FC<SettingsAppProps> = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [volume, setVolume] = useState(70);
  const [brightness, setBrightness] = useState(80);
  const [notifications, setNotifications] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  
  // Заглушки функций для настроек (в реальном приложении они бы меняли глобальное состояние)
  const handleDarkModeChange = (enabled: boolean) => {
    setDarkMode(enabled);
    // Здесь была бы логика для изменения темы приложения
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    // Здесь была бы логика изменения громкости
  };

  const handleBrightnessChange = (value: number[]) => {
    setBrightness(value[0]);
    // Здесь была бы логика изменения яркости
  };

  const handleNotificationsChange = (enabled: boolean) => {
    setNotifications(enabled);
    // Здесь была бы логика управления уведомлениями
  };

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
    // Здесь была бы логика изменения размера шрифта
  };

  return (
    <div className="h-full overflow-y-auto">
      <Tabs defaultValue="display">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="display" className="flex-1">Экран</TabsTrigger>
          <TabsTrigger value="sound" className="flex-1">Звук</TabsTrigger>
          <TabsTrigger value="notifications" className="flex-1">Уведомления</TabsTrigger>
        </TabsList>
        
        <TabsContent value="display" className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Темная тема</Label>
              <Switch 
                id="dark-mode" 
                checked={darkMode} 
                onCheckedChange={handleDarkModeChange} 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="brightness">Яркость</Label>
                <span className="text-sm">{brightness}%</span>
              </div>
              <Slider 
                id="brightness"
                value={[brightness]}
                min={10}
                max={100}
                step={1}
                onValueChange={handleBrightnessChange}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="font-size">Размер шрифта</Label>
                <span className="text-sm">{fontSize}px</span>
              </div>
              <Slider 
                id="font-size"
                value={[fontSize]}
                min={12}
                max={24}
                step={1}
                onValueChange={handleFontSizeChange}
              />
            </div>
            
            <div className="pt-2">
              <Button 
                variant="outline" 
                className="w-full"
              >
                Сбросить настройки экрана
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sound" className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="volume">Громкость</Label>
                <span className="text-sm">{volume}%</span>
              </div>
              <Slider 
                id="volume"
                value={[volume]}
                min={0}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="sound-effects">Звуки нажатий</Label>
              <Switch 
                id="sound-effects" 
                checked={true} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="sound-notifications">Звук уведомлений</Label>
              <Switch 
                id="sound-notifications" 
                checked={true} 
              />
            </div>
            
            <div className="pt-2">
              <Button 
                variant="outline" 
                className="w-full"
              >
                Сбросить настройки звука
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications-toggle">Уведомления</Label>
              <Switch 
                id="notifications-toggle" 
                checked={notifications} 
                onCheckedChange={handleNotificationsChange} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications-apps">Уведомления приложений</Label>
              <Switch 
                id="notifications-apps" 
                checked={true} 
                disabled={!notifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications-system">Системные уведомления</Label>
              <Switch 
                id="notifications-system" 
                checked={true} 
                disabled={!notifications}
              />
            </div>
            
            <div className="pt-2">
              <Button 
                variant="outline" 
                className="w-full"
              >
                Сбросить настройки уведомлений
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsApp;
