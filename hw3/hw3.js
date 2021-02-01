var rs = require('readline-sync');

var fNum1 = rs.question('1st Number: ');
var fNum2 = rs.question('2nd Number: ');
var fNum3 = rs.question('3rd Number: ');
var fNum4 = rs.question('4th Number: ');


var result1 = fNum1;
fNum1 -= 1;
while (fNum1) {
	result1 = result1 * fNum1;
	fNum1 -=1;
}

var result2 = 0;
while (fNum2) {
	result2 += fNum2 % 10;
	fNum2 = Math.floor(fNum2 / 10);
}

var result3 = fNum3.split("").reverse().join("");	

fNum4 = fNum4.toString();
var result4 = "True";
for (var i = 0; i < fNum4.length / 2; i++) {
	if (fNum4[i] != fNum4[fNum4.length - 1 - i]) {
		result4 = "False";
	}
}

console.log("Factorial of the 1st number is = " + result1);
console.log("The sum of all the digits of the 2nd number is = " + result2);
console.log("The reverse of the 3rd number is = " + result3);
console.log("Is the 4th number a palindrome (True/False)? = " + result4);
