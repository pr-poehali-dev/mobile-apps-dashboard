
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

  const handleSelectWallpaper = (url: string) => {
    setSelectedWallpaper(url);
  };

  const handleApplyWallpaper = () => {
    if (selectedWallpaper) {
      onChangeWallpaper(selectedWallpaper);
    }
  };

  return (
    <div className="h-full">
      <Tabs defaultValue="gallery">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="gallery" className="flex-1">Галерея</TabsTrigger>
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
        
        <TabsContent value="live">
          <div className="h-full flex items-center justify-center text-gray-500">
            Живые обои скоро будут доступны
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WallpaperApp;
