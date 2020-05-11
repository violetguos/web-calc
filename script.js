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
    return (elem === '\u002b' || elem === '\u2212'|| elem==='\u00f7' || elem === '\u00d7')?true:false;
}

function arrToNum(arr){
    /* turns number array in to number, ['2', '3'] into 23 */
    let num = 0;
    for (let i = 0; i < arr.length; i++){
        num = num *10 + Number(arr[i]);
    }
    return num;
}

function splitArray(arr){
    // find the position to slice numbers and operand
    // ['3', '3', '*', '2'] into ['3', '3'], '*', and ['2']
    let opIndex = 0;
    let opIndicesArr = []; // record all the indices of operands
    let arrOp = [];

    // find all the operands
    while(opIndex < arr.length){
        if(isOperand(arr[opIndex])){
            opIndicesArr.push(opIndex);
        }
        opIndex++;
    }

    // turn into an array of [`a`, `operand`, `b`] s
    let optArr = [];
    for(let i = 0; i < opIndicesArr.length; i++){
        if(i==0){
            let arrA = arr.slice(0, opIndicesArr[i]);
            let a = arrToNum(arrA);
            let arrB = arr.slice(opIndicesArr[i]+1, opIndicesArr[i+1]);
            let b = arrToNum(arrB);
            let opFunc = opTable[arr[opIndicesArr[i]]];
            optArr = [a, opFunc, b];
        }
        else{
            let arrB = arr.slice(opIndicesArr[i]+1, opIndicesArr[i+1]);
            let b = arrToNum(arrB);
            let opFunc = opTable[arr[opIndicesArr[i]]];
            optArr = [opFunc, b];
        }
        arrOp.push(optArr);
    }
    // console.log(arrOp);
    return arrOp;
}

function arrayPopEval(){
    /* 
    pop the global array elements
    only integers for now
    Pop an array e.g. [3, +, 2] into add(3, 2)
    */
    let a = 0;
    let b = 0;
    let cmd;
    let result = 0;
    let operations = splitArray(arrayButtons);

    // iterate through all the operations, fron left to right
    for(let i = 0; i<operations.length; i++){
        if(i === 0){
            // first equation
            result = operations[i][1](operations[i][0], operations[i][2]);
        }
        else{
            // accumlated result is now `a`
            result = operations[i][0](result, operations[i][1]);
        }
        console.log("result", result);
        const displayRes = document.querySelector("#result");
        displayRes.textContent = result;

    }

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
                    arrayPopEval();
                    // clean up after one eval
                    arrayButtons = [];

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