// Variables declaration, initialization and assignment
const deck = $('.deck');
let singleCard = $('.card');

const secondsSpan = $('.seconds');
const minutesSpan = $('.minutes');
const hoursSpan = $('.hours');
let actualSeconds = 1;
let actualMinutes = 1;
let actualHours = 1;
let secondsInDay = 1;
let hoursInDay = 1;

const moves = $('.moves');
const firstStar = $('.stars li:nth-child(1)');
const secondStar = $('.stars li:nth-child(2)');
let clickContainer = 0;

let openCards = [];

let matchedCards = [];

const restartGameIcon = $('i.fa-repeat');

const popup = $('.popup');
const popupMessage = $('.message');


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	let currentIndex = array.length, temporaryValue, randomIndex;

	while (0 !== currentIndex) {

		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

// changes the HTML with the random cards
singleCard = shuffle(singleCard);
deck.append(singleCard);


// Timer functionality
function timer(){
	// every 60 seconds increases 1 minute and resets the seconds in the timer
	if (actualSeconds === 60) {
		actualSeconds = 0;
		minutesSpan.html(actualMinutes++);
	// every 60 minutes resets the minutes in the timer
	} if (actualMinutes === 60) {
		actualMinutes = 0;
	// every 60 minutes increases 1 hour and resets the seconds in the timer
	} if (secondsInDay === 3600) {
		secondsInDay = 0;
		hoursInDay++;
		hoursSpan.html(actualHours++);
	// every 24 hours resets the hours in the timer
	} if (hoursInDay === 24) {
		actualHours = 0;
	// stops the timer if all the cards matched
	} if (matchedCards.length === 16) {
		return;
	}
	secondsSpan.html(actualSeconds++);
	secondsInDay++;
}


 // Click counter functionality
function clickCounter() {
	 clickContainer++;
	 moves.html(clickContainer);
	 // decreases the rating after 18 moves
	 if (clickContainer === 19) {
		 firstStar.remove();
	 // 2nd decrement of the rating after 23 moves
	 } if (clickContainer === 24) {
		 secondStar.remove();
	 }
 }


	// displays the symbols of the cards only if there are 1 or 2 elements in the array
	function displayCardSymbol() {
		if (openCards.length < 2) {
				$(this).addClass('open show');
		}
	}


	function matchingCards() {
		// adds the animation for the matching cards
		openCards[0].classList.add('matching-cards-animation', 'match');
		openCards[1].classList.add('matching-cards-animation', 'match');
		// couple by couple, adds the matching cards to the 'final' array
		matchedCards.push(openCards[0], openCards[1]);
		// empties the array
		openCards = [];
	}

	// hides the symbols of the nonmatching cards after 3 seconds from the click
	function nonMatchingCards() {
		// adds the shaking animation for the nonmatching cards
		openCards[0].classList.add('nonmatching-cards-animation');
		openCards[1].classList.add('nonmatching-cards-animation');
		setTimeout(function() {
			// "closes" the cards and removes the class of their animation
			openCards[0].classList.remove('open', 'show', 'nonmatching-cards-animation');
			openCards[1].classList.remove('open', 'show', 'nonmatching-cards-animation');
			// empties the array
			openCards = [];
		}, 3000);
	}

	// adds the clicked cards to the array to check if they match or not
	function openCardsList() {
		if (openCards.length < 2) {
			openCards.push(this);
			// checks if the cards differ
			if (openCards[0] != openCards[1]) {
				if (openCards.length === 2) {
					// checks if the cards match
					if (openCards[0].isEqualNode(openCards[1])) {
						matchingCards();
					} else {
						nonMatchingCards();
					}
				}
				clickCounter();
			}
		}
	}

	// refreshes the page to restart the game
	function restartGame() {
		window.location.reload();
	}

	// shows the final popup
	function finalMessage() {
		// the function scope let me show the final rating
		let howManyStars = $('.fa-star').length;
		popup.css('display', 'flex');
		// creates the contents inside the popup
		popupMessage.html('<span>COWABUNGA!</span><br>You did it in <strong>' + (actualHours-1) + 'h:' + (actualMinutes-1) + '\':' + (actualSeconds-1) + '"</strong> with <strong>' + clickContainer + ' moves</strong> and a final score of <strong>' + howManyStars + ' stars!</strong><br>But you can certainly do even better.<br><button class="play-again">Do you want to try again?</button>');
		$('.play-again').click(restartGame);
	}

	// the game is ended if all cards match
	function endedGame() {
		if (matchedCards.length === 16) {
			finalMessage();
		}
	}

	// starts the timer at the first click
	deck.one('click', function() {
	  window.setInterval(timer, 1000);
	});

	singleCard.click(displayCardSymbol);

	singleCard.click(openCardsList);

	singleCard.click(endedGame);

	restartGameIcon.click(restartGame);
