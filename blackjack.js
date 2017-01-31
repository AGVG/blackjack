//--------------------------------Constants-----------------------------------//
////////////////////////////////////////////////////////////////////////////////
var playerCards = [];
var dealerCards = [];
var playerValues= [];
var dealerValues= [];
var totalPlayerValue = [];
var totalDealerValue = [];


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
  }
  return cards;
}

//-------------------------------Shuffled Deck--------------------------------//
////////////////////////////////////////////////////////////////////////////////
var newDeck = new Shuffle(deck);

//----------------------------Initial Dealt Cards-----------------------------//
////////////////////////////////////////////////////////////////////////////////
function deal(){
  playerCards = newDeck.splice(0,2);
  dealerCards = newDeck.splice(0,1);
  console.log(playerCards);
  console.log(dealerCards);
  getTotal(playerCards, playerValues, totalPlayerValue);
  getTotal(dealerCards, dealerValues, totalDealerValue);
}

//------------------------------------Hit?------------------------------------//
////////////////////////////////////////////////////////////////////////////////
function hit(){
   playerCards = additionalCard(playerCards);
   getTotal(playerCards, playerValues, totalPlayerValue);
  console.log(playerValues);
}


//-----------------------------------Bust?------------------------------------//
////////////////////////////////////////////////////////////////////////////////

function isBust(){
 if (totalPlayerValue == 21){
   console.log("Blackjack!");
 } else if (totalPlayerValue > 22){
   console.log("Bust");
 } console.log("hit");
}

//-----------------------------------Stand------------------------------------//
////////////////////////////////////////////////////////////////////////////////

function stand(){

}

////////////////////////////////////////////////////////////////////////////////
//------------------------------REUSABLE FUNCTIONS----------------------------//
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//--------------------------Total Card Value Function-------------------------//
////////////////////////////////////////////////////////////////////////////////
function getTotal(cardHolder, cardValues, total){
  total = [];
  for(var i=0; i < cardHolder.length; i++){
  cardValues = cardValues.concat(cardHolder[i][1]);
  total = cardValues.reduce(function(a, b) {
  return a + b;
}, 0);}
 console.log(total);
}
////////////////////////////////////////////////////////////////////////////////
//---------------------------Additional Card Function-------------------------//
////////////////////////////////////////////////////////////////////////////////
function additionalCard(cardHolder){
   cardHolder = cardHolder.concat(newDeck.splice(0,1));
   return cardHolder;
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
