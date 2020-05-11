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
    cmd(a, b);
}

// button controls
function numberButtons(){
    let a, b;
    const btns = document.querySelectorAll(".number");
    btns.forEach(
        function (btn){
            btn.addEventListener('click', function() {
                // get a and b
                console.log(btn.textContent);
                a = Number(btn.textContent);
            }
            )
           
        }
    )
}
numberButtons();