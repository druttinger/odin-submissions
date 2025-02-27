const func = {

    capitalize: (str) => {
        return str.at(0).toUpperCase() + str.slice(1, str.length);
    },

    reverse: (str) => {
        let returnStr = '';
        for (let i = 0; i < str.length; i++)
            returnStr += str.at(-(i + 1));
        return returnStr;
    },

    calculator: {
        add: (num1, num2) => {
            return num1 + num2;
        },

        subtract: (num1, num2) => {
            return num1 - num2;
        },

        divide: (num1, num2) => {
            return num1 / num2;
        },

        multiply: (num1, num2) => {
            return num1 * num2;
        }
    },
    
    shiftChr: (chr, shift) => {
        // uppercase range
        if (chr >=65 && chr <= 90){
            chr += shift;
            if (chr > 90) chr -= 26;
            else if (chr < 65) chr += 26;
        }
        // lowercase range
        if (chr >=97 && chr <= 122){
            chr += shift;
            if (chr > 122) chr -= 26;
            else if (chr < 97) chr += 26;
        } 
        // do not shift if character is not a letter
        return chr;
    },

    cipher: (str, shift) => {
        let returnStr = '';
        for (let i = 0; i < str.length; i++) {
            returnStr += String.fromCharCode(func.shiftChr(str.charCodeAt(i), shift));
        }
        return returnStr;
    },

    analyzeArray: (arr) => {
        return {
            average: arr.reduce((acc, num) => acc + num, 0) / arr.length,
            min: Math.min(...arr),
            max: Math.max(...arr),
            length: arr.length
        }
    }


}
module.exports = func;