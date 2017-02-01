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
var newDeck = new Shuffle(deck);//---------------------------------------------------shuffled deck

//----------------------------Initial Dealt Cards-----------------------------//
////////////////////////////////////////////////////////////////////////////////
function deal(){
  player = newDeck.splice(0,2);//----------------------------------------------------dealt player cards
  dealer = newDeck.splice(0,1);//----------------------------------------------------dealt dealer cards
  console.log(cardsValueOnly(player));//---------------------------------------------shows player card values
  console.log(cardsValueOnly(dealer));//---------------------------------------------shows dealer card values
  aceFinder(player);//---------------------------------------------------------------shows in the output ace as 1 or 11
}

//------------------------------------Hit?------------------------------------//
////////////////////////////////////////////////////////////////////////////////
function hit(){
   player = additionalCard(player);//------------------------------------------------player cards +1
   aceFinder(player);
   var totalValues = getTotal(player);
   canPlay(totalValues);//-----------------------------------------------------------player situation: Bust || Blackjack || Hit
   console.log(totalValues);//-------------------------------------------------------total value
}

//-----------------------------------Stand------------------------------------//
////////////////////////////////////////////////////////////////////////////////

function stand(){
  var playerValues = cardsValueOnly(player);
  var totalplayer = (playerValues.find(ace) === 1) ?
                     showAceValues(player) : getTotal(player);//---------------------did the player stand with an ace

  var totaldealer = getTotal(dealer);

  while (totaldealer < 17 ||//-------------------------------------------------------dealer cannot stand under 17
         totaldealer < totalplayer ){

           if (aceFinder(dealer) < totalplayer){//-------------------------------------------------checks if dealer has an Ace
             var aceOne = getTotal(dealer);//----------------------------------------Ace as value 1
             var aceEleven = aceOne+10;//--------------------------------------------Ace as value 11

             switch (true){
               case (aceFinder(dealer) == 21):
                 totaldealer = 21;
                 break;
               case (aceEleven > totalplayer && aceEleven <= 21):
                 totaldealer = aceEleven;
                 break;
                case (aceEleven > totalplayer && aceEleven > 21):
                  totaldealer = aceOne;
                  break;

             }
           }  dealer = additionalCard(dealer);//-------------------------------------deal additional card to dealer, until he either wins or busts.
              totaldealer = getTotal(dealer);
              console.log("dealer" + getTotal(dealer));
              console.log("dealer has " + dealer);
              console.log("player" + totalplayer);

  } return dealer;
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
//-----------------------------------Bust?------------------------------------//
////////////////////////////////////////////////////////////////////////////////
function canPlay(total){
  switch (true){
    case (total >= 22):
      console.log("Bust");
      break;
    case (total == 21):
      console.log("Blackjack!");
      total = 21;
      break;
    case (total <= 20):
      console.log("Hit?");
      break;
  }
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
      return valueAsEleven;
    case ( valueAsOne < 12 ):
      console.log(valueAsOne + " or " + valueAsEleven);
      return valueAsEleven;
    case ( valueAsOne >= 12 ):
      console.log(valueAsOne);
      return valueAsOne;
  }
}

function aceFinder(cardHolder){
  var cardValues = cardsValueOnly(cardHolder);
  var output = ( cardValues.find(ace) === 1) ?
                showAceValues(cardHolder) : getTotal(cardHolder);
  return output;
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
