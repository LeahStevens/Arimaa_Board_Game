$(document).ready(initialize);



//----Global Variables-----------//
var Animal = ['Bunny', 'Cat', 'Dog', 'Horse', 'Camel', 'Elephant'];
var createAnimal1 = ['Bunny','Bunny','Bunny','Bunny','Bunny','Bunny','Bunny','Bunny'];
var createAnimal2 = ['Cat','Cat','Dog', 'Dog','Horse', 'Horse', 'Camel', 'Elephant'];
var abc = ['A','B','C','D','E','F','G','H'];
var socket;



function initialize(){
  $(document).foundation();
  initializeSocketIO();

  $('#startGame').on('click', startNewGame);

  setUpBlackSquares();
  setUpGamePieces();

  // $('div').on('click','.gold', setUpGamePiecesGold);
  $('#endSetUpGold').on('click', setUpGamePiecesSilver);
  $('#endSetUpSilver').on('click', endSetUp);
  $('#endTurnGold').on('click', clickSilverTurn);
  $('#endTurnSilver').on('click', clickGoldTurn);

  $('#forfeitSilver').on('click', forfeitSilver);
  $('#forfeitGold').on('click', forfeitGold);
}



//-----------------------Starting Functions--------------------//

function startNewGame(){
  window.location = '/game';
}



//------------------------Set up Game---------------------------//

function setUpBlackSquares(){
      //This is the placement of the blacksquares.
  $('tr:nth-child(3) > td:nth-child(3)').addClass('blackSquare');
  $('tr:nth-child(3) > td:nth-child(6)').addClass('blackSquare');
  $('tr:nth-child(6) > td:nth-child(6)').addClass('blackSquare');
  $('tr:nth-child(6) > td:nth-child(3)').addClass('blackSquare');
}

function setUpGamePieces(){
  //----------------Set up Gold Animals
  for(var g = 0; g < 8; g++){
    var $goldAnimal1 = $('<div> id="initGold"').addClass('drag').css('z-index', 2).addClass('gold').addClass('gold'+createAnimal1[g]);
    $('#square'+abc[g]+'1').append($goldAnimal1);
  }
  for(var go = 0; go < 8; go++){
    var $goldAnimal2 = $('<div>').addClass('drag').css('z-index', 2).addClass('gold').addClass('gold'+createAnimal2[go]);
    $('#square'+abc[go]+'2').append($goldAnimal2);
  }
  //--------------Set up Silver Animals
  for(var s = 0; s < 8; s++){
    var $silverAnimal1 = $('<div>').addClass('drag').css('z-index', 2).addClass('silver').addClass('silver'+createAnimal1[s]);
    $('#square'+abc[s]+'8').append($silverAnimal1);
  }
  for(var si = 0; si < 8; si++){
    var $silverAnimal2 = $('<div>').addClass('drag').css('z-index', 2).addClass('silver').addClass('silver'+createAnimal2[si]);
    $('#square'+abc[si]+'7').append($silverAnimal2);
  }
  //------------------Starting Player Turns With Gold
  initGoldDrop();
}

function initGoldDrop(){
  for(var gol = 0; gol < 8; gol++){
    $('#square'+abc[gol]+'1').addClass('initGoldDrop');
    $('#square'+abc[gol]+'2').addClass('initGoldDrop');
  }
  var Rd = REDIPS.drag;
  Rd.drag.only.div.initGold = 'initGoldDrop';
  Rd.drag.only.other = 'deny';
}



//-------------------Player Set Up Of Game Pieces------------------//

// function setUpGamePiecesGold(e){
//   console.log(this);
//   e.stopPropagation();
// }

function setUpGamePiecesSilver(e){
  $('#endSetUpGold').toggleClass('hidden');
  $('#endSetUpSilver').toggleClass('hidden');
  console.log(this);
  e.stopPropagation();
}



//-------------Moving Pieces + Taking Turns---------------//

function endSetUp(){
  toggleClassesForEndSetUp();
  clickGoldTurn();
}

function clickGoldTurn(){
  toggleClassesForClickGoldTurn();
  console.log('Gold Turn');
  //This needs to be called after every move
  checkForTarPit();
  checkForWin();
}

function clickSilverTurn(){
  toggleClassesForClickSilverTurn();
  console.log('Silver Turn');
  //This needs to be called after every move
  checkForTarPit();
  checkForWin();
}



//----------------Toggling Classes--------------------//

function toggleClassesForClickSilverTurn(){
  $('#endTurnGold').toggleClass('hidden');
  $('#endTurnSilver').toggleClass('hidden');
  $('#forfeitGold').toggleClass('hidden');
  $('#forfeitSilver').toggleClass('hidden');
}

function toggleClassesForClickGoldTurn(){
  $('#endTurnSilver').toggleClass('hidden');
  $('#endTurnGold').toggleClass('hidden');
  $('#forfeitGold').toggleClass('hidden');
  $('#forfeitSilver').toggleClass('hidden');
}

function toggleClassesForEndSetUp(){
  $('#endSetUpSilver').toggleClass('hidden');
  $('#endTurnSilver').toggleClass('hidden');
  $('#forfeitSilver').toggleClass('hidden');
}



//---------------Win Functions--------------------------//

function checkForWin(){
  for(var g = 0; g < 8; g++){
    if($('#square'+abc[g]+'8 > div').hasClass('goldBunny') === true){
      alert('Gold Won');

    }
  }
  for(var s = 0; s < 8; s++){
    if($('#square'+abc[s]+'1 > div').hasClass('silverBunny') === true){
      alert('Silver Won');
    }
  }
}
function forfeitGold(){
  alert('Silver Won');
}
function forfeitSilver(){
  alert('Gold Won');
}



