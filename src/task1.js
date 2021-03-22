import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

const reverseString = (value) => value.split('').reverse().join('');

rl.on('line', (input) => {
  console.log(`Result is: ${reverseString(input)}`);
});
