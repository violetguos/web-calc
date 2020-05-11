function add(a, b) {
	return a + b;	
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(cmd, a, b){
    // use cmd directly as a func
    cmd(a, b);
}