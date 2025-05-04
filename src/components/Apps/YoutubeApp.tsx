
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Video {
  id: string;
  title: string;
  channel: string;
  views: string;
  thumbnail: string;
}

interface Short {
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
  },
  {
    id: '9bZkp7q19f0',
    title: 'PSY - GANGNAM STYLE(강남스타일)',
    channel: 'officialpsy',
    views: '4.6B просмотров',
    thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/mqdefault.jpg'
  },
  {
    id: 'kJQP7kiw5Fk',
    title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
    channel: 'Luis Fonsi',
    views: '8.1B просмотров',
    thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/mqdefault.jpg'
  },
  {
    id: 'RgKAFK5djSk',
    title: 'Wiz Khalifa - See You Again ft. Charlie Puth',
    channel: 'Wiz Khalifa',
    views: '5.8B просмотров',
    thumbnail: 'https://img.youtube.com/vi/RgKAFK5djSk/mqdefault.jpg'
  },
  {
    id: 'OPf0YbXqDm0',
    title: 'Mark Ronson - Uptown Funk ft. Bruno Mars',
    channel: 'Mark Ronson',
    views: '4.9B просмотров',
    thumbnail: 'https://img.youtube.com/vi/OPf0YbXqDm0/mqdefault.jpg'
  },
  {
    id: 'JGwWNGJdvx8',
    title: 'Ed Sheeran - Shape of You',
    channel: 'Ed Sheeran',
    views: '5.7B просмотров',
    thumbnail: 'https://img.youtube.com/vi/JGwWNGJdvx8/mqdefault.jpg'
  },
  {
    id: 'pRpeEdMmmQ0',
    title: 'Имперский марш из "Звездных войн" на 8 калькуляторах',
    channel: 'device orchestra',
    views: '4.2M просмотров',
    thumbnail: 'https://img.youtube.com/vi/pRpeEdMmmQ0/mqdefault.jpg'
  },
  {
    id: '-5KAN9_CzSA',
    title: 'Marshmello - Alone',
    channel: 'Marshmello',
    views: '2.3B просмотров',
    thumbnail: 'https://img.youtube.com/vi/-5KAN9_CzSA/mqdefault.jpg'
  },
  {
    id: 'YQHsXMglC9A',
    title: 'Adele - Hello',
    channel: 'Adele',
    views: '3.1B просмотров',
    thumbnail: 'https://img.youtube.com/vi/YQHsXMglC9A/mqdefault.jpg'
  },
  {
    id: 'hT_nvWreIhg',
    title: 'OneRepublic - Counting Stars',
    channel: 'OneRepublic',
    views: '3.6B просмотров',
    thumbnail: 'https://img.youtube.com/vi/hT_nvWreIhg/mqdefault.jpg'
  }
];

const shorts: Short[] = [
  {
    id: 'HBad1GryM8A',
    title: 'AI Написал программу своей лапкой 😂 #shorts',
    channel: 'ITKarma',
    views: '6.2M просмотров',
    thumbnail: 'https://img.youtube.com/vi/HBad1GryM8A/mqdefault.jpg'
  },
  {
    id: 'BVBOxDMcF6k',
    title: 'Почему TypeScript такой сложный 😱 #shorts',
    channel: 'Frontend Digest',
    views: '1.8M просмотров',
    thumbnail: 'https://img.youtube.com/vi/BVBOxDMcF6k/mqdefault.jpg'
  },
  {
    id: 'DY6Ru5k4mKc',
    title: 'Когда нашёл идеальную архитектуру #shorts',
    channel: 'IT Memes',
    views: '4.5M просмотров',
    thumbnail: 'https://img.youtube.com/vi/DY6Ru5k4mKc/mqdefault.jpg'
  },
  {
    id: 'qwvBrQmUZGY',
    title: 'Сложные алгоритмы за 20 секунд #shorts #programming',
    channel: 'AlgoExpert',
    views: '2.3M просмотров',
    thumbnail: 'https://img.youtube.com/vi/qwvBrQmUZGY/mqdefault.jpg'
  },
  {
    id: 'U91Rl6p_vM4',
    title: 'React vs Vue - что выбрать в 2025? #shorts',
    channel: 'WebDev',
    views: '900K просмотров',
    thumbnail: 'https://img.youtube.com/vi/U91Rl6p_vM4/mqdefault.jpg'
  },
  {
    id: '1Qs6dZ0HGO0',
    title: 'Собака играет на пианино 🐕🎹 #shorts',
    channel: 'Pet Music',
    views: '15M просмотров',
    thumbnail: 'https://img.youtube.com/vi/1Qs6dZ0HGO0/mqdefault.jpg'
  },
  {
    id: 'E9d77R3NZKA',
    title: 'Как работает CSS Grid за 30 секунд #shorts',
    channel: 'CSS Master',
    views: '3.1M просмотров',
    thumbnail: 'https://img.youtube.com/vi/E9d77R3NZKA/mqdefault.jpg'
  },
  {
    id: 'GbA5Cjt6Ksk',
    title: 'Кот пытается понять React Hooks 😹 #shorts #reactjs',
    channel: 'ReactMaster',
    views: '8.7M просмотров',
    thumbnail: 'https://img.youtube.com/vi/GbA5Cjt6Ksk/mqdefault.jpg'
  }
];

