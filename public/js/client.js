$('#nickname-form').submit(function() {
  let nickname = $('#nickname').val();

  if(nickname.length > 2 && nickname.length < 30) {
    socket.emit('join', nickname);

    $('.mask').css('opacity', '0');
    $('#message').focus();

    setTimeout(function() {
      $('.mask').css('visibility', 'hidden');
    }, 600)
  }

  return false;
})

$('#messages').scrollTop($('#messages')[0].scrollHeight);

let socket = io();

$('#message-form').submit(function() {
  let message = $('#message').val();

  if(message.length >= 2) {

    socket.emit('chat_message', message);
    $('#message').val('');
  }

  return false;
});

socket.on('chat_message', function(args) {
  console.log(args);
  $('#message-form').before($('<li class="msg">').html('<span>'+args.sender.nickname+': </span><span>'+args.message+'</span>'));
});
