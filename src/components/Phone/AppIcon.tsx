
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface AppIconProps {
  icon: string;
  name: string;
  onClick: () => void;
}

const AppIcon: React.FC<AppIconProps> = ({ icon, name, onClick }) => {
  return (
    <div 
      className="flex flex-col items-center hover-scale"
      onClick={onClick}
    >
      <Button 
        className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 hover:shadow-lg transition-all"
        variant="default"
      >
        <Icon name={icon} className="text-white" size={24} />
      </Button>
      <span className="mt-1 text-xs text-white font-medium text-center drop-shadow-md">
        {name}
      </span>
    </div>
  );
};

export default AppIcon;
