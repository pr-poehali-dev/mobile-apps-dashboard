
interface WallpaperProps {
  url: string;
}

const Wallpaper: React.FC<WallpaperProps> = ({ url }) => {
  return (
    <div
      className="h-full w-full bg-cover bg-center"
      style={{ 
        backgroundImage: `url(${url})`,
        transition: 'background-image 0.5s ease-in-out' 
      }}
    />
  );
};

export default Wallpaper;
