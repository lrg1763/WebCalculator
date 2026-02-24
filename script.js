(function () {
  const display = document.getElementById('display');
  const keypad = document.getElementById('keypad');

  let state = {
    currentValue: '0',
    previousValue: null,
    operator: null,
    shouldResetDisplay: false
  };

  const OPERATIONS = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => (b === 0 ? null : a / b)
  };

  const DISPLAY_FONT_SIZE_MAX = 28;
  const DISPLAY_FONT_SIZE_MIN = 12;
  const MAX_DISPLAY_LENGTH = 12;
  const MAX_DECIMAL_PLACES = 10;

  function fitDisplayFont() {
    display.style.fontSize = '';
    if (display.scrollWidth <= display.clientWidth) return;
    let size = DISPLAY_FONT_SIZE_MAX;
    while (size >= DISPLAY_FONT_SIZE_MIN && display.scrollWidth > display.clientWidth) {
      size -= 2;
      display.style.fontSize = size + 'px';
    }
  }

  function updateDisplay() {
    display.style.fontSize = '';
    display.textContent = state.currentValue;
    fitDisplayFont();
  }

  function formatResult(num) {
    const str = num.toString();
    if (str.length <= MAX_DISPLAY_LENGTH) return str;
    const rounded = Math.round(num * Math.pow(10, MAX_DECIMAL_PLACES)) / Math.pow(10, MAX_DECIMAL_PLACES);
    let resultStr = rounded.toString();
    if (resultStr.length > MAX_DISPLAY_LENGTH) {
      const signif = MAX_DISPLAY_LENGTH - (resultStr.includes('.') ? 2 : 1);
      resultStr = parseFloat(rounded.toPrecision(signif)).toString();
    }
    return resultStr.length > MAX_DISPLAY_LENGTH ? resultStr.slice(0, MAX_DISPLAY_LENGTH) : resultStr;
  }

  function inputDigit(digit) {
    if (state.shouldResetDisplay) {
      state.currentValue = digit;
      state.shouldResetDisplay = false;
    } else {
      const next = state.currentValue === '0' ? digit : state.currentValue + digit;
      if (next.length > MAX_DISPLAY_LENGTH) return;
      state.currentValue = next;
    }
    updateDisplay();
  }

  function inputDecimal() {
    if (state.shouldResetDisplay) {
      state.currentValue = '0.';
      state.shouldResetDisplay = false;
      updateDisplay();
      return;
    }
    if (state.currentValue.includes('.') || state.currentValue.length >= MAX_DISPLAY_LENGTH) return;
    state.currentValue += '.';
    updateDisplay();
  }

  function setOperator(nextOperator) {
    if (state.previousValue !== null && state.operator !== null) {
      calculate();
    }
    state.previousValue = state.currentValue;
    state.operator = nextOperator;
    state.shouldResetDisplay = true;
  }

  function calculate() {
    if (state.previousValue === null || state.operator === null || state.shouldResetDisplay) {
      return;
    }
    const a = parseFloat(state.previousValue);
    const b = parseFloat(state.currentValue);
    const fn = OPERATIONS[state.operator];
    const result = fn ? fn(a, b) : null;

    if (result === null) {
      display.textContent = 'Error';
      setTimeout(clear, 1000);
      return;
    }
    state.currentValue = formatResult(result);
    state.previousValue = null;
    state.operator = null;
    state.shouldResetDisplay = true;
    updateDisplay();
  }

  function clear() {
    state.currentValue = '0';
    state.previousValue = null;
    state.operator = null;
    state.shouldResetDisplay = false;
    display.style.fontSize = '';
    updateDisplay();
  }

  function handleKeypadClick(e) {
    const btn = e.target.closest('.btn');
    if (!btn) return;

    const digit = btn.dataset.digit;
    const action = btn.dataset.action;
    const operator = btn.dataset.operator;

    if (digit !== undefined) {
      inputDigit(digit);
      return;
    }
    if (action === 'decimal') {
      inputDecimal();
      return;
    }
    if (action === 'operator' && operator) {
      setOperator(operator);
      return;
    }
    if (action === 'equals') {
      calculate();
      return;
    }
    if (action === 'clear') {
      clear();
    }
  }

  function handleKeyDown(e) {
    if (e.key >= '0' && e.key <= '9') {
      e.preventDefault();
      inputDigit(e.key);
      return;
    }
    if (e.key === '.' || e.key === ',') {
      e.preventDefault();
      inputDecimal();
      return;
    }
    if (e.key === '+') {
      e.preventDefault();
      setOperator('+');
      return;
    }
    if (e.key === '-') {
      e.preventDefault();
      setOperator('-');
      return;
    }
    if (e.key === '*') {
      e.preventDefault();
      setOperator('*');
      return;
    }
    if (e.key === '/') {
      e.preventDefault();
      setOperator('/');
      return;
    }
    if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      calculate();
      return;
    }
    if (e.key === 'Escape' || e.key === 'Backspace') {
      e.preventDefault();
      clear();
    }
  }

  keypad.addEventListener('click', handleKeypadClick);
  document.addEventListener('keydown', handleKeyDown);
})();
