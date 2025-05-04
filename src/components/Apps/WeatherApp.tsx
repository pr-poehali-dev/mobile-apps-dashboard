
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

// Заглушка данных о погоде для демонстрации
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
  }
};

const WeatherApp: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(mockWeatherData['Москва']);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    // В реальном приложении здесь был бы API-запрос
    // Имитируем получение данных о погоде для выбранного города
    const cityKey = Object.keys(mockWeatherData).find(city => 
      city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (cityKey) {
      setWeather(mockWeatherData[cityKey]);
      setError('');
    } else {
      setError(`Город "${searchQuery}" не найден`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Введите город"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button variant="outline" size="icon" onClick={handleSearch}>
          <Icon name="Search" size={18} />
        </Button>
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
