"use strict";

// Elements selection from Dom
const TotalBalance = document.querySelector(".Main-Amount");
const TransactionMainDiv = document.querySelector(".Real-Transactions");
const LogoutBtn = document.querySelector(".logout__btn");
const WelcomeLabel = document.querySelector(".Welcome__Heading");
const MonenyTinputTo = document.querySelector(".form__input--to");
const MoneyTAmount = document.querySelector(".form__input--amount");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnLoanAmount = document.querySelector(".form__input--loan-amount");

let allUsers = JSON.parse(localStorage.getItem("allUsers"));
let userData = JSON.parse(localStorage.getItem("loggedInUser"));
// let  balance = userData.movements.reduce((acc, mov) => acc + mov, 0);
// TotalBalance.textContent = `$${balance}`;

window.addEventListener("load", function () {
  // Retrieve user data from localStorage
  setTimeout(() => {
    if (userData) {
      console.log(`Welcome, ${userData.owner}`);

      // Calculate TotalBalance
      displayBalance(userData);

      // Display transactions
      displayTransactions(userData.movements);
      WelcomeMessage(userData.owner);
      updateUI(userData);

      document.getElementById("loading").style.display = "none";
      document.getElementById("content").style.display = "block";
    } else {
      console.log("No user logged in.");
      window.location.href = "index.html";
    }
  }, 1000);
});

const displayTransactions = function (movements) {
  TransactionMainDiv.innerHTML = "";

  movements.forEach(function (movement) {
    const type = movement > 0 ? "Deposit" : "Withdrawal";
    const time = ""; // I need to fix these after refering the time apis
    const html = `
        <div class="Real-Transactions">
            <div class="Transaction-Icon">
              <img src="./assets/svg/dollar.svg" width="28px" height="28px" alt="dollarIcon">
            </div>
            <div>
              <p class="Transactontype TrnFont">${type}</p>
            </div>
            <div class="Transaction-Time TrnFont">
              <time class="Trc-Time TrnFont" datetime="">${time}</time>
            </div>
            <div class="Transaction-Amount TrnFont">
              <p>${movement}</p>
            </div>
            <div class="more-Icon">
              <img src="./assets/svg/moreicon.svg" alt="moreIcon">
            </div>
            <hr>
        </div>`;

    TransactionMainDiv.insertAdjacentHTML("afterbegin", html);
  });
};

const displayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  TotalBalance.textContent = `$${acc.balance}`;
};

const updateUI = function (acc) {
  displayTransactions(acc.movements);
  // displayBalance(acc);
};

// Displaying User Welcome Message

const WelcomeMessage = function (owner) {
  WelcomeLabel.textContent = `Welcome ${owner}`;
};

// Logout logic

LogoutBtn.addEventListener("click", function () {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});

// console.log(userData.balance);

const MoneyTransfer = function (e) {
  e.preventDefault();
  const amount = Number(MoneyTAmount.value);
  console.log(amount);
  const receiverAcc = allUsers.find(
    (acc) => acc.username === MonenyTinputTo.value
  );
  console.log(receiverAcc.movements);
  if (
    amount > 0 &&
    receiverAcc &&
    userData.balance >= amount &&
    receiverAcc.username !== userData.username
  ) {
    userData.movements.push(-amount);
    console.log(userData.movements);
    displayBalance(userData);
    receiverAcc.movements.push(+amount);
    console.log(receiverAcc.movements);

    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    updateUI(userData);
    alert(`Transfer of $${amount} to ${receiverAcc.owner} successful!`);

    MonenyTinputTo.value = "";
    MoneyTAmount.value = "";
  } else {
    alert("Transfer failed. Check balance or receiver details.");
  }
};

btnTransfer.addEventListener("click", MoneyTransfer);
MonenyTinputTo.addEventListener("keydown", function (e) {
  if (e.key === "Enter") MoneyTransfer(e);
});
MoneyTAmount.addEventListener("keydown", function (e) {
  if (e.key === "Enter") MoneyTransfer(e);
});
// console.log(balance)

// we need to call the moneytransfer here , the money tranfer accepting
// two parameters one is

console.log(userData);

// Loan Amount Logic

const RequestLoanAmount = function (e) {
  e.preventDefault();
  let LoanAmount = +btnLoanAmount.value;
  console.log(LoanAmount);

  if (
    LoanAmount > 0 &&
    userData.movements.some((mov) => mov >= LoanAmount * 0.1)
  ) {
    userData.movements.push(LoanAmount);
    displayBalance(userData);
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    updateUI(userData);
    alert(`Loan $${LoanAmount} is credited to ${userData.owner} successfully!`);
    btnLoanAmount.value = "";
  } else {
    alert("Enter a Positive Amount or Amount greater than 0");
  }
};

btnLoan.addEventListener("click", RequestLoanAmount);
btnLoanAmount.addEventListener("keydown", function (e) {
  if (e.key === "Enter") RequestLoanAmount(e);
});


// I need to clear the problem of Data not presisting , becuase of updated ui only showing old data,
// need to implement time functionality on each payment
//need to perform the sort functionality 