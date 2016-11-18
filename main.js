/**
 * @author Sims, Nicolas (sableye.nico@gmail.com)
 * @version 0.0.1
 * @summary Design a program for the Hollywood Movie Rating Guide || created: 10.11.2016
 * @todo
 */

"use strict";
const PROMPT = require(`readline-sync`), IO = require(`fs`);

let continueResponse, cardNumber, personalIdentificationNumber, match, accountType, transactionType;
let accounts = [];
const CHECKINGCOLUMN = 3, SAVINGSCOLUMN = 4;

function main() {
    setContinueResponse();
    if (match == null) {
        populatePeople();
    }
    while (continueResponse == 1) {
        setCardNumber();
        setPersonalIdentificationNumber();
        setMatch();
        setAccountType();
        setTransactionType();
        if (transactionType == 0) {
            performDeposit();
        } else if (transactionType == 1) {
            
        } else if (transactionType == 2) {
            
        } else {
            viewAccountBalance();
        }
    }
}

main();

function setContinueResponse() {
    if (continueResponse == null) {
        continueResponse = 1;
    } else {
        continueResponse = PROMPT.question(`\nDo you want to continue?\n[0] = No\n[1] = Yes\n>`);
        while (continueResponse != 0 && continueResponse != 1) {
            continueResponse = PROMPT.question(`Please re-check your input.\n\nDo you want to continue?\n[0] = No\n
            [1] = Yes\n>`);
        }
    }
}

function populatePeople() {
    let fileReader = IO.readFileSync(`data.csv`, `utf8`);
    let tempArray = fileReader.toString().split(/\r?\n/);
    for (let i = 0; i < tempArray.length; i++) {
        accounts.push(tempArray[i].toString().split(/,/));
    }
}

function setCardNumber() {
    cardNumber = PROMPT.question(`What is your four-digit card number?\n>`);
    while (!/^[0-9]{4}$/.test(cardNumber)) {
        cardNumber = PROMPT.question(`Please re-check your input.\nWhat is your four-digit card number?\n>`)
    }
}

function setPersonalIdentificationNumber() {
    personalIdentificationNumber = PROMPT.question(`What is your three-digit PIN?\n>`);
    while (!/^[0-9]{3}$/.test(personalIdentificationNumber)) {
        personalIdentificationNumber = PROMPT.question(`Please re-check your input.\nWhat is your three-digit PIN?\n>`)
    }
}

function setMatch() {
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i][1] == cardNumber && accounts[i][2] == personalIdentificationNumber) {
            match = 1;
        }
    }
    if (match != 1) {
        match = 0;
        return main();
    } 
}

function setAccountType() {
    accountType = PROMPT.question(`Which account would you like to access?\n[0] = Checkings\n[1] = Savings\n>`);
    while (accountType != 0 && accountType != 1) {
        accountType = PROMPT.question(`Please re-check your input.\nWhich account would you like to access?\n` +
            `[0] = Checkings\n[1] = Savings\n>`);
    }
    if (accountType == 0) {
        accountType = `checkings`;
    } else {
        accountType = `savings`;
    }
}

function setTransactionType() {
    transactionType = PROMPT.question(`You\'ve selected your ${accountType} account.\n` +
        `What would you like to do to this account?\n[0] = Deposit\n[1] = Withdraw\n[2] = Transfer\n[3] = Inquiry\n>`);
    while (transactionType != 0 && transactionType != 1 && transactionType != 2 && transactionType != 3) {
        accountType = PROMPT.question(`Please re-check your input.\nYou\'ve selected your ${accountType} account\n` +
            `What would you like to do to this account?\n[0] = Deposit\n[1] = Withdraw\n[2] = Transfer\n` +
            `[3] = Inquiry\n>`);
    }
    if (accountType == 0) {
        console.log(`You\'ve elected to perform a deposit into your ${accountType} account.`);
    } else if (accountType == 1) {
        console.log(`You\'ve elected to perform a withdrawal from your ${accountType} account.`);
    } else if (accountType == 2) {
        if (accountType == `Checkings`) {
            console.log(`You\'ve elected to transfer money from your ${accountType} account to your Savings account.`);
        } else {
            console.log(`You\'ve elected to transfer money from your Savings account to your ${accountType} account.`);
        }
    } else {
        console.log(`You\'ve elected to see the amount of money in your ${accountType} account.`);
    }
}

function performDeposit() {
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i][1] == cardNumber && accounts[i][2] == personalIdentificationNumber) {
            let depositAmount = PROMPT.question(`How much would you like to deposit into your ${accountType} account?\n>`);
            while (depositAmount <= 0) {
                depositAmount = PROMPT.question(`Please re-check your input.\n
                    How much would you like to deposit into your ${accountType} account?\n>`);
            }
            if (accountType = `checkings`) {
                accounts[i][CHECKINGCOLUMN] += depositAmount;
                console.log(`You have deposited ${depositAmount} into your ${accountType} account.\n
                Your ${accountType} account's new balance is ${accounts[i][CHECKINGCOLUMN]}.`);
            } else {
                accounts[i][SAVINGSCOLUMN] += depositAmount;
                console.log(`You have deposited ${depositAmount} into your ${accountType} account.\n
                Your ${accountType} account's new balance is ${accounts[i][SAVINGSCOLUMN]}.`);
            }
        }
    }
    return main();
}

function viewAccountBalance() {
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i][1] == cardNumber && accounts[i][2] == personalIdentificationNumber) {
            if (accountType = `checkings`) {
                console.log(`The balance of your ${accountType} account is... $${accounts[i][CHECKINGCOLUMN]}.`);
            } else {
                console.log(`The balance of your ${accountType} account is... $${accounts[i][SAVINGSCOLUMN]}.`);
            }
        }
    }
    return main();
}