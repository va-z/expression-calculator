function eval() {
  // Do not use eval!!!
  return;
}

// oper - operator array
// opSt - operator stack
// precedence - operator precedence
// outQ - output queue

function expressionCalculator(expr) {
  const topElem = (arr) => arr[arr.length - 1];
  const isEmpty = (arr) => arr.length === 0;
  const isOper = (str) => ["*", "/", "+", "-"].includes(str);
  const precedence = {
      "*": 2,
      "/": 2,
      "+": 1,
      "-": 1,
    },
    opSt = [],
    outQ = [];
  let buffer = "";

  for (let c of expr) {
    if (/\d/.test(c)) buffer += c;
    else if (buffer) {
      outQ.push(buffer);
      buffer = "";
    }

    if (isOper(c)) {
      if (isEmpty(opSt) || precedence[topElem(opSt)] < precedence[c]) opSt.push(c);
      else if (!isEmpty(opSt)) {
        while (precedence[topElem(opSt)] >= precedence[c]) outQ.push(opSt.pop());
        opSt.push(c);
      }
    }
  }
  if (buffer) outQ.push(buffer);
  while (opSt.length) outQ.push(opSt.pop());

  console.log(outQ);
}

module.exports = {
  expressionCalculator,
};
