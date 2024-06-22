let cardsInDeck;

$( document ).ready(function() {
  getCards();
  cardsInDeck = cards;
  updateVisibleChipBalances();
});

let currentTurn = "player";
let currentWager = 0;
let currentChipBalance = localStorage.getItem('blackjackChips') || 500;
let gameWinner = "none"; 
let isGameOver = false;

let dealerHand = [];
let dealerHandTotal = 0;
let dealerGameBoard = $("#dealer");
let dealerStatus = "start"; 

let playerHand = [];
let playerHandTotal = 0;
let playerGameBoard = $("#user-hand");
let playerHandTotalDisplay = $(".hand-total");
let playerStatus = "start"; 

let playerHasAce = false;  

let splitGame = false;
let playerSplitHand = [];
let playerSplitHandTotal = 0;
let playerSplitGameBoard = $("#user-split-hand");
let playerSplitHandTotalDisplay = $(".split-hand-total");
let playerSplitStatus;

let startButton = $("#start-game-button");
let doubleDownButton = $("#double-down-button");
let hitButton = $("#hit-button");
let standButton = $("#stand-button");
let splitButton = $(".split-button");
let playAgainButton = $(".new-game-button"); 

function disableButton(buttonName) {
	$(buttonName).off();
	$(buttonName).addClass("disabled-button");
}

function enableButton(buttonName, event) {
	$(buttonName).click(event);
	$(buttonName).removeClass("disabled-button");
}

function updateVisibleChipBalances() {
	$(".current-wager").text(currentWager);
	$(".current-chip-balance").text(currentChipBalance);
	localStorage.setItem('blackjackChips', currentChipBalance);
}

function updateVisibleHandTotals() {
	$(playerHandTotalDisplay).text(playerHandTotal);
	$(playerSplitHandTotalDisplay).text(playerSplitHandTotal);

	if (dealerHand.length === 2 && isGameOver === false && dealerStatus === "start") {
		$(".dealer-hand-total").text(dealerHandTotal - dealerHand[1].value);
	} else {
		$(".dealer-hand-total").text(dealerHandTotal);
	}
}

function selectWager(amount){
	currentWager = amount;
	updateVisibleChipBalances();
}

function flipHiddenCard() {
	if (dealerHand.length === 2) {
		$("#dealer-card-1").addClass("flipped");
		setTimeout(function(){
			$("#dealer-card-1").attr("src", "img/" + dealerHand[1].src);
			updateVisibleHandTotals();
		}, 250);	
	} 
}

function scaleDownDeck(deck, totalDisplay) {
	$(totalDisplay).addClass("splithand-scaledown");
	$(deck).addClass("splithand-scaledown");
}

function enlargeDeck(deck, totalDisplay) {
	$(totalDisplay).removeClass("splithand-scaledown");
	$(deck).removeClass("splithand-scaledown");
}

$(".rules-nav").click(function(){
	$("#rules").toggle("blind", 500);
});

$("#rules-close").click(function(){
	$("#rules").hide();
});

$(".modal").modal({ 
      dismissible: false, 
      opacity: .40, 
      inDuration: 300, 
      outDuration: 200, 
      startingTop: "10%", 
      endingTop: "10%",
    }
  );

$("#chip-10").click(function(){selectWager(10)});
$("#chip-25").click(function(){selectWager(25)});
$("#chip-50").click(function(){selectWager(50)});
$("#chip-100").click(function(){selectWager(100)});

$(startButton).click(startGame);
$(doubleDownButton).click(doubleDown); 
$(hitButton).click(hit);
$(standButton).click(stand);
$(playAgainButton).click(newGame);
$("#reset-game").click(resetGame);

$(".reduce-aces-button").click( 
	function(){
		reduceAcesValue(playerHand);
		disableButton(splitButton, split);
}); 