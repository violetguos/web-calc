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
        || elem === multiply || elem == divide
    )?true:false;
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

function arrayPopEval(){
    let result = 0;
    mergeNumbersInArray(ARRAY_BUTTONS);

    for(let i=0; i<ARRAY_NUMBERS.length; i++){
        // check mult or div first
        if(isMultiplyorDivide(ARRAY_NUMBERS[i])){
            if(i == 0){
                // missing a, assuming mult or divide with a = 0, which is 0
                result = 0;
                ARRAY_NUMBERS.splice(i, 2, result);
            }
            else{
                // operate(cmd, a, b)
                result = operate(ARRAY_NUMBERS[i], ARRAY_NUMBERS[i-1] , ARRAY_NUMBERS[i+1]);
                ARRAY_NUMBERS.splice(i-1, 3, result)
                i = i -1;
            }
        }

        else if(i == 0 && isOperand(ARRAY_NUMBERS[i])){
            // missing a, assume typical calculator behaviour
            result = operate(ARRAY_NUMBERS[i], 0, ARRAY_NUMBERS[i+1]);
            ARRAY_NUMBERS.splice(i, 2, result);
        }
        else if(isOperand(ARRAY_NUMBERS[i])){
            result = operate(ARRAY_NUMBERS[i], ARRAY_NUMBERS[i-1] , ARRAY_NUMBERS[i+1]);
            ARRAY_NUMBERS.splice(i-1, 3, result)
            i = i -1;

        }
        console.log(ARRAY_NUMBERS);
    }
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
                    let compt = arrayPopEval();
                    console.log(compt);
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