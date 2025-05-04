
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  wind: number;
  forecast: Array<{
    day: string;
    temperature: number;
    condition: string;
    icon: string;
  }>;
}

// Расширенная база данных городов для демонстрации
const mockWeatherData: Record<string, WeatherData> = {
  'Москва': {
    city: 'Москва',
    temperature: 21,
    condition: 'Ясно',
    icon: 'Sun',
    humidity: 65,
    wind: 5,
    forecast: [
      { day: 'Пн', temperature: 22, condition: 'Ясно', icon: 'Sun' },
      { day: 'Вт', temperature: 20, condition: 'Облачно', icon: 'Cloud' },
      { day: 'Ср', temperature: 19, condition: 'Дождь', icon: 'CloudRain' },
      { day: 'Чт', temperature: 18, condition: 'Гроза', icon: 'CloudLightning' },
      { day: 'Пт', temperature: 21, condition: 'Ясно', icon: 'Sun' }
    ]
  },
  'Санкт-Петербург': {
    city: 'Санкт-Петербург',
    temperature: 17,
    condition: 'Дождь',
    icon: 'CloudRain',
    humidity: 80,
    wind: 7,
    forecast: [
      { day: 'Пн', temperature: 18, condition: 'Дождь', icon: 'CloudRain' },
      { day: 'Вт', temperature: 16, condition: 'Облачно', icon: 'Cloud' },
      { day: 'Ср', temperature: 15, condition: 'Дождь', icon: 'CloudRain' },
      { day: 'Чт', temperature: 17, condition: 'Облачно', icon: 'Cloud' },
      { day: 'Пт', temperature: 19, condition: 'Ясно', icon: 'Sun' }
    ]
  },
  'Новосибирск': {
    city: 'Новосибирск',
    temperature: 16,
    condition: 'Облачно',
    icon: 'Cloud',
    humidity: 70,
    wind: 6,
    forecast: [
      { day: 'Пн', temperature: 15, condition: 'Облачно', icon: 'Cloud' },
      { day: 'Вт', temperature: 14, condition: 'Дождь', icon: 'CloudRain' },
      { day: 'Ср', temperature: 16, condition: 'Облачно', icon: 'Cloud' },
      { day: 'Чт', temperature: 18, condition: 'Ясно', icon: 'Sun' },
      { day: 'Пт', temperature: 17, condition: 'Облачно', icon: 'Cloud' }
    ]
  },
  'Екатеринбург': {
    city: 'Екатеринбург',
    temperature: 18,
    condition: 'Ясно',
    icon: 'Sun',
    humidity: 60,
    wind: 4,
    forecast: [
      { day: 'Пн', temperature: 19, condition: 'Ясно', icon: 'Sun' },
      { day: 'Вт', temperature: 17, condition: 'Облачно', icon: 'Cloud' },
      { day: 'Ср', temperature: 16, condition: 'Дождь', icon: 'CloudRain' },
      { day: 'Чт', temperature: 15, condition: 'Дождь', icon: 'CloudRain' },
      { day: 'Пт', temperature: 18, condition: 'Облачно', icon: 'Cloud' }
    ]
  },
  'Казань': {
    city: 'Казань',
    temperature: 19,
    condition: 'Облачно',
    icon: 'Cloud',
    humidity: 68,
    wind: 5,
    forecast: [
      { day: 'Пн', temperature: 20, condition: 'Облачно', icon: 'Cloud' },
      { day: 'Вт', temperature: 21, condition: 'Ясно', icon: 'Sun' },
      { day: 'Ср', temperature: 22, condition: 'Ясно', icon: 'Sun' },
      { day: 'Чт', temperature: 20, condition: 'Облачно', icon: 'Cloud' },
      { day: 'Пт', temperature: 19, condition: 'Дождь', icon: 'CloudRain' }
    ]
  },
  'Нижний Новгород': {
    city: 'Нижний Новгород',
    temperature: 20,
    condition: 'Ясно',
    icon: 'Sun',
    humidity: 65,
    wind: 4,
    forecast: [
      { day: 'Пн', temperature: 21, condition: 'Ясно', icon: 'Sun' },
      { day: 'Вт', temperature: 20, condition: 'Облачно', icon: 'Cloud' },
      { day: 'Ср', temperature: 19, condition: 'Дождь', icon: 'CloudRain' },
      { day: 'Чт', temperature: 18, condition: 'Дождь', icon: 'CloudRain' },
      { day: 'Пт', temperature: 20, condition: 'Облачно', icon: 'Cloud' }
    ]
  },
  'Челябинск': {
    city: 'Челябинск',
    temperature: 17,
    condition: 'Облачно',
    icon: 'Cloud',
    humidity: 70,
    wind: 6,
    forecast: [
      { day: 'Пн', temperature: 18, condition: 'Облачно', icon: 'Cloud' },
      { day: 'Вт', temperature: 16, condition: 'Дождь', icon: 'CloudRain' },
      { day: 'Ср', temperature: 15, condition: 'Дождь', icon: 'CloudRain' },
      { day: 'Чт', temperature: 17, condition: 'Облачно', icon: 'Cloud' },
      { day: 'Пт', temperature: 19, condition: 'Ясно', icon: 'Sun' }
    ]
  },
  'Самара': {
    city: 'Самара',
    temperature: 22,
    condition: 'Ясно',
    icon: 'Sun',
    humidity: 55,
    wind: 3,
    forecast: [
      { day: 'Пн', temperature: 23, condition: 'Ясно', icon: 'Sun' },
      { day: 'Вт', temperature: 24, condition: 'Ясно', icon: 'Sun' },
      { day: 'Ср', temperature: 22, condition: 'Облачно', icon: 'Cloud' },
      { day: 'Чт', temperature: 20, condition: 'Облачно', icon: 'Cloud' },
      { day: 'Пт', temperature: 21, condition: 'Ясно', icon: 'Sun' }
    ]
  },
  'Омск': {
    city: 'Омск',
    temperature: 15,
    condition: 'Дождь',
    icon: 'CloudRain',
    humidity: 80,
    wind: 7,
    forecast: [
      { day: 'Пн', temperature: 14, condition: 'Дождь', icon: 'CloudRain' },
      { day: 'Вт', temperature: 15, condition: 'Дождь', icon: 'CloudRain' },
      { day: 'Ср', temperature: 16, condition: 'Облачно', icon: 'Cloud' },
      { day: 'Чт', temperature: 18, condition: 'Облачно', icon: 'Cloud' },
      { day: 'Пт', temperature: 17, condition: 'Облачно', icon: 'Cloud' }
    ]
  },
  'Краснодар': {
    city: 'Краснодар',
    temperature: 26,
    condition: 'Ясно',
    icon: 'Sun',
    humidity: 45,
    wind: 3,
    forecast: [
      { day: 'Пн', temperature: 27, condition: 'Ясно', icon: 'Sun' },
      { day: 'Вт', temperature: 28, condition: 'Ясно', icon: 'Sun' },
      { day: 'Ср', temperature: 29, condition: 'Ясно', icon: 'Sun' },
      { day: 'Чт', temperature: 27, condition: 'Облачно', icon: 'Cloud' },
      { day: 'Пт', temperature: 25, condition: 'Гроза', icon: 'CloudLightning' }
    ]
  },
  'Сочи': {
    city: 'Сочи',
    temperature: 28,
    condition: 'Ясно',
    icon: 'Sun',
    humidity: 60,
    wind: 2,
    forecast: [
      { day: 'Пн', temperature: 29, condition: 'Ясно', icon: 'Sun' },
      { day: 'Вт', temperature: 28, condition: 'Ясно', icon: 'Sun' },
      { day: 'Ср', temperature: 27, condition: 'Облачно', icon: 'Cloud' },
      { day: 'Чт', temperature: 26, condition: 'Дождь', icon: 'CloudRain' },
      { day: 'Пт', temperature: 27, condition: 'Облачно', icon: 'Cloud' }
    ]
  },
  'Владивосток': {
    city: 'Владивосток',
    temperature: 18,
    condition: 'Туман',
    icon: 'Cloud',
    humidity: 85,
    wind: 8,
    forecast: [
      { day: 'Пн', temperature: 19, condition: 'Туман', icon: 'Cloud' },
      { day: 'Вт', temperature: 20, condition: 'Облачно', icon: 'Cloud' },
      { day: 'Ср', temperature: 21, condition: 'Ясно', icon: 'Sun' },
      { day: 'Чт', temperature: 20, condition: 'Облачно', icon: 'Cloud' },
      { day: 'Пт', temperature: 19, condition: 'Дождь', icon: 'CloudRain' }
    ]
  },
  'Калининград': {
    city: 'Калининград',
    temperature: 19,
    condition: 'Облачно',
    icon: 'Cloud',
    humidity: 75,
    wind: 5,
    forecast: [
      { day: 'Пн', temperature: 18, condition: 'Дождь', icon: 'CloudRain' },
      { day: 'Вт', temperature: 17, condition: 'Дождь', icon: 'CloudRain' },
      { day: 'Ср', temperature: 18, condition: 'Облачно', icon: 'Cloud' },
      { day: 'Чт', temperature: 19, condition: 'Облачно', icon: 'Cloud' },
      { day: 'Пт', temperature: 20, condition: 'Ясно', icon: 'Sun' }
    ]
  }
};

