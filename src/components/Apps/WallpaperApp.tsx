
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const wallpapers = [
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1502657877623-f66bf489d236?w=800&auto=format&fit=crop'
];

interface WallpaperAppProps {
  onChangeWallpaper: (url: string) => void;
}

const WallpaperApp: React.FC<WallpaperAppProps> = ({ onChangeWallpaper }) => {
  const [selectedWallpaper, setSelectedWallpaper] = useState<string | null>(null);
  const [customWallpapers, setCustomWallpapers] = useState<string[]>([]);
  const [customUrl, setCustomUrl] = useState('');
  const [urlError, setUrlError] = useState('');

  const handleSelectWallpaper = (url: string) => {
    setSelectedWallpaper(url);
  };

  const handleApplyWallpaper = () => {
    if (selectedWallpaper) {
      onChangeWallpaper(selectedWallpaper);
    }
  };

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return url.match(/\.(jpeg|jpg|gif|png|webp)$/) !== null;
    } catch (_) {
      return false;
    }
  };

  const handleAddCustomWallpaper = () => {
    if (!customUrl) {
      setUrlError('Пожалуйста, введите URL изображения');
      return;
    }
    
    if (!validateUrl(customUrl)) {
      setUrlError('Пожалуйста, введите корректный URL изображения (jpg, png, gif, webp)');
      return;
    }

    setUrlError('');
    setCustomWallpapers([...customWallpapers, customUrl]);
    setCustomUrl('');
  };

  return (
    <div className="h-full">
      <Tabs defaultValue="gallery">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="gallery" className="flex-1">Галерея</TabsTrigger>
          <TabsTrigger value="custom" className="flex-1">Свои обои</TabsTrigger>
          <TabsTrigger value="live" className="flex-1">Живые</TabsTrigger>
        </TabsList>
        
        <TabsContent value="gallery" className="h-[calc(100%-52px)]">
          <div className="grid grid-cols-2 gap-3 mb-4 h-[calc(100%-48px)] overflow-y-auto">
            {wallpapers.map((url, index) => (
              <div 
                key={index}
                className={`aspect-[9/16] rounded-lg overflow-hidden border-2 ${selectedWallpaper === url ? 'border-purple-500' : 'border-transparent'}`}
                onClick={() => handleSelectWallpaper(url)}
              >
                <img src={url} alt={`Обои ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleApplyWallpaper}
              disabled={!selectedWallpaper}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Применить
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="custom" className="h-[calc(100%-52px)]">
          <div className="mb-4">
            <div className="flex gap-2 mb-2">
              <Input 
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="Введите URL изображения"
                className="flex-1"
              />
              <Button onClick={handleAddCustomWallpaper}>
                <Icon name="Plus" className="mr-2" size={16} />
                Добавить
              </Button>
            </div>
            {urlError && <p className="text-red-500 text-sm">{urlError}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4 h-[calc(100%-100px)] overflow-y-auto">
            {customWallpapers.length === 0 ? (
              <div className="col-span-2 flex items-center justify-center h-40 bg-gray-100 rounded-lg text-gray-500">
                У вас еще нет своих обоев. Добавьте URL изображения выше.
              </div>
            ) : (
              customWallpapers.map((url, index) => (
                <div 
                  key={index}
                  className={`aspect-[9/16] rounded-lg overflow-hidden border-2 ${selectedWallpaper === url ? 'border-purple-500' : 'border-transparent'}`}
                  onClick={() => handleSelectWallpaper(url)}
                >
                  <img 
                    src={url} 
                    alt={`Свои обои ${index + 1}`} 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x800?text=Ошибка+загрузки";
                    }}
                  />
                </div>
              ))
            )}
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleApplyWallpaper}
              disabled={!selectedWallpaper}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Применить
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="live">
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <Icon name="Video" size={48} className="mb-4 text-gray-400" />
            <p>Живые обои скоро будут доступны</p>
            <p className="text-sm mt-2">Следите за обновлениями</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WallpaperApp;
