#!/usr/bin/env node
import inquirer from "inquirer";
let ApiLink = "https://v6.exchangerate-api.com/v6/2411db88fa5bdee93e3b0410/latest/PKR";
let fetchData = async (Data) => {
    let fetchData = await fetch(Data);
    let result = await fetchData.json();
    return result.conversion_rates;
};
let a = await fetchData(ApiLink);
let countries = Object.keys(a);
let firstcountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: `converting from`,
    choices: countries,
});
let usermoney = await inquirer.prompt({
    type: "number",
    name: "amount",
    message: `Kindly enter the amount in ${firstcountry.name}`
});
let secondcountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: `converting to`,
    choices: countries,
});
let convertlink = `https://v6.exchangerate-api.com/v6/2411db88fa5bdee93e3b0410/pair/${firstcountry.name}/${secondcountry.name}`;
let convertData = async (Data) => {
    let convertData = await fetch(Data);
    let result = await convertData.json();
    return result.conversion_rate;
};
let rate = await convertData(convertlink);
let totalconverted = rate * usermoney.amount;
console.log(`${usermoney.amount} ${firstcountry.name} is equalent to ${totalconverted.toFixed(3)} ${secondcountry.name}`);
