function getHistory() {
    return document.getElementById("history-value").innerText;
}

function setHistory(num) {
    document.getElementById("history-value").innerText = num;
}

function getOutput() {
    return document.getElementById("output-value").innerText;
}

function setOutput(num) {
    if (num == "") {
        document.getElementById("output-value").innerText = num;
    } else {
        document.getElementById("output-value").innerText = getFormattedNumber(num);
    }
}

function getFormattedNumber(num) {
    return Number(num).toLocaleString("en");
}

function reverseNumberFormat(num) {
    return Number(num.replace(/,/g, ''))
}
var number = document.getElementsByClassName("number");
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function () {
        var output = reverseNumberFormat(getOutput());
        if (output != NaN) {
            output = output + this.id;
            setOutput(output);
        }
    });
}
var operator = document.getElementsByClassName("operator");
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function () {
        if (this.id == "clear") {
            setHistory("");
            setOutput("");
        } else if (this.id == "backspace") {
            var output = reverseNumberFormat(getOutput()).toString();
            output = output.substr(0, output.length - 1)
            setOutput(output);
        } else {
            var output = getOutput();
            var history = getHistory();
            if (output == "" && history != "") {
                if (isNaN(history[history.length - 1])) {
                    history = history.substr(0, history.length - 1)
                }
            }
            if (output != "" || history != "") {
                output = (output == "") ? output : reverseNumberFormat(output);
                history = history + output;
                if (this.id == "=") {
                    var answer = eval(history);
                    setOutput(answer);
                    setHistory("");
                } else {
                    history = history + this.id;
                    setHistory(history);
                    setOutput("");
                }
            }
        }
    });
}