
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

// Типы для игры Тетрис
type Cell = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
type Board = Cell[][];
type Tetromino = {
  shape: number[][];
  position: { x: number, y: number };
  type: Cell;
};

// Константы
const ROWS = 20;
const COLS = 10;
const CELL_SIZE = 20;
const INITIAL_SPEED = 800;

// Формы тетромино
const TETROMINOES = [
  // I
  {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    type: 1 as Cell
  },
  // J
  {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    type: 2 as Cell
  },
  // L
  {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ],
    type: 3 as Cell
  },
  // O
  {
    shape: [
      [1, 1],
      [1, 1]
    ],
    type: 4 as Cell
  },
  // S
  {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    type: 5 as Cell
  },
  // T
  {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    type: 6 as Cell
  },
  // Z
  {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    type: 7 as Cell
  }
];

// Цвета для тетромино
const COLORS = [
  'transparent',
  '#00FFFF', // I - голубой
  '#0000FF', // J - синий
  '#FF8000', // L - оранжевый
  '#FFFF00', // O - желтый
  '#00FF00', // S - зеленый
  '#800080', // T - фиолетовый
  '#FF0000'  // Z - красный
];

const TetrisGame: React.FC = () => {
  const [board, setBoard] = useState<Board>([]);
  const [tetromino, setTetromino] = useState<Tetromino | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [level, setLevel] = useState(1);

  const gameOverRef = useRef(gameOver);
  const isPausedRef = useRef(isPaused);
  const tetrominoRef = useRef(tetromino);
  const boardRef = useRef(board);

  // Обновление refs
  useEffect(() => {
    gameOverRef.current = gameOver;
    isPausedRef.current = isPaused;
    tetrominoRef.current = tetromino;
    boardRef.current = board;
  }, [gameOver, isPaused, tetromino, board]);

  // Инициализация игры
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    // Создаем пустую доску
    const newBoard: Board = Array(ROWS).fill(0).map(() => 
      Array(COLS).fill(0)
    ) as Board;
    
    setBoard(newBoard);
    setGameOver(false);
    setScore(0);
    setLevel(1);
    spawnTetromino();
  };

  // Создание нового тетромино
  const spawnTetromino = () => {
    const randomIndex = Math.floor(Math.random() * TETROMINOES.length);
    const newTetromino = {
      ...TETROMINOES[randomIndex],
      position: { x: Math.floor(COLS / 2) - 1, y: 0 }
    };
    
    // Проверка на конец игры - если новый тетромино сразу сталкивается
    if (isCollision(newTetromino)) {
      setGameOver(true);
      return;
    }
    
    setTetromino(newTetromino);
  };

  // Проверка столкновений
  const isCollision = (tetromino: Tetromino): boolean => {
    for (let y = 0; y < tetromino.shape.length; y++) {
      for (let x = 0; x < tetromino.shape[y].length; x++) {
        if (tetromino.shape[y][x]) {
          const boardX = tetromino.position.x + x;
          const boardY = tetromino.position.y + y;
          
          // Проверка границ и столкновений с другими блоками
          if (
            boardX < 0 || 
            boardX >= COLS || 
            boardY >= ROWS ||
            (boardY >= 0 && boardRef.current[boardY][boardX])
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  // Вращение тетромино
  const rotateTetromino = () => {
    if (!tetromino || gameOver) return;

    const newTetromino = { ...tetromino };
    const rows = newTetromino.shape.length;
    const cols = newTetromino.shape[0].length;
    
    const rotated = Array(rows).fill(0).map(() => Array(cols).fill(0));
    
    // Поворот матрицы на 90 градусов по часовой стрелке
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        rotated[x][rows - 1 - y] = newTetromino.shape[y][x];
      }
    }
    
    newTetromino.shape = rotated;
    
    // Проверка, не будет ли столкновений после поворота
    if (!isCollision(newTetromino)) {
      setTetromino(newTetromino);
    }
  };

  // Движение тетромино
  const moveTetromino = (dx: number, dy: number) => {
    if (!tetromino || gameOver) return;

    const newTetromino = {
      ...tetromino,
      position: {
        x: tetromino.position.x + dx,
        y: tetromino.position.y + dy
      }
    };
    
    if (!isCollision(newTetromino)) {
      setTetromino(newTetromino);
      return true;
    }
    
    // Если движение вниз вызвало столкновение, закрепляем тетромино
    if (dy > 0) {
      lockTetromino();
      return false;
    }
    
    return false;
  };

  // Закрепление тетромино на доске
  const lockTetromino = () => {
    if (!tetromino) return;

    const newBoard = [...boardRef.current];
    
    // Копируем форму тетромино на доску
    for (let y = 0; y < tetromino.shape.length; y++) {
      for (let x = 0; x < tetromino.shape[y].length; x++) {
        if (tetromino.shape[y][x]) {
          const boardY = tetromino.position.y + y;
          const boardX = tetromino.position.x + x;
          
          if (boardY >= 0) {
            newBoard[boardY][boardX] = tetromino.type;
          }
        }
      }
    }
    
    setBoard(newBoard);
    clearLines(newBoard);
    spawnTetromino();
  };

  // Очистка заполненных линий
  const clearLines = (board: Board) => {
    let linesCleared = 0;
    const newBoard = [...board];
    
    for (let y = ROWS - 1; y >= 0; y--) {
      // Проверяем, заполнена ли линия
      if (newBoard[y].every(cell => cell !== 0)) {
        // Удаляем эту линию и добавляем пустую сверху
        newBoard.splice(y, 1);
        newBoard.unshift(Array(COLS).fill(0) as Cell[]);
        linesCleared++;
        y++; // Проверяем ту же строку снова, т.к. все строки сдвинулись вниз
      }
    }
    
    if (linesCleared > 0) {
      // Начисляем очки: 100 за 1 линию, 300 за 2, 500 за 3, 800 за 4
      const points = [0, 100, 300, 500, 800][linesCleared] || 0;
      const newScore = score + points;
      
      setScore(newScore);
      
      // Повышаем уровень каждые 1000 очков
      if (Math.floor(newScore / 1000) > Math.floor(score / 1000)) {
        setLevel(Math.floor(newScore / 1000) + 1);
      }
      
      setBoard(newBoard);
    }
  };

  // Игровой цикл
  useEffect(() => {
    if (gameOver) return;

    const gameLoop = setInterval(() => {
      if (isPausedRef.current || gameOverRef.current) return;
      
      // Двигаем тетромино вниз
      moveTetromino(0, 1);
    }, INITIAL_SPEED / level);
    
    return () => clearInterval(gameLoop);
  }, [level, tetromino]);

  // Обработка нажатий клавиш
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOverRef.current) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          moveTetromino(-1, 0);
          break;
        case 'ArrowRight':
          moveTetromino(1, 0);
          break;
        case 'ArrowDown':
          moveTetromino(0, 1);
          break;
        case 'ArrowUp':
          rotateTetromino();
          break;
        case ' ':
          // Быстрое падение тетромино
          while (moveTetromino(0, 1)) {
            // Продолжаем двигать вниз, пока не будет столкновения
          }
          break;
        case 'p':
          setIsPaused(!isPausedRef.current);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Отрисовка доски
  const renderBoard = () => {
    const combinedBoard = [...boardRef.current].map(row => [...row]);
    
    if (tetromino) {
      // Накладываем текущий тетромино на доску для отображения
      for (let y = 0; y < tetromino.shape.length; y++) {
        for (let x = 0; x < tetromino.shape[y].length; x++) {
          if (tetromino.shape[y][x]) {
            const boardY = tetromino.position.y + y;
            const boardX = tetromino.position.x + x;
            
            if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
              combinedBoard[boardY][boardX] = tetromino.type;
            }
          }
        }
      }
    }
    
    return (
      <div className="border-2 border-gray-400 relative bg-gray-100 overflow-hidden">
        {combinedBoard.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="border border-gray-200"
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  backgroundColor: COLORS[cell],
                }}
              />
            ))}
          </div>
        ))}
        
        {gameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center">
            <div className="text-white text-xl font-bold mb-4">Игра окончена!</div>
            <Button onClick={resetGame}>Начать заново</Button>
          </div>
        )}
        
        {isPaused && !gameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-xl font-bold">Пауза</div>
          </div>
        )}
      </div>
    );
  };

  // Мобильные контроллеры
  const handleControl = (action: 'left' | 'right' | 'down' | 'rotate' | 'drop') => {
    if (gameOver || isPaused) return;
    
    switch (action) {
      case 'left':
        moveTetromino(-1, 0);
        break;
      case 'right':
        moveTetromino(1, 0);
        break;
      case 'down':
        moveTetromino(0, 1);
        break;
      case 'rotate':
        rotateTetromino();
        break;
      case 'drop':
        while (moveTetromino(0, 1)) {
          // Падение до столкновения
        }
        break;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <div>
          <div className="font-medium">Счёт: {score}</div>
          <div className="text-sm">Уровень: {level}</div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? 'Продолжить' : 'Пауза'}
        </Button>
      </div>

      <div className="flex-1 flex justify-center overflow-auto mb-2">
        {renderBoard()}
      </div>

      <div className="grid grid-cols-4 gap-2">
        <Button 
          variant="outline" 
          onClick={() => handleControl('left')}
        >
          <Icon name="ArrowLeft" size={16} />
        </Button>
        <Button 
          variant="outline" 
          onClick={() => handleControl('down')}
        >
          <Icon name="ArrowDown" size={16} />
        </Button>
        <Button 
          variant="outline" 
          onClick={() => handleControl('right')}
        >
          <Icon name="ArrowRight" size={16} />
        </Button>
        <Button 
          variant="outline" 
          onClick={() => handleControl('rotate')}
        >
          <Icon name="RotateCw" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default TetrisGame;
