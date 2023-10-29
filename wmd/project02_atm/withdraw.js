function withdraw(num, balance) {
    if (balance >= num) {
        console.log("Withdraw successful!");
        console.log("Remaining balance is ", balance - num, "\n");
    }
    else {
        console.log("Failed to withdraw");
        console.log("Insufficient balance\n");
        balance = 0;
    }
    if (balance != 0) {
        balance -= num;
    }
}
export { withdraw };
