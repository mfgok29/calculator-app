// ==========================================
// CALCULATOR APPLICATION
// ==========================================

class Calculator {
    constructor() {
        // State
        this.currentInput = '0';
        this.previousInput = '';
        this.operation = null;
        this.shouldResetDisplay = false;
        this.lastResult = null;

        // DOM Elements
        this.displayInput = document.getElementById('display-input');
        this.displayResult = document.getElementById('display-result');

        // Initialize
        this.initEventListeners();
        this.updateDisplay();
    }

    // ==========================================
    // EVENT LISTENERS
    // ==========================================
    initEventListeners() {
        // Get all calculator buttons
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleButtonClick(e);
            });
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardInput(e);
        });
    }

    handleButtonClick(e) {
        const button = e.target;
        const action = button.dataset.action;
        const number = button.dataset.number;
        const decimal = button.dataset.decimal;

        // Add button animation feedback
        button.classList.add('clicked');
        setTimeout(() => button.classList.remove('clicked'), 100);

        if (number !== undefined) {
            this.handleNumber(number);
        } else if (decimal) {
            this.handleDecimal();
        } else if (action) {
            this.handleAction(action);
        }
    }

    handleKeyboardInput(e) {
        const key = e.key;

        // Numbers
        if (key >= '0' && key <= '9') {
            this.handleNumber(key);
            this.highlightButton(`[data-number="${key}"]`);
        }
        // Decimal
        else if (key === '.') {
            this.handleDecimal();
            this.highlightButton('[data-decimal="true"]');
        }
        // Operations
        else if (key === '+') {
            this.handleAction('add');
            this.highlightButton('[data-action="add"]');
        }
        else if (key === '-') {
            this.handleAction('subtract');
            this.highlightButton('[data-action="subtract"]');
        }
        else if (key === '*' || key.toLowerCase() === 'x') {
            this.handleAction('multiply');
            this.highlightButton('[data-action="multiply"]');
        }
        else if (key === '/') {
            e.preventDefault(); // Prevent quick find in Firefox
            this.handleAction('divide');
            this.highlightButton('[data-action="divide"]');
        }
        // Equals
        else if (key === 'Enter' || key === '=') {
            e.preventDefault();
            this.handleAction('equals');
            this.highlightButton('[data-action="equals"]');
        }
        // Clear
        else if (key === 'Escape' || key.toLowerCase() === 'c') {
            this.handleAction('clear');
            this.highlightButton('[data-action="clear"]');
        }
        // Delete/Backspace
        else if (key === 'Backspace') {
            this.handleAction('delete');
            this.highlightButton('[data-action="delete"]');
        }
    }

    highlightButton(selector) {
        const button = document.querySelector(selector);
        if (button) {
            button.classList.add('clicked');
            setTimeout(() => button.classList.remove('clicked'), 100);
        }
    }

    // ==========================================
    // NUMBER INPUT HANDLERS
    // ==========================================
    handleNumber(number) {
        if (this.shouldResetDisplay) {
            this.currentInput = number;
            this.shouldResetDisplay = false;
        } else if (this.currentInput === '0' && number !== '0') {
            this.currentInput = number;
        } else if (this.currentInput !== '0') {
            // Limit input to 12 digits
            if (this.currentInput.replace('.', '').length < 12) {
                this.currentInput += number;
            }
        }
        this.updateDisplay();
    }

    handleDecimal() {
        if (this.shouldResetDisplay) {
            this.currentInput = '0.';
            this.shouldResetDisplay = false;
        } else if (!this.currentInput.includes('.')) {
            this.currentInput += '.';
        }
        this.updateDisplay();
    }

    // ==========================================
    // ACTION HANDLERS
    // ==========================================
    handleAction(action) {
        switch (action) {
            case 'clear':
                this.clear();
                break;
            case 'delete':
                this.delete();
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                this.handleOperation(action);
                break;
            case 'equals':
                this.calculate();
                break;
        }
    }

    clear() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operation = null;
        this.shouldResetDisplay = false;
        this.lastResult = null;
        this.updateDisplay();
    }

    delete() {
        if (this.shouldResetDisplay) {
            this.currentInput = '0';
            this.shouldResetDisplay = false;
        } else if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
        this.updateDisplay();
    }

    handleOperation(newOperation) {
        const operationSymbols = {
            'add': '+',
            'subtract': '−',
            'multiply': '×',
            'divide': '÷'
        };

        // If we already have an operation and input, calculate first
        if (this.operation && !this.shouldResetDisplay) {
            this.calculate(true);
        }

        this.operation = newOperation;
        this.previousInput = this.currentInput;
        this.shouldResetDisplay = true;

        // Update display to show the operation
        this.displayInput.textContent = `${this.formatNumber(this.previousInput)} ${operationSymbols[newOperation]}`;
    }

    // ==========================================
    // CALCULATION LOGIC
    // ==========================================
    calculate(chainOperation = false) {
        if (!this.operation || this.previousInput === '') {
            return;
        }

        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);
        let result;

        switch (this.operation) {
            case 'add':
                result = prev + current;
                break;
            case 'subtract':
                result = prev - current;
                break;
            case 'multiply':
                result = prev * current;
                break;
            case 'divide':
                if (current === 0) {
                    this.displayError('Error');
                    this.clear();
                    return;
                }
                result = prev / current;
                break;
        }

        // Handle floating point precision
        result = this.handleFloatingPoint(result);

        // Check for overflow/underflow
        if (!isFinite(result)) {
            this.displayError('Error');
            this.clear();
            return;
        }

        // Format the result
        this.lastResult = result;
        this.currentInput = this.formatResult(result);
        this.previousInput = '';

        if (!chainOperation) {
            this.operation = null;
        }

        this.shouldResetDisplay = true;
        this.displayInput.textContent = '';
        this.animateResult();
    }

    // ==========================================
    // UTILITY FUNCTIONS
    // ==========================================
    handleFloatingPoint(num) {
        // Handle floating point precision issues
        const precision = 10;
        return Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision);
    }

    formatNumber(num) {
        // Convert to number then format to handle leading zeros
        const numValue = parseFloat(num);
        if (num === '0.') return '0.';
        return num;
    }

    formatResult(num) {
        // If the number is very large or small, use scientific notation
        if (Math.abs(num) >= 1e12 || (Math.abs(num) < 1e-9 && num !== 0)) {
            return num.toExponential(6);
        }

        // Check if the number has decimal places
        if (Number.isInteger(num)) {
            return num.toString();
        }

        // Remove trailing zeros and unnecessary decimal point
        const result = num.toString();
        if (result.includes('.')) {
            return result.replace(/\.?0+$/, '');
        }

        return result;
    }

    // ==========================================
    // DISPLAY FUNCTIONS
    // ==========================================
    updateDisplay() {
        this.displayResult.textContent = this.currentInput;

        // Adjust font size for long numbers
        this.adjustFontSize();
    }

    adjustFontSize() {
        const length = this.currentInput.length;
        let fontSize;

        if (length <= 8) {
            fontSize = '3rem';
        } else if (length <= 12) {
            fontSize = '2.25rem';
        } else if (length <= 16) {
            fontSize = '1.75rem';
        } else {
            fontSize = '1.25rem';
        }

        this.displayResult.style.fontSize = fontSize;
    }

    displayError(message) {
        this.displayResult.textContent = message;
        this.displayResult.classList.add('error');
        setTimeout(() => {
            this.displayResult.classList.remove('error');
        }, 400);
    }

    animateResult() {
        this.displayResult.classList.remove('update');
        // Trigger reflow
        void this.displayResult.offsetWidth;
        this.displayResult.classList.add('update');
    }
}

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    window.calculator = new Calculator();
});
