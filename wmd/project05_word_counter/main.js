#! /usr/bin/env node
import inquirer from "inquirer";
function countWords(text) {
    return text.trim().split(/\s+/).length;
}
function CountCharacters(text) {
    return text.replace(/\s/g, "").length;
}
async function main() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'paragraph',
            message: 'Enter a paragraph:',
        },
    ]);
    let text = answers.paragraph;
    console.log("Number of words in this paragraph are ", countWords(text));
    console.log("Number of characters(excluding spaces) in this paragraph are ", CountCharacters(text));
}
main();
