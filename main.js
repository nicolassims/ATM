/**
 * @author Sims, Nicolas (sableye.nico@gmail.com)
 * @version 0.0.1
 * @summary Design a program for the Hollywood Movie Rating Guide || created: 10.11.2016
 * @todo
 */

"use strict";
const PROMPT = require('readline-sync'), IO = require('fs');

let continueResponse, cardNumber, personalIdentificationNumber, match;
let accounts = [];
const COLUMNS = 5;

function main() {
    if (match == null) {
        setContinueResponse();
        populatePeople();
    }
    while (continueResponse == 1) {
        setCardNumber();
        setPersonalIdentificationNumber();
        setMatch();

        
        printAllTest();
    }
}

main();

function setContinueResponse() {
    if (continueResponse == null) {
        continueResponse = 1;
    } else {
        while (continueResponse != 0 && continueResponse != 1) {
            continueResponse = PROMPT.question('\nDo you want to continue?\n[0] = No\n[1] = Yes\n>');
        }
    }
}

function populatePeople() {
    let fileReader = IO.readFileSync(`data.csv`, 'utf8');
    let tempArray = fileReader.toString().split(/\r?\n/);
    for (let i = 0; i < tempArray.length; i++) {
        accounts.push(tempArray[i].toString().split(/,/));
    }
}

function setCardNumber() {
    cardNumber = PROMPT.question('What is your four-digit card number?\n>');
    while (!/^[0-9]{4}$/.test(cardNumber)) {
        cardNumber = PROMPT.question('Please re-check your input.\nWhat is your four-digit card number?\n>')
    }
}

function setPersonalIdentificationNumber() {
    personalIdentificationNumber = PROMPT.question('What is your three-digit PIN?\n>');
    while (!/^[0-9]{3}$/.test(personalIdentificationNumber)) {
        personalIdentificationNumber = PROMPT.question('Please re-check your input.\nWhat is your three-digit PIN?\n>')
    }
}

function setMatch() {
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i][1] == cardNumber && accounts[i][2] == personalIdentificationNumber) {
            match = 1;
        }
    }
    if (match != 1) {
        return main();
    } 
}

function printAllTest() {
    for (let i = 0; i < accounts.length; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            console.log(i + ' ' + j + ' ' + accounts[i][j] + ',');
        }
        console.log(`\n`);
    }
    continueResponse = 0;
} //DELET THIS

//^[0-9]{4}$