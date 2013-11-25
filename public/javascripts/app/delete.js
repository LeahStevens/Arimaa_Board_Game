// var Animals = ['Bunny', 'Cat', 'Dog', 'Horse', 'Camel', 'Elephant'];
// var pieceSelected;


// function setUpGameBoard(){

//   //This is the placement of the blacksquares.
//   $('tr:nth-child(3) > td:nth-child(3)').addClass('blackSquare');
//   $('tr:nth-child(3) > td:nth-child(6)').addClass('blackSquare');
//   $('tr:nth-child(6) > td:nth-child(6)').addClass('blackSquare');
//   $('tr:nth-child(6) > td:nth-child(3)').addClass('blackSquare');

//  //Silver Animals Start Game Placement
//   for(var s = 1; s < 9; s++){
//     var $silverBunny = $('<img src="../images/silverBunny.png">').addClass('silver');
//     $('tr:nth-child(1) > td:nth-child('+s+')').append($silverBunny);
//   }
//   for(var si = 0; si < 8; si++){
//     var silverAnimals = ['Cat','Dog','Horse','Elephant','Camel','Horse','Dog','Cat'];
//     var sil = si + 1;
//     $('tr:nth-child(2) > td:nth-child('+sil+')').addClass('silver'+silverAnimals[si]).addClass('silver');
//   }

//   //Gold Animals Start Game Placement
//   for(var g = 1; g < 9; g++){
//     $('tr:nth-child(8) > td:nth-child('+g+')').addClass('goldBunny').addClass('gold');
//   }
//   for(var go = 0; go < 8; go++){
//     var goldAnimals = ['Cat','Dog','Horse','Camel','Elephant','Horse','Dog','Cat'];
//     var gol = go + 1;
//     $('tr:nth-child(7) > td:nth-child('+gol+')').addClass('gold'+goldAnimals[go]).addClass('gold');
//   }
// }














// function selectGoldPiece(){
//   console.log('Move Gold Piece');
//   // console.log(this);
//   var x = $(this).data('x');
//   var y = $(this).data('y');
//   var square = this;
//   console.log(x);
//   console.log(y);
//   console.log(square);
//   for(var i = 0; i < Animals.length; i++){
//     var animal = $(square).hasClass('gold'+Animals[i]);
//     if(animal === true){
//       console.log('gold'+Animals[i]);
//       pieceSelected = 'gold'+Animals[i];
//     }
//     $(square).removeClass('gold'+Animals[i]).removeClass('gold');
//   }
//   console.log(square);
// }

// function moveSilverPiece(){
//   console.log('Move Silver Piece');
//   // console.log(this);
//   var x = $(this).data('x');
//   var y = $(this).data('y');
//   console.log(x);
//   console.log(y);
// }