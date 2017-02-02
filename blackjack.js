//-------------------------Original Unshuffled Deck---------------------------//
////////////////////////////////////////////////////////////////////////////////
var deck = [
  [ "AC", [1]], [ "2C", [2]], [ "3C", [3]], [ "4C", [4]], [ "5C", [5]], [ "6C", [6]], [ "7C", [7]], [ "8C", [8]], [ "9C", [9]], [ "10C", [10]], [ "JC", [10]], [ "QC", [10]], [ "KC", [10]],
  [ "AH", [1]], [ "2H", [2]], [ "3H", [3]], [ "4H", [4]], [ "5H", [5]], [ "6H", [6]], [ "7H", [7]], [ "8H", [8]], [ "9H", [9]], [ "10H", [10]], [ "JH", [10]], [ "QH", [10]], [ "KH", [10]],
  [ "AS", [1]], [ "2S", [2]], [ "3S", [3]], [ "4S", [4]], [ "5S", [5]], [ "6S", [6]], [ "7S", [7]], [ "8S", [8]], [ "9S", [9]], [ "10S", [10]], [ "JS", [10]], [ "QS", [10]], [ "KS", [10]],
  [ "AD", [1]], [ "2D", [2]], [ "3D", [3]], [ "4D", [4]], [ "5D", [5]], [ "6D", [6]], [ "7D", [7]], [ "8D", [8]], [ "9D", [9]], [ "10D", [10]], [ "JD", [10]], [ "QD", [10]], [ "KD", [10]]
];

//---------------------------------Shuffler-----------------------------------//
////////////////////////////////////////////////////////////////////////////////
function Shuffle(cards){
  var currentIndex = cards.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  } return cards;
}

//--------------------------------Constants-----------------------------------//
////////////////////////////////////////////////////////////////////////////////
var player = [];
var dealer = [];

var newDeck = new Shuffle(deck);//-----------------------------------------------------shuffled deck

//----------------------------Initial Dealt Cards-----------------------------//
////////////////////////////////////////////////////////////////////////////////
function deal(){//-------------------------------------------------------------------deals the initial cards to the player and dealer
  $( ".player" ).empty();//----------------------------------------------------------emptys already played cards from previous game
  $( ".dealer" ).empty();
  player = newDeck.splice(0,2);//----------------------------------------------------dealt player cards
  dealer = newDeck.splice(0,1);
  showCardImage(player, ".player");//------------------------------------------------displays player cards
  showCardImage(dealer, ".dealer");
  $(".player-score").text(standValues(player));//------------------------------------updates player score
  $(".dealer-score").text(getTotal(dealer));
  var totalValues = getTotal(player);
  canPlay(totalValues);//------------------------------------------------------------player situation: Bust || Blackjack || Hit?
  $("#deal").attr("onClick", null);//------------------------------------------------enables play, and ables hit and stand
  $("#deal").attr("class", "hidden");
  $("#hit").attr("onClick", "hit()");
  $("#hit").attr("class", null);
  $("#stand").attr("onClick", "stand()");
  $("#stand").attr("class", null);
}

//------------------------------------Hit?------------------------------------//
////////////////////////////////////////////////////////////////////////////////
function hit(){//--------------------------------------------------------------------deals an additional card to the player each time hit is clicked
   player = additionalCard(player);
   standValues(player);
   var totalValues = getTotal(player);
   canPlay(totalValues);//-----------------------------------------------------------player situation: Bust || Blackjack || Hit?
   console.log(totalValues);//-------------------------------------------------------total value
   $( ".player" ).empty();
   $( ".dealer" ).empty();
   showCardImage(player, ".player");
   showCardImage(dealer, ".dealer");
   $(".player-score").text(getTotal(player));
   $(".dealer-score").text(getTotal(dealer));
}

//-----------------------------------Stand------------------------------------//
////////////////////////////////////////////////////////////////////////////////

