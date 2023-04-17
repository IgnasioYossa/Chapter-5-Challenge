let playerChoiceImage = null;
let computerChoiceImage = null;

function Play(playerChoice){
    const choices = ["Rock", "Paper", "Scissor"];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const result = determineWinner(playerChoice, computerChoice);
    const resultElement = document.querySelector(".vs");
    resultElement.innerHTML = result;
	resultElement.classList.remove("win", "lose", "tie");
    if (result === "PLAYER 1<br>WIN") {
        resultElement.classList.add("win");
    } else if (result === "COM<br>WIN") {
        resultElement.classList.add("lose");
    } else {
        resultElement.classList.add("tie");
    }
    if (playerChoiceImage !== null) {
        playerChoiceImage.classList.remove("selected");
    }
    playerChoiceImage = document.getElementById(playerChoice);
    playerChoiceImage.classList.add("selected");
    
    document.getElementById("Rock-com").classList.remove("selected");
    document.getElementById("Paper-com").classList.remove("selected");
    document.getElementById("Scissor-com").classList.remove("selected");

    if (computerChoice === "Rock") {
        document.getElementById("Rock-com").classList.add("selected");
    } else if (computerChoice === "Paper") {
        document.getElementById("Paper-com").classList.add("selected");
    } else if (computerChoice === "Scissor") {
        document.getElementById("Scissor-com").classList.add("selected");
    }
      
}
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice){
        return "DRAW";
    } else if (playerChoice === "Rock" && computerChoice === "Scissor" ||
        playerChoice === "Paper" && computerChoice === "Rock" ||
        playerChoice === "Scissor" && computerChoice === "Paper"){
            return "PLAYER 1<br>WIN";
    } else {
        return "COM<br>WIN";
    }
}

