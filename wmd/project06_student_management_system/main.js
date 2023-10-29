#! /usr/bin/env node
import inquirer from 'inquirer';
import { Student } from './class.js';
async function main() {
    const students = [];
    while (true) {
        console.log('\nOptions:');
        console.log('1. Add a new student');
        console.log('2. Enroll a student in a course');
        console.log('3. View balance');
        console.log('4. Pay tuition fees');
        console.log('5. Show student status');
        console.log('6. Quit');
        const { choice } = await inquirer.prompt([
            {
                type: 'input',
                name: 'choice',
                message: 'Enter your choice number:',
            },
        ]);
        if (choice === '1') {
            const { name } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Enter student name:',
                },
            ]);
            const newStudent = new Student(name);
            students.push(newStudent);
            console.log(`Student added with ID: ${newStudent.id}`);
        }
        else if (choice === '2') {
            const { studentID } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'studentID',
                    message: 'Enter student ID:',
                },
            ]);
            const student = students.find((s) => s.id === studentID);
            if (student) {
                const { course } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'course',
                        message: 'Enter course name:',
                    },
                ]);
                student.enrollCourse(course);
                console.log(`Student enrolled in ${course}`);
            }
            else {
                console.log('Student not found.');
            }
        }
        else if (choice === '3') {
            const { studentID2 } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'studentID2',
                    message: 'Enter student ID:',
                },
            ]);
            const student2 = students.find((s) => s.id === studentID2);
            if (student2) {
                student2.viewBalance();
            }
            else {
                console.log('Student not found.');
            }
        }
        else if (choice === '4') {
            const { studentID3 } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'studentID3',
                    message: 'Enter student ID:',
                },
            ]);
            const student3 = students.find((s) => s.id === studentID3);
            if (student3) {
                const { amount } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'amount',
                        message: 'Enter payment amount:',
                    },
                ]);
                student3.payTuition(parseFloat(amount));
            }
            else {
                console.log('Student not found.');
            }
        }
        else if (choice === '5') {
            const { studentID4 } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'studentID4',
                    message: 'Enter student ID:',
                },
            ]);
            const student4 = students.find((s) => s.id === studentID4);
            if (student4) {
                student4.showStatus();
            }
            else {
                console.log('Student not found.');
            }
        }
        else if (choice === '6') {
            console.log('Exiting program.');
            return;
        }
        else {
            console.log('Invalid choice.');
        }
    }
}
main();
