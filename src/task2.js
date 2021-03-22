import csv from 'csvtojson';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';

const inputFilePath='./csv/nodejs-hw1-ex1.csv';
const outputFilePath='./csv/nodejs-hw1-ex1.txt';


const readable = createReadStream(inputFilePath);
const writable = createWriteStream(outputFilePath, 'utf8');

// Solution 1
// readable
//   .pipe(csv())
//   .on('error', err => console.log(err))
//   .pipe(writable)
//   .on('error', err => console.log(err));

// Solution 2
pipeline(
  createReadStream(inputFilePath),
  csv(),
  createWriteStream(outputFilePath, 'utf8'),
  (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Completed');
    }
  }
)