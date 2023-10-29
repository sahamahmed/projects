function divide(num1, num2) {
    if (num2 != 0) {
        let div = num1 / num2;
        return div;
    }
    else {
        return ("can not divide by zero");
    }
}
export { divide };