function stand(){//------------------------------------------------------------------deals an additional card to dealer, until he either wins or busts
  var totalplayer = standValues(player);
  var totaldealer = getTotal(dealer);

  while (totaldealer < 17 ||//-------------------------------------------------------dealer cannot stand under 17
         totaldealer < totalplayer ){

           if (aceFinder(dealer) === false){//---------------------------------------checks if dealer has an Ace
                dealer = additionalCard(dealer);
                totaldealer = getTotal(dealer);
                $( ".dealer" ).empty();
                $(".dealer-score").text(totaldealer);
                showCardImage(dealer, ".dealer");

             } else {//---------------------------------------------------------------if the dealer has an Ace
              var aceOne = totaldealer;//---------------------------------------------Ace as value 1
              var aceEleven = aceOne+10;//--------------------------------------------Ace as value 11

              switch (true){
                case (aceEleven == 21 && dealer.length == 2):
                  totaldealer = 21;
                  $( ".dealer" ).empty();
                  $(".dealer-score").text(totaldealer);
                  showCardImage(dealer, ".dealer");
                  break;
                case (aceEleven == 21 && dealer.length !== 2):
                  totaldealer = 21;
                  $( ".dealer" ).empty();
                  $(".dealer-score").text(totaldealer);
                  showCardImage(dealer, ".dealer");
                  break;
                case (aceEleven > totalplayer && aceEleven <= 21):
                  totaldealer = aceEleven;
                  $( ".dealer" ).empty();
                  $(".dealer-score").text(totaldealer);
                  showCardImage(dealer, ".dealer");
                  break;
                 case (aceEleven > totalplayer && aceEleven > 21):
                   dealer = additionalCard(dealer);
                   totaldealer = getTotal(dealer);
                   $( ".dealer" ).empty();
                   $(".dealer-score").text(totaldealer);
                   showCardImage(dealer, ".dealer");
                   break;
                 case (aceEleven < totalplayer):
                   dealer = additionalCard(dealer);
                   totaldealer = getTotal(dealer);
                   $( ".dealer" ).empty();
                   $(".dealer-score").text(totaldealer);
                   showCardImage(dealer, ".dealer");
                   break;}
  }
} $("#deal").attr("onClick", "deal()");//--------------------------------------------play again enabling, and disabling hit and stand
  $("#deal").attr("class", null);
  $("#hit").attr("onClick", null);
  $("#hit").attr("class", "hidden");
  $("#stand").attr("onClick", null);
  $("#stand").attr("class", "hidden");
  var newDeck = new Shuffle(deck);//-------------------------------------------------new deck for a new game
  return winOrlose(totalplayer, totaldealer);//--------------------------------------displays who won
}

////////////////////////////////////////////////////////////////////////////////
//----------------------------------------------------------------------------//
//-----------------------------REUSABLE FUNCTIONS-----------------------------//
//----------------------------------------------------------------------------//
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
//--------------------------Cards Value Only Function-------------------------//
////////////////////////////////////////////////////////////////////////////////
function cardsValueOnly(cardHolder){
  var cardValues = [];
  for(var i=0; i < cardHolder.length; i++){
  cardValues = cardValues.concat(cardHolder[i][1]);
} return cardValues;
}

////////////////////////////////////////////////////////////////////////////////
//--------------------------Total Card Value Function-------------------------//
////////////////////////////////////////////////////////////////////////////////
function getTotal(cardHolder){
  cardValues = cardsValueOnly(cardHolder);
  Sum = [];
  Sum = cardValues.reduce(function(a, b) {
  return a + b;
  }, 0);
 // console.log(Sum);
 return Sum;
}
////////////////////////////////////////////////////////////////////////////////
//---------------------------Additional Card Function-------------------------//
////////////////////////////////////////////////////////////////////////////////
function additionalCard(cardHolder){
   cardHolder = cardHolder.concat(newDeck.splice(0,1));
   return cardHolder;
}
////////////////////////////////////////////////////////////////////////////////
//---------------------------Hit? Bust? BlackJack?----------------------------//
////////////////////////////////////////////////////////////////////////////////
function canPlay(total){
  switch (true){
    case (total >= 22):
     $(".winOrlosePlayer").text("Busts");
     $(".winOrloseDealer").text("Wins");
     $("#deal").attr("onClick", "deal()");
     $("#deal").attr("class", null);
     $("#hit").attr("onClick", null);
     $("#hit").attr("class", "hidden");
     $("#stand").attr("onClick", null);
     $("#stand").attr("class", "hidden");
     var newDeck = new Shuffle(deck);
      break;
    case (total == 21 && player.length == 2):
    stand();
    $(".winOrlosePlayer").text("BlackJack!");
      total = 21;
      break;
    case (total == 21 && player.length !== 2):
    $(".winOrlosePlayer").text("I dare you to hit");
        total = 21;
        break;
    case (total <= 20):
    $(".winOrlosePlayer").text("Hit ?");
      break;
  }
}
////////////////////////////////////////////////////////////////////////////////
//----------------------------Ace Finder Function-----------------------------//
////////////////////////////////////////////////////////////////////////////////
  function aceFinder(cardHolder){
   var cardvalues = cardsValueOnly(cardHolder);
   var trueOrFalse = (cardvalues.find(ace) === 1) ? true : false;
   return trueOrFalse;
  }

