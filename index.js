const Engine = require('./src/Engine.js');

const arg = process.argv[2];

const engine = new Engine(); 

const output = engine.transliterate(arg);

// console.log(output);