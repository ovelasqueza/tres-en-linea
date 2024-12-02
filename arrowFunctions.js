function hello(name) {
  console.log('Hola ', name);
}

const helloAnonima = function (name) {
  console.log('Hola ', name);
};

hello('Olmer');
helloAnonima('Olmer con anónima');

(function (name) {
  console.log('Hola ', name);
})('Desde llamado sin parámetro');

///////// Arrow functions

const helloA = (name) => {
  console.log('Hola ', name);
};

helloA('Olmer desde AF');

const multiplicar = (a, b) => {
  return a * b;
};
const resultado = multiplicar(3, 4);
console.log('RESULTADO ', resultado);

const multiplicarShort = (a, b) => a * b;

const resultado2 = multiplicarShort(3, 4);
console.log('RESULTADO SHORT', resultado2);

const names = ['Luis', 'Juan', 'Daniel'].map((n) => n.toUpperCase());
const names2 = ['Luis', 'Juan', 'Daniel'].map(function (name) {
  return name.toUpperCase();
});

console.log(names);
console.log(names2);

/// Filter

const namesFiltered = ['Luis', 'Juan', 'Daniel'].filter((n) => n.includes('u'));
console.log('names filtrados', namesFiltered);

// Reduce
