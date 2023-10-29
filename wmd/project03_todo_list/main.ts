#! /usr/bin/env node
import inquirer from "inquirer";
let task_list = [];
console.log("Welcome to the TODO list application!\n")
while (true) {
    const question = await inquirer.prompt([{
        type: "list",
        message: "Select a functionality",
        name: "operation",
        choices: [
            "Add a task",
            "Delete a task",
            "Mark a task as complete",
            "Display task list",
            "Exit"
        ]
    }]);
    if (question.operation === "Add a task") {
        const addtask = await inquirer.prompt([{
            type: "input",
            message: "Enter the task that you want to add:",
            name: "task",
        }]);
        let x: String = addtask.task 
        task_list.push(x)
        console.log("\t"+x + " has been added successfully")
    }

    else if (question.operation === "Delete a task") {
        const deleteChoices = task_list.map((task, index) => ({
            name: `${index + 1}. ${task}`,
            value: index,
        }));
    
        const deltask = await inquirer.prompt([
            {
                type: "list",
                message: "Select a task to delete:",
                name: "taskIndex",
                choices: deleteChoices,
            },
        ]);
    
        const deletedTask = task_list.splice(deltask.taskIndex, 1);
        console.log(`\t${deletedTask[0]} has been removed successfully`);
     }

    else if (question.operation === "Display task list") {
        
            if(task_list.length == 0){
                console.log("\tTask list is empty")
            }
            else{
                for (let i = 0; i < task_list.length; i++) {
                console.log(i + 1+ ". ", task_list[i])}
        }


    }
    else if (question.operation === "Exit") {
        console.log("\tProgram exited successfully")
        break
    }
    else {
        if (task_list.length === 0) {
            console.log("\tTask list is empty.");
        } else {
            const completeChoices = task_list.map((task, index) => ({
                name: `${index + 1}. ${task}`,
                value: index,
            }));
    
            const completetask = await inquirer.prompt([
                {
                    type: "list",
                    message: "Select a task to mark as complete:",
                    name: "taskIndex",
                    choices: completeChoices,
                },
            ]);
    
            const selectedTask = task_list[completetask.taskIndex];
            task_list[completetask.taskIndex] += " ✅";
            console.log(
                `\t${selectedTask} has been marked as complete.\nSelect 'Display task list' to see changes.`
            );
        }
    }
}