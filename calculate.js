let input = document.querySelector('#grades'); //grabs what is insert in class="grades"
input.addEventListener('change', function(event) { //runs when file changes
    var reader = new FileReader();
    reader.onload = function () { //reloads new text
        var lines = reader.result.split(/\r\n|\n/);
        process(lines);
    }
    reader.readAsText(input.files[0]);
    detect = 1;
}, false);

let marks = [];
let entries = [];
let data = [];
let total = 0;
let sum = 0;
let mean = 0;
let median = 0;
let max = [];
let min = [];
let detect = 0;

function process(lines) {
    marks = [];
    entries = [];
    data = [];
    for (var i = 1; i < lines.length; i++) {
        data = lines[i].split(',');
        entries.push([Number(data[1]), data[0].trim()]);
        marks.push(Number(data[1]));
    }
    marks.sort(function(a, b) {
        return a - b;
    });
    histogram();
}

function histogram() {
    if (detect != 1) {
        return;
    }
    sum = 0;
    total = 0;
    counter.a_plus = 0;
    counter.a = 0;
    counter.a_minus = 0;
    counter.b_plus = 0;
    counter.b = 0;
    counter.b_minus = 0;
    counter.c_plus = 0;
    counter.c = 0;
    counter.c_minus = 0;
    counter.d = 0;
    counter.f = 0;
    check(); //grades counter
    mean = calcMean();
    median = calcMedian();
    max = calcMax();
    min = calcMin();
    draw();
}

function hide() {
    document.getElementById('students').style.opacity = 0;
    document.getElementById('quantity').style.opacity = 0;
    document.getElementById('grade-1').style.opacity = 0;
    document.getElementById('count-1').style.opacity = 0;
    document.getElementById('grade-2').style.opacity = 0;
    document.getElementById('count-2').style.opacity = 0;
    document.getElementById('grade-3').style.opacity = 0;
    document.getElementById('count-3').style.opacity = 0;
    document.getElementById('grade-4').style.opacity = 0;
    document.getElementById('count-4').style.opacity = 0;
    document.getElementById('grade-5').style.opacity = 0;
    document.getElementById('count-5').style.opacity = 0;
    document.getElementById('grade-6').style.opacity = 0;
    document.getElementById('count-6').style.opacity = 0;
    document.getElementById('grade-7').style.opacity = 0;
    document.getElementById('count-7').style.opacity = 0;
    document.getElementById('grade-8').style.opacity = 0;
    document.getElementById('count-8').style.opacity = 0;
    document.getElementById('grade-8').style.opacity = 0;
    document.getElementById('count-9').style.opacity = 0;
    document.getElementById('grade-9').style.opacity = 0;
    document.getElementById('count-10').style.opacity = 0;
    document.getElementById('grade-10').style.opacity = 0;
    document.getElementById('count-10').style.opacity = 0;
    document.getElementById('grade-11').style.opacity = 0;
    document.getElementById('count-11').style.opacity = 0;
}

