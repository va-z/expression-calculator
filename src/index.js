function eval() {
  // Do not use eval!!!
  return;
}

// oper - operator array
// operSt - operator stack
// operPrec - operator precedences
// outQ - output queue

function expressionCalculator(expr) {
  const onTop = (arr) => arr[arr.length - 1];
  const oper = ["*", "/", "+", "-"],
    operPrec = {
      "*": 2,
      "/": 2,
      "+": 1,
      "-": 1,
    },
    operSt = [],
    outQ = [];
  let buffer = "";

  for (let c of expr) {
    if (/\d/.test(c)) buffer += c;
    else if (buffer) {
      outQ.push(buffer);
      buffer = "";
    }
  }
  if (buffer) outQ.push(buffer);
}

module.exports = {
  expressionCalculator,
};
