
let cumulativeRevenue = localStorage.getItem("cumulativeRevenue") || "0";
let cumulativeExpense = localStorage.getItem("cumulativeExpense") || "0";
let cumulativeProfit = localStorage.getItem("cumulativeProfit") || "0";

// Find the elements where the values will be displayed
let revenueElement = document.getElementById("cumulativerevneue");
let expenseElement = document.getElementById("cumulativeexpense");
let profitElement = document.getElementById("cumulativeprofit");

// Set the text content of the elements to the values
revenueElement.textContent = cumulativeRevenue;
expenseElement.textContent = cumulativeExpense;
profitElement.textContent = cumulativeProfit;