function draw() {
    var big = Math.max(counter.a_plus,counter.a,counter.a_minus,counter.b_plus,counter.b,counter.b_minus,counter.c_plus,counter.c,counter.c_minus,counter.d,counter.f);

    document.getElementById('average').innerHTML = mean + "%";
    document.getElementById('med').innerHTML = median + "%";

    document.getElementById('students').innerHTML = "Students:";
    document.getElementById('quantity').innerHTML = total;
    document.getElementById('students').style.opacity = 1;
    document.getElementById('quantity').style.opacity = 1;

    document.getElementById('grade-1').style.width = (counter.a_plus/big)*100 + "%";
    document.getElementById('grade-1').style.opacity = 1;
    document.getElementById('count-1').innerHTML = counter.a_plus;
    document.getElementById('count-1').style.opacity = 1;

    document.getElementById('grade-2').style.width = (counter.a/big)*100 + "%";
    document.getElementById('grade-2').style.opacity = 1;
    document.getElementById('count-2').innerHTML = counter.a;
    document.getElementById('count-2').style.opacity = 1;

    document.getElementById('grade-3').style.width = (counter.a_minus/big)*100 + "%";
    document.getElementById('grade-3').style.opacity = 1;
    document.getElementById('count-3').innerHTML = counter.a_minus;
    document.getElementById('count-3').style.opacity = 1;

    document.getElementById('grade-4').style.width = (counter.b_plus/big)*100 + "%";
    document.getElementById('grade-4').style.opacity = 1;
    document.getElementById('count-4').innerHTML = counter.b_plus;
    document.getElementById('count-4').style.opacity = 1;
    
    document.getElementById('grade-5').style.width = (counter.b/big)*100 + "%";
    document.getElementById('grade-5').style.opacity = 1;
    document.getElementById('count-5').innerHTML = counter.b;
    document.getElementById('count-5').style.opacity = 1;
    
    document.getElementById('grade-6').style.width = (counter.b_minus/big)*100 + "%";
    document.getElementById('grade-6').style.opacity = 1;
    document.getElementById('count-6').innerHTML = counter.b_minus;
    document.getElementById('count-6').style.opacity = 1;
    
    document.getElementById('grade-7').style.width = (counter.c_plus/big)*100 + "%";
    document.getElementById('grade-7').style.opacity = 1;
    document.getElementById('count-7').innerHTML = counter.c_plus;
    document.getElementById('count-7').style.opacity = 1;
    
    document.getElementById('grade-8').style.width = (counter.c/big)*100 + "%";
    document.getElementById('grade-8').style.opacity = 1;
    document.getElementById('count-8').innerHTML = counter.c;
    document.getElementById('count-8').style.opacity = 1;
    
    document.getElementById('grade-9').style.width = (counter.c_minus/big)*100 + "%";
    document.getElementById('grade-9').style.opacity = 1;
    document.getElementById('count-9').innerHTML = counter.c_minus;
    document.getElementById('count-9').style.opacity = 1;
    
    document.getElementById('grade-10').style.width = (counter.d/big)*100 + "%";
    document.getElementById('grade-10').style.opacity = 1;
    document.getElementById('count-10').innerHTML = counter.d;
    document.getElementById('count-10').style.opacity = 1;
    
    document.getElementById('grade-11').style.width = (counter.f/big)*100 + "%";
    document.getElementById('grade-11').style.opacity = 1;
    document.getElementById('count-11').innerHTML = counter.f;
    document.getElementById('count-11').style.opacity = 1;
}

function calcMax() {
    var tmp = total - 1;
    document.getElementById('best').innerHTML = "";
    while (tmp != 0) {
        if (marks[tmp] <= document.querySelector('#max').value) {
            max = marks[tmp];
            for(var i = 0; i < entries.length; i++) {
                if (entries[i][0] == marks[tmp]) {
                    document.getElementById('best').appendChild(document.createTextNode(entries[i][1] + ", "));
                }
            }
            break;
        }
        tmp--;
    }
    document.getElementById('best').appendChild(document.createTextNode("(" + max + "%)"));
}

function calcMin() {
    var tmp = 0;
    document.getElementById('worst').innerHTML = "";
    while (tmp != total) {
        if (marks[tmp] >= document.querySelector('#val-11').value) {
            min = marks[tmp];
            for(var i = 0; i < entries.length; i++) {
                if (entries[i][0] == marks[tmp]) {
                    document.getElementById('worst').appendChild(document.createTextNode(entries[i][1] + ", "));
                }
            }
            break;
        }
        tmp++;
    }
    document.getElementById('worst').appendChild(document.createTextNode("(" + min + "%)"));
}

function calcMean() {
    return (sum/total).toFixed(2);
}

function calcMedian() {
    if (total % 2 == 0) { //even
        console.log("even");
        return ((Number(marks[(total/2) - 1]) + Number(marks[(total/2)]))/2).toFixed(2);
    } else {
        var mid = (total-1)/2;
        return marks[mid];
    }
}