// Популярные города для быстрого доступа
const popularCities = ['Москва', 'Санкт-Петербург', 'Сочи', 'Калининград', 'Екатеринбург'];

const WeatherApp: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(mockWeatherData['Москва']);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    // В реальном приложении здесь был бы API-запрос
    // Имитируем получение данных о погоде для выбранного города
    const cityKey = Object.keys(mockWeatherData).find(city => 
      city.toLowerCase() === searchQuery.toLowerCase()
    );

    if (cityKey) {
      setWeather(mockWeatherData[cityKey]);
      setError('');
      setSuggestions([]);
    } else {
      setError(`Город "${searchQuery}" не найден`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 1) {
      // Поиск городов, содержащих запрос
      const matchedCities = Object.keys(mockWeatherData).filter(city => 
        city.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Ограничиваем 5 результатами
      
      setSuggestions(matchedCities);
    } else {
      setSuggestions([]);
    }
  };

  const selectCity = (city: string) => {
    setSearchQuery(city);
    setWeather(mockWeatherData[city]);
    setError('');
    setSuggestions([]);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="relative">
        <div className="flex gap-2 mb-2">
          <Input
            placeholder="Введите город"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button variant="outline" size="icon" onClick={handleSearch}>
            <Icon name="Search" size={18} />
          </Button>
        </div>
        
        {suggestions.length > 0 && (
          <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
            {suggestions.map((city) => (
              <div 
                key={city} 
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => selectCity(city)}
              >
                {city}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto py-1">
        {popularCities.map(city => (
          <Button 
            key={city} 
            variant="outline" 
            size="sm"
            onClick={() => selectCity(city)}
            className={weather?.city === city ? 'bg-blue-100' : ''}
          >
            {city}
          </Button>
        ))}
      </div>

      {error && (
        <div className="text-red-500 mb-4 text-center">
          {error}
        </div>
      )}

      {weather && (
        <>
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg p-4 mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{weather.city}</h2>
                <p className="text-sm opacity-90">{new Date().toLocaleDateString('ru-RU', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
              </div>
              <div className="text-3xl font-bold">{weather.temperature}°C</div>
            </div>
            <div className="flex items-center mt-4">
              <Icon name={weather.icon as any} size={36} className="mr-2" />
              <span>{weather.condition}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
              <div className="flex items-center">
                <Icon name="Droplets" size={16} className="mr-2" />
                <span>Влажность: {weather.humidity}%</span>
              </div>
              <div className="flex items-center">
                <Icon name="Wind" size={16} className="mr-2" />
                <span>Ветер: {weather.wind} м/с</span>
              </div>
            </div>
          </div>

          <h3 className="font-medium mb-2">Прогноз на 5 дней</h3>
          <div className="grid grid-cols-5 gap-2">
            {weather.forecast.map((day, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-2 text-center">
                <p className="font-medium">{day.day}</p>
                <Icon name={day.icon as any} size={24} className="mx-auto my-1" />
                <p className="text-sm">{day.temperature}°C</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherApp;
