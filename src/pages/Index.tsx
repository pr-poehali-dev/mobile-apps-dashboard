
import PhoneInterface from '@/components/Phone/PhoneInterface';
import WallpaperApp from '@/components/Apps/WallpaperApp';
import SnakeGame from '@/components/Apps/SnakeGame';
import YoutubeApp from '@/components/Apps/YoutubeApp';
import GoogleApp from '@/components/Apps/GoogleApp';

const defaultWallpaper = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop";

const apps = [
  {
    id: 'wallpaper',
    name: 'Обои',
    icon: 'Image',
    component: WallpaperApp
  },
  {
    id: 'snake',
    name: 'Змейка',
    icon: 'Gamepad2',
    component: SnakeGame
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: 'Youtube',
    component: YoutubeApp
  },
  {
    id: 'google',
    name: 'Google',
    icon: 'Search',
    component: GoogleApp
  },
  {
    id: 'settings',
    name: 'Настройки',
    icon: 'Settings',
    component: () => (
      <div className="h-full flex flex-col items-center justify-center">
        <Icon name="Settings" size={48} className="mb-4 text-gray-400" />
        <p className="text-gray-500">Настройки будут доступны в следующем обновлении</p>
      </div>
    )
  },
  {
    id: 'tetris',
    name: 'Тетрис',
    icon: 'Boxes',
    component: () => (
      <div className="h-full flex flex-col items-center justify-center">
        <Icon name="Boxes" size={48} className="mb-4 text-gray-400" />
        <p className="text-gray-500">Тетрис будет доступен в следующем обновлении</p>
      </div>
    )
  },
  {
    id: 'calculator',
    name: 'Калькулятор',
    icon: 'Calculator',
    component: () => (
      <div className="h-full flex flex-col items-center justify-center">
        <Icon name="Calculator" size={48} className="mb-4 text-gray-400" />
        <p className="text-gray-500">Калькулятор будет доступен в следующем обновлении</p>
      </div>
    )
  },
  {
    id: 'weather',
    name: 'Погода',
    icon: 'Cloud',
    component: () => (
      <div className="h-full flex flex-col items-center justify-center">
        <Icon name="Cloud" size={48} className="mb-4 text-gray-400" />
        <p className="text-gray-500">Погода будет доступна в следующем обновлении</p>
      </div>
    )
  }
];

import Icon from '@/components/ui/icon';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black py-8">
      <PhoneInterface apps={apps} defaultWallpaper={defaultWallpaper} />
    </div>
  );
};

export default Index;
