#! /usr/bin/env node

import { faker } from "@faker-js/faker";
import chalk from "chalk";
import inquirer from "inquirer";

interface IBankAccount {
  accNumber: number;
  balance: number;
}

class Customer {
  FirstName: string;
  LastName: string;
  Gender: string;
  Age: number;
  MobileNumber: number;
  AccountNumber: number;

  constructor(
    f: string,
    l: string,
    g: string,
    age: number,
    contact: number,
    acc: number
  ) {
    this.FirstName = f;
    this.LastName = l;
    this.Gender = g;
    this.Age = age;
    this.MobileNumber = contact;
    this.AccountNumber = acc;
  }
}

class Bank {
  customer: Customer[] = [];
  account: IBankAccount[] = [];
  addcustomer(object: Customer) {
    this.customer.push(object);
  }
  addaccount(object: IBankAccount) {
    this.account.push(object);
  }
  transaction(object: IBankAccount) {
    let newAccounts = this.account.filter((acc) => {
      acc.accNumber !== object.accNumber;
    });
    this.account = [...newAccounts, object];
  }
}

let bank = new Bank();
console.log(bank);
for (let i = 1; i < 4; i++) {
  let f = faker.person.firstName("male");
  let l = faker.person.lastName();
  let contact = parseInt(faker.phone.number("##########"));
  const customer = new Customer(f, l, "male", 30 + 2 * i, contact, 999+i);
  bank.addcustomer(customer);
  bank.addaccount({ accNumber: customer.AccountNumber, balance: 50 * i + 1 });
}

async function bankService(bank: Bank) {
  let Continue: boolean = true;
  do {
    let service = await inquirer.prompt({
      name: "choice",
      type: "list",
      message: "Kindly select a functionality",
      choices: ["View Balance", "Cash Withdraw", "Cash Deposit", "Exit"],
    });
    if (service.choice === "View Balance") {
      let response = await inquirer.prompt({
        type: "input",
        name: "answer",
        message: "Kindly enter your account number",
      });
      let account = bank.account.find(
        (acc) => acc.accNumber == response.answer
      );
      if (!account) {
        console.log(chalk.redBright.bold("Invalid Account Number"));
      } else {
        let name = bank.customer.find((item) => {
          item.AccountNumber == account?.accNumber;
        });
        console.log(
          "Your account balance is ",
          chalk.greenBright.italic("$", account.balance)
        );
      }
    }
    else if (service.choice === "Cash Withdraw") {
      let response = await inquirer.prompt({
        type: "input",
        name: "answer",
        message: "Kindly enter your account number",
      });
      let account = bank.account.find(
        (acc) => acc.accNumber == response.answer
      );
      if (!account) {
        console.log(chalk.redBright.bold("Invalid Account Number"));
      } else {
        let answers = await inquirer.prompt({
          type: "input",
          name: "answer",
          message: "Enter your amount",
        });
        if (account.balance > answers.answer) {
          let newBalance = account.balance - answers.answer;
          bank.transaction({
            accNumber: account.accNumber,
            balance: newBalance,
          });
        } else {
          console.log("Insufficient balance");
        }
      }
    }
    else if (service.choice === "Cash Deposit") {
      let response = await inquirer.prompt({
        type: "input",
        name: "answer",
        message: "Kindly enter your account number",
      });
      let account = bank.account.find(
        (acc) => acc.accNumber == response.answer
      );
      if (!account) {
        console.log(chalk.redBright.bold("Invalid Account Number"));
      } else {
        let answers = await inquirer.prompt({
          type: "input",
          name: "answer",
          message: "Enter your amount",
        });
        let newBalance = account.balance + parseFloat(answers.answer);
        bank.transaction({ accNumber: account.accNumber, balance: newBalance });
      }
    } else {
      console.log("Program Exit successful");
      break;
    }
  } while (Continue);
}

bankService(bank);