//----------------Sockets-------------------------------//

function initializeSocketIO(){
  var port = location.port ? location.port : '80';
  var url = location.protocol + '//' + location.hostname + ':' + port + '/app';

  socket = io.connect(url);
  socket.on('connected', socketConnected);
}

function socketConnected(data){
  console.log(data);
}










//----------------------HUGE FUNCTIONS_____________________________//
//_____________________________________1)Black Hole________________//

function checkForTarPit(){

  if ($('tr:nth-child(3) > td:nth-child(3) > div').hasClass('gold') === true){
    if($('tr:nth-child(2) > td:nth-child(3) > div').hasClass('gold') === false){
      if($('tr:nth-child(3) > td:nth-child(4) > div').hasClass('gold') === false){
        if($('tr:nth-child(4) > td:nth-child(3) > div').hasClass('gold') === false){
          if($('tr:nth-child(3) > td:nth-child(2) > div').hasClass('gold') === false){
            $('tr:nth-child(3) > td:nth-child(3) > div').remove();
          }
        }
      }
    }
  }
  if ($('tr:nth-child(3) > td:nth-child(6) > div').hasClass('gold') === true){
    if($('tr:nth-child(2) > td:nth-child(6) > div').hasClass('gold') === false){
      if($('tr:nth-child(3) > td:nth-child(7) > div').hasClass('gold') === false){
        if($('tr:nth-child(4) > td:nth-child(6) > div').hasClass('gold') === false){
          if($('tr:nth-child(3) > td:nth-child(5) > div').hasClass('gold') === false){
            $('tr:nth-child(3) > td:nth-child(6) > div').remove();
          }
        }
      }
    }
  }
  if ($('tr:nth-child(6) > td:nth-child(6) > div').hasClass('gold') === true){
    if($('tr:nth-child(5) > td:nth-child(6) > div').hasClass('gold') === false){
      if($('tr:nth-child(6) > td:nth-child(7) > div').hasClass('gold') === false){
        if($('tr:nth-child(7) > td:nth-child(6) > div').hasClass('gold') === false){
          if($('tr:nth-child(6) > td:nth-child(5) > div').hasClass('gold') === false){
            $('tr:nth-child(6) > td:nth-child(6) > div').remove();
          }
        }
      }
    }
  }
  if ($('tr:nth-child(6) > td:nth-child(3) > div').hasClass('gold') === true){
    if($('tr:nth-child(5) > td:nth-child(3) > div').hasClass('gold') === false){
      if($('tr:nth-child(6) > td:nth-child(4) > div').hasClass('gold') === false){
        if($('tr:nth-child(7) > td:nth-child(3) > div').hasClass('gold') === false){
          if($('tr:nth-child(6) > td:nth-child(2) > div').hasClass('gold') === false){
            $('tr:nth-child(6) > td:nth-child(3) > div').remove();
          }
        }
      }
    }
  }


  if ($('tr:nth-child(3) > td:nth-child(3) > div').hasClass('silver') === true){
    if($('tr:nth-child(2) > td:nth-child(3) > div').hasClass('silver') === false){
      if($('tr:nth-child(3) > td:nth-child(4) > div').hasClass('silver') === false){
        if($('tr:nth-child(4) > td:nth-child(3) > div').hasClass('silver') === false){
          if($('tr:nth-child(3) > td:nth-child(2) > div').hasClass('silver') === false){
            $('tr:nth-child(3) > td:nth-child(3) > div').remove();
          }
        }
      }
    }
  }
  if ($('tr:nth-child(3) > td:nth-child(6) > div').hasClass('silver') === true){
    if($('tr:nth-child(2) > td:nth-child(6) > div').hasClass('silver') === false){
      if($('tr:nth-child(3) > td:nth-child(7) > div').hasClass('silver') === false){
        if($('tr:nth-child(4) > td:nth-child(6) > div').hasClass('silver') === false){
          if($('tr:nth-child(3) > td:nth-child(5) > div').hasClass('silver') === false){
            $('tr:nth-child(3) > td:nth-child(6) > div').remove();
          }
        }
      }
    }
  }
  if ($('tr:nth-child(6) > td:nth-child(6) > div').hasClass('silver') === true){
    if($('tr:nth-child(5) > td:nth-child(6) > div').hasClass('silver') === false){
      if($('tr:nth-child(6) > td:nth-child(7) > div').hasClass('silver') === false){
        if($('tr:nth-child(7) > td:nth-child(6) > div').hasClass('silver') === false){
          if($('tr:nth-child(6) > td:nth-child(5) > div').hasClass('silver') === false){
            $('tr:nth-child(6) > td:nth-child(6) > div').remove();
          }
        }
      }
    }
  }
  if ($('tr:nth-child(6) > td:nth-child(3) > div').hasClass('silver') === true){
    if($('tr:nth-child(5) > td:nth-child(3) > div').hasClass('silver') === false){
      if($('tr:nth-child(6) > td:nth-child(4) > div').hasClass('silver') === false){
        if($('tr:nth-child(7) > td:nth-child(3) > div').hasClass('silver') === false){
          if($('tr:nth-child(6) > td:nth-child(2) > div').hasClass('silver') === false){
            $('tr:nth-child(6) > td:nth-child(3) > div').remove();
          }
        }
      }
    }
  }
}
