#! /usr/bin/env node
import inquirer from "inquirer";
import { add } from "./add.js";
import { subtract } from "./subtract.js";
import { multiply } from "./multiply.js";
import { divide } from "./divide.js";
let num1;
let num2;
let operation;
let Continue = true;
while (Continue) {
    const answers = await inquirer.prompt([
        {
            name: "n1",
            message: "Enter first number",
            type: "number",
        },
        {
            name: "n2",
            message: "Enter second number",
            type: "number",
        },
        {
            type: 'list',
            name: 'operation',
            message: 'Choose an operation:',
            choices: [
                'Perform Addition',
                'Perform Subtraction',
                'Perform Multiplication',
                'Perform Division ',
            ],
        },
    ]);
    num1 = parseInt(answers.n1);
    num2 = parseInt(answers.n2);
    operation = answers.operation;
    if (!Number.isNaN(num1) && !Number.isNaN(num2)) {
        if (operation === 'Perform Addition') {
            console.log(add(num1, num2));
        }
        else if (operation === 'Perform Subtraction') {
            console.log(subtract(num1, num2));
        }
        else if (operation === 'Perform Multiplication') {
            console.log(multiply(num1, num2));
        }
        else {
            console.log(divide(num1, num2));
        }
    }
    else {
        console.log("input is incorrect or missing");
    }
    const loop = await inquirer.prompt([{
            type: 'list',
            name: 'cont',
            message: "Do you want to continue? ",
            choices: ["yes", "no"],
        }]);
    Continue = loop.cont === "yes";
}
