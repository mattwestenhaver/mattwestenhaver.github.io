// ------- VARIABLES ------- //
var boxes = $('.gameboard div')
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, ' ']
var emptyBox;
var currentNumber;
var count = 0;
var gameTimer = 0;
var gameIntervalTimer;
var playerOneTime;
var playerTwoTime;
var playerOne = 'Player 1';
var playerTwo = 'Player 2';


// ------- FUNCTIONS ------- //

// controls the timer starting
function myTimer() {
  gameIntervalTimer = setInterval(function() {
    gameTimer++;
    $('.timer').text(gameTimer + ' seconds...')
  }, 1000);
}

// stops the timer
function timerStop() {
  clearInterval(gameIntervalTimer)
}

// randomize the numbers array
function shuffle(numbers) {
  var currentIndex = numbers.length, temporaryValue, randomIndex;
  while (0 !==currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = numbers[currentIndex];
    numbers[currentIndex] = numbers[randomIndex];
    numbers[randomIndex] = temporaryValue;
  }
  return numbers;
  numbers = shuffle(numbers);
}

// adds numbers to each div
$.each( numbers, function( i, val ) {
  $(".gameboard div").eq(i).text(val);
});

// controls what happens when each box is clicked
function boxClickHandler() {
  legalMove()
  currentNumber = $(this).text()
  // adds clicked number to emptyBox and removes emptyBox styling
  $(emptyBox).text(currentNumber)
  $(emptyBox).removeClass('emptyBox')
  // makes clicked tile blank and adds emptyBox styling
  $(this).text(' ')
  $(this).addClass('emptyBox')
  // makes emptyBox the current empty box
  for (var i = 0; i < boxes.length; i++) {
     boxes[i].removeEventListener('click', boxClickHandler)
  }
  legalMove()
  emptyBox = $(".tile:contains(' ')")
  if (checkDone()) {
    alert('congrats! your time was ' + gameTimer + " seconds!")
    if (!playerOneTime) {
      playerOneTime = gameTimer
      timerStop()
      $('.start_button').text('player 2 start')
      gameTimer = 0
    } else {
      playerTwoTime = gameTimer
      timerStop()
      if (playerOneTime > playerTwoTime) {
        $('h1').text(playerTwo + ' wins!')
        $('.line1').text(playerTwo + ': ' + playerTwoTime + ' seconds')
        $('.line2').text(playerOne + ': ' + playerOneTime + ' seconds')
      } else {
        $('h1').text(playerOne + ' wins!')
        $('.line1').text(playerOne + ': ' + playerOneTime + ' seconds')
        $('.line2').text(playerTwo + ': ' + playerTwoTime + ' seconds')
      }
    }
  }
}

// randomize the board when start is clicked and begin the timer
$('.start').on('click', function(){
  playerOne = prompt('player 1, what is your name?')
  playerTwo = prompt('player 2, what is your name?')
  shuffle(numbers)
  $.each( numbers, function( i, val ) {
    $(".gameboard div").eq(i).text(val);
  });
  emptyBox = $(".tile:contains(' ')")
  emptyBox.addClass('emptyBox')
  myTimer()
  legalMove()
})

// re-randomize the board in case the player gets stuck
$('.randomizer').on('click', function(){
  shuffle(numbers)
  $.each( numbers, function( i, val ) {
    $(".gameboard div").eq(i).text(val);
  });
  emptyBox = $(".tile:contains(' ')")
  emptyBox.addClass('emptyBox')
  legalMove()
})

// add event listeners to 'legal move' tiles based on blank tile location
function legalMove() {
  var blankOne = boxes.eq(0).text() === " ";
  if (blankOne) {
    boxes[1].addEventListener('click', boxClickHandler)
    boxes[3].addEventListener('click', boxClickHandler)
  }
  var blankTwo = boxes.eq(1).text() === " ";
  if (blankTwo) {
    boxes[0].addEventListener('click', boxClickHandler)
    boxes[2].addEventListener('click', boxClickHandler)
    boxes[4].addEventListener('click', boxClickHandler)
  }
  var blankThree = boxes.eq(2).text() === " ";
  if(blankThree) {
    boxes[1].addEventListener('click', boxClickHandler)
    boxes[5].addEventListener('click', boxClickHandler)
  }
  var blankFour = boxes.eq(3).text() === " ";
  if(blankFour) {
    boxes[0].addEventListener('click', boxClickHandler)
    boxes[4].addEventListener('click', boxClickHandler)
    boxes[6].addEventListener('click', boxClickHandler)
  }
  var blankFive = boxes.eq(4).text() === " ";
  if(blankFive) {
    boxes[1].addEventListener('click', boxClickHandler)
    boxes[3].addEventListener('click', boxClickHandler)
    boxes[5].addEventListener('click', boxClickHandler)
    boxes[7].addEventListener('click', boxClickHandler)
  }
  var blankSix = boxes.eq(5).text() === " ";
  if(blankSix) {
    boxes[2].addEventListener('click', boxClickHandler)
    boxes[4].addEventListener('click', boxClickHandler)
    boxes[8].addEventListener('click', boxClickHandler)
  }
  var blankSeven = boxes.eq(6).text() === " ";
  if(blankSeven) {
    boxes[3].addEventListener('click', boxClickHandler)
    boxes[7].addEventListener('click', boxClickHandler)
  }
  var blankEight = boxes.eq(7).text() === " ";
  if(blankEight) {
    boxes[4].addEventListener('click', boxClickHandler)
    boxes[6].addEventListener('click', boxClickHandler)
    boxes[8].addEventListener('click', boxClickHandler)
  }
  var blankNine = boxes.eq(8).text() === " ";
  if(blankNine) {
    boxes[5].addEventListener('click', boxClickHandler)
    boxes[7].addEventListener('click', boxClickHandler)
  }
}

// check to see if the puzzle has been completed
function checkDone() {
  var checkTileOne = boxes.eq(0).text() === "1";
  var checkTileTwo = boxes.eq(1).text() === "2";
  var checkTileThree = boxes.eq(2).text() === "3";
  var checkTileFour = boxes.eq(3).text() === "4";
  var checkTileFive = boxes.eq(4).text() === "5";
  var checkTileSix = boxes.eq(5).text() === "6";
  var checkTileSeven = boxes.eq(6).text() === "7";
  var checkTileEight = boxes.eq(7).text() === "8";
  var checkTileNine = boxes.eq(8).text() === " ";

  if (checkTileOne && checkTileTwo && checkTileThree && checkTileFour && checkTileFive && checkTileSix && checkTileSeven && checkTileEight && checkTileNine) {
    return true
  } else {
    return false
  }
}