let counter = {
    a_plus: 0,
    a: 0,
    a_minus: 0,
    b_plus: 0,
    b: 0,
    b_minus: 0,
    c_plus: 0,
    c: 0,
    c_minus: 0,
    d: 0,
    f: 0,
}

function check() {
    sum = 0;
    total = 0;
    for (var i = 0; i < entries.length; i++) {
        if (marks[i] > document.querySelector('#max').value) { //dont fit in max are excluded
            break;
        }
        else if (marks[i] >= document.querySelector('#val-1').value) {
            sum += marks[i];
            total++;
            counter.a_plus++;
        }
        else if (marks[i] >= document.querySelector('#val-2').value){
            sum += marks[i];
            total++;
            counter.a++;
        }
        else if (marks[i] >= document.querySelector('#val-3').value){
            sum += marks[i];
            total++;
            counter.a_minus++;
        }
        else if (marks[i] >= document.querySelector('#val-4').value){
            sum += marks[i];
            total++;
            counter.b_plus++;
        }
        else if (marks[i] >= document.querySelector('#val-5').value){
            sum += marks[i];
            total++;
            counter.b++;
        }
        else if (marks[i] >= document.querySelector('#val-6').value){
            sum += marks[i];
            total++;
            counter.b_minus++;
        }
        else if (marks[i] >= document.querySelector('#val-7').value){
            sum += marks[i];
            total++;
            counter.c_plus++;
        }
        else if (marks[i] >= document.querySelector('#val-8').value){
            sum += marks[i];
            total++;
            counter.c++;
        }
        else if (marks[i] >= document.querySelector('#val-9').value){
            sum += marks[i];
            total++;
            counter.c_minus++;
        }
        else if (marks[i] >= document.querySelector('#val-10').value){
            sum += marks[i];
            total++;
            counter.d++;
        }
        else if (marks[i] >= document.querySelector('#val-11').value){
            sum += marks[i];
            total++;
            counter.f++;
        }
    }
    
}

function validator(string) {
    return isNaN(string - parseFloat(string));
}

let prev_max = document.querySelector('#max').value;
document.querySelector('#max').addEventListener('input', function(event) {
    if (validator(document.querySelector('#max').value)) {
        hide();
        document.querySelector('#max').setCustomValidity("Input Error");
        document.querySelector('#max').reportValidity();
    }
    else if (Number(document.querySelector('#max').value) >= Number(document.querySelector('#val-1').value)) {
        prev_max = document.querySelector('#max').value;
        histogram();
        document.querySelector('#max').setCustomValidity("");
    } 
    else {
        hide();
        document.querySelector('#max').setCustomValidity("Bound Error");
        document.querySelector('#max').reportValidity();
    }
}, false);

document.querySelector('#val-1').addEventListener('input', function(event) {
    if (validator(document.querySelector('#val-1').value)) {
        hide();
        document.querySelector('#val-1').setCustomValidity("Input Error");
        document.querySelector('#val-1').reportValidity();
    }
    else if (Number(document.querySelector('#val-1').value) > Number(document.querySelector('#max').value)) {
        hide();
        document.querySelector('#val-1').setCustomValidity("Bound Error");
        document.querySelector('#val-1').reportValidity();
    }
    else if (Number(document.querySelector('#val-1').value) <= Number(document.querySelector('#val-2').value)) {
        document.querySelector('#val-1').setCustomValidity("Bound Error");
        document.querySelector('#val-1').reportValidity();
    }
    else {
        document.querySelector('#val-1').setCustomValidity("");
        histogram();
    }
}, false);

