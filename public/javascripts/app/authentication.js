$(document).ready(initialize);

function initialize(){
  $(document).foundation();

  $('#authentication-button').on('click', clickAuthenticationButton);
  $('#register').on('click', clickRegister);
  $('#login').on('click', clickLogin);
}


// ------------------------HTML------------------------------------------------- //

function htmlRegisterComplete(result){
  $('input[name="email"]').val('');
  $('input[name="password"]').val('');

  if(result.status === 'ok'){
    var $success = $('<p>You have successfully registered.</p>').css('text-align', 'center');
    $('#authentication').prepend($success);
  }else{
    var $retry = $('<p>Email address is already in use.</p>').css('color', 'red').css('text-align', 'center');
    $('#authentication').prepend($retry);
  }
}

function htmlUpdateLoginStatus(result){
  $('input[name="email"]').val('');
  $('input[name="password"]').val('');

  if(result.status === 'ok'){
    $('#authentication-button').attr('data-email', result.email);
    $('#authentication-button').text('Logout '+result.email);
    $('#authentication-button').addClass('alert');
    window.location = '/';
  }else{
    var $retry = $('<p>Check if email and password is correct.</p>').css('color', 'red').css('text-align', 'center');
    $('#authentication').prepend($retry);
  }
}

function htmlLogout(data){
  $('#authentication-button').attr('data-email', 'anonymous');
  $('#authentication-button').text('Login | Sign Up');
  $('#authentication-button').removeClass('alert');
  window.location = '/';
  console.log('You logged out');
}


// -----------------------------Click Handlers---------------------------------------- //

function clickRegister(e){
  $('p').remove();
  var url = '/players';
  var data = $('form#authentication').serialize();
  sendAjaxRequest(url, data, 'post', null, e, function(data){
    htmlRegisterComplete(data);
  });
}

function clickLogin(e){
  $('p').remove();
  var url = '/login';
  var data = $('form#authentication').serialize();
  sendAjaxRequest(url, data, 'post', 'put', e, function(data){
    htmlUpdateLoginStatus(data);
  });
}


function clickAuthenticationButton(e){
  var isAnonymous = $('#authentication-button[data-email="anonymous"]').length === 1;

  if(isAnonymous){
    window.location = '/players';
    $('input[name="email"]').focus();
  } else {
    var url = '/logout';
    sendAjaxRequest(url, {}, 'post', 'delete', null, function(data){
      htmlLogout(data);
    });
  }

  e.preventDefault();
}