// hash table, unicode to operator function
const opTable = {
    '\u002b': add,
    '\u2212': subtract,
    '\u00f7': divide,
    '\u00d7': multiply
}

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
    if(b === 0)
        return "Error: divide by 0";
    else
        return a / b;
}

function operate(cmd, a, b){
    // use cmd directly as a func
    return cmd(a, b);
}

function isOperand(elem){
    // TODO: make this shorter
    return (elem === '\u002b' || elem === '\u2212'|| 
        elem === add || elem === subtract ||
    elem==='\u00f7' || elem === '\u00d7' ||
    elem === divide || elem === multiply )?true:false;
}

function isMultiplyorDivide(elem){
    // TODO: make this shorter
    return (elem==='\u00f7' || elem === '\u00d7'
        || elem === multiply || elem === divide
    )?true:false;
}

function isAddOrSubtract(elem){
    return (elem==='\u002b' || elem===add ||
        elem=== '\u2212' || elem=== subtract)?true:false;
}

function arrToNum(arr){
    /* turns number array in to number, ['2', '3'] into 23 
    TODO: process the digit
    */
    let num = 0;
    for (let i = 0; i < arr.length; i++){
        num = num *10 + Number(arr[i]);
    }
    return num;
}

function mergeNumbersInArray(arr){
    // find the position to merge numbers
    // ['3', '3', '*', '2'] into [33, '*', 2]
    let numStart = 0;
    let numEnd = 0;

    for(let i=0; i<arr.length; i++){
        if(isOperand(arr[i])){
            // record numbers before an operand 
            numEnd = i;
            let numSubArr = arr.slice(numStart, numEnd);
            numStart = numEnd + 1;
            // add number and operator to the new array
            ARRAY_NUMBERS.push(arrToNum(numSubArr));
            ARRAY_NUMBERS.push(opTable[arr[i]]);
        }
        else if( i == arr.length - 1){
            // or end of array
            numEnd = arr.length;
            let numSubArr = arr.slice(numStart, numEnd);
            numStart = numEnd + 1;
            // add number and operator to the new array
            ARRAY_NUMBERS.push(arrToNum(numSubArr));
        }
    }
}

function arrayEvalRecursionHelper(arr){
    /*
    This is a recursion based method to parse an equation. It's probably an overkill,
    but I ended up with nested and long if else conditions and array splicing
    that was buggy.

    Given an array of type Number and operands, we would like to parse it by splitting
    at add or subtract operands, and then further divide them.

    eg. arr = [5, -, 6, /, 2] splits into the following by recursion
                     -
        2)    ->    / \
        1)    ->  5    6 / 2
                        
        1) the base case would return 5 itself, and divide(6, 2)
        2) calls subtract(5, 3)
                    
    */
    console.log(arr.length);
    if(arr.length === 1){
        return arr[0];

    }
    else if(arr.length === 3){
        return operate(arr[1], arr[0], arr[2]);
    }
    else{
        for(let i=0; i<arr.length; i++){
            // split at add or subtract
            if(isAddOrSubtract(arr[i])){
                let cmd = arr[i];
                let a = arr.slice(0, i);
                let b = arr.slice(i+1);
                return operate(cmd, arrayEvalRecursionHelper(a), arrayEvalRecursionHelper(b));
            } 
        }        
    }
}

function arrayPopEval(){
    let result = 0;
    mergeNumbersInArray(ARRAY_BUTTONS);
    result = arrayEvalRecursionHelper(ARRAY_NUMBERS);
    return result;
}

// button controls
function numberButtons(){
    // record array of numbers pressed
    // query all the buttons
    const btns = document.querySelectorAll("button");
    btns.forEach(
        function (btn){
            btn.addEventListener('click', function() {
                // get a and b, stored in an array of discrete chars
                // display the buttons pressed
                const result = document.querySelector("#result");
                result.textContent = btn.textContent;
                // pop the array, convert to equation and eval
                if(btn.textContent === "="){
                    result.textContent = arrayPopEval();

                    // clean up after one eval
                    ARRAY_BUTTONS = [];
                    ARRAY_NUMBERS = [];

                }
                else if(btn.textContent === "AC"){
                    // clear everything
                    console.log("before", ARRAY_BUTTONS);
                    ARRAY_BUTTONS = [];
                    ARRAY_NUMBERS = [];

                    console.log(ARRAY_BUTTONS);
                }
                else{
                    // keep pressing numbers 
                    ARRAY_BUTTONS.push(btn.textContent);
                    // display complete eqn
                    const eqn = document.querySelector("#equation");
                    eqn.textContent = ARRAY_BUTTONS.join("");
                }
                }
            )
           
        }
    )
}

// global operands
let operation; // undefined;
let ARRAY_BUTTONS = []; // length == 0 when empty
let ARRAY_NUMBERS = []; // to process ARRAY_BUTTONS
numberButtons();