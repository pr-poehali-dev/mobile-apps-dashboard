
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Video {
  id: string;
  title: string;
  channel: string;
  views: string;
  thumbnail: string;
}

const popularVideos: Video[] = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Rick Astley - Never Gonna Give You Up',
    channel: 'Rick Astley',
    views: '1.2B просмотров',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg'
  },
  {
    id: 'jNQXAC9IVRw',
    title: 'Me at the zoo',
    channel: 'jawed',
    views: '249M просмотров',
    thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/mqdefault.jpg'
  },
  {
    id: 'FyASdjZE0R0',
    title: 'Они не знают что мы знаем',
    channel: 'Чисто Поржать',
    views: '10M просмотров',
    thumbnail: 'https://img.youtube.com/vi/FyASdjZE0R0/mqdefault.jpg'
  }
];

const YoutubeApp: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  
  const filteredVideos = searchQuery 
    ? popularVideos.filter(video => 
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        video.channel.toLowerCase().includes(searchQuery.toLowerCase())
      ) 
    : popularVideos;

  const handleVideoClick = (video: Video) => {
    setActiveVideo(video);
  };

  const handleBackToList = () => {
    setActiveVideo(null);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Поиск на YouTube"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button variant="outline" size="icon">
          <Icon name="Search" size={18} />
        </Button>
      </div>

      {activeVideo ? (
        <div className="flex-1 flex flex-col">
          <Button 
            variant="ghost" 
            className="mb-2 self-start"
            onClick={handleBackToList}
          >
            <Icon name="ArrowLeft" className="mr-2" size={16} />
            Назад
          </Button>
          
          <div className="aspect-video w-full bg-black rounded-md overflow-hidden mb-3">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${activeVideo.id}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          <h3 className="font-semibold text-base mb-1">{activeVideo.title}</h3>
          <div className="flex items-center mb-2">
            <div className="h-8 w-8 rounded-full bg-gray-200 mr-2"></div>
            <div>
              <p className="text-sm font-medium">{activeVideo.channel}</p>
              <p className="text-xs text-gray-500">{activeVideo.views}</p>
            </div>
          </div>
          
          <div className="flex gap-2 mb-4">
            <Button variant="outline" size="sm" className="flex-1">
              <Icon name="ThumbsUp" className="mr-2" size={16} />
              Нравится
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Icon name="Share" className="mr-2" size={16} />
              Поделиться
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <h3 className="font-medium mb-3">Популярное</h3>
          <div className="space-y-4">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => (
                <div 
                  key={video.id} 
                  className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md"
                  onClick={() => handleVideoClick(video)}
                >
                  <div className="w-36 h-20 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm line-clamp-2">{video.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{video.channel}</p>
                    <p className="text-xs text-gray-500">{video.views}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                Ничего не найдено
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default YoutubeApp;
