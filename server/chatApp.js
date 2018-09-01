let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('user connected');
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
	  
  socket.on('add-message', (message) => {
    console.log('Message Received'+message);
    let sendmsg = message;
     if(message.indexOf('Hi') !== -1){
        sendmsg = 'Hi Client :)';
     }
     else if(message.indexOf('Where') !== -1){
       sendmsg = "I am running on Port 5000";
     }
     else if(message.indexOf('Ha') !== -1){
        sendmsg = "Ha Ha Ha ha ..";
     }
     else if(message.indexOf('Bye') !== -1){
        sendmsg = "Bye Bye..";
     }
    io.emit('message', sendmsg);    
  });
});

http.listen(5000, () => {
  console.log('started on port 5000');
});
