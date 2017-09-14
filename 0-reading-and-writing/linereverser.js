// Require "built-in" node dependencies
const fs = require('fs');
const readline = require('readline');


/////////////////////////// B O I L E R P L A T E
///////////////////////////
// Process.argv contains arguments passed from the commandline to node. It may
// also includes the node binary itself, and the name of this file. Here we
// check for that, and remove this irreverent data, and check for two args.
const cliArgs = process.argv;

if (cliArgs[0].endsWith('node')) { cliArgs.shift(); }
if (cliArgs[0].endsWith(__filename)) { cliArgs.shift(); }

if (cliArgs.length !== 2) {
    console.error(`Usage: node linereverser.js IN OUT`);
    process.exit(1); // quit the program prematurely
}
///////////////////////////
///////////////////////////


// Using ES6 destructuring, we get the input and output paths
// (same as inputPath = cliArgs[0], outputPath = cliArgs[1])
const [inputPath, outputPath] = cliArgs;

console.log(`Reversing each line from ${inputPath} -> ${outputPath} ...`);

// reverse string is a little function to reverse a given string
function reverseString(string) {
    return string.split('').reverse().join('');
}

// Now, for the meat of it: First open the output file
const outputFile = fs.createWriteStream(outputPath);

// readline is a helper built into node for reading files line-by-line
const readStream = fs.createReadStream(inputPath);
const rl = readline.createInterface({ input: readStream });

// Now we read from the input file, line by line.Reverse each line and ensure
// it has a newline character at the end before writing it to the output.
rl.on('line', (line) => {
    const reversedLine = reverseString(line) + "\n";
    outputFile.write(reversedLine);
});
