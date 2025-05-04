
import PhoneInterface from '@/components/Phone/PhoneInterface';
import WallpaperApp from '@/components/Apps/WallpaperApp';
import SnakeGame from '@/components/Apps/SnakeGame';
import YoutubeApp from '@/components/Apps/YoutubeApp';
import GoogleApp from '@/components/Apps/GoogleApp';
import WeatherApp from '@/components/Apps/WeatherApp';
import CalculatorApp from '@/components/Apps/CalculatorApp';
import TetrisGame from '@/components/Apps/TetrisGame';
import SettingsApp from '@/components/Apps/SettingsApp';
import Icon from '@/components/ui/icon';

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
    id: 'weather',
    name: 'Погода',
    icon: 'Cloud',
    component: WeatherApp
  },
  {
    id: 'calculator',
    name: 'Калькулятор',
    icon: 'Calculator',
    component: CalculatorApp
  },
  {
    id: 'tetris',
    name: 'Тетрис',
    icon: 'Boxes',
    component: TetrisGame
  },
  {
    id: 'settings',
    name: 'Настройки',
    icon: 'Settings',
    component: SettingsApp
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
