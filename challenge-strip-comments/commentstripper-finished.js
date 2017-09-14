// The solution to this one is almost identical to the previous example. The
// main difference is the function reverseString is replaced with a function
// that strips comments from each line.

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
    console.error(`Usage: node commentstripper-finished.js IN OUT`);
    process.exit(1); // quit the program prematurely
}
///////////////////////////
///////////////////////////


// Using ES6 destructuring, we get the input and output paths
// (same as inputPath = cliArgs[0], outputPath = cliArgs[1])
const [inputPath, outputPath] = cliArgs;

console.log(`Stripping comments each from ${inputPath} -> ${outputPath} ...`);

// Here's the heart of the data processing logic: we strip the comments from
// each string
function stripCommentFromString(string) {
    const splitBySlashes = string.split('//');
    if (splitBySlashes.length < 2) {
        // No comment to deal with! Just return original string
        return string;
    }

    // Otherwise, there was a comment, return only the first part
    return splitBySlashes[0];
}

// Now, for the meat of it: First open the output file
const outputFile = fs.createWriteStream(outputPath);

// readline is a helper built into node for reading files line-by-line
const readStream = fs.createReadStream(inputPath);
const rl = readline.createInterface({ input: readStream });

// Now we read from the input file, line by line. Strip the comments from each
// line and ensure it has a newline character at the end before writing it to
// the output.
rl.on('line', (line) => {
    const strippedLine = stripCommentFromString(line) + "\n";
    outputFile.write(strippedLine);
});
