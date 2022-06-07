/*
adopted from https://stackoverflow.com/questions/3885817/how-do-i-check-that-a-number-is-float-or-integer
*/
function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}

/*
adopted from https://stackoverflow.com/questions/3885817/how-do-i-check-that-a-number-is-float-or-integer
*/
function isInt(n) {
    return Number(n) === n && n % 1 === 0;
}

/*
adopted from https://stackoverflow.com/questions/4059147/check-if-a-variable-is-a-string-in-javascript
*/
function isString(n) {
    return (typeof n === 'string' || n instanceof String);
}

module.exports = {isFloat, isInt, isString};