const YoutubeApp: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [activeShort, setActiveShort] = useState<Short | null>(null);
  const [activeTab, setActiveTab] = useState<string>('videos');
  
  const filteredVideos = searchQuery 
    ? popularVideos.filter(video => 
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        video.channel.toLowerCase().includes(searchQuery.toLowerCase())
      ) 
    : popularVideos;

  const filteredShorts = searchQuery 
    ? shorts.filter(short => 
        short.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        short.channel.toLowerCase().includes(searchQuery.toLowerCase())
      ) 
    : shorts;

  const handleVideoClick = (video: Video) => {
    setActiveVideo(video);
    setActiveShort(null);
  };

  const handleShortClick = (short: Short) => {
    setActiveShort(short);
    setActiveVideo(null);
  };

  const handleBackToList = () => {
    setActiveVideo(null);
    setActiveShort(null);
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
      ) : activeShort ? (
        <div className="flex-1 flex flex-col">
          <Button 
            variant="ghost" 
            className="mb-2 self-start"
            onClick={handleBackToList}
          >
            <Icon name="ArrowLeft" className="mr-2" size={16} />
            Назад
          </Button>
          
          <div className="aspect-[9/16] max-h-[70vh] mx-auto bg-black rounded-md overflow-hidden mb-3">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${activeShort.id}?loop=1&playlist=${activeShort.id}`}
              title="YouTube short player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          <h3 className="font-semibold text-base mb-1">{activeShort.title}</h3>
          <div className="flex items-center mb-2">
            <div className="h-8 w-8 rounded-full bg-gray-200 mr-2"></div>
            <div>
              <p className="text-sm font-medium">{activeShort.channel}</p>
              <p className="text-xs text-gray-500">{activeShort.views}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
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
        <div className="flex-1 flex flex-col">
          <Tabs defaultValue="videos" className="flex-1 flex flex-col" onValueChange={setActiveTab}>
            <TabsList className="w-full mb-4">
              <TabsTrigger value="videos" className="flex-1">
                <Icon name="Play" className="mr-2" size={16} />
                Видео
              </TabsTrigger>
              <TabsTrigger value="shorts" className="flex-1">
                <Icon name="Smartphone" className="mr-2" size={16} />
                Shorts
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="videos" className="flex-1 overflow-y-auto">
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
            </TabsContent>
            
            <TabsContent value="shorts" className="flex-1 overflow-y-auto">
              <h3 className="font-medium mb-3">Shorts</h3>
              <div className="grid grid-cols-2 gap-3">
                {filteredShorts.length > 0 ? (
                  filteredShorts.map((short) => (
                    <div 
                      key={short.id} 
                      className="cursor-pointer hover:bg-gray-50 p-2 rounded-md"
                      onClick={() => handleShortClick(short)}
                    >
                      <div className="aspect-[9/16] bg-gray-200 rounded-md overflow-hidden mb-2">
                        <img 
                          src={short.thumbnail} 
                          alt={short.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-medium text-xs line-clamp-2">{short.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{short.views}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 col-span-2">
                    Ничего не найдено
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default YoutubeApp;
