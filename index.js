function getMean(maximum, minimum) {
  return Math.round((maximum + minimum) / 2)
}

min = 1
max = parseInt(process.argv[2]) ;

const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);
let guess = 50

function ask(questionText) {
  return new Promise((resolve, reject) => {
      readlineInterface.question(questionText, resolve);
    });
}

async function start() {
  console.log("Let's play a game where you (human) make up a number between 1 and " + process.argv[2] + " and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?");
  console.log('You entered: ' + secretNumber);

  let yesNo = await ask("Is your number " + guess + "?\n")
  console.log(min, max)
  while (yesNo.toLowerCase() !== 'y') {

      if (yesNo.toLowerCase() === "n") {

          let highLow = await ask("Is it higher or lower?\n")

          if (highLow.toLowerCase() === 'h') {
              console.log(min, max);
              min = guess;
              guess = getMean(max, min);
              yesNo = await ask("Is it " + guess + "?\n");

          } else if (highLow.toLowerCase() === 'l') {
              console.log(min, max);
              max = guess;
              guess = getMean(max, min);
              yesNo = await ask("Is it " + guess + "?\n");

          }

      } else {

          console.log("please enter y or n.")

      }

  }

  console.log("Yay! I won")
  process.exit();
}

start();