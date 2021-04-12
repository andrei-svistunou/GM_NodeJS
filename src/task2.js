import csv from 'csvtojson';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline, Transform } from 'stream';
import { createInterface } from 'readline';

const inputFilePath='./csv/nodejs-hw1-ex1.csv';
const outputFilePath='./csv/nodejs-hw1-ex1.txt';


const readable = createReadStream(inputFilePath);
const writable = createWriteStream(outputFilePath, 'utf8');

const rl = createInterface({
  input: readable,
  output: writable,
});
const csvtojson = csv();
rl.on('line', (line) => {
  console.log('Line is: ', line);
  writable.write(line, 'utf8');
});

pipeline(
  csvtojson,
  writable,
  (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Completed');
    }
  }
);