////////////////////////////////////////////////////////////////////////////////
//------------------------Does the player have an Ace ?-----------------------//
////////////////////////////////////////////////////////////////////////////////
function ace(value){ return value === 1; }

function showAceValues(cardHolder){
  var valueAsOne =  (getTotal(cardHolder));
  var valueAsEleven = valueAsOne+10;
  switch(true){
    case ( valueAsEleven == 21 ):
      console.log("Blackjack!");
      $(".player-score").text(valueAsEleven);
      return valueAsEleven;
    case ( valueAsOne < 12 ):
      console.log(valueAsOne + " or " + valueAsEleven);
      $(".player-score").text(valueAsEleven);
      return valueAsEleven;
    case ( valueAsOne >= 12 ):
      $(".player-score").text(valueAsOne);
      console.log(valueAsOne);
      return valueAsOne;
  }
}

function standValues(cardHolder){
  var cardValues = cardsValueOnly(cardHolder);
  var output = ( cardValues.find(ace) === 1) ?
                showAceValues(cardHolder) : getTotal(cardHolder);
  return output;
}

////////////////////////////////////////////////////////////////////////////////
//-----------------------------Show Card Image--------------------------------//
////////////////////////////////////////////////////////////////////////////////
function showCardImage(cardHolder, position){
  var cards = [];
  for(var i=0; i < cardHolder.length; i++){
  cards = cards.concat(cardHolder[i][0]);
  console.log("this is a test" + cards);
}    for(var img=0; img < cards.length; img++){
      $(position).append("<img src =\"./Cards/"+cards[img]+".jpg\" id=\"img\">");
}
}

////////////////////////////////////////////////////////////////////////////////
//-----------------------------Show Card Image--------------------------------//
////////////////////////////////////////////////////////////////////////////////
function winOrlose(cardHolder1, cardHolder2){

  switch(true){
    case (cardHolder1 < cardHolder2 && cardHolder2 > 21):
        $(".winOrlosePlayer").text("Wins");
        $(".winOrloseDealer").text("Busts");
      break;
    case (cardHolder1 > cardHolder2 && cardHolder1.length == 2 && cardHolder1 == 21):
        $(".winOrlosePlayer").text("BlackJack!");
        $(".winOrloseDealer").text("Loses");
      break;
    case (cardHolder1 = cardHolder2 && cardHolder1.length == 2 && cardHolder2.length == 2 && cardHolder1 == 21):
        $(".winOrlosePlayer").text("BlackJack!");
        $(".winOrloseDealer").text("Loses");
      break;
    case (cardHolder1 = cardHolder2 && cardHolder1.length == 2 && cardHolder2.length !== 2 && cardHolder1 == 21):
        $(".winOrlosePlayer").text("BlackJack!");
        $(".winOrloseDealer").text("Loses");
      break;
    case (cardHolder1 = cardHolder2 && cardHolder1.length !== 2 && cardHolder2.length == 2 && cardHolder1 == 21):
        $(".winOrlosePlayer").text("Loses");
        $(".winOrloseDealer").text("BlackJack!");
      break;
    case (cardHolder1 = cardHolder2 && cardHolder1.length !== 2 && cardHolder2.length !== 2 && cardHolder1 == 21):
        $(".winOrlosePlayer").text("Loses");
        $(".winOrloseDealer").text("Wins");
      break;
    case (cardHolder1 < cardHolder2 && cardHolder2 <= 21):
        $(".winOrlosePlayer").text("Loses");
        $(".winOrloseDealer").text("Wins");
      break;
  }

}

//---------------------------------Split?-------------------------------------//
////////////////////////////////////////////////////////////////////////////////
// function split(){
//   deal();
//   isDoubleValues();
//   var results;
//
//   if (results !== []){
//     var splitArray = [], size = 1;
//
//     while (results.length > 0)
//       splitArray.push(results.splice(0, size));
//       return splitArray;
// }}
//
//
// function isDoubleValues(){
//   deal();
//   var cardValues;
//
//   var sorted_values = cardValues.slice().sort();
//   var results = [];
//
//   for (var i = 0; i < cardValues.length - 1; i++) {
//       if (sorted_values[i + 1] == sorted_values[i]) {
//           results.push(sorted_arr[i]);
//           return results;
// }}
// }
