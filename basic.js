var fs = require("fs");
var inquirer = require("inquirer");

function BasicFlashCard(front, back) {
    this.cardFront = front;
    this.cardBack = back;

    this.displayCardInfo = function() {
        console.log("Front: " + this.cardFront + " " + "Back: " + this.cardBack);
    }

    this.writeCardInfo = function() {
        var writeCard = "Front: " + this.cardFront + " Back: " + this.cardBack + "\r\n";

        fs.appendFile("basic.txt", writeCard); 
    }
};

function createCard() {
    inquirer.prompt([
        {
            name: "front",
            message: "Enter the front of the basic flashcard: "
        }, {
            name: "back",
            message: "Enter the back of the basic flashcard: "
        }, {
            type: "confirm",
            message: "Do you wish to add another basic flashcard?",
            name: "continue",
            default: true
        }
    ]).then(function(answers) {
        var card = new BasicFlashCard(answers.front, answers.back);
        card.writeCardInfo();

        if(answers.continue === true)
            createCard();
        else
            console.log("Please see basic.txt for your newly created flashcards.")
    });
}

createCard();