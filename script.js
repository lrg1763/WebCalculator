// переменные калькулятора
let chislo = '0';
let chislo1 = null;
let znak = null;
let novoe = false;
let ekran = document.getElementById('ekran');

// отображение числа на экране
function pokazat() {
    ekran.textContent = chislo;
}

// обработка нажатия цифры
function nazhat_cifru(cifra) {
    if (novoe === true) {
        chislo = cifra;
        novoe = false;
    } else {
        if (chislo === '0') {
            chislo = cifra;
        } else {
            chislo = chislo + cifra;
        }
    }
    pokazat();
}

// обработка нажатия знака операции
function nazhat_znak(znak_operacii) {
    if (chislo1 !== null && znak !== null) {
        poschitat();
    }
    chislo1 = chislo;
    znak = znak_operacii;
    novoe = true;
}

// вычисление результата
function poschitat() {
    if (chislo1 === null) return;
    if (znak === null) return;
    if (novoe === true) return;
    
    let pervoe_chislo = parseFloat(chislo1);
    let vtoroe_chislo = parseFloat(chislo);
    let otvet = 0;
    
    if (znak === '+') {
        otvet = pervoe_chislo + vtoroe_chislo;
    } else if (znak === '-') {
        otvet = pervoe_chislo - vtoroe_chislo;
    } else if (znak === '*') {
        otvet = pervoe_chislo * vtoroe_chislo;
    } else if (znak === '/') {
        if (vtoroe_chislo === 0) {
            ekran.textContent = 'Error';
            setTimeout(ochistit, 1000);
            return;
        }
        otvet = pervoe_chislo / vtoroe_chislo;
    }
    
    chislo = otvet.toString();
    pokazat();
    chislo1 = null;
    znak = null;
    novoe = true;
}

// очистка калькулятора
function ochistit() {
    chislo = '0';
    chislo1 = null;
    znak = null;
    novoe = false;
    pokazat();
}

// обработка нажатия точки
function nazhat_tochku() {
    let est_tochka = chislo.includes('.');
    if (est_tochka === false) {
        nazhat_cifru('.');
    }
}

// привязка обработчиков к кнопкам с цифрами
document.getElementById('knopka_0').onclick = function() {
    nazhat_cifru('0');
};

document.getElementById('knopka_1').onclick = function() {
    nazhat_cifru('1');
};

document.getElementById('knopka_2').onclick = function() {
    nazhat_cifru('2');
};

document.getElementById('knopka_3').onclick = function() {
    nazhat_cifru('3');
};

document.getElementById('knopka_4').onclick = function() {
    nazhat_cifru('4');
};

document.getElementById('knopka_5').onclick = function() {
    nazhat_cifru('5');
};

document.getElementById('knopka_6').onclick = function() {
    nazhat_cifru('6');
};

document.getElementById('knopka_7').onclick = function() {
    nazhat_cifru('7');
};

document.getElementById('knopka_8').onclick = function() {
    nazhat_cifru('8');
};

document.getElementById('knopka_9').onclick = function() {
    nazhat_cifru('9');
};


// привязка обработчиков к кнопкам операций
document.getElementById('knopka_tochka').onclick = nazhat_tochku;

document.getElementById('knopka_plus').onclick = function() {
    nazhat_znak('+');
};

document.getElementById('knopka_minus').onclick = function() {
    nazhat_znak('-');
};

document.getElementById('knopka_umnozhit').onclick = function() {
    nazhat_znak('*');
};

document.getElementById('knopka_delit').onclick = function() {
    nazhat_znak('/');
};

document.getElementById('knopka_ravno').onclick = poschitat;

document.getElementById('knopka_ochistit').onclick = ochistit;
