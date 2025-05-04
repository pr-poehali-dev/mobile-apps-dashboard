
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface SearchResult {
  title: string;
  url: string;
  description: string;
}

const mockResults: SearchResult[] = [
  {
    title: 'React - A JavaScript library for building user interfaces',
    url: 'https://reactjs.org',
    description: 'React делает безболезненным создание интерактивных пользовательских интерфейсов. Создавайте простые представления для каждого состояния вашего приложения, и React будет эффективно обновлять и отрисовывать только нужные компоненты.'
  },
  {
    title: 'TypeScript: JavaScript с синтаксисом типов',
    url: 'https://www.typescriptlang.org',
    description: 'TypeScript — это строго типизированный язык программирования, который основан на JavaScript и дает вам лучшие инструменты для любого масштаба.'
  },
  {
    title: 'Tailwind CSS - Быстро создавайте современные сайты',
    url: 'https://tailwindcss.com',
    description: 'Утилитарный CSS-фреймворк, упакованный готовыми классами, которые можно применять прямо в вашей разметке, чтобы создавать любой дизайн без написания CSS.'
  },
  {
    title: 'Vite | Следующее поколение инструментов фронтенд-разработки',
    url: 'https://vitejs.dev',
    description: 'Vite (французское слово для «быстрый», произносится как «вит») — это инструмент сборки, который направлен на обеспечение более быстрой и стройной среды разработки.'
  }
];

const GoogleApp: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>(mockResults);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    // В реальном приложении здесь был бы API-запрос
    // Имитируем фильтрацию результатов поиска
    const filtered = mockResults.filter(result => 
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      result.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(filtered);
    setHasSearched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className={`flex flex-col items-center ${hasSearched ? 'mb-4' : 'mb-0 flex-1 justify-center'}`}>
        <div className={`font-bold text-2xl mb-6 ${hasSearched ? 'hidden' : 'flex'}`}>
          <span className="text-blue-600">G</span>
          <span className="text-red-500">o</span>
          <span className="text-yellow-500">o</span>
          <span className="text-blue-600">g</span>
          <span className="text-green-500">l</span>
          <span className="text-red-500">e</span>
        </div>
        
        <div className={`flex w-full gap-2 ${hasSearched ? '' : 'max-w-sm'}`}>
          <Input
            placeholder="Поиск в Google"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button variant="outline" size="icon" onClick={handleSearch}>
            <Icon name="Search" size={18} />
          </Button>
        </div>
      </div>

      {hasSearched && (
        <div className="flex-1 overflow-y-auto">
          {searchResults.length > 0 ? (
            <div className="space-y-6">
              {searchResults.map((result, index) => (
                <div key={index} className="space-y-1">
                  <div className="text-xs text-gray-500">{result.url}</div>
                  <h3 className="text-blue-600 hover:underline font-medium cursor-pointer">{result.title}</h3>
                  <p className="text-sm text-gray-700">{result.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="mb-2 text-gray-600">По запросу "{searchQuery}" ничего не найдено</p>
              <p className="text-sm text-gray-500">Попробуйте изменить запрос или поискать что-то другое</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GoogleApp;
