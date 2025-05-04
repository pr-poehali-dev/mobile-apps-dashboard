
import PhoneInterface from '@/components/Phone/PhoneInterface';
import WallpaperApp from '@/components/Apps/WallpaperApp';
import SnakeGame from '@/components/Apps/SnakeGame';

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
    component: () => (
      <div className="h-full flex items-center justify-center">
        YouTube будет доступно в следующем обновлении
      </div>
    )
  },
  {
    id: 'google',
    name: 'Google',
    icon: 'Search',
    component: () => (
      <div className="h-full flex items-center justify-center">
        Google будет доступно в следующем обновлении
      </div>
    )
  },
  {
    id: 'settings',
    name: 'Настройки',
    icon: 'Settings',
    component: () => (
      <div className="h-full flex items-center justify-center">
        Настройки будут доступны в следующем обновлении
      </div>
    )
  },
  {
    id: 'tetris',
    name: 'Тетрис',
    icon: 'Boxes',
    component: () => (
      <div className="h-full flex items-center justify-center">
        Тетрис будет доступен в следующем обновлении
      </div>
    )
  },
  {
    id: 'calculator',
    name: 'Калькулятор',
    icon: 'Calculator',
    component: () => (
      <div className="h-full flex items-center justify-center">
        Калькулятор будет доступен в следующем обновлении
      </div>
    )
  },
  {
    id: 'weather',
    name: 'Погода',
    icon: 'Cloud',
    component: () => (
      <div className="h-full flex items-center justify-center">
        Погода будет доступна в следующем обновлении
      </div>
    )
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black py-8">
      <PhoneInterface apps={apps} defaultWallpaper={defaultWallpaper} />
    </div>
  );
};

export default Index;
