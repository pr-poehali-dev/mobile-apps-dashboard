
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const clearAll = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperation(null);
    setWaitingForSecondOperand(false);
  };

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operation) {
      const result = performCalculation();
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperation(nextOperator);
  };

  const performCalculation = (): number => {
    const inputValue = parseFloat(display);

    if (firstOperand === null || operation === null) {
      return inputValue;
    }

    let result = 0;
    switch (operation) {
      case '+':
        result = firstOperand + inputValue;
        break;
      case '-':
        result = firstOperand - inputValue;
        break;
      case '*':
        result = firstOperand * inputValue;
        break;
      case '/':
        if (inputValue === 0) {
          return NaN; // Деление на ноль
        }
        result = firstOperand / inputValue;
        break;
      default:
        return inputValue;
    }

    return Number(result.toFixed(10));
  };

  const handleEquals = () => {
    if (!operation || firstOperand === null) return;

    const result = performCalculation();
    setDisplay(Number.isNaN(result) ? 'Ошибка' : String(result));
    setFirstOperand(result);
    setOperation(null);
    setWaitingForSecondOperand(false);
  };

  const toggleSign = () => {
    setDisplay(String(-parseFloat(display)));
  };

  const handlePercent = () => {
    const inputValue = parseFloat(display);
    setDisplay(String(inputValue / 100));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-900 text-white p-4 rounded-lg mb-4 text-right">
        <div className="text-gray-400 text-xs mb-1">
          {firstOperand !== null ? `${firstOperand} ${operation}` : ''}
        </div>
        <div className="text-2xl font-mono font-semibold">{display}</div>
      </div>

      <div className="grid grid-cols-4 gap-2 flex-1">
        <Button 
          variant="outline" 
          className="bg-gray-200"
          onClick={clearAll}
        >
          C
        </Button>
        <Button 
          variant="outline" 
          className="bg-gray-200"
          onClick={toggleSign}
        >
          +/-
        </Button>
        <Button 
          variant="outline" 
          className="bg-gray-200"
          onClick={handlePercent}
        >
          %
        </Button>
        <Button 
          variant="default" 
          className="bg-orange-500 hover:bg-orange-600" 
          onClick={() => handleOperator('/')}
        >
          ÷
        </Button>

        <Button 
          variant="outline"
          onClick={() => inputDigit('7')}
        >
          7
        </Button>
        <Button 
          variant="outline"
          onClick={() => inputDigit('8')}
        >
          8
        </Button>
        <Button 
          variant="outline"
          onClick={() => inputDigit('9')}
        >
          9
        </Button>
        <Button 
          variant="default" 
          className="bg-orange-500 hover:bg-orange-600" 
          onClick={() => handleOperator('*')}
        >
          ×
        </Button>

        <Button 
          variant="outline"
          onClick={() => inputDigit('4')}
        >
          4
        </Button>
        <Button 
          variant="outline"
          onClick={() => inputDigit('5')}
        >
          5
        </Button>
        <Button 
          variant="outline"
          onClick={() => inputDigit('6')}
        >
          6
        </Button>
        <Button 
          variant="default" 
          className="bg-orange-500 hover:bg-orange-600" 
          onClick={() => handleOperator('-')}
        >
          -
        </Button>

        <Button 
          variant="outline"
          onClick={() => inputDigit('1')}
        >
          1
        </Button>
        <Button 
          variant="outline"
          onClick={() => inputDigit('2')}
        >
          2
        </Button>
        <Button 
          variant="outline"
          onClick={() => inputDigit('3')}
        >
          3
        </Button>
        <Button 
          variant="default" 
          className="bg-orange-500 hover:bg-orange-600" 
          onClick={() => handleOperator('+')}
        >
          +
        </Button>

        <Button 
          variant="outline" 
          className="col-span-2"
          onClick={() => inputDigit('0')}
        >
          0
        </Button>
        <Button 
          variant="outline"
          onClick={inputDecimal}
        >
          .
        </Button>
        <Button 
          variant="default" 
          className="bg-orange-500 hover:bg-orange-600" 
          onClick={handleEquals}
        >
          =
        </Button>
      </div>
    </div>
  );
};

export default CalculatorApp;
