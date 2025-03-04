"use strict";

const account1 = {
  owner: "Angela Yu",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jonas Schmedtmann",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Maxmillian Django",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const loginbtn = document.querySelector(".logn__btn");
const UserInput = document.querySelector(".usernameInput");
const PasswordInput = document.querySelector(".PasswordInput");

window.addEventListener("load", function () {
  UserInput.value = "";
  PasswordInput.value = "";
  UserInput.focus();
});
// Implementing The login Logic.

const CreateUsername = function (account) {
  account.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
    console.log(acc.username);
  });
};

CreateUsername(accounts);

// Login Handler Function;

const loginHandlerFunction = function (e) {
  e.preventDefault();
  const userInputValue = UserInput.value;
  const PassInputValue = +PasswordInput.value;

  const user = accounts.find(
    (acc) => acc.username === userInputValue && acc.pin === PassInputValue
  );

  if (user) {
    // Store user data in localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    // Redirect to the dashboard with a 1-second delay

    // saving allUsers when login happens
    if (!localStorage.getItem("allUsers")) {
      localStorage.setItem("allUsers", JSON.stringify(accounts));
    }

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  } else {
    alert("Invalid username or password. Please try again.");
    UserInput.value = "";
    PasswordInput.value = "";
    UserInput.focus();
  }
};

loginbtn.addEventListener("click", loginHandlerFunction);
UserInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") loginHandlerFunction(e);
});

PasswordInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") loginHandlerFunction(e);
});
