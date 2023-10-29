#! /usr/bin/env node
import inquirer from "inquirer";

const Time: string[] = ["Hr", "Min", "Sec"];
const TimeEntry: { [key: string]: number } = {};


async function getCountdownTime() {
  for (let i = 0; i < 3; i++) {
    const CounterTime = [
      {
        type: "input",
        name: `enteredTime${i}`,
        message: `Enter the ${Time[i]} you want to count down`,
      },
    ];

    const answers = await inquirer.prompt(CounterTime);

    const enteredTime = parseInt(answers[`enteredTime${i}`]);
    TimeEntry[Time[i]] = enteredTime;
  }

  console.log("Countdown Timer Settings:");
  console.log(TimeEntry);


  await Timer(TimeEntry);
}

async function Timer(TimeEntry: { [key: string]: number }) {
  const CountDownToHr = TimeEntry["Hr"];
  const CountdownToMin = TimeEntry["Min"];
  const CountdownToSec = TimeEntry["Sec"];

  const currentDate = new Date();

  const DestinedHr = currentDate.getHours() + CountDownToHr;
  const DestinedMin = currentDate.getMinutes() + CountdownToMin;
  const DestinedSec = currentDate.getSeconds() + CountdownToSec;

  const destinedTime = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    DestinedHr,
    DestinedMin,
    DestinedSec
  );

 

  while (currentDate.getTime() < destinedTime.getTime()) {
    console.clear();
    console.log("Countdown Timer Started:");
    
    const remainingTime = destinedTime.getTime() - currentDate.getTime();
    
    const remainingHr = Math.floor(remainingTime / (60 * 60 * 1000));
    const remainingMin = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
    const remainingSec = Math.floor((remainingTime % (60 * 1000)) / 1000);

    console.log(`Time Remaining: ${remainingHr}:${remainingMin}:${remainingSec}`);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    currentDate.setSeconds(currentDate.getSeconds() + 1);
  }

  console.log("Countdown Timer Finished!");
}



getCountdownTime();