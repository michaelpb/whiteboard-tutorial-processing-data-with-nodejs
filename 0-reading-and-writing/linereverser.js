// Require "built-in" node dependencies
const fs = require('fs');
const readline = require('readline');


// Process.argv contains arguments passed from the commandline to node. It may
// also includes the node binary itself, and the name of this file. Here we
// check for that, and remove this irreverent data.
const cliArgs = process.argv;

if (cliArgs[0].endsWith('node')) {
    cliArgs.pop();
}

if (cliArgs[0].endsWith('linereverser.js')) {
    cliArgs.pop();
}

// Now, ensure we have the right number of args. If not, show usage and exit.
if (cliArgs.length !== 2) {
    console.log('this is cliargs', cliargs);
    console.error('Error: Invalid number of arguments');
    console.error('Usage: node linereverser.js INPUT_FILE OUTPUT_FILE');
    process.exit(1); // quit the program prematurely
}

// Using ES6 restructuring, we get the input and output paths
const [inputPath, outputPath] = cliArgs;

console.log(`Reversing each line from ${inputPath} -> ${outputPath} ...`);


// readline is a helper built into node for reading files line-by-line
const rd = readline.createInterface({
    input: fs.createReadStream(inputPath),
    output: fs.createWriteStream(outputPath),
});

rd.on('line', function(line) {
    console.log(line);
});


