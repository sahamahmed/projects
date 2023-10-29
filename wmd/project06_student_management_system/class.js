class Student {
    constructor(name) {
        this.id = this.generateStudentID();
        this.name = name;
        this.courses = [];
        this.balance = 1000;
    }
    generateStudentID() {
        return Math.random().toString().slice(2, 7);
    }
    enrollCourse(course) {
        this.courses.push(course);
    }
    viewBalance() {
        console.log(`Balance for Student ${this.name}: $${this.balance}`);
    }
    payTuition(amount) {
        if (amount > 0) {
            if (this.balance > amount) {
                this.balance -= amount;
                console.log(`$${amount} paid. Remaining balance: $${this.balance}`);
            }
            else {
                console.log("Insufficient balance");
            }
        }
        else {
            console.log("Invalid payment amount.");
        }
    }
    showStatus() {
        console.log(`Student ID: ${this.id}`);
        console.log(`Student Name: ${this.name}`);
        console.log("Courses Enrolled:");
        this.courses.forEach((course) => {
            console.log(`- ${course}`);
        });
        this.viewBalance();
    }
}
export { Student };
