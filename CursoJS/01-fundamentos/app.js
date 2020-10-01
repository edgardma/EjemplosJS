// console.log('Hola Mundo');

let a = 10, 
    b = 20, 
    c = 'Hola ', 
    d = 'Edgard', 
    x = a + b;

const saludo = c + d;

console.log('a', a);
console.warn('b', b);
console.error('c', c);
console.info('d', d);

console.log('%c Mis variables', 'color:red; font-weight: bold');
console.log({ a });
console.warn({ b });
console.error({ c });
console.info({ d });

console.table({a, b, c, d, x});