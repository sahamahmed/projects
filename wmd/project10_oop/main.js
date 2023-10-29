#! /usr/bin/env node
import inquirer from "inquirer";
class Person {
    constructor() {
        this.personality = "Mystery";
    }
    AskQuestion(answer) {
        if (answer == 1) {
            this.personality = "Extrovert";
        }
        else if (answer == 2) {
            this.personality = "Introvert";
        }
        else {
            this.personality = "You are still a Mystery!";
        }
    }
    getPersonality() {
        return this.personality;
    }
}
class Student extends Person {
    constructor() {
        super();
        this._name = " ";
    }
    get Name() { return this._name; }
    set Name(value) { this._name = value; }
}
let name;
let input;
const answers1 = await inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: '\nEnter 1 if you like talking to others\n Enter 2 if you prefer solitude\n',
        choices: ['1', '2', '3']
    },]);
input = answers1.choice;
const MyPerson = new Person();
MyPerson.AskQuestion(parseInt(input));
console.log("You are " + MyPerson.getPersonality());
const answers2 = await inquirer.prompt([{
        type: 'input',
        name: 'NAME',
        message: 'Enter your name:',
    },]);
name = answers2.NAME;
const myStudent = new Student();
myStudent.Name = name;
console.log("Your name is " + myStudent.Name + " and your personality type is " + MyPerson.getPersonality());
