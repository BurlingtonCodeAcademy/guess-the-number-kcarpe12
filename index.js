function getMean(maximum, minimum) {
  return Math.round((maximum + minimum) / 2)
}

const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);
let guess = 50

function ask(questionText) {
  return new Promise((resolve, reject) => {
      readlineInterface.question(questionText, resolve);
    });
}

async function start() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?");
  console.log('You entered: ' + secretNumber);

  let yesNo = await ask("Is your number " + guess)

  while (yesNo !== 'y') {

      if (yesNo.toLowerCase() === "n") {

          let highLow = await ask("Is it higher or lower? ")

          if (highLow.toLowerCase() === 'h') {

              min = guess
              max = 100
              guess = getMean(max, min)
              yesNo = await ask(guess)

          } else if (highLow.toLowerCase() === 'l') {

              max = guess
              min = 1
              guess = getMean(max, min)
              yesNo = await ask(guess)

          }

      } else {

          console.log("please enter y or n.")

      }

  }

  console.log("Yay! I won")
  process.exit();
}

start();