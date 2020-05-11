// math functions
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
    return cmd(a, b);
}

function arrayPopEval(){
    // pop the global array elements
    // only integers for now
    let a = 0;
    let b = 0;
    let cmd;
    while(arrayButtons.length > 0){
        // since we pop, fill b first
        let btn = arrayButtons.pop();
        if(b === 0)
            b = Number(btn);
        else if(btn === '+')
            cmd = add;
        else if(a === 0);
            a = Number(btn);
    }
    console.log("cmd", cmd);
    let result = operate(cmd, a, b);
    console.log(result);
}

// button controls
function numberButtons(){
    // record array of numbers pressed
    // query all the buttons
    const btns = document.querySelectorAll("button");
    btns.forEach(
        function (btn){
            btn.addEventListener('click', function() {
                // get a and b
                console.log(btn.textContent);
                // TODO: check whether CLEAR or EQUAL is pressed
                if(btn.textContent === "="){
                    arrayPopEval();
                }
                else if(btn.textContent === "AC"){
                    // clear everything
                    console.log("before", arrayButtons);
                    arrayButtons = [];
                    console.log(arrayButtons);
                }
                else{
                    // keep pressing numbers 
                    arrayButtons.push(btn.textContent);
                }
                }
            )
           
        }
    )
}

// global operands
let operation; // undefined;
let arrayButtons = []; // length == 0 when empty
numberButtons();