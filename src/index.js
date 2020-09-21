function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  const topElem = (arr) => arr[arr.length - 1];
  const isEmpty = (arr) => arr.length === 0;
  const isOperator = (str) => ["*", "/", "+", "-"].includes(str);
  const actions = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => {
      if (b === 0) throw `TypeError: Division by zero.`;
      else return a / b;
    },
  };

  function toRPN(expr) {
    // oper - operator array
    // opSt - operator stack
    // precedence - operator precedence
    // outQ - output queue
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
        outQ.push(+buffer);
        buffer = "";
      }

      if (isOperator(c)) {
        if (isEmpty(opSt) || topElem(opSt) === "(" || precedence[topElem(opSt)] < precedence[c]) opSt.push(c);
        else if (!isEmpty(opSt)) {
          while (topElem !== "(" && precedence[topElem(opSt)] >= precedence[c]) {
            outQ.push(opSt.pop());
          }
          opSt.push(c);
        }
      }

      if (c === "(") opSt.push(c);
      else if (c === ")") {
        while (topElem(opSt) !== "(") {
          if (isEmpty(opSt)) throw `ExpressionError: Brackets must be paired`;
          outQ.push(opSt.pop());
        }
        opSt.pop();
      }
    }

    if (buffer) outQ.push(+buffer);

    while (opSt.length) {
      if (topElem(opSt) === "(") throw `ExpressionError: Brackets must be paired`;
      outQ.push(opSt.pop());
    }

    return outQ;
  }

  function solveRPNArr(arr) {
    const RPNStack = [];

    while (arr.length) {
      RPNStack.push(arr.shift());

      if (isOperator(topElem(RPNStack))) {
        const [a, b, action] = RPNStack.splice(RPNStack.length - 3);
        const value = actions[action](a, b);
        RPNStack.push(value);
      }
    }

    return RPNStack.pop();
  }

  return solveRPNArr(toRPN(expr));
}

module.exports = {
  expressionCalculator,
};
