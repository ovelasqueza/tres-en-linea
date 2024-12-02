const names = ['john', 'jane', 'alice'];
// Usa map para convertir los nombres a mayúsculas
// Salida esperada: ['JOHN', 'JANE', 'ALICE']
names.map((name) => {
  const nameUpperCase = name.toUpperCase();
  console.log(nameUpperCase);
});

//************************exercise two **************************************
const pricesInDollars = [10, 20, 30, 40];
const exchangeRate = 0.85;

// Usa map para convertir los precios a euros
// Salida esperada: [8.5, 17, 25.5, 34]
const priceEuros = pricesInDollars.map((dollar) => {
  const echange = dollar * exchangeRate;
  return echange;
});

//************************exercise three **************************************
const books = [
  { title: 'Book 1', author: 'Author 1', year: 2001 },
  { title: 'Book 2', author: 'Author 2', year: 2002 },
  { title: 'Book 3', author: 'Author 3', year: 2003 },
];
// Usa map para extraer solo los títulos de los libros
// Salida esperada: ['Book 1', 'Book 2', 'Book 3']
const booksTitles = books.map((book) => {
  const tittle = book.title;
  return tittle;
});

console.log('Euros', priceEuros);
console.log('TITLES', booksTitles);
