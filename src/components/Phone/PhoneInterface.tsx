
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { formatDate } from 'date-fns';
import { ru } from 'date-fns/locale';
import AppIcon from './AppIcon';
import Wallpaper from './Wallpaper';

interface PhoneApp {
  id: string;
  name: string;
  icon: string;
  component: React.ComponentType<any>;
}

interface PhoneInterfaceProps {
  apps: PhoneApp[];
  defaultWallpaper: string;
}

const PhoneInterface: React.FC<PhoneInterfaceProps> = ({ apps, defaultWallpaper }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [wallpaper, setWallpaper] = useState(defaultWallpaper);

  // Обновление времени каждую минуту
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const openApp = (appId: string) => {
    setActiveApp(appId);
  };

  const closeApp = () => {
    setActiveApp(null);
  };

  const currentApp = apps.find(app => app.id === activeApp);
  const AppComponent = currentApp ? currentApp.component : null;

  const changeWallpaper = (newWallpaper: string) => {
    setWallpaper(newWallpaper);
  };

  return (
    <div className="relative mx-auto bg-black rounded-[40px] h-[700px] w-[350px] shadow-xl overflow-hidden border-4 border-gray-800">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-6 bg-black rounded-b-2xl z-10"></div>
      
      {/* Phone Screen */}
      <div className="relative h-full w-full bg-gradient-to-b from-indigo-500 to-purple-700 overflow-hidden">
        {/* Wallpaper */}
        <div className="absolute inset-0">
          <Wallpaper url={wallpaper} />
        </div>

        {/* Status Bar */}
        <div className="relative flex justify-between items-center px-6 py-2 text-white z-10">
          <div>{formatDate(currentTime, 'HH:mm', { locale: ru })}</div>
          <div className="flex items-center gap-1">
            <Icon name="Signal" size={16} />
            <Icon name="Wifi" size={16} />
            <Icon name="Battery" size={16} />
          </div>
        </div>

        {/* Content Area */}
        {activeApp ? (
          <div className="relative h-[calc(100%-110px)] mt-2 z-20">
            <div className="bg-white h-full rounded-t-xl overflow-hidden">
              <div className="flex justify-between items-center p-3 bg-gray-100">
                <span className="font-medium">{currentApp.name}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={closeApp}
                  className="h-8 w-8"
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
              <div className="p-4 h-[calc(100%-48px)] overflow-auto">
                {AppComponent && <AppComponent onChangeWallpaper={changeWallpaper} />}
              </div>
            </div>
          </div>
        ) : (
          <div className="relative h-[calc(100%-110px)] mt-2 z-20">
            {/* App Grid */}
            <div className="grid grid-cols-4 gap-4 p-4">
              {apps.map((app) => (
                <AppIcon 
                  key={app.id}
                  icon={app.icon} 
                  name={app.name} 
                  onClick={() => openApp(app.id)} 
                />
              ))}
            </div>
          </div>
        )}

        {/* Dock */}
        <div className="absolute bottom-0 left-0 right-0 h-20 flex justify-center items-center z-20">
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-2 rounded-2xl flex gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={closeApp}
              className="text-white h-12 w-12"
            >
              <Icon name="Home" size={24} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneInterface;
