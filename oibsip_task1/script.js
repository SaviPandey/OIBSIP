document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.querySelector('.input');
    const resultElement = document.querySelector('.result');
    const buttons = document.querySelectorAll('.buttons-grid button');

    let expression = '';
    let isResultDisplayed = false;
    let lastAnswer = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent.trim();

            if (button.classList.contains('number') || buttonText === '.') {
                if (isResultDisplayed) {
                    expression = buttonText;  
                    isResultDisplayed = false;
                } else {
                    expression += buttonText;
                }
                updateDisplay();
            } else if (button.classList.contains('operator')) {
                if (buttonText === 'ans') {
                    expression += lastAnswer;
                } else if (buttonText === 'del') {
                    expression = expression.slice(0, -1);
                } else if (buttonText === 'clr') {
                    expression = '';
                    resultElement.textContent = '0';
                } else if (buttonText === '+/-') {
                    toggleSign();
                } else if (buttonText === 'x²') {
                    expression += '^2';
                } else if (buttonText === '√') {
                    expression += '√';
                } else if (buttonText === 'x^y') {
                    expression += '^';
                } else if (buttonText === 'log') {
                    expression += 'log(';
                } else if (['sin', 'cos', 'tan'].includes(buttonText)) {
                    expression += buttonText + '(';
                } else if (buttonText === 'n!') {
                    calculateFactorial();
                    return;
                } else if (buttonText === 'π') {
                    expression += Math.PI;
                } else if (buttonText === 'e^x') {
                    expression += 'e^'; // Update to use 'e^' for easier recognition
                } else if (buttonText === '10^x') {  // Handle power of 10
                    expression += '10^';
                } else {
                    if (isResultDisplayed) {
                        isResultDisplayed = false;
                    }
                    expression += buttonText;
                }
                updateDisplay();
            } else if (button.classList.contains('Enter')) {
                calculateResult();
            }
        });
    });

    function updateDisplay() {
        inputElement.textContent = expression;
    }

    function toggleSign() {
        if (expression && !isNaN(expression)) {
            expression = expression.startsWith('-') ? expression.slice(1) : '-' + expression;
        }
    }

    function calculateResult() {
        try {
            // Handle e^x calculation
            if (expression.includes('e^')) {
                expression = handleExpCalculation(expression);
            }

            if (expression.includes('^2')) {
                expression = handleSquareCalculation(expression);
            }
            if (expression.includes('√')) {
                expression = handleSqrtCalculation(expression);
            }
            if (expression.includes('^')) {
                expression = handleExponentiation(expression);
            }
            if (expression.includes('log(')) {
                expression = handleLogCalculation(expression);
            }
            if (expression.includes('sin(') || expression.includes('cos(') || expression.includes('tan(')) {
                expression = handleTrigFunctions(expression);
            }
            if (expression.includes('10^')) {
                expression = handlePowerOfTen(expression);
            }

            let result = eval(expression.replace('%', '/100'));
            result = parseFloat(result.toFixed(10));
            resultElement.textContent = result;
            lastAnswer = result;
            isResultDisplayed = true;
            expression = result.toString();
        } catch (e) {
            resultElement.textContent = 'Error';
            expression = '';
        }
    }

    function handleSquareCalculation(expr) {
        return expr.replace(/(\d+(\.\d+)?)\^2/g, (_, num) => Math.pow(parseFloat(num), 2));
    }

    function handleSqrtCalculation(expr) {
        return expr.replace(/√(\d+(\.\d+)?)/g, (_, num) => Math.sqrt(parseFloat(num)));
    }

    function handleExponentiation(expr) {
        return expr.replace(/(\d+(\.\d+)?)\^(\d+(\.\d+)?)/g, (_, base, __, exp) => Math.pow(parseFloat(base), parseFloat(exp)));
    }

    function handleLogCalculation(expr) {
        return expr.replace(/log\((\d+(\.\d+)?)\)/g, (_, num) => Math.log10(parseFloat(num)));
    }

    function handleTrigFunctions(expr) {
        return expr.replace(/(sin|cos|tan)\((\d+(\.\d+)?)\)/g, (_, func, num) => {
            const angle = parseFloat(num) * (Math.PI / 180);
            return Math[func](angle).toFixed(10);
        });
    }

    function handleExpCalculation(expr) {
        return expr.replace(/e\^(\d+(\.\d+)?)/g, (_, exp) => Math.exp(parseFloat(exp)));
    }

    function calculateFactorial() {
        const num = parseInt(expression);
        if (num < 0) {
            resultElement.textContent = 'Error';
            expression = '';
        } else {
            let factorial = 1;
            for (let i = 1; i <= num; i++) {
                factorial *= i;
            }
            resultElement.textContent = factorial;
            lastAnswer = factorial;
            isResultDisplayed = true;
            expression = factorial.toString();
        }
    }

    function handlePowerOfTen(expr) {
        return expr.replace(/10\^(\d+(\.\d+)?)/g, (_, exp) => Math.pow(10, parseFloat(exp)));
    }
});
