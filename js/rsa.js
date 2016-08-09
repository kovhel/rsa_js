/**
 * Created by Elena on 01.04.2016.
 */

/////////////////////////////////////////////////////////////////////
//Алгоритм Евклида. Алгоритм для нахождения наибольшего
//общего делителя двух целых чисел. Используется для проверки
//чисел на взаимопростоту.
function gcd(a, b){
    var c = 0;
    while(b !== 0){
        c = a % b;
        a = b;
        b = c;
    }
    return Math.abs(a);
}

/////////////////////////////////////////////////////////////////////
//Алгоритм "решето Сундарама". Выбирает все простые числа
//до заданного (случайно сгенерированного).
function sundaram(n) {
    var a = [], i, j, k;
    for(i = 1; 3 * i + 1 < n; ++i) {
        k = i + j + 2 * i * j;
        for(j = 1; k < n && j <= i; ++j) {
            a[k] = 1;
        }
    }
    for(i = n - 1; i >= 1; --i) {
        if(!a[i]) {
            return 2 * i + 1;
        }
    }
}

//m = (ci^d)%n
function decrypt(code, d, n) {
    var m = 1, i = 0;
    while (i < d) {
        m *= code;
        m %= n;
        ++i;
    }
    return m;
}

//c = (mj^e)%n
function encrypt(code, e, n) {
    var c = 1, i = 0;
    while (i < e) {
        c *= code;
        c %= n;
        ++i;
    }
    return c;
}


function extendedEuclid(a, b) {
/* calculates a * x + b * y = gcd(a, b) = d */
    if(a < b) {
        a = a + b - (b = a);
    }
    var x, y, d;
    var q, r, x1, x2, y1, y2;

    if (b == 0) {
        d = a;
        x = 1;
        y = 0;
        return { d: d, x: x, y: y };
    }

    x2 = 1;
    x1 = 0;
    y2 = 0;
    y1 = 1;

    while (b > 0) {

        q = Math.floor(a / b);
        r = a - q * b;

        x = x2 - q * x1;
        y = y2 - q * y1;

        a = b;
        b = r;

        x2 = x1;
        x1 = x;
        y2 = y1;
        y1 = y;
    }

    d = a;
    x = x2;
    y = y2;

    return { d: d, x: x, y: y };
}

function encryptString(str, e, n) {
    var result = [];
    for (var i = 0; i < str.length; ++i) {
        result.push(encrypt(str.charCodeAt(i), e, n))
    }
    return result;
}

function decryptString(arr, d, n) {
    var result = "";
    for (var i = 0; i < arr.length; ++i) {
        result += String.fromCharCode(decrypt(arr[i], d, n))
    }
    return result;
}

var p = sundaram(Math.round(Math.random() * 100)),
    q = sundaram(Math.round(Math.random() * 100)),
    n = p * q,
    fn = (p - 1) * (q - 1),
    e = 7;

var d = extendedEuclid(e, fn).y;
console.log("{" + e + ", " + n + "} - open key");
console.log("{" + d + ", " + n + "} - secret key");

var testString = "Hello, RSA!";
console.log("Input string: " + testString);
var encryptedString = encryptString(testString, e, n);
console.log("Encrypted string: " + encryptedString.join(' '));
var decryptedString = decryptString(encryptedString, d, n);
console.log("Decrypted string: " + decryptedString);
