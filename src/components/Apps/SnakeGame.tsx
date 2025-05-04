
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const GRID_SIZE = 15;
const CELL_SIZE = 20;
const INITIAL_SPEED = 200;

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>([{ x: 7, y: 7 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const directionRef = useRef(direction);
  const gameOverRef = useRef(gameOver);
  const isPausedRef = useRef(isPaused);

  // Обновление refs при изменении состояний
  useEffect(() => {
    directionRef.current = direction;
    gameOverRef.current = gameOver;
    isPausedRef.current = isPaused;
  }, [direction, gameOver, isPaused]);

  // Размещение еды в случайном месте
  const placeFood = () => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    setFood(newFood);
  };

  // Сброс игры
  const resetGame = () => {
    setSnake([{ x: 7, y: 7 }]);
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    placeFood();
  };

  // Обработка движения змейки
  useEffect(() => {
    const moveSnake = () => {
      if (gameOverRef.current || isPausedRef.current) return;

      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };
        
        // Движение головы в соответствии с направлением
        switch (directionRef.current) {
          case 'UP':
            head.y = (head.y - 1 + GRID_SIZE) % GRID_SIZE;
            break;
          case 'DOWN':
            head.y = (head.y + 1) % GRID_SIZE;
            break;
          case 'LEFT':
            head.x = (head.x - 1 + GRID_SIZE) % GRID_SIZE;
            break;
          case 'RIGHT':
            head.x = (head.x + 1) % GRID_SIZE;
            break;
        }

        // Проверка столкновения с собой
        if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];
        
        // Проверка поедания еды
        if (head.x === food.x && head.y === food.y) {
          setScore(prevScore => prevScore + 1);
          placeFood();
        } else {
          newSnake.pop(); // Удаляем хвост, если еда не съедена
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, INITIAL_SPEED);
    return () => clearInterval(gameInterval);
  }, [food]);

  // Обработка клавиатурного ввода
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOverRef.current) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (directionRef.current !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (directionRef.current !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (directionRef.current !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (directionRef.current !== 'LEFT') setDirection('RIGHT');
          break;
        case ' ':
          setIsPaused(!isPausedRef.current);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Управление для мобильных устройств
  const handleDirectionClick = (newDirection: Direction) => {
    if (gameOver) return;
    
    // Предотвращаем разворот на 180 градусов
    if (
      (newDirection === 'UP' && direction !== 'DOWN') ||
      (newDirection === 'DOWN' && direction !== 'UP') ||
      (newDirection === 'LEFT' && direction !== 'RIGHT') ||
      (newDirection === 'RIGHT' && direction !== 'LEFT')
    ) {
      setDirection(newDirection);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <div className="font-medium">Счёт: {score}</div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? 'Продолжить' : 'Пауза'}
        </Button>
      </div>

      <div className="flex-1 relative bg-gray-100 rounded-lg mb-2 overflow-hidden">
        <div 
          style={{ 
            width: GRID_SIZE * CELL_SIZE, 
            height: GRID_SIZE * CELL_SIZE,
            maxWidth: '100%',
            maxHeight: '100%'
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          {/* Еда */}
          <div 
            className="absolute bg-red-500 rounded-full"
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              left: food.x * CELL_SIZE,
              top: food.y * CELL_SIZE
            }}
          />

          {/* Змейка */}
          {snake.map((segment, index) => (
            <div
              key={index}
              className={`absolute ${index === 0 ? 'bg-green-600' : 'bg-green-500'} rounded-sm`}
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
                left: segment.x * CELL_SIZE,
                top: segment.y * CELL_SIZE,
                zIndex: snake.length - index
              }}
            />
          ))}

          {/* Конец игры */}
          {gameOver && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
              <div className="text-white text-xl font-bold mb-4">Игра окончена!</div>
              <Button onClick={resetGame}>Начать заново</Button>
            </div>
          )}
        </div>
      </div>

      {/* Мобильное управление */}
      <div className="grid grid-cols-3 gap-2">
        <div className="col-start-2">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => handleDirectionClick('UP')}
          >
            <Icon name="ArrowUp" />
          </Button>
        </div>
        <div className="col-start-1">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => handleDirectionClick('LEFT')}
          >
            <Icon name="ArrowLeft" />
          </Button>
        </div>
        <div className="col-start-2">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => handleDirectionClick('DOWN')}
          >
            <Icon name="ArrowDown" />
          </Button>
        </div>
        <div className="col-start-3">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => handleDirectionClick('RIGHT')}
          >
            <Icon name="ArrowRight" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
