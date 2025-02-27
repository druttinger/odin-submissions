const func = require('./func');

test('capitalizes a word', () => {
    expect(func.capitalize('test')).toEqual('Test');
});

test('reverses a string', () => {
    expect(func.reverse('test')).toEqual('tset');
});

test('multiplies', () => {
    expect(func.calculator.multiply(2, 4)).toBe(8);
});

test('divides', () => {
    expect(func.calculator.divide(12, 4)).toBe(3);
});

test('adds', () => {
    expect(func.calculator.add(2, 4)).toBe(6);
});

test('subtracts', () => {
    expect(func.calculator.subtract(18, 7)).toBe(11);
});

test('most basic cipher test', () => {
    expect(func.cipher('test', 1)).toEqual('uftu');
});

test('test wraparound', () => {
    expect(func.cipher('xyz', 3)).toEqual('abc');
});

test('test caps', () => {
    expect(func.cipher('HeLLo', 3)).toEqual('KhOOr');
});

test('has special characters', () => {
    expect(func.cipher('Hello, World!', 3)).toEqual('Khoor, Zruog!');
});

test('analyzes array', () => {
    expect(func.analyzeArray([1,8,3,4,2,6])).toEqual({
        average: 4,
        min: 1,
        max: 8,
        length: 6
     });
});

