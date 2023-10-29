#! /usr/bin/env node
import inquirer from "inquirer";
import { quizQuestions } from "./questions.js";

function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

  }
async function Quiz(){
  let score = 0
  for (let i = 0; i < quizQuestions.length; i++) {
    console.log("Question "+ (i+1) +"/5")
    const answers = await inquirer.prompt([{
        type :'list',
        name :'Answer',
        message : quizQuestions[i].question,
        choices : quizQuestions[i].choices
    },])

    if(answers.Answer === quizQuestions[i].correctAnswer){
        console.log("Your answer is Correct!")
        score++
    }
    else{console.log("Your answer is Incorrect")}
  }
  let percent = score*20
  if(percent>=60){
  console.log("Congrats! your score is " + percent+" %")
  }
  else{
    console.log("OOPS! your score is "+percent+" %" )
  }
}


console.log("\nThis quiz consists of 5 questions\n")
shuffleArray(quizQuestions);
Quiz();
  