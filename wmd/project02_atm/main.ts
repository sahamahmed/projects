#! /usr/bin/env node
import inquirer from "inquirer";
import { withdraw } from "./withdraw.js";
import { deposit } from "./deposit.js";

interface User {
  NAME: string;
  ID: string;
  pin: string;
}

const object: User = {
  NAME: "",
  ID: "",
  pin: ""
};

async function main() {
  let continueOperating = true;

  const answers = await inquirer.prompt([
    {
      name: "names",
      message: "Enter User Name: ",
      type: "input",
      validate: (input) => input !== ""
    },
    {
      name: "id",
      message: "Enter User ID: ",
      type: "input",
      validate: (input) => input !== ""
    },
    {
      name: "pass",
      message: "Enter User PIN: ",
      type: "password",
      mask: '*',
      validate: (input) => {
        return !isNaN(Number(input));
      }
    }
  ]);

  const NAME = answers.names;
  const id = answers.id;
  const password = answers.pass;
  let balance = Math.round(Math.random() * 1000);
  let amount: number;
  var withdraw_amount = 0;
  var deposit_amount = 0

  object.NAME = NAME;
  object.ID = id;
  object.pin = password;

  console.log(`Welcome, ${object.NAME}!`);
  while (continueOperating) {
    const functionality = await inquirer.prompt({
      type: 'list',
      name: 'functions',
      message: 'Choose a functionality:',
      choices: [
        'Withdraw',
        'Deposit',
        'Exit',
      ]
    });

    if (functionality.functions === 'Withdraw') {
      const withdrawamount = await inquirer.prompt([
        {
          name: "Amount",
          message: "Enter the amount you want to withdraw",
          type: "number",
          validate: (input) => !isNaN(input) && input > 0
        }
      ]);
      withdraw_amount = parseInt(withdrawamount.Amount);
      console.log("balance before withdrawal was ", balance)
      withdraw(withdraw_amount, balance)
      
      

    } else if (functionality.functions === 'Deposit') {
      const depositamount = await inquirer.prompt([
        {
          name: "Amount",
          message: "Enter the amount you want to deposit",
          type: "number",
          validate: (input) => !isNaN(input) && input > 0
        }])
      deposit_amount = parseInt(depositamount.Amount);
      console.log("balance before deposit was ", balance)
      deposit(deposit_amount, balance);
      balance += deposit_amount
    }

    else {
      console.log("Exited the ATM successfully");
      continueOperating = false;
    }

    if (continueOperating) {
      const continuePrompt = await inquirer.prompt({
        name: "continue",
        message: "Do you want to continue?",
        type: "list",
        choices: ["Yes", "No"]
      });
      continueOperating = continuePrompt.continue === "Yes";
    }
  }
}

main();