document.querySelector('#val-2').addEventListener('input', function(event) {
    if (validator(document.querySelector('#val-2').value)) {
        hide();
        document.querySelector('#val-2').setCustomValidity("Input Error");
        document.querySelector('#val-2').reportValidity();
    }
    else if (Number(document.querySelector('#val-2').value) > Number(document.querySelector('#val-1').value)) {
        hide();
        document.querySelector('#val-2').setCustomValidity("Bound Error");
        document.querySelector('#val-2').reportValidity();
    }
    else if (Number(document.querySelector('#val-2').value) <= Number(document.querySelector('#val-3').value)) {
        hide();
        document.querySelector('#val-2').setCustomValidity("Bound Error");
        document.querySelector('#val-2').reportValidity();
        
    }
    else {
        histogram();
        document.querySelector('#val-2').setCustomValidity("");
    }
}, false);

document.querySelector('#val-3').addEventListener('input', function(event) {
    if (validator(document.querySelector('#val-3').value)) {
        hide();
        document.querySelector('#val-3').setCustomValidity("Input Error");
        document.querySelector('#val-3').reportValidity();
    }
    else if (Number(document.querySelector('#val-3').value) > Number(document.querySelector('#val-2').value)) {
        hide();
        document.querySelector('#val-3').setCustomValidity("Bound Error");
        document.querySelector('#val-3').reportValidity();
    }
    else if (Number(document.querySelector('#val-3').value) <= Number(document.querySelector('#val-4').value)) {
        hide();
        document.querySelector('#val-3').setCustomValidity("Bound Error");
        document.querySelector('#val-3').reportValidity();
    }
    else {
        histogram();
        document.querySelector('#val-3').setCustomValidity("");
    }
}, false);

document.querySelector('#val-4').addEventListener('input', function(event) {
    if (validator(document.querySelector('#val-4').value)) {
        hide();
        document.querySelector('#val-4').setCustomValidity("Input Error");
        document.querySelector('#val-4').reportValidity();
    }
    else if (Number(document.querySelector('#val-4').value) > Number(document.querySelector('#val-3').value)) {
        hide();
        document.querySelector('#val-4').setCustomValidity("Bound Error");
        document.querySelector('#val-4').reportValidity();
    }
    else if (Number(document.querySelector('#val-4').value) <= Number(document.querySelector('#val-5').value)) {
        hide();
        document.querySelector('#val-4').setCustomValidity("Bound Error");
        document.querySelector('#val-4').reportValidity();
    }
    else {
        histogram();
        document.querySelector('#val-4').setCustomValidity("");
    }
}, false);

document.querySelector('#val-5').addEventListener('input', function(event) {
    if (validator(document.querySelector('#val-5').value)) {
        hide();
        document.querySelector('#val-5').setCustomValidity("Input Error");
        document.querySelector('#val-5').reportValidity();
    }
    else if (Number(document.querySelector('#val-5').value) > Number(document.querySelector('#val-4').value)) {
        hide();
        document.querySelector('#val-5').setCustomValidity("Bound Error");
        document.querySelector('#val-5').reportValidity();
    }
    else if (Number(document.querySelector('#val-5').value) <= Number(document.querySelector('#val-6').value)) {
        hide();
        document.querySelector('#val-5').setCustomValidity("Bound Error");
        document.querySelector('#val-5').reportValidity();
    }
    else {
        histogram();
        document.querySelector('#val-5').setCustomValidity("");
    }
}, false);

document.querySelector('#val-6').addEventListener('input', function(event) {
    if (validator(document.querySelector('#val-6').value)) {
        hide();
        document.querySelector('#val-6').setCustomValidity("Input Error");
        document.querySelector('#val-6').reportValidity();
    }
    else if (Number(document.querySelector('#val-6').value) > Number(document.querySelector('#val-5').value)) {
        hide();
        document.querySelector('#val-6').setCustomValidity("Bound Error");
        document.querySelector('#val-6').reportValidity();
    }
    else if (Number(document.querySelector('#val-6').value) <= Number(document.querySelector('#val-7').value)) {
        hide();
        document.querySelector('#val-6').setCustomValidity("Bound Error");
        document.querySelector('#val-6').reportValidity();
    }
    else {
        histogram();
        document.querySelector('#val-6').setCustomValidity("");
    }
}, false);

