/*

INSTRUCTIONS

See if you can use this boilerplate, and code from the previous slide, to
create a program that strips comments from an input file!

For example, node commentstripper.js input.js output.js would create a file
output.js thats the same as input.js, except all comments that are like '//'
will be removed.

   RUN:
   node commentstripper.js input.js output.js

   CHECK RESULTS: 
   cat output.js

Note: To make it easier, don't worry too much about other types of comments, or
about edge cases like comments in strings, etc

*/


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
    console.error(`Usage: node commentstripper.js IN OUT`);
    process.exit(1); // quit the program prematurely
}
///////////////////////////
///////////////////////////

const [inputPath, outputPath] = cliArgs;

