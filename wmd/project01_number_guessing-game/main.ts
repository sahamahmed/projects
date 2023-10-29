#! /usr/bin/env node
import inquirer from "inquirer";

let answer: number
function Random() {
    var x = Math.floor(Math.random() * 11)
    return (x);
}

var y = Random();
let Continue = true;
while (Continue) {
    const answers = await inquirer.prompt([{
        name: "n",
        message: "Guess a number between 1 and 10: ",
        type: "number",
    },
    ])

    answer = parseInt(answers.n)

    if (!Number.isNaN(answer)) {
        if (answer >= 0 && answer < 11) {
            if (y === answer) {
                console.log("Correct! the number was ", y);
                break;
            }

            else if(answer < y){
                console.log("sorry, you guessed wrong")
                console.log("HINT: choose a greater number")
            }
            else{console.log("sorry, you guessed wrong")
                console.log("HINT: choose a smaller number")}
        }
        else { console.log("the number that you guessed is out of range") }
    }
    else { console.log("Input is incorrect or missing") }


    const loop = await (inquirer as any).prompt([{
        type: 'list',
        name: 'cont',
        message: "Do you want to try again? ",
        choices: ["yes", "no"],
    }]);

    Continue = loop.cont === "yes";

}