document.querySelector('#val-7').addEventListener('input', function(event) {
    if (validator(document.querySelector('#val-7').value)) {
        hide();
        document.querySelector('#val-7').setCustomValidity("Input Error");
        document.querySelector('#val-7').reportValidity();
    }
    else if (Number(document.querySelector('#val-7').value) > Number(document.querySelector('#val-6').value)) {
        hide();
        document.querySelector('#val-7').setCustomValidity("Bound Error");
        document.querySelector('#val-7').reportValidity();
    }
    else if (Number(document.querySelector('#val-7').value) <= Number(document.querySelector('#val-8').value)) {
        hide();
        document.querySelector('#val-7').setCustomValidity("Bound Error");
        document.querySelector('#val-7').reportValidity();
    }
    else {
        histogram();
        document.querySelector('#val-7').setCustomValidity("");
    }
}, false);

document.querySelector('#val-8').addEventListener('input', function(event) {
    if (validator(document.querySelector('#val-8').value)) {
        hide();
        document.querySelector('#val-8').setCustomValidity("Input Error");
        document.querySelector('#val-8').reportValidity();
    }
    else if (Number(document.querySelector('#val-8').value) > Number(document.querySelector('#val-7').value)) {
        hide();
        document.querySelector('#val-8').setCustomValidity("Bound Error");
        document.querySelector('#val-8').reportValidity();
    }
    else if (Number(document.querySelector('#val-8').value) <= Number(document.querySelector('#val-9').value)) {
        hide();
        document.querySelector('#val-8').setCustomValidity("Bound Error");
        document.querySelector('#val-8').reportValidity();
    }
    else {
        histogram();
        document.querySelector('#val-8').setCustomValidity("");
    }
}, false);

document.querySelector('#val-9').addEventListener('input', function(event) {
    if (validator(document.querySelector('#val-9').value)) {
        hide();
        document.querySelector('#val-9').setCustomValidity("Input Error");
        document.querySelector('#val-9').reportValidity();
    }
    else if (Number(document.querySelector('#val-9').value) > Number(document.querySelector('#val-8').value)) {
        hide();
        document.querySelector('#val-9').setCustomValidity("Bound Error");
        document.querySelector('#val-9').reportValidity();
    }
    else if (Number(document.querySelector('#val-9').value) <= Number(document.querySelector('#val-10').value)) {
        hide();
        document.querySelector('#val-9').setCustomValidity("Bound Error");
        document.querySelector('#val-9').reportValidity();
    }
    else {
        histogram();
        document.querySelector('#val-9').setCustomValidity("");
    }
}, false);

document.querySelector('#val-10').addEventListener('input', function(event) {
    if (validator(document.querySelector('#val-10').value)) {
        hide();
        document.querySelector('#val-10').setCustomValidity("Input Error");
        document.querySelector('#val-10').reportValidity();
    }
    else if (Number(document.querySelector('#val-10').value) > Number(document.querySelector('#val-9').value)) {
        hide();
        document.querySelector('#val-10').setCustomValidity("Bound Error");
        document.querySelector('#val-10').reportValidity();
    }
    else if (Number(document.querySelector('#val-10').value) <= Number(document.querySelector('#val-11').value)) {
        hide();
        document.querySelector('#val-10').setCustomValidity("Bound Error");
        document.querySelector('#val-10').reportValidity();
    }
    else {
        histogram();
        document.querySelector('#val-10').setCustomValidity("");
    }
}, false);

document.querySelector('#val-11').addEventListener('input', function(event) {
    if (validator(document.querySelector('#val-11').value)) {
        hide();
        document.querySelector('#val-11').setCustomValidity("Input Error");
        document.querySelector('#val-11').reportValidity();
    }
    else if (Number(document.querySelector('#val-11').value) > Number(document.querySelector('#val-10').value)) {
        hide();
        document.querySelector('#val-11').setCustomValidity("Bound Error");
        document.querySelector('#val-11').reportValidity();
    }
    else {
        histogram();
        document.querySelector('#val-11').setCustomValidity("");
    }
}, false);
