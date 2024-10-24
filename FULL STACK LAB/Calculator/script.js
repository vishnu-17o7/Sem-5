const lightTheme = "styles/light.css";
const darkTheme = "styles/dark.css";
const sunIcon = "assets/SunIcon.svg";
const moonIcon = "assets/MoonIcon.svg";
const themeIcon = document.getElementById("theme-icon");
const res = document.getElementById("result");
const toast = document.getElementById("toast");

const calculate = (value) => {
  const calculatedValue = eval(value || null);
  if (isNaN(calculatedValue)) {
    res.value = "Can't divide 0 with 0";
    setTimeout(() => {
      res.value = "";
    }, 1300);
  } else {
    res.value = calculatedValue;
  }
};

const liveScreen = (enteredValue) => {
  if (!res.value) {
    res.value = "";
  }
  res.value += enteredValue;
};

function backspace() {
  if (res.value) {
    res.value = res.value.slice(0, -1);
  }
}

document.addEventListener("keydown", keyboardInputHandler);

function keyboardInputHandler(e) {
  e.preventDefault();
  if (e.key === "0") {
    res.value += "0";
  } else if (e.key === "1") {
    res.value += "1";
  } else if (e.key === "2") {
    res.value += "2";
  } else if (e.key === "3") {
    res.value += "3";
  } else if (e.key === "4") {
    res.value += "4";
  } else if (e.key === "5") {
    res.value += "5";
  } else if (e.key === "6") {
    res.value += "6";
  } else if (e.key === "7") {
    res.value += "7";
  } else if (e.key === "7") {
    res.value += "7";
  } else if (e.key === "8") {
    res.value += "8";
  } else if (e.key === "9") {
    res.value += "9";
  }

  if (e.key === "+") {
    res.value += "+";
  } else if (e.key === "-") {
    res.value += "-";
  } else if (e.key === "*") {
    res.value += "*";
  } else if (e.key === "/") {
    res.value += "/";
  }

  if (e.key === ".") {
    res.value += ".";
  }

  if (e.key === "Enter") {
    calculate(result.value);
  }

  if (e.key === "Backspace") {
    const resultInput = res.value;
    res.value = resultInput.substring(0, res.value.length - 1);
  }
}
function graphFunction() {
  const expression = res.value.trim();

  const validChars = /^[0-9xyXY+\-*/().^% ]+$/;

  if (!/[xX]/.test(expression)) {
    alert("Please include the variable 'x' or 'X' in your expression to graph.");
    return;
  }

  if (!validChars.test(expression)) {
    alert("Invalid characters in the expression. Only use numbers, x, y, and operators.");
    return;
  }

  const openParentheses = (expression.match(/\(/g) || []).length;
  const closeParentheses = (expression.match(/\)/g) || []).length;
  if (openParentheses !== closeParentheses) {
    alert("Unmatched parentheses in the expression.");
    return;
  }

  try {
    eval(expression.replace(/x/gi, 1).replace(/y/gi, 1));
  } catch (error) {
    alert("Invalid expression. Please enter a valid mathematical expression involving 'x' or 'y'.");
    return;
  }
  const userConfirmed = confirm("Do you want to proceed?");
  if (!userConfirmed) {
    alert("Graphing has been canceled.");
    return;
  }

  const popup = window.open("", "Graph", "width=600,height=400");

  popup.document.write(`
    <html>
    <head>
      <title>Graph</title>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    </head>
    <body>
      <canvas id="graphCanvas"></canvas>
      <script>
        const ctx = document.getElementById('graphCanvas').getContext('2d');
        const xValues = [];
        const yValues = [];

        for (let x = -10; x <= 10; x += 0.1) {
          try {
            const y = eval("${expression.replace(/x/gi, '" + x + "').replace(/y/gi, 1)}");
            xValues.push(x);
            yValues.push(y);
          } catch (error) {
            alert("An error occurred while plotting the graph.");
            window.close(); // Close the popup if there's an error
          }
        }

        new Chart(ctx, {
          type: 'line',
          data: {
            labels: xValues,
            datasets: [{
              label: 'y = ${expression}',
              data: yValues,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
              fill: false,
            }]
          },
          options: {
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'X-axis'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Y-axis'
                }
              }
            }
          }
        });
      </script>
    </body>
    </html>
  `);
  popup.document.close(); 
}
