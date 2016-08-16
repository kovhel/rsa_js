var MathUtils = (function(){
    var instance = null;
    var MathUtilsInternal = function(){
        this.extendedEuclid = function(a, b) {
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
        };
        this.sundaram = function(n) {
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
        };
    };
    var getInstance = function() {
        if(instance === null) {
            instance = new MathUtilsInternal();
        }
        return instance;
    };
    return {
        getInstance: getInstance
    };
})();

var RSAUtils = (function() {
    var instance = null;
    var RSAUtilsInternal = function () {
        var e, d, n;
        //m = (ci^d)%n
        var decrypt = function(code) {
            var m = 1, i = 0;
            while (i < d) {
                m *= code;
                m %= n;
                ++i;
            }
            return m;
        };

        //c = (mj^e)%n
        var encrypt = function(code) {
            var c = 1, i = 0;
            while (i < e) {
                c *= code;
                c %= n;
                ++i;
            }
            return c;
        };

        this.encryptString = function(str, e, n) {
            var result = [];
            for (var i = 0; i < str.length; ++i) {
                result.push(encrypt(str.charCodeAt(i)))
            }
            return result;
        };

        this.decryptString = function(arr, d, n) {
            var result = "";
            for (var i = 0; i < arr.length; ++i) {
                result += String.fromCharCode(decrypt(arr[i]))
            }
            return result;
        };

        var generateParameters = function() {
            var p = MathUtils.getInstance().sundaram(Math.round(Math.random() * 100)),
                q = MathUtils.getInstance().sundaram(Math.round(Math.random() * 100)),
                fn = (p - 1) * (q - 1);

            e = 7;
            n = p * q;
            d = MathUtils.getInstance().extendedEuclid(e, fn).y;
            console.log("{" + e + ", " + n + "} - open key");
            console.log("{" + d + ", " + n + "} - secret key");
        };
        generateParameters();
    };
    var getInstance = function() {
        if(instance === null) {
            instance = new RSAUtilsInternal();
        }
        return instance;
    };
    return {
        getInstance: getInstance
    };
})();

var testString = "Hello, RSA!";
console.log("Input string: " + testString);
var encryptedString = RSAUtils.getInstance().encryptString(testString);
console.log("Encrypted string: " + encryptedString.join(' '));
var decryptedString = RSAUtils.getInstance().decryptString(encryptedString);
console.log("Decrypted string: " + decryptedString);
